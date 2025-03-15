import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';


const mockPokemon: SimplePokemon = {
    id: '1',
    name: 'pikachu'
};

describe('PokemonCardComponent', () => {
    let fixture: ComponentFixture<PokemonCardComponent>
    let component: PokemonCardComponent;
    let compile: HTMLDivElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonCardComponent],
            providers: [
                provideRouter([]) //Ya no es necesario si uso un mock.
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonCardComponent);
        fixture.componentRef.setInput('pokemon', mockPokemon);

        component = fixture.componentInstance;
        compile = fixture.nativeElement;

        fixture.detectChanges();

    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have the SimplePokemon singal inputValue', () => {
        expect(component.pokemon()).toEqual(mockPokemon);
    });

    it('should render the pokemon name and image correctly', () => {
        const pokemonH2Name = compile.querySelector('h2')!.innerHTML;
        const pokemonImgSrc = compile.querySelector('img')!.src;

        expect(pokemonH2Name.trim()).toBe(mockPokemon.name.trim());
        expect(pokemonImgSrc).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${mockPokemon.id}.svg`);

    });

    it('should have the proper ng-reflect-router-link', () => {
        const divWithLink = compile.querySelector('div');
        expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons/${mockPokemon.name}`);
    });

});
