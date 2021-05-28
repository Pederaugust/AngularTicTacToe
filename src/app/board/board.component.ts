import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board: number[][];
  @Output() move = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  makeMove(i: number, j: number): void {
    this.move.emit([i, j]);
  }


}
