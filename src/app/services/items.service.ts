import { Injectable } from "@angular/core";
import { Observable, catchError, from, map, mergeMap, of, switchMap, toArray } from "rxjs";
import { Item } from "../state/models/item";
import { BaseService } from "./base.service";
import { Queue } from "../util/Queue";
import { WikiThing } from "../state/models/wikiThing";
import { Cost } from "../state/models/cost";

@Injectable()
export class ItemsService extends BaseService {
  private readonly ITEMS_LIST_PATH = '/wiki/Items_List';

  public getItems(): Observable<Map<string, Item>> {
    return this.http.get('assets/items_list.html', {responseType: 'text'}).pipe(
      switchMap(html => of(
        this.getItemMapFromList(html.split('\n')
                                    .filter(line => line.match('<li><a'))
                                    .map(line => this.getItemFromHtml(line))
                                    .flatMap(item => !!item ? [item] : []))
      )),
    )
  }

  private getItemMapFromList(items: Item[]): Map<string, Item> {
    const itemMap = new Map<string, Item>();

    items.forEach(i => {
      itemMap.set(i.name, i);
    })

    return itemMap;
  }

  private getItemFromHtml(html: string): Item | null {
    const wikiThing = this.getWikiThingFromHtml(html);

    if (wikiThing) {
      const filename = wikiThing.name.replaceAll(/(\&#[0-9]{2};| )/g, '_') + '.html';
      return {
        name: wikiThing.name,
        path: wikiThing.path,
        filename,
        craftingMaterials: [],
      }
    }

    return null;
  }

  private getWikiThingFromHtml(html: string): WikiThing | undefined {
    const name = this.getTitle(html);
    const path = this.getHrefValue(html);

    if (name && path) {
      return {
        name,
        path
      }
    }

    return undefined;
  }

  private getAllQuantities(html: string): number[] {
    return (html.match(/x\s*[0-9]+/g) ?? []).map(quantityMatch =>
      Number.parseInt(this.removeLeadingAndTrailingCharacters(quantityMatch, 1, 0))
    );
  }

  private getAllHrefValues(html: string): string[] {
    return (html.match(/href="(.*?)"/g) ?? []).map(hrefMatch =>
      this.removeLeadingAndTrailingCharacters(hrefMatch, 6, 1)
    );
  }

  private getAllTitles(html: string): string[] {
    return (html.match(/title="(.*?)"/g) ?? []).map(titelMatch =>
      this.removeLeadingAndTrailingCharacters(titelMatch, 7, 1)
    );
  }

  private getHrefValue(html: string): string | undefined {
    const matches = this.getAllHrefValues(html);

    if (matches.length > 0) return matches[0];

    return undefined;
  }

  private getTitle(html: string): string | undefined {
    const matches = this.getAllTitles(html);

    if (matches.length > 0) return matches[0];

    return undefined;
  }

  private removeLeadingAndTrailingCharacters(str: string, leading: number, trailing: number): string {
    return str.substring(leading, str.length - trailing);
  }

  public getAllItemDetails(items: Map<string, Item>): Observable<Map<string, Item>> {
    return from(items.values()).pipe(
      mergeMap(item => this.http.get(`assets/items/${item.filename}`, {responseType: 'text'}).pipe(
        map(html => this.getItemDetailsFromHtml(item, html)),
        catchError(_ => of(item))
      )),
      toArray(),
      map(list => this.getItemMapFromList(list)),
    )
  }

  private getItemDetailsFromHtml(item: Item, html: string): Item {
    const labelQueue = new Queue<string>();

    const itemWithDetails: Item = { ...item };

    html.split('\n').forEach((line) => {
      const labelMatches: string[] | null = line.match('pi-data-label');
      const valueMatches: string[] | null = line.match('pi-data-value');

      if (labelMatches && labelMatches.length > 0) {
        labelQueue.push(this.getValueBetweenHtmlTags(line));
      } else if (valueMatches && valueMatches.length > 0) {
        const label = labelQueue.pop();

        switch (label) {
          case 'Type':
            itemWithDetails.type = this.getValueBetweenHtmlTags(line);
            break;
          case 'Internal ID':
            itemWithDetails.internalId = this.getValueBetweenHtmlTags(line);
            break;
          case 'Dropped by':
            itemWithDetails.droppedBy = this.getWikiThingFromHtml(line);
            break;
          case 'Weight':
            itemWithDetails.weight = Number.parseFloat(this.getValueBetweenHtmlTags(line));
            break;
          case 'Crafting Materials':
            itemWithDetails.craftingMaterials = [ ...itemWithDetails.craftingMaterials, this.getCraftingMaterials(line) ];
            break;
          default:
            break;
        }
      }
    });

    return itemWithDetails;
  }

  private getValueBetweenHtmlTags(line: string, index: number = 0): string {
    const htmlTagMatches: string[] | null = line.substring(index).match(/>(.*?)</g);
    let returnValue = '';
    if (htmlTagMatches && htmlTagMatches.length > 0) {
      htmlTagMatches.forEach((match) => {
        const value = this.removeLeadingAndTrailingCharacters(match, 1, 1);
        if (value.length > 0) returnValue = value;
      });
    }

    return returnValue;
  }

  private getCraftingMaterials(line: string): Cost[] {
    const craftingMaterials: Cost[] = [];
    const hrefValues = this.getAllHrefValues(line);
    const titles = this.getAllTitles(line);
    const quantities = this.getAllQuantities(line);

    for (let i = 0; i < Math.min(hrefValues.length, titles.length, quantities.length); i++) {
      craftingMaterials.push({
        wikiThing: {
          name: titles[i],
          path: hrefValues[i],
        },
        quantity: quantities[i],
      });
    }

    return craftingMaterials;
  }
}
