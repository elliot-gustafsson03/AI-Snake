import SnakeGame from './SnakeGame'

let game: SnakeGame | undefined

function startGame() {
    document.querySelector('#select-controller')?.remove()
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    const context = canvas?.getContext('2d')

    const game = new SnakeGame(context!)
}

document
    .querySelector<HTMLElement>('#keyboard-input')
    ?.addEventListener('click', () => {
        startGame()
    })
