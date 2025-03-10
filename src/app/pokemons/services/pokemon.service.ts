import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonAPIResponse, SimplePokemon } from '../interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private httpClient = inject(HttpClient);

  public getPokemons(page: number) {
    if (page != 0) {
      --page;
    }

    page = Math.max(0, page);

    return this.httpClient.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset${page * 20}&limit=20`)
      .pipe(
        map(resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map((r) => ({ id: r.url.split('/').at(-2) ?? '', name: r.name }));
          return simplePokemons;
        })
      )
  }

}
