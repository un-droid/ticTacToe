import { Component, OnInit } from '@angular/core';
import { SettingsService } from "src/app/services/settings.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  gameStatus: string;
  hasWinner: boolean;
  winningCombinations = [
    [0, 1, 2], //row 1
    [3, 4, 5], //row 2
    [6, 7, 8], //row 3
    [0, 3, 6], //col 1
    [1, 4, 7], //col 2
    [2, 5, 8], //col 3
    [0, 4, 8], //diag 1
    [2, 4, 6] //diag 2
  ];
  constructor(private settings: SettingsService) { 

  }

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    //init new game
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = this.settings.getStatringPlayer();
    this.hasWinner = false;
    this.gameStatus = `Current Player: ${this.player}`;
    this.removeGlow();
  }

  resetScore(){
    this.settings.resetScore();
  }

  makeMove(index: number){
    //dont make more moves if there's a winner
    if(!this.hasWinner){
      //check whether the square is clicked, if it is, dont do anything
      if(!this.squares[index]){
        //if its empty, add the current player (X or O) to the square
        this.squares.splice(index, 1, this.player);
        this.xIsNext = !this.xIsNext;
        this.gameStatus = `Current Player: ${this.player}`;
      }
      setTimeout(()=>{
        this.winner = this.calculateWinner();
      },0);
      if(!this.winner && this.squares.every(sqr => sqr != null)){
        //if winner is null all cells are filled its a draw
        this.gameStatus = `Draw!`;
      }
    }
  }

  calculateWinner() {
    
    for (let i = 0; i < this.winningCombinations.length; i++) {
      //a b c are the currents row squares
      const [a, b, c] = this.winningCombinations[i];
      if (this.squares[a] && this.squares[a] === this.squares[b] 
          && this.squares[a] === this.squares[c]) {
            this.hasWinner = true;
            this.gameStatus = `Player ${this.squares[a]} has won!`;
            let gameSquares = document.querySelectorAll('.game-square');
            //add to the winning squares a class
            gameSquares[a].firstElementChild.classList.add("glow");
            gameSquares[b].firstElementChild.classList.add("glow");
            gameSquares[c].firstElementChild.classList.add("glow");
            this.settings.incScore(this.squares[a]);
            return this.squares[a];
      }
    }
    return null;
  }

  get player(){
    return this.xIsNext ? "X" : "O";
  }

  removeGlow(){
    let glowing = document.querySelectorAll('glow');
    glowing.forEach(button => {
      button.classList.remove("glow");
    });
  }
  
  /*
    ideas:
    - dark mode
    - settings
    - starting shape
  */
}
