import Game from "./game.js";
var canvas;
var ctx;
var game;
const GAME_HEIGHT = 600;
const GAME_WIDTH = 800;
function gameLoop() {
    game.update();
    game.draw(ctx);
    requestAnimationFrame(gameLoop);
}
window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    game = new Game(GAME_WIDTH, GAME_HEIGHT);
    game.start();
    requestAnimationFrame(gameLoop);
};
//# sourceMappingURL=index.js.map