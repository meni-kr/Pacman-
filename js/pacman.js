'use strict'

const PACMAN = '😀'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    checkVictory()
    onVictory()
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            removeGhostByLocation(nextLocation)
        } else {
            gameOver()
            return
        }
    }
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return
        gPacman.isSuper = true
        gDeadGhosts = []
        setTimeout(() => {
            gPacman.isSuper = false
            gGhosts = gGhosts.concat(gDeadGhosts)
        }, 5000)
    }
    if (nextCell === FOOD){
        updateScore(1) 
        // checkVictory()
        // onVictory() 
    } 
    if (nextCell === CHERRY) updateScore(10)

    

    //moving from current location:
    //update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    //update the DOM
    renderCell(gPacman.location, EMPTY)

    //Move the pacman to new location:
    //update the model
    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    //update the DOM
    renderCell(nextLocation, PACMAN)
    checkVictory()
    onVictory() 
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}

function eatGhost(location) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j} span`)
}