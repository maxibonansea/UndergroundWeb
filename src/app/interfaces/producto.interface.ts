export interface Producto {
    cod: string;
    tipoProducto: string;
    marca: string;
    modelo: string;
    precioLista: string;
    precioEfectivo: string;
    estado: string;
    fechaPublicacion: string;
    url: string;
    sale: boolean;
    novedad: boolean;
    paginaPrincipal: boolean;
  }