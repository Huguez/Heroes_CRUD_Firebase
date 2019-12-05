import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs'; 
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  
  heroe = new HeroeModel();

  constructor( private heroesServices : HeroesService, private router: ActivatedRoute, private r : Router ) { }

  ngOnInit(){
    const id = this.router.snapshot.paramMap.get( 'id' );
    if( id !== 'nuevo' ){
      this.heroesServices.getHeroe(id).subscribe( ( resp: HeroeModel ) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }
  }

  guardar( form: NgForm ){
    
    if( form.invalid ){
      return;
    }
     
    let peticion: Observable<any>;
    
    let texto: string;
    let titulo: string = this.heroe.nombre; 
    
    if( this.heroe.id ){
      peticion = this.heroesServices.actualizarHeroe( this.heroe );
      texto = 'Se actualizo Correctamente';
    }else{
      peticion = this.heroesServices.crearHeroe( this.heroe );
      texto = 'Se creo Correctamente';
    }

    peticion.subscribe( ( resp : any ) => {
      Swal.fire({
        icon: 'success',
        title: titulo,
        text: texto,
        showCloseButton: true,
        confirmButtonText: 'OK'
      }).then( ( result ) => {
        if( result.value ) {
          this.r.navigate(['/heroes']);          
        }
      });
    });
  }
}
