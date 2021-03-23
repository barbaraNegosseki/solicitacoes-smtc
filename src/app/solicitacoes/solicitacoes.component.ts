import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-solicitacoes',
  templateUrl: './solicitacoes.component.html',
  styleUrls: ['./solicitacoes.component.sass']
})
export class SolicitacoesComponent implements OnInit {

  pedidos: any[] = [];

  carregando: boolean = true;

  constructor(private _http: HttpService, private http: HttpClient) {  }

  ngOnInit(): void {
    this._http.myMethod().subscribe((data:any) => {
      this.pedidos = data;
      this.carregando=false;
      console.log(this.pedidos)
    });
  }

  addRequest(){
    const tarifa = <HTMLInputElement>document.getElementById("itau-tarifa");
    const empresa = <HTMLInputElement>document.getElementById("itau-empresa");
    const cnpj = <HTMLInputElement>document.getElementById("itau-cnpj");
    const plano = <HTMLInputElement>document.getElementById("itau-plano");
    const minutos = <HTMLInputElement>document.getElementById("itau-minutos");
    const valorPlano = <HTMLInputElement>document.getElementById("itau-valor-plano");
    const data = <HTMLInputElement>document.getElementById("itau-data");
    const msg = <HTMLInputElement>document.getElementById("itau-fields");

    let list = [tarifa, empresa, cnpj, plano, minutos, valorPlano, data]

    var error = "false"

    for (var i = 0; i < list.length; i++){
      if(list[i].value == ""){
        list[i].setAttribute("style", "border-bottom: 1px solid red");
        msg.setAttribute("style", "visibility: visible");
        error = "true"
      }else{
        list[i].setAttribute("style", "border-bottom: 1px solid grey");
        msg.setAttribute("style", "visibility: hidden");
      }
    }

    if(error != "true"){
      var dataEmissao = Date();

      var pedido = {
        "empresa":empresa.value,
        "cnpj":cnpj.value,
        "plano":plano.value,
        "tarifa":tarifa.value,
        "minutos":minutos.value,
        "vplano":valorPlano.value,
        "dateAdesao":data.value,
        "dateEmissao":dataEmissao
      }

      this.http.post('https://agdo-server.appspot.com/solicitacoes/', pedido).subscribe((response) => {
        if (response) {
          console.log("cadastrado")
        }
      });

    }
  }
}
