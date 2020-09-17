export default class Player {
    constructor(x, y, vx = 0, vy = 0, maxSpeed = 5, gameWidth, gameHeight, width = 20, height = 20) {
        this.x = 0;
        this.y = 0;
        this.maxSpeed = 0;
        this.vx = 0;
        this.vy = 0;
        this.width = 20;
        this.height = 20;
        this.gameWidth = 0;
        this.gameHeight = 0;
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
    draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        if (this.x < 0 || this.x + this.width > this.gameWidth) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y + this.height > this.gameHeight) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
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
}
//# sourceMappingURL=player.js.map