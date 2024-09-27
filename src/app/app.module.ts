import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx'; ////agregar la carpeta ngx para que funcione la importacion de la libreria
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativeStorage, SQLite], /// instalar libreria native storage y sqlite
  bootstrap: [AppComponent],
})
export class AppModule {}
