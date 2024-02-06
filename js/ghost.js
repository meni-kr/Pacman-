'use strict'

const GHOST = '👻'
var gGhosts = []
var gNextId = 0
var gIntervalGhosts
var gDeadGhosts = []

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        id: gNextId++,
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    //figure out move
    const moveDiff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // DONE: return if cannot move
    if (nextCell === WALL)return
    if (nextCell === GHOST)return
    if (nextCell === SUPER_FOOD)return

    if (nextCell === PACMAN) {
        if(gPacman.isSuper)return
        gameOver()
        return
    }

    // moving from current location:
    // update the model 
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    //update the DOM
    renderCell(ghost.location, ghost.currCellContent)
    //Move the ghost to new location:
    //update the model 
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[nextLocation.i][nextLocation.j] = GHOST
    // DONE: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
    ghostColor(ghost)    
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)
    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function ghostColor(ghost) {
    if(gPacman.isSuper){
        const elGhostColor = document.querySelector(`.cell-${ghost.location.i}-${ghost.location.j} span`)
    elGhostColor.style.backgroundColor = 'blue'
    }else{
      const elGhostColor = document.querySelector(`.cell-${ghost.location.i}-${ghost.location.j} span`)
    elGhostColor.style.backgroundColor = ghost.color  
    }
}

function getGhostHTML(ghost) {
    return `<span class="${ghost.id}">${GHOST}</span>`
}

function removeGhostByLocation(location){
    
    for(var i = 0; i < gGhosts.length;i++){
        if(gGhosts[i].location.i===location.i && gGhosts[i].location.j===location.j){
            gDeadGhosts.push(gGhosts[i])
            gGhosts.splice(i,1)
        }
    }
}