export default class Bullet {
    constructor(game, x, y, vx = 0, vy = -5, width = 1, height = 5) {
        this.markedForDeletion = false;
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.width = width;
        this.height = height;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y < 0) {
            this.markedForDeletion = true;
            return;
        }
        this.game.enemies.forEach((enemy) => {
            let left = enemy.x - this.width;
            let top = enemy.y;
            let right = enemy.x + enemy.width + this.width;
            let bottom = enemy.y + enemy.height;
            if (this.x > left && this.x < right && this.y > top && this.y < bottom) {
                enemy.markedForDeletion = true;
                this.game.score++;
                this.markedForDeletion = true;
            }
        });
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=bullet.js.map