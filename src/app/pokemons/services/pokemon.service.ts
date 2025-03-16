import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PokemonAPIResponse, PokemonDetail, SimplePokemon } from '../interfaces';
import { catchError, map, throwError } from 'rxjs';

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

    return this.httpClient.get<PokemonAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`)
      .pipe(
        map(resp => {
          const simplePokemons: SimplePokemon[] = resp.results.map((r) => ({ id: r.url.split('/').at(-2) ?? '', name: r.name }));
          return simplePokemons;
        })
      )
  }

  public getPokemonById(id:string){
    return this.httpClient.get<PokemonDetail>(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    if( error.status == 0){
      console.log('error ', error.error);
    }else{
      console.log(`backend error ${error.status}`, error.error)
    }

    const errorMessage = error.error ?? 'error';

    return throwError(()=> new Error(errorMessage));
  }

}
