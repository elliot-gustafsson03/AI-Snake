import SnakeGame from './SnakeGame'
import Controller from './Controller'
import KeyboardController from './KeyboardController'
import AIController from './AIController'

let game: SnakeGame | undefined
let generation = 1
let highscore = 0
let pause = false

function startGame(controller: Controller) {
    let fps = +document.querySelector<HTMLInputElement>('#fps')!.value
    document.querySelector('#select-controller')?.remove()
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    const context = canvas?.getContext('2d')

    game = new SnakeGame(context!, controller, fps, newGeneration)
    game.start()
}

function newGeneration(score: number) {
    document.querySelector(
        '#generation'
    )!.innerHTML = `Generation ${++generation}`

    if (score > highscore) {
        highscore = score
        document.querySelector<HTMLElement>(
            '#highscore'
        )!.innerHTML = `Highscore: ${highscore}`
    }

    let context = game!.context
    let controller = game!.controller
    let fps = game!.fps

    if (controller instanceof AIController) {
        ;(controller as AIController).reduceExploreRate(highscore)
    }

    game = new SnakeGame(context, controller, fps, newGeneration)
    game.start()
}

document
    .querySelector<HTMLElement>('#keyboard-input')
    ?.addEventListener('click', () => {
        startGame(new KeyboardController())
    })

document
    .querySelector<HTMLElement>('#ai-input')
    ?.addEventListener('click', () => {
        startGame(new AIController())
    })

document
    .querySelector<HTMLElement>('#pause-btn')
    ?.addEventListener('click', () => {
        let source = ''
        if (pause) {
            source = 'pause.svg'
            game?.resume()
        } else {
            source = 'play.svg'
            game?.pause()
        }

        document.querySelector<HTMLImageElement>('#pause-btn')!.src = source
        pause = !pause
    })
