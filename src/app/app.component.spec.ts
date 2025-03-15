import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent;
  let compile: HTMLDivElement;

  //MockComponent
  @Component({
    selector: 'app-navbar',
    standalone: true
  })
  class NavBarComponentMock { }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        //provideRouter([]) //Ya no es necesario si uso un mock.
      ]
    }).overrideComponent(AppComponent, {
      //Agregarmos el mock
      add: {
        imports: [NavBarComponentMock]
      },
      //ELiminamos el original
      remove: {
        imports: [NavbarComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compile = fixture.nativeElement;

  });

  it('should create the app', () => {    
    const appNavbar = compile.querySelector('app-navbar');
    const routerOutlet = compile.querySelector('router-outlet');

    expect(appNavbar).toBeTruthy();
    expect(routerOutlet).toBeTruthy();
    expect(app).toBeTruthy();
  });

});
