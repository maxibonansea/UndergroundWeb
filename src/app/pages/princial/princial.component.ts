import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-princial',
  templateUrl: './princial.component.html',
  styleUrls: ['./princial.component.css']
})
export class PrincialComponent implements OnInit {

  constructor( public _productosService: ProductosService ) { }

  ngOnInit(): void {
  }

}
