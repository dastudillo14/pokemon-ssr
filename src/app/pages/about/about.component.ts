import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutComponent implements OnInit{
  
  private title = inject(Title);
  private meta = inject(Meta);

  
  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({name:'description',content:'este es mi about page'});
    this.meta.updateTag({name:'og:title',content:'este es mi about page'});
    this.meta.updateTag({name:'keywords',content:'about page, SSR'});
  } 
  
}
