export default interface GameObject {
    draw(ctx: CanvasRenderingContext2D): void 
    update(): void
}