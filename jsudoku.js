// From: https://dingo.sbs.arizona.edu/~sandiway/sudoku/examples.html
var originalBoard = [
     0,0,0,2,6,0,7,0,1
    ,6,8,0,0,7,0,0,9,0
    ,1,9,0,0,0,4,5,0,0
    ,8,2,0,1,0,0,0,4,0
    ,0,0,4,6,0,2,9,0,0
    ,0,5,0,0,0,3,0,2,8
    ,0,0,9,3,0,0,0,7,4
    ,0,4,0,0,5,0,0,3,6
    ,7,0,3,0,1,8,0,0,0
];

var board = originalBoard.slice();

function printBoard(board) {
    for (var i = 0; i < 9; i++) {
        console.log(i, getRow(i, board));
    }
}

function getOccurances(array, query) {
    return array.filter((e) => (e === query)).length;
}

// checks there are no duplicates in an array, where duplicate nulls are allowed
function checkNoDuplicates(array){
    for (i = 0; i < array.length; i++){
        if(array[i] != 0){
            if (getOccurances(array, array[i]) != 1){
                return false;
            }
        }
    }
    return true;
}

function getRow(rowNumber, board) {
    var rowNumber = rowNumber * 9;
    return board.slice(rowNumber, rowNumber + 9);
}

function checkRow(rowNumber, board){
    var row = getRow(rowNumber, board);
    return checkNoDuplicates(row);
}

function getColumn(colNumber, board){
    var column = [];
    for (i = 0; i < 9; i++){
        var row = getRow(i, board);
        column.push(row[colNumber]);
    }
    return column;
}

function checkColumn(colNumber, board){
    var column = getColumn(colNumber, board);
    return checkNoDuplicates(column);
}

// disgusting
function getSubgrid(gridNumber, board){
    var subGrid = [];

    var gridRows = [];

    if([0, 1, 2].includes(gridNumber)){
        gridRows.push(getRow(0, board));
        gridRows.push(getRow(1, board));
        gridRows.push(getRow(2, board));
    }
    if([3, 4, 5].includes(gridNumber)){
        gridRows.push(getRow(3, board));
        gridRows.push(getRow(4, board));
        gridRows.push(getRow(5, board));
    }
    if([6, 7, 8].includes(gridNumber)){
        gridRows.push(getRow(6, board));
        gridRows.push(getRow(7, board));
        gridRows.push(getRow(8, board));
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

function checkSubgrid(gridNumber, board){
    var subGrid = getSubgrid(gridNumber, board);
    return checkNoDuplicates(subGrid);
}

// returns true if the board is in a valid state
function checkBoard(board){
    for (var i = 0; i < 9; i++){
        if(!checkRow(i, board) || !checkColumn(i, board) || !checkSubgrid(i, board)){
            return false;
        }
    }
    return true;
}

function findEmpty(board) {
    for (var i = 0; i < board.length; i++){
        if (board[i] === 0){
            return i;
        }
    }
    return -1;
}

function solve(board){
    return false;
}

solve(board);
printBoard(board);