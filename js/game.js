'use strict'

const WALL = '🧱'
const FOOD = '🍭'
const EMPTY = ' '
const SUPER_FOOD = '🥩'
const CHERRY = '🍒'
var gIntervalCherry
var gVictory 

const gGame = {
    score: 0,
    isOn: false
}
var gBoard

function onInit() {
    gVictory = false
    updateScore(0)
    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)
    onCloseModal()
    gGame.isOn = true
    gIntervalCherry = setInterval(renderCharry,6000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPER_FOOD
    board[1][8] = SUPER_FOOD
    board[8][1] = SUPER_FOOD
    board[8][8] = SUPER_FOOD
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function renderCharry(){
    if(!getEmptyPos())return
    const currEmptyCell = getEmptyPos()
    gBoard[currEmptyCell.i][currEmptyCell.j] = CHERRY
   const elCell = document.querySelector(`.cell-${currEmptyCell.i}-${currEmptyCell.j}`)
   elCell.innerText = CHERRY
}

function updateScore(diff) {
    // DONE: update model and dom
    if (!diff) {
        gGame.score = 0
    } else {
        console.log('gGame.score:', diff)
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function onVictory(){
    if(gVictory){
        clearInterval(gIntervalGhosts)
        clearInterval(gIntervalCherry)
        onOpenVictoryModal()
        gGame.isOn = false
    }
}

function checkVictory(){
    for(var i = 0;i<gBoard.length;i++){
        for(var j = 0;j<gBoard[i].length;j++){
            if(gBoard[i][j]===FOOD)return
        }
    }
    gVictory = true
}

function gameOver() {
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry)
    renderCell(gPacman.location, '🪦')
    onOpenDefeatModal()
    gGame.isOn = false
}

function onOpenVictoryModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    elModal.style.backgroundColor = 'green'
   const elH3 = document.querySelector('.modal h3')
   elH3.innerText = 'VICTORY!!!'
}

function onOpenDefeatModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    elModal.style.backgroundColor = 'red'
    const elH3 = document.querySelector('.modal h3')
    elH3.innerText = 'DEFEATED!!!\nGame Over!'
}

function onCloseModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}