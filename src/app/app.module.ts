import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: "settings", component: SettingsComponent},
      { path: "gameBoard", component: BoardComponent},
      { path: "", redirectTo:"gameBoard", pathMatch: "full"}, //default path
      { path: "**", redirectTo:"gameBoard", pathMatch: "full"}, //in case non existant path
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
