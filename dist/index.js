import Player from "./player.js";
import InputHandler from "./input.js";
var canvas;
var ctx;
var player;
var dvd;
var gameObjects;
const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;
function gameLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    gameObjects.forEach(function (gameObject) {
        gameObject.update();
        gameObject.draw(ctx);
    });
    requestAnimationFrame(gameLoop);
}
window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    gameObjects = new Array();
    player = new Player(10, 10, 0, 0, 5, GAME_WIDTH, GAME_HEIGHT);
    new InputHandler(player);
    gameObjects.push(player);
    requestAnimationFrame(gameLoop);
};
//# sourceMappingURL=index.js.map