class AbstractTexture {
    constructor(game, image) {
        this.x = 0
        this.y = 0
        this.width = image.width
        this.height = image.height
        this.game = game
        this.image = image
        this.exists = true
    }

    draw() {
        this.image.x = this.x
        this.image.y = this.y
        this.game.drawImage(this.image)
    }

    update() {

    }
}

class Player extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.x = game.canvas.width / 2 - image.width / 2
        this.y = game.canvas.height - image.height
        this.speed = config.player_speed
        this.animation = new Animation(game, this.x, this.y)
        this.setupActions()
    }

    setupActions() {
        var p = this
        p.game.registerAction("a", function(keyStatus) {
            if (keyStatus) {
                p.animation.flipX = false
                p.move(-p.speed, keyStatus)
            }
        })
        p.game.registerAction("d", function(keyStatus) {
            if (keyStatus) {
                p.animation.flipX = true
                p.move(p.speed, keyStatus)
            }
        })
        p.game.registerAction("f", function(keyStatus) {
            if (keyStatus == "down") {
                p.animation.nextAnimation = "attack"
            } else if (keyStatus == "up") {
                p.animation.nextAnimation = "idle"
            }
        })
    }

    update() {
        this.speed = config.player_speed
        this.animation.x = this.x
        this.animation.y = this.y
        this.animation.update()
    }

    draw() {
        this.animation.draw()
    }

    move(dist, keyStatus) {
        if (keyStatus == "up") {
            this.animation.nextAnimation = "idle"
        } else if (keyStatus == "down"){
            this.animation.nextAnimation = "run"
            this.x += dist
        }
    }
}
