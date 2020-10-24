import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class SettingsService {
    currentScore: string;
    scoreUpdated: Subject<string> = new Subject<string>();
    constructor(){
        this.scoreUpdated.subscribe((value) => {
            this.currentScore = value;
        });
    }
    private isXStartingParam: boolean;
    private xScore: number = 0;
    private oScore: number = 0;

    isXStatring(value: boolean){
        this.isXStartingParam = value;
    }
    getStatringPlayer(){
        return this.isXStartingParam;
    }

    getScore(){
        return `X   ${this.xScore} - ${this.oScore}   O`;
    }

    resetScore(){
        this.xScore = 0;
        this.oScore = 0;
        this.scoreUpdated.next(`X   ${this.xScore} - ${this.oScore}   O`);
    }

    incScore(winner){
        if(winner.toLocaleLowerCase() === "x"){
            this.xScore++;
        }else{
            this.oScore++;
        }
        this.scoreUpdated.next(`X   ${this.xScore} - ${this.oScore}   O`);
    }
}