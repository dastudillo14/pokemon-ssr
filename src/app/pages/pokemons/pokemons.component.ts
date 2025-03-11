import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemons/services/pokemon.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemons',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  standalone: true,
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsComponent implements OnInit {

  private pokemonService = inject(PokemonService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);


  public pokemons = signal<SimplePokemon[]>([]);

  public currentPage = toSignal<number>(this.activatedRoute.queryParamMap.pipe(
    map(params => params.get('page') ?? '1'),
    map(page => isNaN(+page) ? 1 : +page),
    map(page => Math.max(1, page))
  )
  );

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable)=>{
  //   console.log(isStable);
  // })
  public isLoading = signal(true);

  ngOnInit(): void {
    this.loadPokemons();
    console.log(this.currentPage())
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;
    this.isLoading.set(true)
    this.pokemonService.getPokemons(pageToLoad)
      .pipe(
        tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })),
        tap(() => this.title.setTitle(`Pokemons de la página ${pageToLoad}`))
      )
      .subscribe(r => {
        console.log(r[0]);
        this.isLoading.set(false);
        this.pokemons.set(r);
      });
  }

}
