import { Component, OnInit } from '@angular/core';
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public playersList = ["X", "O"];
  public startingSelectedPlayer: string;
  constructor(private settings: SettingsService) {
    //getStatringPlayer returns a boolen whether X is starting first, so logic accordingly
    this.startingSelectedPlayer = settings.getStatringPlayer() ? "X" : "O";
   }

  ngOnInit(): void {
  }

  onPlayerChange(value){
    //if 
    this.settings.isXStatring(value === "X" ? true : false);
  }

}
