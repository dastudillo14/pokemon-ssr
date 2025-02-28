import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent {

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({name:'description',content:'este es mi contact page'});
    this.meta.updateTag({name:'og:title',content:'este es mi contact page'});
    this.meta.updateTag({name:'keywords',content:'pricing page, SSR'});    
  }

}
