import Game from "./game";
import Player from "./player"

export default class InputHandler {

    constructor(game: Game) {
        document.addEventListener('keydown', (event) => {

            switch(event.key) {
                case "ArrowLeft": 
                    game.player.moveLeft()
                    break
                // case "ArrowUp": 
                //     player.moveUp()
                //     break
                case "ArrowRight": 
                    game.player.moveRight()
                    break                    
                // case "ArrowDown": 
                //     player.moveDown()
                //     break
                case " ":
                    game.player.shoot()
                    break
                case "Escape": 
                    game.togglePause()
                    break
                case "Enter":
                    game.start()
                    break
                default:
                    console.log(event.key)

            }
        })

        document.addEventListener('keyup', (event) => {

            switch(event.key) {
                case "ArrowLeft": 
                    game.player.stopLeft()
                    break
                case "ArrowUp": 
                    game.player.stopUp()
                    break
                case "ArrowRight": 
                    game.player.stopRight()
                    break                    
                case "ArrowDown": 
                    game.player.stopDown()
                    break
            }
        })
    }
}
