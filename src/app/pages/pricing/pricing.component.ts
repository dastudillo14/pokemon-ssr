import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingComponent {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject((PLATFORM_ID));

    ngOnInit(): void {
      //Ejecutar código del lago del cliente.
      if(isPlatformBrowser(this.platform)){
        // document.title = 'pricing';
      }
      this.title.setTitle('Pricing Page');
      this.meta.updateTag({name:'description',content:'este es mi pricing page'});
      this.meta.updateTag({name:'og:title',content:'este es mi pricing page'});
      this.meta.updateTag({name:'keywords',content:'pricing page, SSR'});    
    } 
 }
