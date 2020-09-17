import Game from "./game";
import GameObject from "./gameObject";

export default class Bullet implements GameObject {
    markedForDeletion: boolean = false

    game: Game
    x: number
    y: number
    vx: number
    vy: number
    width: number
    height: number

    constructor(game: Game, x: number, y: number, vx: number = 0, vy: number = -5, width: number = 1, height: number = 5) {
        this.game = game
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.width = width
        this.height = height
    }

    update(): void {
        this.x += this.vx
        this.y += this.vy

        if (this.y < 0) {
            this.markedForDeletion = true
            return
        }

        this.game.enemies.forEach((enemy) => {
            let left = enemy.x - this.width
            let top = enemy.y
            let right = enemy.x + enemy.width + this.width
            let bottom = enemy.y + enemy.height
            if (this.x > left && this.x < right && this.y > top && this.y < bottom) {
                enemy.markedForDeletion = true
                this.markedForDeletion = true
            }
        })
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "white"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}