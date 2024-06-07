import Controller from './Controller'
import Snake from './Snake'
import {
    position,
    randomPosition,
    positionEquals,
    containsPosition,
} from './Position'
import { HEIGHT, PIXEL, WIDTH } from './Constants'
import Apple from './Apple'

class SnakeGame {
    private context: CanvasRenderingContext2D
    private controller: Controller
    private fps: number

    private interval: number | undefined
    private snake: Snake | undefined
    private apple: Apple | undefined

    private points = 0

    constructor(
        context: CanvasRenderingContext2D,
        controller: Controller,
        fps: number
    ) {
        this.context = context
        this.controller = controller
        this.fps = fps
    }

    start(): void {
        this.snake = new Snake()
        this.apple = this.spawnApple()
        this.interval = setInterval(this.update.bind(this), 1000 / this.fps)
    }

    update(): void {
        this.move()
        this.render()
        this.checkCollisions()
    }

    move(): void {
        this.snake!.move(this.controller.getNewVelocity())
    }

    render(): void {
        // Clear
        this.context.clearRect(0, 0, WIDTH * PIXEL, HEIGHT * PIXEL)

        // Draw apple
        this.fillPixel(this.apple!.getPos(), this.apple!.getColor())

        // Draw snake head
        this.fillPixel(this.snake!.getPos(), this.snake!.getColor())

        // Draw snake body
        this.snake!.tail.forEach((segment) => {
            this.fillPixel(segment.pos, segment.color)
        })
    }

    fillPixel(pos: position, color: string): void {
        this.context.fillStyle = color
        this.context.fillRect(
            pos.x * PIXEL + 1,
            pos.y * PIXEL + 1,
            PIXEL - 2,
            PIXEL - 2
        )
    }

    checkCollisions(): void {
        // Check eaten apple
        if (positionEquals(this.snake!.getPos(), this.apple!.getPos())) {
            this.eatApple()
            return
        }

        // Check out of bounds
        if (
            this.snake!.getPos().x < 0 ||
            this.snake!.getPos().x >= WIDTH ||
            this.snake!.getPos().y < 0 ||
            this.snake!.getPos().y >= HEIGHT
        ) {
            this.gameOver()
            return
        }

        // Check Self collision
        if (
            containsPosition(
                this.snake!.getPos(),
                this.snake!.tail.map((segment) => segment.pos)
            )
        ) {
            this.gameOver()
            return
        }
    }

    spawnApple(): Apple {
        return new Apple(
            randomPosition([
                this.snake!.getPos(),
                ...this.snake!.tail.map((segment) => segment.pos),
            ])
        )
    }

    eatApple() {
        document.querySelector<HTMLElement>(
            '#points'
        )!.innerHTML = `Points: ${++this.points}`
        this.snake!.grow()

        this.apple = this.spawnApple()
    }

    gameOver() {
        clearInterval(this.interval)
        alert('Game Over!')
    }
}

export default SnakeGame
