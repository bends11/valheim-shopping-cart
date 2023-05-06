import { Component, Input } from '@angular/core';
import { WikiThing } from 'src/app/state/models/wikiThing';

@Component({
  selector: 'app-wiki-link',
  templateUrl: './wiki-link.component.html',
  styleUrls: ['./wiki-link.component.css']
})
export class WikiLinkComponent {
  readonly BASE_URL = 'https://valheim.fandom.com';
  @Input() wikiThing?: WikiThing;
}
