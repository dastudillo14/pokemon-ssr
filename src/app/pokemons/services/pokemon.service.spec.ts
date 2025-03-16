import { TestBed } from "@angular/core/testing";
import { PokemonService } from "./pokemon.service"
import { provideHttpClient } from "@angular/common/http";
import { PokemonAPIResponse, SimplePokemon } from "../interfaces";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { catchError } from "rxjs";

const expectedPokemons: SimplePokemon[] = [
    { id: '1', name: 'bulbasaur' },
    { id: '2', name: 'ivysaur' },
];

const mockPokemon = { id: '1', name: 'pikachu' };

const mockPokemonResp: PokemonAPIResponse = {
    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    results: [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }
    ]
}

describe('PokemonService', () => {
    let service: PokemonService;
    let httpMock: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(PokemonService);
        httpMock = TestBed.inject(HttpTestingController);
    });


    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', () => {        
        expect(service).toBeTruthy();
    });


    it('should load a page of SimplePokemons', () => {
        service.getPokemons(1).subscribe((pokemons) => {
            expect(pokemons).toEqual(expectedPokemons);
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokemonResp);

    });

    it('should load page 5 of SimplePokemons', () => {
        service.getPokemons(5).subscribe((pokemons) => {
            expect(pokemons).toEqual(expectedPokemons);
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokemonResp);
    });

    it('should load a pokemon by id', () => {
        service.getPokemonById(mockPokemon.name).subscribe((pokemon: any) => {
            expect(pokemon).toEqual(mockPokemon);
        });

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${mockPokemon.name}`);

        expect(req.request.method).toBe('GET');

        req.flush(mockPokemon);
    });

    it('should catch error if pokemon not found', () => {

        const pokemonName = 'kokoko'

        service.getPokemonById(pokemonName)
            .pipe(
                catchError(err => {
                    expect(err.message).toContain('Pokemon not found')
                    return [];
                })
            )
            .subscribe();

        const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        expect(req.request.method).toBe('GET');

        req.flush('Pokemon not found', {
            status: 404,
            statusText: 'NOT FOUND'
        });
    });


})