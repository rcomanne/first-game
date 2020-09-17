import DVD from "./dvd.js";
import GameObject from "./gameObject.js";
import Player from "./player.js";
import InputHandler from "./input.js";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var player: Player;
var dvd: DVD;

var gameObjects: Array<GameObject>;

const GAME_HEIGHT: number = 600;
const GAME_WIDTH: number = 800;

function gameLoop() {
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    gameObjects.forEach(function (gameObject) {
        gameObject.update()
        gameObject.draw(ctx)
    })

    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    gameObjects = new Array()

    player = new Player(10, 10, 0, 0, 5, GAME_WIDTH, GAME_HEIGHT)
    new InputHandler(player)
    gameObjects.push(player)

    requestAnimationFrame(gameLoop);
}