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
        this.x = game.canvas.width / 5
        this.y = game.canvas.height / 2
        this.speedX = 5
        this.speedY = 0
        this.gravity = 0.3
        this.rotation = 0
        this.animation = new Animation(game, this.x, this.y)
        this.setupActions()
    }

    setupActions() {
        var p = this
        p.game.registerAction("a", function(keyStatus) {
            if (keyStatus) {
                p.animation.flipX = true
                p.move(-p.speedX, keyStatus)
            }
        })
        p.game.registerAction("d", function(keyStatus) {
            if (keyStatus) {
                p.animation.flipX = false
                p.move(p.speedX, keyStatus)
            }
        })
        p.game.registerAction("f", function(keyStatus) {
            if (keyStatus == "down") {
                p.rotation = -45
                p.y -= 150
                p.speedY = 0
            }
        })
    }

    update() {
        // 调整玩家坐标和角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        if (this.y >= 460) {
            this.y = 460
        } else {
            this.y += this.speedY
            this.speedY += this.gravity
        }
        this.x += 2
        // 将与绘制动画相关的参数同步到animation中
        this.animation.x = this.x
        this.animation.y = this.y
        this.animation.rotation = this.rotation
        this.animation.update()
    }

    draw() {
        this.animation.draw()
    }

    move(dist, keyStatus) {
        if (keyStatus == "down") {
            this.x += dist
        }
    }
}
