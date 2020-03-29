import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = []

  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( ( resolve, reject ) => {
      
      this.http.get('https://undergoundcba.firebaseio.com/productos_idx.json')
        .subscribe(
          (resp: Producto[]) => {

            //Probando el Loader
            
            // setTimeout(() => {
            //   this.cargando = false;
            // }, 2000);

            this.cargando = false;
            this.productos=resp;
            resolve();
          }
        );
    });
  }

  getProducto(id: string){
    return this.http.get(`https://undergoundcba.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {
    if(this.productos.length == 0) {
      this.cargarProductos().then(  () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }

    // this.productosFiltrados = this.productos.filter( producto => {
    //   return true;
    // });
    console.log(this.productosFiltrados);
  }

  private filtrarProductos( termino: string) {
    
    this.productosFiltrados = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tipoLower = prod.tipoProducto.toLocaleLowerCase();
      const tituloLower = prod.titulo.toLocaleLowerCase();
      const marcaLower = prod.marca.toLocaleLowerCase();

      if(tipoLower.indexOf(termino) >= 0 || tipoLower.indexOf(termino) >= 0 || marcaLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push( prod );
      }
    });
    
  }

}
