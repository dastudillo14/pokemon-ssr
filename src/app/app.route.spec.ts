import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', () => {
    let router: Router;
    let location: Location;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter(routes)
            ]
        })
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });


    it('should navigate to "about" redirects to "/about" ', async () => {
        await router.navigate(['about']);
        expect(location.path()).toBe('/about');
    });

    it('should navigate to "pokemons/page/1" redirects to "pokemons/page/1" ', async () => {
        await router.navigate(["pokemons/page/1"]);
        expect(location.path()).toBe("/pokemons/page/1");
    });

    it('should navigate to "unknow page" redirects to "/about" ', async () => {
        await router.navigate(['unknow page']);
        expect(location.path()).toBe('/about');
    });


    it('should load AboutComponent', async () => {
        const aboutRoute = routes.find((r) => r.path === 'about')!;
        expect(aboutRoute).toBeDefined(); //debe existir
        const aboutComponent = await aboutRoute.loadComponent!() as any;
        expect(aboutComponent.default.name).toBe('AboutComponent');
    });

    it('should load PokemonsComponent', async () => {
        const pokemonPage = routes.find((r) => r.path === 'pokemons/page/:page')!;
        expect(pokemonPage).toBeDefined(); //debe existir
        const pokemonPageComponent = await pokemonPage.loadComponent!() as any;
        expect(pokemonPageComponent.default.name).toBe('PokemonsComponent');
    })





})