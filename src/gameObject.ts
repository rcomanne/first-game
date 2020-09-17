export default interface GameObject {
    markedForDeletion: boolean

    draw(ctx: CanvasRenderingContext2D): void 
    update(): void
}