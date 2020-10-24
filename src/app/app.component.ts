import { Component, OnInit } from '@angular/core';
import { SettingsService } from "./services/settings.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public score: string="";
  constructor(private settings: SettingsService){
    //default value to start with
    settings.isXStatring(true);
  }
  ngOnInit(): void {
    this.score = this.settings.getScore();

    this.settings.scoreUpdated.subscribe(updatedScore => {
        this.score = updatedScore;
    });
  }

}
