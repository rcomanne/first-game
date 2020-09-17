import GameObject from "./gameObject";

export default class DVD implements GameObject {
    x: number = 0;
    y: number = 0;
    maxSpeed: number = 5;
    vx: number = 0;
    vy: number = 0;
    width: number = 20;
    height: number = 20;

    gameWidth: number = 0;
    gameHeight: number = 0;

    constructor(x: number, y: number, vx: number = 0, vy: number = 0, gameWidth: number, gameHeight: number, width: number = 20, height: number = 20) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = "white"
        ctx.font = "30px Arial"
        ctx.fillText("DVD", this.x, this.y)

        this.width = ctx.measureText("DVD").width
    }


    update(): void {
        if (this.x <  0 || this.x + this.width  > this.gameWidth) {
            this.vx = -this.vx;
        }

        if (this.y - 20 <  0 || this.y > this.gameHeight) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
    }
}