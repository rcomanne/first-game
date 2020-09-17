import GameObject from "./gameObject.js";
import Game from "./game.js"

export default class Player implements GameObject {
    markedForDeletion: boolean = false

    game: Game
    x: number = 0;
    y: number = 0;
    maxSpeed: number = 0;
    vx: number = 0;
    vy: number = 0;
    width: number = 20;
    height: number = 20;

    constructor(game: Game) {
        this.game = game
        this.width = 20
        this.height = 20
        this.maxSpeed = 5
        this.x = 400 - (this.width / 2)
        this.vx = 0
        this.y = 550
        this.vy = 0
    }

    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    update(): void {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) {
            this.x = 0
        }

        if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width
        }

        if (this.y < 0) {
            this.y = 0
        }

        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height
        }
    }

    moveLeft(): void {
        this.vx = -this.maxSpeed
    }

    stopLeft(): void {
        if (this.vx > 0) return
        this.vx = 0
    }

    moveUp(): void {
        this.vy = -this.maxSpeed
    }

    stopUp(): void {
        if (this.vy > 0) return
        this.vy = 0
    }

    moveRight(): void {
        this.vx = this.maxSpeed
    }

    stopRight(): void {
        if (this.vx < 0) return
        this.vx = 0
    }

    moveDown(): void {
        this.vy = this.maxSpeed
    }

    stopDown(): void {
        if (this.vy < 0) return
        this.vy = 0
    }

    shoot(): void {
        this.game.shoot(this.x + this.width / 2, this.y)
    }
}