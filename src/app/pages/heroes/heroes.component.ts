import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  public heroes: HeroeModel[] = [];
  public cargando : boolean = false;

  constructor( private heroesServices: HeroesService ) { }

  ngOnInit() {
    this.cargando = true;
    this.heroesServices.getHeroes().subscribe( resp  => {
      this.heroes = resp;
      this.cargando = false;
    });
  }

  borrarHeroe( heroe: HeroeModel, i: number  ){
    Swal.fire({
      title: 'Borrar Heroe',
      text: "Estas seguro de Borrar Heore??",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo'
      }).then( ( result ) => {
        if( result.value ) {
          this.heroes.splice(i, 1);
          this.heroesServices.removeHeroe( heroe.id ).subscribe();
          Swal.fire(
            'Borrado!',
            'Heroe eliminado.',
            'success'
          )
        }
    });
    
  }
}
