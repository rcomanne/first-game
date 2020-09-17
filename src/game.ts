import InputHandler from "./input.js"
import Player from "./player.js"
import GameObject from "./gameObject.js"
import {LEVEL_TEST, LEVEL_1, LEVEL_2} from "./levels.js"
import Enemy from "./enemy.js"
import Bullet from "./bullet.js"

export default class Game {
    width: number
    height: number

    player: Player | null = null
    currentLevel: number = 0
    levels: Array<Array<Array<number>>> = [LEVEL_1, LEVEL_2]
    gameObjects: Array<GameObject> = new Array()
    enemies: Array<Enemy> = new Array()

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        
    }

    start() {
        // init player
        this.player = new Player(this)
        this.gameObjects.push(this.player)
        new InputHandler(this.player)

        // init the level
        let level = this.levels[this.currentLevel]

        let widthPerElement = this.width / level[0].length
        let heightPerElement = 40

        for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
            for (let elementIndex = 0; elementIndex < level[rowIndex].length; elementIndex++) {
                if (level[rowIndex][elementIndex] != 0) {
                    this.enemies.push(new Enemy(elementIndex * widthPerElement, rowIndex * heightPerElement))
                }
            }            
        }
    }

    end() {
        this.currentLevel++
    }

    update(): void {
        // filter for items marked for deletion
        this.gameObjects = this.gameObjects.filter((gameObject) => {
            return !gameObject.markedForDeletion
        })
        this.enemies = this.enemies.filter((enemy) => {
            return !enemy.markedForDeletion
        })

        let allObjects = this.gameObjects.concat(this.enemies)

        // update all the game objects
        allObjects.forEach(function (gameObject) {
            gameObject.update()
        })
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
    }

    shoot(x: number, y: number): void {
        this.gameObjects.push(new Bullet(this, x, y))
    }
}