import GameObject from "./gameObject.js";

export default class Enemy implements GameObject {
    x: number = 0;
    y: number = 0;
    markedForDeletion: boolean = false;
    width: number = 20;
    height: number = 20;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    update(): void {

    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}