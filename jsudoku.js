var originalBoard = [
      ,1, ,4, ,8, ,2,9
    , , , , , , , , ,4
    ,8,5, , ,2, , , ,7
    , , ,8,3,7,4,2, ,
    , ,2, , , , , , ,
    , , ,3,2,6,1,7, ,
    , , , , ,9,3,6,1,2
    ,2, , , , , ,4, ,3
    ,1,3, ,6,4,2, ,7,undefined
];

var board = originalBoard.slice();

function printBoard() {
    for (var i = 0; i < 9; i++) {
        console.log(i, getRow(i));
    }
}

function getOccurances(array, query) {
    return array.filter((e) => (e === query)).length;
}

function getRow(rowNumber) {
    var rowNumber = rowNumber * 9;
    return board.slice(rowNumber, rowNumber + 9);
}

function checkRow(rowNumber){
    var row = getRow(rowNumber);
    for (i = 0; i < row.length; i++){
        if(row[i] != null){
            if (getOccurances(row, row[i]) != 1){
                return false;
            }
        }
    }
    return true;
}

function getColumn(colNumber){
    var column = [];
    for (i = 0; i < 9; i++){
        var row = getRow(i);
        column.push(row[colNumber]);
    }
    return column;
}

function checkColumn(colNumber){
    var column = getColumn(colNumber);
    for (i = 0; i < column.length; i++){
        if(column[i] != null){
            if (getOccurances(column, column[i]) != 1){
                return false;
            }
        }
    }
    return true;
}

// disgusting
function getSubgrid(gridNumber){
    var subGrid = [];

    var gridRows = [];

    if([0, 1, 2].includes(gridNumber)){
        gridRows.push(getRow(0));
        gridRows.push(getRow(1));
        gridRows.push(getRow(2));
    }
    if([3, 4, 5].includes(gridNumber)){
        gridRows.push(getRow(3));
        gridRows.push(getRow(4));
        gridRows.push(getRow(5));
    }
    if([6, 7, 8].includes(gridNumber)){
        gridRows.push(getRow(6));
        gridRows.push(getRow(7));
        gridRows.push(getRow(8));
    }

    if([0, 3, 6].includes(gridNumber)){
        for(var i = 0; i < gridRows.length; i++){
            gridRows[i].slice(0, 3).forEach((e) => subGrid.push(e));
        }
    }
    if([1, 4, 7].includes(gridNumber)){
        for(var i = 0; i < gridRows.length; i++){
            gridRows[i].slice(3, 6).forEach((e) => subGrid.push(e));
        }
    }
    if([2, 5, 8].includes(gridNumber)){
        for(var i = 0; i < gridRows.length; i++){
            gridRows[i].slice(6, 9).forEach((e) => subGrid.push(e));
        }
    }
    return subGrid;
}

function checkSubgrid(gridNumber){
    var subGrid = getSubgrid(gridNumber);
    for (i = 0; i < subGrid.length; i++){
        if(subGrid[i] != null){
            if (getOccurances(subGrid, subGrid[i]) != 1){
                return false;
            }
        }
    }
    return true;
}

// returns true if the board is in a valid state
function checkBoard(){
    for (var i = 0; i < 9; i++){
        if(!checkRow(i) || !checkColumn(i) || !checkSubgrid(i)){
            return false;
        }
    }
    return true;
}

function insertValue(value, columnNumber, rowNumber){
    // we will add a check to ensure this isn't overriding the initial board
    if(originalBoard[(9 * columnNumber) + rowNumber] === undefined){
        board[9 * columnNumber + rowNumber] = value;
        return true;
    }
    return false;
}