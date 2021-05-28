import { Component, Input, OnInit } from '@angular/core';

enum Field {
  Blank,
  X,
  O
}

interface Score {
  x: number,
  o: number
}


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  board: number[][] = [[0,0,0], [0,0,0], [0,0,0]];
  done: boolean = false;
  turn: number = 1;
  winner: number = 0;
  tied: boolean = false;
  score: Score = {x: 0, o: 0}
  beginner: Field = Field.X;

  constructor() { }

  ngOnInit(): void {
  }

  newGame(): void{
    this.board = [[0,0,0], [0,0,0], [0,0,0]];
    this.winner = 0;
    this.done = false;
    this.tied = false;
    this.beginner = this.beginner == Field.X ? Field.O : Field.X;
    this.turn = this.beginner;
  }

  resetGame(): void {
    this.newGame();
    this.score = {x: 0, o: 0};
  }

  makeMove([i, j]: number[]) {
    if (!this.done && this.board[i][j] == Field.Blank) {
      this.board[i][j] = this.turn;
      this.checkWinner();
      this.setTurn();
    }
  }

 setScore(direction: any, field: Field) {
    switch (field) {
      case Field.O:
        direction['o']++;
        break;
      case Field.X:
        direction['x']++;
        break;
    }
  }

  isWinner(field: string, h: any, v: any, d: any, ad: any): boolean {
    return h[field] > 2 || v[field] > 2 || d[field] > 2 || ad[field] > 2;
  }

  checkWinner(): void {
    let diagonal = {'x': 0, 'o': 0};
    let antiDiagonal = {'x': 0, 'o': 0};
    let filled = true;

    for (let row = 0; row < this.board.length; row++) {

      let horizontal = {'x': 0, 'o': 0};
      let vertical = {'x': 0, 'o': 0};

      for (let column = 0; column < this.board[row].length; column++) {

        this.setScore(horizontal, this.board[row][column]);
        this.setScore(vertical, this.board[column][row]);

        if (row === column) {
          this.setScore(diagonal, this.board[row][column]);
        }

        if (row + column == this.board.length - 1) {
          this.setScore(antiDiagonal, this.board[row][column]);
        }
        if (this.board[row][column] == Field.Blank) {
          filled = false;
        }
      }

      if (this.isWinner('x', horizontal, vertical, diagonal, antiDiagonal)) {
        this.winner = Field.X;
        this.done = true;
        this.score.x++;
      }
      if (this.isWinner('o', horizontal, vertical, diagonal, antiDiagonal)) {
        this.winner = Field.O;
        this.done = true;
        this.score.o++;
      }
      if (filled) {
        this.done = true;
        this.tied = true;
      }
    }
  }

  setTurn(): void {
    if (this.turn === 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }
  }

}
