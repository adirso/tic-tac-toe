var game;

function init() {
    game = {
        player0: 'X',
        player1: 'O',
        nowPlaying: 0,
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ],
        finished: false
    };

    resetClientBoard();
}

function clickedOnCell(row, col) {
    if (game.finished || game.board[row][col] != null) {
        return;
    }

    game.board[row][col] = game['player' + getPlayer()];
    document.getElementById(row.toString() + col.toString()).innerText = game.board[row][col];

    if (isWon(row, col)) {
        game.finished = true;
        alert(game['player' + getPlayer()] + " is Won")
    }

    game.nowPlaying++;
}

function getPlayer() {
    return game.nowPlaying % 2;
}

function isWon(row, col) {
    return checkRowWinning(row) || checkColWinning(col) || checkRightSlantWinning(row, col) || checkLeftSlantWinning(row, col);
}

function checkRowWinning(row) {
    return ((game.board[row][0] == game.board[row][1]) && (game.board[row][1] == game.board[row][2]));
}

function checkColWinning(col) {
    return ((game.board[0][col] == game.board[1][col]) && (game.board[1][col] == game.board[2][col]));
}

function checkRightSlantWinning(row, col) {
    return ((game.board[0][0] == game.board[1][1]) && (game.board[1][1] == game.board[2][2]) && (row == col));
}

function checkLeftSlantWinning(row, col) {
    return ((game.board[0][2] == game.board[1][1]) && (game.board[1][1] == game.board[2][0]) && (col + row == 2));
}

function resetClientBoard() {
    game.board.forEach(function (rowItem, row) {
        rowItem.forEach(function (colItem, col) {
            document.getElementById(row.toString() + col.toString()).innerText = "";
        });
    })
}

init();