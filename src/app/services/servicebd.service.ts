import { Injectable } from '@angular/core';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  /// variable de conexion a la base de dato
  public database!: SQLiteObject

  //variables de creacion de tablas
  tablaNoticia:  string ="CREATE TABLE IF NOT EXISTS noticia(idnoticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL, texto TEXT NOT NULL);";
  constructor() { }
}
