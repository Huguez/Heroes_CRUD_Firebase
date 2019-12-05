import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';


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
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put( `${ this.url }/heroes/${ heroe.id }.json`, heroeTemp )
  }
  
  getHeroe( id: string ){
    return this.http.get( `${ this.url }/heroes/${ id }.json`);

  }

  getHeroes(){
    return this.http.get( `${this.url}/heroes.json` ).pipe( map( resp => {
      const heroes: HeroeModel[] = [];
      
      if( resp === null ) return [];
      
      Object.keys( resp ).forEach( key => {
        const h: HeroeModel = resp[key];
        h.id = key;
        heroes.push( h );
      });
      delay( 2000 );
      return heroes;
    } ) );

  }
  
  removeHeroe( id: string ){
    return this.http.delete( `${ this.url }/heroes/${id}.json` );
  }

}
