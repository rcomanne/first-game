export default class Enemy {
    constructor(x, y, vx = 0, vy = 0, game) {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.markedForDeletion = false;
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.game = game;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.height > this.game.height) {
            this.game.lives--;
            this.markedForDeletion = true;
        }
    }
    draw(ctx) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=enemy.js.map