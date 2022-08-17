import React, {useEffect, useState} from 'react';
import BlackPawn from './chessPieces/BlackPawn.png';
import BlackRook from './chessPieces/BlackRook.png';
import BlackKnight from './chessPieces/BlackKnight.png';
import BlackBishop from './chessPieces/BlackBishop.png';
import BlackQueen from './chessPieces/BlackQueen.png';
import BlackKing from './chessPieces/BlackKing.png';
import WhitePawn from './chessPieces/WhitePawn.png';
import WhiteRook from './chessPieces/WhiteRook.png';
import WhiteKnight from './chessPieces/WhiteKnight.png';
import WhiteBishop from './chessPieces/WhiteBishop.png';
import WhiteQueen from './chessPieces/WhiteQueen.png';
import WhiteKing from './chessPieces/WhiteKing.png';

export default function Chess () {
  //constants
  const tileSize = '70';
  const tileColorOne = 'peru';
  const tileColorTwo = 'white';
  const pieceColorOne = 'white';
  const pieceColorTwo = 'black';
  const legalMoveColor = 'lightgreen'
  const [chessBoard, setChessBoard] = useState([]);
  //increment every time a move is made, purpose is so white goes first
  const [moveCount, setMoveCount] = useState(0);
  useEffect(() => {
    initialBoard();
    // eslint-disable-next-line
  }, []);

  const initialBoard = () => {
    var tempBoard = [];
    const determineColumn = (tile) => {
      return ;
    }
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
      let tile = {
        //terrible algorithm, but it is amazing and works
        color: (i + j) % 2 === 0 ? tileColorOne : tileColorTwo,
        xPosition: j * tileSize,
        yPosition: i * tileSize,
        column: j,
        row: i
      }
      tempBoard.push(tile);
    }
  }
    arrangePieces(tempBoard);
    setChessBoard(tempBoard);
  }

  const arrangePieces = (tempBoard) => {
    for(let i = 0; i < 64; i++){
      let piece = {
        color: i < 16 ? pieceColorTwo : pieceColorOne,
        name: determinePiece(i),
        isMarkedToMove: false
      }
      tempBoard[i].piece = piece;
      if(i === 15)
        i += 32;
    }
  }
  //initial pieces
  const determinePiece = (tile) => {
    if(tile === 0 || tile === 7 || tile === 56 || tile === 63)
      return 'rook';
    if(tile === 1 || tile === 6 || tile === 57 || tile === 62)
      return 'knight';
    if(tile === 2 || tile === 5 || tile === 58 || tile === 61)
      return 'bishop';
    if(tile === 3 || tile === 59)
      return 'queen';
    if(tile === 4 || tile === 60)
      return 'king';
    else return 'pawn';
  }
  //returns the image of the proper piece
  const findPieceImage = (piece) => {
    //black pieces
    if(piece.color === pieceColorTwo){
      if(piece.name === 'pawn')
        return BlackPawn;
      if(piece.name === 'rook')
        return BlackRook;
      if(piece.name === 'knight')
        return BlackKnight;
      if(piece.name === 'bishop')
        return BlackBishop;
      if(piece.name === 'queen')
        return BlackQueen;
      return BlackKing;
    }
    //white pieces
    if(piece.color === pieceColorOne){
      if(piece.name === 'pawn')
        return WhitePawn;
      if(piece.name === 'rook')
        return WhiteRook;
      if(piece.name === 'knight')
        return WhiteKnight;
      if(piece.name === 'bishop')
        return WhiteBishop;
      if(piece.name === 'queen')
        return WhiteQueen;
      return WhiteKing;
    }
  }
  
  const onPieceClick = (tileWithPiece) => {
    if(determineLegalMoves(tileWithPiece)){
      setChessBoard(determineLegalMoves(tileWithPiece));
    }
  }

  const determineLegalMoves = (tileWithPiece) => {
    if(tileWithPiece.color === legalMoveColor)
      return;
    //reset the colors and reset isMarkedForDelete prop
    setOriginalTileColors();
    //Alternate who's turn it is starting with white
    if(tileWithPiece.piece.color === pieceColorTwo && moveCount % 2 === 0)
     return;
    if(tileWithPiece.piece.color === pieceColorOne && moveCount % 2 === 1)
      return;
    let tempBoard = chessBoard.filter(tile => {
      return true;
    })
    //So the program knows which piece to move
    tileWithPiece.piece.isMarkedToMove = true;
    determineLegalMovesByPiece(tileWithPiece, tempBoard);
    return tempBoard;
  }

   //After legal moves stop being displayed, go back to original board colors
   const setOriginalTileColors = () => {
    let tempBoard = chessBoard.filter(tile => {
      return true;
    })
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        tempBoard[(i * 8) + j].color = (i + j) % 2 === 0 ? tileColorOne : tileColorTwo;
        if(tempBoard[i * 8 + j].piece){
          tempBoard[i * 8 + j].piece.isMarkedToMove = false;
        }
      }
    }
    return tempBoard;
  }
  
  const determineLegalMovesByPiece = (tileWithPiece, tempBoard) => {
    let row = tileWithPiece.row;
    let column = tileWithPiece.column;
    let pieceColor = tileWithPiece.piece.color;

    switch(tileWithPiece.piece.name){
      case 'pawn': 
        determineLegalPawnMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
      case 'rook':
        determineLegalRookMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
      case 'bishop':
        determineLegalBishopMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
      case 'knight':
        determineLegalKnightMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
      //a queen is a combination of a rook and a bishop
      case 'queen':
        determineLegalRookMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        determineLegalBishopMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
      case 'king':
        determineLegalKingMoves(tileWithPiece, tempBoard, row, column, pieceColor);
        break;
  }
  }

  const determineLegalPawnMoves = (tileWithPiece, tempBoard, row, column, pieceColor) => {
    const determineColorTwoCornerMove = (tile) => {
      //if there's no piece here, return 
      if(!tile.piece || tile.piece.color === pieceColor)
        return;
      if((tile.column === column - 1 || tile.column === column + 1 ) && tile.row === row + 1){
        tile.color = legalMoveColor;
      }
    }
    const determineColorOneCornerMove = (tile) => {
      //if there's no piece here, return 
      if(!tile.piece || tile.piece.color === pieceColor)
        return;
      if((tile.column === column - 1 || tile.column === column + 1) && tile.row === row - 1){
        tile.color = legalMoveColor;
      }
    }
    if(pieceColor === pieceColorOne){
      if(row === 6){
        tempBoard.map(tile => {
          if(tile.column === column && tile.piece == null  && (tile.row === row - 1 || tile.row === row - 2)){
            tile.color = legalMoveColor;
          }
          determineColorOneCornerMove(tile);
        })
      }else{
        tempBoard.map(tile => {
          if(tile.column === column && tile.piece == null  && (tile.row === row - 1)){
            tile.color = legalMoveColor;
          }
          determineColorOneCornerMove(tile);
        })
      }
    }
    if(pieceColor === pieceColorTwo){
      if(row === 1){
        tempBoard.map(tile => {
          if(tile.column === column && tile.piece == null && (tile.row === row + 1 || tile.row === row + 2)){
            tile.color = legalMoveColor;
          }
          determineColorTwoCornerMove(tile);
        })
      }else{
        tempBoard.map(tile => {
          if(tile.column === column && tile.piece == null  && (tile.row === row + 1)){
            tile.color = legalMoveColor;
          }
          determineColorTwoCornerMove(tile);
        })
      }
    }
    return;
  }
  
  const determineLegalRookMoves = (tileWithPiece, tempBoard, row, column, pieceColor) => {
    //variables to not allow tiles to be marked as a legal move when a piece is blocking it
    let keepGoingUp = true;
    let keepGoingDown = true;
    let keepGoingLeft = true;
    let keepGoingRight = true;
    //every iteration goes 1 tile out from the piece in all 4 directions
    for(let i = 1; i < 8; i++){
      tempBoard.map(tile => {
        if(keepGoingUp && tile.column === column && tile.row === row - i ){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }
          else{
            keepGoingUp = false;
            if(tile.piece.color !== pieceColor)
              tile.color = legalMoveColor;
          }
        }
        if(keepGoingDown && tile.column === column && tile.row === row + i ){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }
          else{
            keepGoingDown = false;
            if(tile.piece.color !== pieceColor)
              tile.color = legalMoveColor;
          }
        }
        if(keepGoingLeft && tile.row === row && tile.column === column - i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }
          else{
            keepGoingLeft = false;
            if(tile.piece.color !== pieceColor)
              tile.color = legalMoveColor;
          }
        }
        if(keepGoingRight && tile.row === row && tile.column === column + i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }
          else{
            keepGoingRight = false;
            if(tile.piece.color !== pieceColor)
              tile.color = legalMoveColor;
          }
        }
      })
    }
  }

  const determineLegalBishopMoves = (tileWithPiece, tempBoard, row, column, pieceColor) => {
    let lastRowUp = row;
    let lastRowDown = row;
    let lastColumnLeft = column;
    let lastColumnRight = column;
    let keepGoingNorthWest = true;
    let keepGoingNorthEast = true;
    let keepGoingSouthWest = true;
    let keepGoingSouthEast = true;
    for(let i = 1; i < 8; i++){
      tempBoard.map(tile => {
        if(keepGoingNorthWest && tile.row === row - i && tile.column === column - i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }else{
            keepGoingNorthWest = false;
            if(tile.piece.color !== pieceColor){
              tile.color = legalMoveColor;
            }
          }
        }
        if(keepGoingNorthEast && tile.row === row - i && tile.column === column + i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }else{
            keepGoingNorthEast = false;
            if(tile.piece.color !== pieceColor){
              tile.color = legalMoveColor;
            }
          }
        }
        if(keepGoingSouthEast && tile.row === row + i && tile.column === column - i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }else{
            keepGoingSouthEast = false;
            if(tile.piece.color !== pieceColor){
              tile.color = legalMoveColor;
            }
          }
        }
        if(keepGoingSouthWest && tile.row === row + i && tile.column === column + i){
          if(!tile.piece){
            tile.color = legalMoveColor;
          }else{
            keepGoingSouthWest = false;
            if(tile.piece.color !== pieceColor){
              tile.color = legalMoveColor;
            }
          }
        }
      })
    }
  }

  const determineLegalKnightMoves = (tileWithPiece, tempBoard, row, column, pieceColor) => {
    tempBoard.map(tile => {
      //check the 8 knight tiles
      if((tile.row === row + 1 && tile.column === column - 2) || (tile.row === row + 2  && tile.column === column - 1) ||
        (tile.row === row + 2 && tile.column === column + 1) || (tile.row === row + 1 && tile.column === column + 2) ||
        (tile.row === row - 1 && tile.column === column + 2) || (tile.row === row - 2 && tile.column === column + 1) ||
        (tile.row === row - 2 && tile.column === column - 1) || (tile.row === row - 1 && tile.column === column - 2)){
          if(!tile.piece || tile.piece.color != pieceColor)
            tile.color = legalMoveColor;
        }
    })
  }

  const determineLegalKingMoves = (tileWithPiece, tempBoard, row, column, pieceColor) => {
    tempBoard.map(tile => {
      if(tile.row === row - 1 && (tile.column === column - 1 || tile.column === column || tile.column === column + 1)){
        if(!tile.piece || tile.piece.color != pieceColor){
          tile.color = legalMoveColor;
        }
      }
      else if(tile.row === row && (tile.column === column - 1 || tile.column === column + 1)){
        if(!tile.piece || tile.piece.color != pieceColor)
          tile.color = legalMoveColor;
      }
      else if(tile.row === row + 1 && (tile.column === column - 1 || tile.column === column || tile.column === column + 1)){
        if(!tile.piece || tile.piece.color != pieceColor)
          tile.color = legalMoveColor;
      }   
    })
  }

  const checkLegalByKing = (board) => {
    let piece = tileWithPiece.piece;
    let boardCopy = JSON.parse(JSON.stringify(board));
    boardCopy.map(tile => {
      if(tile.column === tileMovingTo.column && tile.row === tileMovingTo.row){
        tile.piece = tileWithPiece.piece;
      }
      if(tile.column === tileWithPiece.column && tile.row === tileWithPiece.row){
        tile.piece = null;
      }
    }).then(boardCopy.map(tile => {
      if(tile.piece && tile.piece.color !== piece.color){
        determineLegalMovesByPiece(piece, board);
      }
    }))
  }

  //logic of moving a piece
  const movePiece = (tileMovingTo) => {
    if(tileMovingTo.color !== legalMoveColor)
      return;
    setMoveCount(moveCount + 1);
    //set new tile.piece to the piece being moved
    //set old tile.piece to null
    //reset tile colors
    let row = tileMovingTo.row;
    let column = tileMovingTo.column;
    let piece = null;
    let tempBoard = chessBoard.filter(tile => {return true;})
    tempBoard.map(tile => {
      if(tile.piece && tile.piece.isMarkedToMove === true){
        piece = tile.piece;
        tile.piece = null; 
        piece.isMarkedToMove = false;
      }
    })
    tempBoard.map(tile => {
      if(tile.row === row && tile.column === column){
        tile.piece = piece;  
      }
    })
    setChessBoard(tempBoard);
    setOriginalTileColors();
  }

  const pointAtGreenTiles = (tile) => {
    if(tile.color === legalMoveColor)
      return 'pointer';
    else return;
  }

  return (<div>
    {moveCount % 2 === 0 ? <div style={{marginRight:'90%'}}>{pieceColorOne} to move</div> : <div style={{marginRight:'90%'}}>{pieceColorTwo} to move</div>}
    <div style={{position:'absolute', left: '50px', top:'100px', height:'560px', width:'560px', borderRadius:'5px'}}>
    {chessBoard.map(tile => {
        return <div onClick={() => {movePiece(tile)}} style={{backgroundColor: tile.color, height: tileSize + 'px', width: tileSize + 'px', 
        position:'absolute', top: tile.yPosition +'px', left: tile.xPosition + 'px', border: '2px solid black', cursor: pointAtGreenTiles(tile)}}>
          {tile.piece && <div><img class='piece' style={{height:'66px', width:'66px', position:'relative', 
            top:'2px', left:'-1px', cursor:'pointer', userSelect:'none'}} src={findPieceImage(tile.piece) } onClick={() => {onPieceClick(tile)}}/></div>}
          
         </div>
         
    })}
    </div>
</div>);
}