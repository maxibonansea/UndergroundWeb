import { Component, OnInit } from '@angular/core';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public infoPaginaService: InfoPaginaService,
               private router: Router ) { }

  ngOnInit(): void {
  }

  buscarProduto(termino: string) {
    
    if(termino.length < 1) {
      return;
    }
    
    this.router.navigate(['/search', termino]);
  }

}
