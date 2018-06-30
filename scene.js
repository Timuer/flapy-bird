class Scene {
    constructor(game) {
        this.game = game
        this.sceneName = ""
        this.elements = []
        this.init()
    }

    static new(game) {
        return new this(game)
    }

    init() {

    }

    addElement(elem) {
        this.elements.push(elem)
    }

    update() {
        for (var e of this.elements) {
            e.update()
        }
    }

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    clear() {
        this.elements = this.elements.filter(e => e.exists)
    }
}

class GameScene extends Scene {
    constructor(game) {
        super(game)
        this.sceneName = "game"
    }

    init() {
        this.addElement(new Player(this.game, this.game.imageByName("idle0")))
    }

    draw() {
        var bg = this.game.imageByName("bg")
        this.game.drawImage(bg)
        super.draw()
    }
}
