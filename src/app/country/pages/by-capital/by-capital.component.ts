import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html'
})
export class ByCapitalComponent {

  
  public argument        : string = '';//variable asociada al valor del input de busqueda
  public errorConsult    : boolean = false;//variable para controlar el estado de erro de consultas y mostrar el alert
  public countryResponse : Country[] = []; // arreglo de paises para almacenar las respuestas

  //inyectando o instanciando los servicios
  constructor(private countriesService:CountriesService) { }

  public search(argument:string):void{
    this.argument = argument; // asignamos el valor del argumento de la funcion al argumento de la clase
    this.errorConsult = false;
    // el metodo suscribe tiene varias funciones para procesar la informacion suscribe(
    //  (response)=>{} para la informacion regresada
    //  (error)=>{} para procesar los errores que puedan ocurrir
    //  (result)=>{} para procesar un resultado en caso de que todo halla ocurrido con exito
    //)
    this.countriesService.searchCountry({argument: argument, mode:{capital:true}})
      .subscribe(
        (resp)=>{
          this.countryResponse = resp;//agregando la respuesta al arreglo correspondiente
          console.log(this.countryResponse);
          
        },
        (error)=>{
          console.log(error);
          this.countryResponse = [];
          this.errorConsult = true;
        }
      );
  }

  public sugge(event:string):void{
    this.argument = event;
    this.errorConsult = true;
  }
}
