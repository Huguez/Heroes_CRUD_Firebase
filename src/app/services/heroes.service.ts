import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url: string = 'https://heroescrud-fc407.firebaseio.com';
  // https://heroescrud-fc407.firebaseio.com/heroes.json

  constructor( private http: HttpClient) { }
  
  crearHeroe(heroe: HeroeModel ){

    return this.http.post( `${ this.url }/heroes.json`, heroe )
    .pipe(  
      map( ( resp: any ) => { heroe.id = resp.name; return heroe; })
    );
  }

  actualizarHeroe( heroe: HeroeModel ){
    return this.http.put( `${ this.url }/heroes${ heroe.id }.json`, heroe )
  }
}
