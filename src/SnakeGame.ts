const FPS = 30

class SnakeGame {
    context
    interval

    constructor(context: CanvasRenderingContext2D) {
        this.context = context
        this.interval = setInterval(this.update, 1000 / FPS)
    }

    update() {
        console.log('hej!')
    }
}

export default SnakeGame
