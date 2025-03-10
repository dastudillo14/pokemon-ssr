import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces';

@Component({
  selector: 'app-pokemon-card',
  standalone:true,
  imports: [],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent { 

  public pokemon = input.required<SimplePokemon>();
  
  public readonly pokemonImage = computed(()=>{
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemon().id}.svg`
  })

  /**
   * Se dispara cada que la señal (pokemon) cambia
   */
  // logEffect = effect(()=>{
  //   console.log('pokemon card', this.pokemon())
  // });



}
