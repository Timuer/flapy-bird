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
        var g = this
        var images = {
            sky: g.game.imageByName("sky"),
            land: g.game.imageByName("land"),
            pipeUp: g.game.imageByName("pipeUp"),
            pipeDown: g.game.imageByName("pipeDown"),
        }
        var bg = new Background(this.game, images)
        g.addElement(bg)
        var p = new Player(this.game, this.game.imageByName("bird0"))
        g.addElement(p)
    }
}
