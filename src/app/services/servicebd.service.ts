import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticias } from './noticias';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  /// variable de conexion a la base de dato
  public database!: SQLiteObject

  //variables de creacion de tablas
  tablaNoticia:  string ="CREATE TABLE IF NOT EXISTS noticia(idnoticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL, texto TEXT NOT NULL);";


  //variables de insert por defecto en la base de datos 
  registronoticia: string="INSERT or IGNORE INTO noticia (idnoticia, titulo, texto) VALUES (1, 'Soy el titulo de una noticia', 'Soy el contenido completo de la noticia insertada por defecto')";

  //variables para guardar los registros resultantes de un select
  listadoNoticias = new BehaviorSubject([]); ///"[]" indica que tenga mas de un registro

  ///variable para manipular el estado de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) { 
    this.crearBD(); ///apenas se llame al servicio automaticamente se cree la BD
  }///platform libreria para verificar si la plataforma del dispisitivo esta lista, proceda a ejecutar

  ///funciones de retorno observables
  fetchNoticias(): Observable<Noticias[]>{
    return this.listadoNoticias.asObservable();
  }
  dbState(){
    return this.isDBReady.asObservable();
  }
  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //// primer paso crear la conexion
  crearBD(){
    ///verificar la plataforma
    this.platform.ready().then(()=>{
        //procedemos a crear la bd
        this.sqlite.create({
          name: 'noticias.db', ///se declara el nombre pero siempre.db para declarar que esa es la extension
          location: 'default'
        }).then((db: SQLiteObject)=>{
          ///capturar y guardar la conexion a la base de datos
          this.database = db;
          //llamar a la funcion de creacion de tablas



          //modificar el obersable del status de la base de datos
          this.isDBReady.next(true);
        }).catch(e=>{
          this.presentAlert("Creacion de BD", "Error creando la BD: " + JSON.stringify (e));
        })
    })
  }
  async crearTablas(){
    try{
        //mandar a ejecutar las tablas en el orden especifico
        await this.database.executeSql(this.tablaNoticia,[])///repetir segun la cantidad de tablas

        //generamos los insert en caso de que existan
        await this.database.executeSql(this.registronoticia,[])//repetir por cada insert
    }catch(e){
      this.presentAlert("Creacion de tablas", "Error creando las tablas: " + JSON.stringify (e));
    }
  }
}
