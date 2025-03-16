import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';


const mockPokemons: SimplePokemon[] = [
    { id: '1', name: 'pikachu' },
    { id: '2', name: 'charizard' },
    { id: '3', name: 'bulbasor' },
];


describe('PokemonListComponent', () => {
    let fixture: ComponentFixture<PokemonListComponent>
    let component: PokemonListComponent;
    let compile: HTMLDivElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PokemonListComponent],
            providers: [provideRouter([])]
        }).compileComponents();

        fixture = TestBed.createComponent(PokemonListComponent);

        component = fixture.componentInstance;
        compile = fixture.nativeElement;


    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should render pokemon list with 3 pokemons', () => {
        fixture.componentRef.setInput('pokemons', mockPokemons);
        fixture.detectChanges();
        expect(compile.querySelectorAll('app-pokemon-card').length).toBe(mockPokemons.length);
    });

    it('should render no hay pokemons when pokemon list is empty', () => {
        fixture.componentRef.setInput('pokemons', []);
        fixture.detectChanges();
        expect(compile.querySelector('div')?.textContent).toContain('No hay pokémons');
    });


});
