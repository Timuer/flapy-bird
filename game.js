class Game {
    constructor(imgPaths) {
        window.fps = 50
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.imgPaths = imgPaths
        this.imgs = {}
        this.keydowns = {}
        this.actions = {}
        this.scene = null
        this.scenes = {
            "game": GameScene,
        }
        this.currentScene = "game"

        var g = this
        window.addEventListener("keydown", function(event) {
            // log("keydown")
            g.keydowns[event.key] = "down"
        })
        window.addEventListener("keyup", function(event) {
            // log("keyup")
            g.keydowns[event.key] = "up"
        })
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    performActions() {
        var keys = Object.keys(this.actions)
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            var keyStatus = this.keydowns[k]
            if (keyStatus) {
                this.actions[k](keyStatus)
            }
            // 每次调用事件之后需要清空按键状态，否则按键状态可能一直保持
            // 比如keyup事件我们的本意是一次按键回弹的事件，但是如果不清空，那么只要
            // 按键处于未被按状态，该事件就会被触发
            this.keydowns[k] = null
        }
    }

    drawImage(image) {
        this.context.drawImage(image.img, image.x, image.y)
    }

    drawSlicingImage(image, sx, sy, sWidth, sHeight) {
        this.context.drawImage(image.img, sx, sy, sWidth, sHeight, image.x, image.y)
    }

    drawFlipImage(image) {
        var ctx = this.context
        var cvs = this.canvas
        ctx.save()
        ctx.translate(cvs.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(image.img, cvs.width - image.x - image.width, image.y)
        ctx.restore()
    }

    imageByName(name) {
        var img = this.imgs[name]
        return {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
            img: img,
        }
    }

    init() {
        var g = this
        var imgNames = Object.keys(g.imgPaths)
        var numOfLoadedImgs = []
        for (var i = 0; i < imgNames.length; i++) {
            let name = imgNames[i]
            let img = new Image()
            img.src = g.imgPaths[name]
            img.onload = function() {
                g.imgs[name] = img
                numOfLoadedImgs.push(1)
                if (numOfLoadedImgs.length == imgNames.length) {
                    g.__start()
                }
            }
        }
    }

    runLoop() {
        var g = this
        g.performActions()
        g.update()
        g.clearCanvas()
        g.draw()
        setTimeout(function () {
            g.runLoop()
        }, 1000/window.fps)
    }

    update() {
        if (this.scene.sceneName != this.currentScene) {
            this.scene = this.scenes[this.currentScene].new(this)
        }
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    __start() {
        var scene = new GameScene(this)
        this.scene = scene

        var g = this
        setTimeout(function () {
            g.runLoop()
        }, 1000/window.fps);
    }
}

var __main = function() {
    imgPaths = {
        bird0: "img/bird0.png"
        bird1: "img/bird1.png"
        bird2: "img/bird2.png"
        bg: "img/bg.jpg",
    }
    onDebugMode(true)
    var game = new Game(imgPaths)
    game.init()
}

__main()
