import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {Base} from './base.service';
import {HttpClient} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent} from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Base, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
