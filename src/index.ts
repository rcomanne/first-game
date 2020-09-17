import Game from "./game.js";

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var game: Game;

const GAME_HEIGHT: number = 600;
const GAME_WIDTH: number = 800;

function gameLoop() {
    game.update()
    game.draw(ctx)

    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    game = new Game(GAME_WIDTH, GAME_HEIGHT)
    game.start()
    requestAnimationFrame(gameLoop);
}