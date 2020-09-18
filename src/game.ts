import InputHandler from "./input.js"
import Player from "./player.js"
import GameObject from "./gameObject.js"
import {LEVEL_TEST, LEVEL_1, LEVEL_2} from "./levels.js"
import Enemy from "./enemy.js"
import Bullet from "./bullet.js"

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEXTLEVEL: 4
}

export default class Game {
    width: number
    height: number

    gamestate: number = 0
    player: Player
    lives: number = 1
    currentLevel: number = 0
    levels: Array<Array<Array<number>>> = [LEVEL_1, LEVEL_2]
    gameObjects: Array<GameObject> = new Array()
    enemies: Array<Enemy> = new Array()

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.player = new Player(this)
        new InputHandler(this)
        this.gamestate = GAMESTATE.MENU
    }

    start() {
        if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEXTLEVEL) {
            return
        }

        // init player
        this.gameObjects.push(this.player)

        // init the level
        let level = this.levels[this.currentLevel]

        let widthPerElement = this.width / level[0].length
        let heightPerElement = 40

        for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
            for (let elementIndex = 0; elementIndex < level[rowIndex].length; elementIndex++) {
                if (level[rowIndex][elementIndex] != 0) {
                    this.enemies.push(new Enemy(elementIndex * widthPerElement, rowIndex * heightPerElement, 0, 1, this))
                }
            }            
        }

        this.gamestate = GAMESTATE.RUNNING
    }

    update(): void {
        if (this.lives < 1) {
            this.gamestate = GAMESTATE.GAMEOVER
        }

        if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) {
            return
        }

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
        if (this.enemies.length === 0) {
            this.currentLevel++
            this.gamestate = GAMESTATE.NEXTLEVEL
            this.start()
        }

        // filter for items marked for deletion
        this.gameObjects = this.gameObjects.filter(gameObject => !gameObject.markedForDeletion)

        let allObjects = this.gameObjects.concat(this.enemies)

        // update all the game objects
        allObjects.forEach(gameObject => gameObject.update())
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // clear the canvas
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, this.width, this.height);

        // draw all the known game objects
        let allObjects = this.gameObjects.concat(this.enemies)
        allObjects.forEach(function (gameObject) {
            gameObject.draw(ctx)
        })

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(0, 0, this.width, this.height)
            ctx.fillStyle = "white"
            ctx.font = "30px Arial"
            ctx.textAlign = "center"
            ctx.fillText("Press ENTER to start", this.width / 2, this.height / 2)
        }

        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(0, 0, this.width, this.height)
            ctx.fillStyle = "white"
            ctx.font = "30px Arial"
            ctx.textAlign = "center"
            ctx.fillText("PAUSED", this.width / 2, this.height / 2)
        }

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.fillStyle = "rgba(0,0,0,0.5)"
            ctx.fillRect(0, 0, this.width, this.height)
            ctx.fillStyle = "white"
            ctx.font = "30px Arial"
            ctx.textAlign = "center"
            ctx.fillText("GAME OVER", this.width / 2, this.height / 2)
        }
    }

    shoot(x: number, y: number): void {
        this.gameObjects.push(new Bullet(this, x, y))
    }

    togglePause() {
        if (this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING
        } else {
            this.gamestate = GAMESTATE.PAUSED
        }
    }
}