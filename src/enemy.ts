import Game from "./game.js";
import GameObject from "./gameObject.js";

export default class Enemy implements GameObject {
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    markedForDeletion: boolean = false;
    width: number = 20;
    height: number = 20;
    game: Game;

    constructor(x: number, y: number, vx: number = 0, vy: number = 0, game: Game) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
        this.game = game
    }

    update(): void {
        this.x += this.vx;
        this.y += this.vy;

        console.log("this.y " + this.y)
        if (this.y + this.height > this.game.height) {
            this.game.lives--
            this.markedForDeletion = true
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}