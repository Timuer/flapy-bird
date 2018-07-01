class Background {
    constructor(game, images) {
        this.game = game
        this.images = images
        this.firstLandX = 0
    }

    update() {
        if (this.firstLandX > -336) {
            this.firstLandX -= 10
        } else {
            this.firstLandX = 0
        }
    }

    draw() {
        var sky = this.images["sky"]
        this.game.drawImage(sky)
        var pipeUp = this.images["pipeUp"]
        pipeUp.x = 500
        pipeUp.y = -200
        this.game.drawImage(pipeUp)
        var pipeDown = this.images["pipeDown"]
        pipeDown.x = 600
        pipeDown.y = 300
        this.game.drawImage(pipeDown)
        var land = this.images["land"]
        var landX = this.firstLandX
        for (var i = 0; i < 4; i++) {
            land.x = landX
            land.y = 500
            this.game.drawImage(land)
            landX += 336
        }
    }
}
