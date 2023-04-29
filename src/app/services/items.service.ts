import { Injectable } from "@angular/core";
import { Observable, catchError, delay, flatMap, forkJoin, from, map, mergeMap, of, switchMap, take, toArray } from "rxjs";
import { Item, WikiThing } from "../state/models/item";
import { BaseService } from "./base.service";
import { Queue } from "../util/Queue";

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
        filename
      }
    }

    return null;
  }

  private getWikiThingFromHtml(html: string): WikiThing | null {
    const hrefMatches: string[] | null = html.match(/href="(.*?)"/g);
    const titleMatches: string[] | null = html.match(/title="(.*?)"/g);

    if (hrefMatches && hrefMatches.length > 0 && titleMatches && titleMatches.length > 0) {
      const name = this.getTitle(titleMatches[0]);
      const path = this.getHrefValue(hrefMatches[0]);
      return {
        name,
        path
      }
    }

    return null;
  }

  private getHrefValue(hrefMatch: string): string {
    return this.removeLeadingAndTrailingCharacters(hrefMatch, 6, 1);
  }

  private getTitle(titelMatch: string): string {
    return this.removeLeadingAndTrailingCharacters(titelMatch, 7, 1);
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
            itemWithDetails.droppedBy = this.getWikiThingFromHtml(line) ?? undefined;
            break;
          case 'Weight':
            itemWithDetails.weight = Number.parseFloat(this.getValueBetweenHtmlTags(line));
            break;
          default:
            break;
        }
      }
    });

    return itemWithDetails;
  }

  private getValueBetweenHtmlTags(line: string): string {
    const htmlTagMatches: string[] | null = line.match(/>(.*?)</g);
    let returnValue = '';
    if (htmlTagMatches && htmlTagMatches.length > 0) {
      htmlTagMatches.forEach((match) => {
        const value = this.removeLeadingAndTrailingCharacters(match, 1, 1);
        if (value.length > 0) returnValue = value;
      });
    }

    return returnValue;
  }
}
