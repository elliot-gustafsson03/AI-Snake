import SnakeGame from './SnakeGame'
import Controller from './Controller'
import KeyboardController from './KeyboardController'

let game: SnakeGame | undefined

function startGame(controller: Controller) {
    document.querySelector('#select-controller')?.remove()
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    const context = canvas?.getContext('2d')

    game = new SnakeGame(context!, controller, 12)
    game.start()
}

document
    .querySelector<HTMLElement>('#keyboard-input')
    ?.addEventListener('click', () => {
        startGame(new KeyboardController())
    })
