import InputHandler from "./input.js";
import Player from "./player.js";
import { LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6 } from "./levels.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
var GAME_STATE;
(function (GAME_STATE) {
    GAME_STATE[GAME_STATE["PAUSED"] = 0] = "PAUSED";
    GAME_STATE[GAME_STATE["RUNNING"] = 1] = "RUNNING";
    GAME_STATE[GAME_STATE["MENU"] = 2] = "MENU";
    GAME_STATE[GAME_STATE["GAME_OVER"] = 3] = "GAME_OVER";
    GAME_STATE[GAME_STATE["NEXT_LEVEL"] = 4] = "NEXT_LEVEL";
    GAME_STATE[GAME_STATE["WINNER"] = 5] = "WINNER";
})(GAME_STATE || (GAME_STATE = {}));
export default class Game {
    constructor(width, height) {
        this.gameState = 0;
        this.lives = 3;
        this.score = 0;
        this.highScore = 0;
        this.currentLevel = 0;
        this.levels = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6];
        this.gameObjects = [];
        this.enemies = [];
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        new InputHandler(this);
        this.gameState = GAME_STATE.MENU;
    }
    start() {
        if (this.gameState === GAME_STATE.GAME_OVER || this.gameState === GAME_STATE.WINNER) {
            this.reset();
        }
        if (this.currentLevel >= this.levels.length) {
            this.gameState = GAME_STATE.WINNER;
        }
        if (this.gameState !== GAME_STATE.MENU && this.gameState !== GAME_STATE.NEXT_LEVEL) {
            return;
        }
        // init player
        this.gameObjects.push(this.player);
        // init the level
        let level = this.levels[this.currentLevel];
        let widthPerElement = this.width / level[0].length;
        let heightPerElement = 40;
        let enemySpeed = this.currentLevel * 0.25;
        for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
            for (let elementIndex = 0; elementIndex < level[rowIndex].length; elementIndex++) {
                if (level[rowIndex][elementIndex] !== 0) {
                    this.enemies.push(new Enemy(elementIndex * widthPerElement, rowIndex * heightPerElement, 0, enemySpeed, this));
                }
            }
        }
        this.gameState = GAME_STATE.RUNNING;
    }
    reset() {
        this.currentLevel = 0;
        this.lives = 3;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
        this.score = 0;
        this.gameObjects = [];
        this.enemies = [];
        this.gameState = GAME_STATE.RUNNING;
        this.start();
    }
    update() {
        if (this.lives < 1) {
            this.gameState = GAME_STATE.GAME_OVER;
        }
        if (this.gameState === GAME_STATE.PAUSED || this.gameState === GAME_STATE.MENU || this.gameState === GAME_STATE.GAME_OVER || this.gameState === GAME_STATE.WINNER) {
            return;
        }
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemies.length === 0) {
            if (this.gameState == GAME_STATE.RUNNING) {
                this.currentLevel++;
                this.score += 10;
                this.gameState = GAME_STATE.NEXT_LEVEL;
                this.start();
            }
        }
        // filter for items marked for deletion
        this.gameObjects = this.gameObjects.filter(gameObject => !gameObject.markedForDeletion);
        let allObjects = this.gameObjects.concat(this.enemies);
        // update all the game objects
        allObjects.forEach(gameObject => gameObject.update());
    }
    draw(ctx) {
        // clear the canvas
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("High Score: " + this.highScore, this.width - 74, this.height - 10);
        ctx.fillText("Score: " + this.score, this.width - 50, this.height - 40);
        ctx.fillText("Lives: " + this.lives, 50, this.height - 10);
        // draw all the known game objects
        let allObjects = this.gameObjects.concat(this.enemies);
        allObjects.forEach(function (gameObject) {
            gameObject.draw(ctx);
        });
        if (this.gameState === GAME_STATE.MENU) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("Press ENTER to start", this.width / 2, this.height / 2);
        }
        if (this.gameState === GAME_STATE.PAUSED) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("PAUSED", this.width / 2, this.height / 2);
        }
        if (this.gameState === GAME_STATE.GAME_OVER) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
            ctx.fillText("Press ENTER to restart", this.width / 2, this.height / 2 + 30);
        }
        if (this.gameState === GAME_STATE.WINNER) {
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.fillStyle = "white";
            ctx.font = "30px Arial";
            ctx.textAlign = "center";
            ctx.fillText("CONGRATULATIONS!", this.width / 2, this.height / 2);
            ctx.fillText("You have defeated us", this.width / 2, this.height / 2 + 30);
            ctx.fillText("Press ENTER to restart", this.width / 2, this.height / 2 + 60);
        }
    }
    shoot(x, y) {
        if (this.gameState !== GAME_STATE.RUNNING) {
            return;
        }
        this.gameObjects.push(new Bullet(this, x, y));
    }
    togglePause() {
        if (this.gameState === GAME_STATE.PAUSED) {
            this.gameState = GAME_STATE.RUNNING;
        }
        else {
            this.gameState = GAME_STATE.PAUSED;
        }
    }
}
//# sourceMappingURL=game.js.map