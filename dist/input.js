export default class InputHandler {
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    player.moveLeft();
                    break;
                case "ArrowUp":
                    player.moveUp();
                    break;
                case "ArrowRight":
                    player.moveRight();
                    break;
                case "ArrowDown":
                    player.moveDown();
                    break;
            }
        });
        document.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "ArrowLeft":
                    player.stopLeft();
                    break;
                case "ArrowUp":
                    player.stopUp();
                    break;
                case "ArrowRight":
                    player.stopRight();
                    break;
                case "ArrowDown":
                    player.stopDown();
                    break;
            }
        });
    }
}
//# sourceMappingURL=input.js.map