import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloNoticias: any = [
    {
      id:'',
      titulo: '',
      texto: ''
    }
  ]
  router: any;
  constructor(private bd: ServicebdService) { }

  ngOnInit() {
    //verifico si la base de datos esta disponible
    this.bd.dbState().subscribe(data=>{
      if(data){
        //subscribir al observable de la consulta
        this.bd.fetchNoticias().subscribe(res=>{
          this.arregloNoticias = res;
        })
      }
    })
  }

  modificar(x:any){
    let navigationExtras: NavigationExtras = {
      state: {
        noticiaEnviada: x
      }
    }
    this.router.navigate(['/modificar'],navigationExtras);
  }

  eliminar(x:any){
    this.bd.eliminarNoticia(x.idnoticia);
  }
  agregar(){
    this.
  }
}
