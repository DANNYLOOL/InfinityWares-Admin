import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast:any;
declare var $:any;

@Component({
  selector: 'app-index-admins',
  templateUrl: './index-admins.component.html',
  styleUrls: ['./index-admins.component.css']
})
export class IndexAdminsComponent implements OnInit {

  public admins :Array<any>= [];
  public admins_const  :Array<any>= [];
  public token = localStorage.getItem('token');
  public page = 1;
  public pageSize = 24;
  public filtro = '';
  constructor(
    private _adminService:AdminService
  ) { }

  ngOnInit(): void {
    this._adminService.listar_admins_tienda(this.token).subscribe(
      response=>{
        console.log(response);
        
        this.admins_const = response.data;
        this.admins= this.admins_const;
      }
    );
  }

  filtrar_admin(){
    if(this.filtro){
      var term = new RegExp(this.filtro.toString().trim() , 'i');
      this.admins = this.admins_const.filter(item=>term.test(item.nombres)||term.test(item.apellidos)||term.test(item.email)||term.test(item._id));
    }else{
      this.admins = this.admins_const;
    }
  }

  inhabilitarAdmin(id: string, estado: boolean) {
    if (estado) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No se pudo actualizar el estado del admin.'
      });
      return;
    }
  
    this._adminService.actualizar_estado_admin(id, estado, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Estado del admin actualizado correctamente.'
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

  habilitarAdmin(id: string, estado: boolean) {
    if (!estado) {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'No se pudo actualizar el estado del admin.'
      });
      return;
    }
  
    this._adminService.actualizar_estado_admin(id, estado, this.token).subscribe(
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
