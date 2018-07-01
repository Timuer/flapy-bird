class Animation {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.animations = {
            fly: [],
        }
        this.currentAnimation = "fly"
        this.frameCount = {
            fly: 3,
        }
        this.frameIndex = 0
        this.frameInterval = 5
        this.flipX = false
        this.init()
    }

    init() {
        var b = this.game.imageByName("bird")
        this.animations["fly"].push(b)
    }

    update() {
        if (this.nextAnimation != this.currentAnimation) {
            this.frameInterval = 0
            this.currentAnimation = this.nextAnimation
        }
        if (this.frameInterval == 0) {
            this.frameInterval = 5
            this.frameIndex = (this.frameIndex + 1) % this.frameCount[this.currentAnimation]
        }
        this.frameInterval--
    }

    draw() {
        var frame = this.animations[this.currentAnimation][this.frameIndex]
        frame.x = this.x
        frame.y = this.y
        if (this.flipX) {
            this.game.drawFlipImage(frame)
        } else {
            this.game.drawImage(frame)
        }
    }
}
