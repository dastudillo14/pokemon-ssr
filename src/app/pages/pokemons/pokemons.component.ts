import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute,  RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  standalone: true,
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent {

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private title = inject(Title);


  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(this.activatedRoute.params.pipe(
    map(params => params['page'] ?? '1'),
    map(page => isNaN(+page) ? 1 : +page),
    map(page => Math.max(1, page))
  )
  );

  public loadOnPageChanged = effect(()=>{
    this.loadPokemons(this.currentPage());
  });

  public isLoading = signal(true);

  public loadPokemons(page = 0) {
    
    this.isLoading.set(true)
    this.pokemonService.getPokemons(page)
      .pipe(
        //tap(() => this.router.navigate([], { queryParams: { page: page } })),
        tap(() => this.title.setTitle(`Pokemons de la página ${page}`))
      )
      .subscribe(r => {
        console.log(r[0]);
        this.isLoading.set(false);
        this.pokemons.set(r);
      });
  }

}
