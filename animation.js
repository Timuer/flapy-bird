class Animation {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.animations = {
            idle: [],
            run: [],
            attack: [],
        }
        this.animationFrameCount = {
            idle: 4,
            run: 8,
            attack: 7,
        }
        this.currentAnimation = "idle"
        this.nextAnimation = this.currentAnimation
        this.currentFrameIndex = 0
        this.frameInterval = 5
        this.flipX = true
        this.init()
    }

    init() {
        for (var i = 0; i < this.animationFrameCount["idle"]; i++) {
            var frame = this.game.imageByName("idle" + i)
            this.animations["idle"].push(frame)
        }
        for (var i = 0; i < this.animationFrameCount["run"]; i++) {
            var frame = this.game.imageByName("run" + i)
            this.animations["run"].push(frame)
        }
        for (var i = 0; i < this.animationFrameCount["attack"]; i++) {
            var frame = this.game.imageByName("attack" + i)
            this.animations["attack"].push(frame)
        }
    }

    update() {
        if (this.nextAnimation != this.currentAnimation) {
            this.frameInterval = 0
            this.currentAnimation = this.nextAnimation
        }
        if (this.frameInterval == 0) {
            this.frameInterval = 5
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.animationFrameCount[this.currentAnimation]
        }
        this.frameInterval--
    }

    draw() {
        var frame = this.animations[this.currentAnimation][this.currentFrameIndex]
        frame.x = this.x
        frame.y = this.y
        if (this.flipX) {
            this.game.drawFlipImage(frame)
        } else {
            this.game.drawImage(frame)
        }
    }
}
