export default class Player {
    constructor(game) {
        this.markedForDeletion = false;
        this.x = 0;
        this.y = 0;
        this.maxSpeed = 0;
        this.vx = 0;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.maxSpeed = 5;
        this.x = 400 - (this.width / 2);
        this.vx = 0;
        this.y = 550;
        this.vy = 0;
    }
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y + this.height > this.game.height) {
            this.y = this.game.height - this.height;
        }
    }
    moveLeft() {
        this.vx = -this.maxSpeed;
    }
    stopLeft() {
        if (this.vx > 0)
            return;
        this.vx = 0;
    }
    moveUp() {
        this.vy = -this.maxSpeed;
    }
    stopUp() {
        if (this.vy > 0)
            return;
        this.vy = 0;
    }
    moveRight() {
        this.vx = this.maxSpeed;
    }
    stopRight() {
        if (this.vx < 0)
            return;
        this.vx = 0;
    }
    moveDown() {
        this.vy = this.maxSpeed;
    }
    stopDown() {
        if (this.vy < 0)
            return;
        this.vy = 0;
    }
    shoot() {
        this.game.shoot(this.x + this.width / 2, this.y);
    }
}
//# sourceMappingURL=player.js.map