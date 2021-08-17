import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente, Grupo } from '../cliente.model';
import { ClientesService } from '../clientes.service';
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit, OnDestroy {

  clientes: Cliente[] =[
    
  ];
  clientes$: Observable<Cliente[]> = new Observable<Cliente[]>();
  clientesSubscripcion: Subscription = new Subscription;

  constructor(private clientesService: ClientesService) { 

  }

  ngOnInit(): void {
    this.clientes$ = this.clientesService.getClientes$();
    this. clientesSubscripcion= this.clientes$.subscribe((clientes:Cliente[]) =>
     this.clientes = clientes
     );
  }
  ngOnDestroy(){
    this.clientesSubscripcion.unsubscribe();
  }

  doBorrarCliente(cliente: Cliente){
    console.log('yeah', cliente)
    this.clientesService.borrarCliente(cliente);
  }

}
