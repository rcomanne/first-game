export default class DVD {
    constructor(x, y, vx = 0, vy = 0, gameWidth, gameHeight, width = 20, height = 20) {
        this.x = 0;
        this.y = 0;
        this.maxSpeed = 5;
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
        this.width = width;
        this.height = height;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("DVD", this.x, this.y);
        this.width = ctx.measureText("DVD").width;
    }
    update() {
        if (this.x < 0 || this.x + this.width > this.gameWidth) {
            this.vx = -this.vx;
        }
        if (this.y - 20 < 0 || this.y > this.gameHeight) {
            this.vy = -this.vy;
        }
        this.x += this.vx;
        this.y += this.vy;
    }
}
//# sourceMappingURL=dvd.js.map