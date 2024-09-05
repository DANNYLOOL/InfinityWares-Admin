import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { NgForm } from '@angular/forms';
declare var iziToast: any;

@Component({
  selector: 'app-create-admins',
  templateUrl: './create-admins.component.html',
  styleUrls: ['./create-admins.component.css']
})
export class CreateAdminsComponent implements OnInit {

  public admin: any = {
    nombres: '',
    apellidos: '',
    email: '',
    password: ''
  };
  public load_btn = false;
  public token = localStorage.getItem('token');

  constructor(
    private _adminService: AdminService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Puedes agregar lógica aquí si es necesario.
  }

  registro(registroForm: NgForm) {
    if (registroForm.valid) {
      this.load_btn = true;

      this._adminService.registro_admin_tienda(this.admin, this.token).subscribe(
        response => {
          if (response.data == undefined) {
            iziToast.show({
              title: 'ERROR',
              titleColor: '#FF0000',
              color: '#FFF',
              class: 'text-danger',
              position: 'topRight',
              message: response.message
            });
            this.load_btn = false;
          } else {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'Se registró correctamente el nuevo admin.'
            });
            this.load_btn = false;
            this._router.navigate(['/admins']);
          }
        },
        error => {
          this.load_btn = false;
          iziToast.show({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            class: 'text-danger',
            position: 'topRight',
            message: 'Ocurrió un error en el servidor'
          });
        }
      );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son válidos'
      });
    }
  }
}
