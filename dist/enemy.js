export default class Enemy {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
        this.markedForDeletion = false;
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
    }
    update() {
    }
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=enemy.js.map