import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-index-clientes',
  templateUrl: './index-clientes.component.html',
  styleUrls: ['./index-clientes.component.css']
})
export class IndexClientesComponent implements OnInit {

  public clientes :Array<any>= [];
  public clientes_const  :Array<any>= [];
  public token = localStorage.getItem('token');
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  constructor(
    private _adminService:AdminService
  ) { }

  ngOnInit(): void {
    this._adminService.listar_clientes_tienda(this.token).subscribe(
      response=>{
        console.log(response);
        
        this.clientes_const = response.data;
        this.clientes= this.clientes_const;
      }
    );
  }

  filtrar_cliente(){
    if(this.filtro){
      var term = new RegExp(this.filtro.toString().trim() , 'i');
      this.clientes = this.clientes_const.filter(item=>term.test(item.nombres)||term.test(item.apellidos)||term.test(item.email)||term.test(item.dni)||term.test(item.telefono)||term.test(item._id));
    }else{
      this.clientes = this.clientes_const;
    }
  }

  inhabilitarCliente(id: string, estado: boolean) {
    if (estado) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No se pudo actualizar el estado del cliente.'
      });
      return; // Salir del método si el estado ya está false
    }
  
    // Si el estado es true, intentar actualizarlo
    this._adminService.actualizar_estado_cliente(id, estado, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Estado del cliente actualizado correctamente.'
        });
        this.ngOnInit();
        $('#delete-' + id).modal('hide');
      },
      error => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No se pudo actualizar el estado del cliente.'
        });
      }
    );
  }

  habilitarCliente(id: string, estado: boolean) {
    if (!estado) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No se pudo actualizar el estado del cliente.'
      });
      return; // Salir del método si el estado ya está false
    }
  
    // Si el estado es true, intentar actualizarlo
    this._adminService.actualizar_estado_cliente(id, estado, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Estado del cliente actualizado correctamente.'
        });
        this.ngOnInit();
        $('#enable-' + id).modal('hide');
      },
      error => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'No se pudo actualizar el estado del cliente.'
        });
      }
    );
  }
}
