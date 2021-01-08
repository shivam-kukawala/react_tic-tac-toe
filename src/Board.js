import React from 'react';

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
      };
    }
  
    handleClick(i) {
      var doubled = Array(9);  
      var left = Array();
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      if(this.state.xIsNext === false){
        doubled = squares.map((e,index) => e === "X" || e === "O" ? 0 : index);
         left = doubled.filter(e => e!== 0); 
  
         var randomItem = left[Math.floor(Math.random()*left.length)];
        console.log(randomItem);
        squares[randomItem] = 'O';

      }
      else{
        squares[i] = 'X' ;
      }      
      
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });                                            
    }
  
    renderSquare(i) {
      return (
        <Square
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
        />
      );
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      var tie = tied(this.state.squares);
      let status;
      
      if (winner) {
        status = 'Winner: ' + winner;
      }
       else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        var tie = tied(this.state.squares);
        console.log(tie);
        if(tie === true){
            status = "Match Tied";
        }
        if (this.state.xIsNext === false) {
            this.handleClick();
            
        }
      }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function tied(squares){
    var count = 0;

      console.log(squares);
      console.log(count);
      for(let j =0; j<=squares.length; j++){
          if(squares[j] === null ){
              count++;
              console.log(count);
              
          }
          
        }


    if(count == 0){
        return true;
    }

  }

  export default Board;