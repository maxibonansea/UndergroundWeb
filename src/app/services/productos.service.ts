import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = []

  constructor( private http: HttpClient,
               public db: AngularFirestore ) { 
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

      if(tipoLower.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 || marcaLower.indexOf(termino) >= 0) {
        this.productosFiltrados.push( prod );
      }
    });
  }

  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }

  nuevoProducto(value) {
    return this.db.collection('productos').add({
      categoria: value.categoria,
      desc1: value.desc1,
      marca: value.marca,
      precio: value.precio,
      producto: value.producto,
      sexo: value.sexo,
      subtitulo1: value.subtitulo1,
      tipoProducto: value.tipoProducto,
    })
  }

}
