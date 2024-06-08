import SnakeGame from './SnakeGame'
import Controller from './Controller'
import KeyboardController from './KeyboardController'

let game: SnakeGame | undefined
let generation = 1

function startGame(controller: Controller) {
    let fps = +document.querySelector<HTMLInputElement>('#fps')!.value
    document.querySelector('#select-controller')?.remove()
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    const context = canvas?.getContext('2d')

    game = new SnakeGame(context!, controller, fps, newGeneration)
    game.start()
}

function newGeneration() {
    document.querySelector(
        '#generation'
    )!.innerHTML = `Generation ${++generation}`

    let context = game!.context
    let controller = game!.controller
    let fps = game!.fps

    game = new SnakeGame(context, controller, fps, newGeneration)
    game.start()
}

document
    .querySelector<HTMLElement>('#keyboard-input')
    ?.addEventListener('click', () => {
        startGame(new KeyboardController())
    })
