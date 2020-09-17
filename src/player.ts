import GameObject from "./gameObject";

export default class Player implements GameObject {
    x: number = 0;
    y: number = 0;
    maxSpeed: number = 0;
    vx: number = 0;
    vy: number = 0;
    width: number = 20;
    height: number = 20;

    gameWidth: number = 0;
    gameHeight: number = 0;

    constructor(x: number, y: number, vx: number = 0, vy: number = 0, maxSpeed: number = 5, gameWidth: number, gameHeight: number, width: number = 20, height: number = 20) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.maxSpeed = maxSpeed;
        this.width = width;
        this.height = height;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    update(): void {
        if (this.x <  0 || this.x + this.width > this.gameWidth) {
            this.vx = -this.vx;
        }

        if (this.y <  0 || this.y + this.height > this.gameHeight) {
            this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
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
}