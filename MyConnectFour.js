const rows = 7;
const columns = 7;
currPlayer = 1;
let endGame = false;

let boardMatrix = [
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*"],
  ["*", "*", "*", "*", "*", "*", "*"],
];

const togglePlayer = () => {
  /*if (currPlayer == 1) {
    return 2
  } else {
    return 1
  }*/
  //return (currPlayer === 1) ? 2 : 1
  /*!currPlayer = Boolean false
  Number(false)
  0 = false
  1 = true*/
  currPlayer = Number(!currPlayer);
};

const checkColumns = () => {
  boardMatrixTranspose = boardMatrix[0].map((_, colIndex) =>
    boardMatrix.map((row) => row[colIndex])
  );
  console.log(boardMatrixTranspose);
  return checkRows(boardMatrixTranspose);
};

const checkRows = () => {
  for (let i = 0; i < boardMatrix.length; i++) {
    let currentRow = boardMatrix[i];
    let totalX = 0;
    let totalY = 0;

    for (let j = 0; j < currentRow.length; j++) {
      if (totalX !== 0 && currentRow[j] !== "x") {
        totalX = 0;
      }

      if (totalY !== 0 && currentRow[j] !== "y") {
        totalY = 0;
      }

      if (currentRow[j] === "x") {
        totalX++;
      }
      if (currentRow[j] === "y") {
        totalY++;
      }
      if (totalX === 4 || totalY === 4) {
        return true;
      }
    }
  }
  return false;
};

const checkEndGame = () => {
  checkRows();
  //console.log(checkRows());
  checkColumns();
  console.log(checkColumns());
  /*checkLeftDiagnal();
  checkRighttDiagnal();*/
};

const updateBoard = (row, column) => {
  currPlayer
    ? (boardMatrix[row - 1][column] = "x")
    : (boardMatrix[row - 1][column] = "y");
};

function getAvailableRow(column) {
  for (let i = 6; i > 0; i--) {
    cell = boardMatrix[i - 1][column];
    if (cell == "*") {
      return i;
    }
  }
  /*for (let i = 0; i < 6; i++) {
    cell = boardMatrix[5 - i][column];
    if (cell == "*") {
      return 5 - i + 1;
    }
  }*/
  return null;
}

function dropPiece(row, column) {
  let board = document.getElementById("board");
  let divChildNodes = Array.from(board.childNodes).filter(
    (childNode) => childNode.tagName === "DIV"
  );
  let targetRow = divChildNodes[row];
  let targetCell = targetRow.childNodes[column];
  let circle = document.createElement("div");
  circle.classList.add("circle");
  currPlayer === 0 ? circle.classList.add("blue") : circle.classList.add("red");
  targetCell.appendChild(circle);

  updateBoard(row, column);
  checkEndGame();
  togglePlayer();
}

function addPiece(column) {
  let availableRow = getAvailableRow(column);
  dropPiece(availableRow, column);
}

function makeBoard() {
  const board = document.getElementById("board");
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < columns; j++) {
      if (i == 0) {
        let cellTop = document.createElement("div");
        cellTop.classList.add("cellTop");
        cellTop.setAttribute("id", j);
        cellTop.addEventListener("click", (event) => addPiece(event.target.id));
        row.append(cellTop);
      } else {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        row.append(cell);
      }
    }
    board.append(row);
  }
}

makeBoard();
