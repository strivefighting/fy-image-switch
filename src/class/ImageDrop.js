import DefaultImage from '../asstes/defaultImage.jpg'
export default class ImageDrop {
    /**
     *
     * @param {Element} switchContainer  A container for wrapping pictures
     * @param {Array<string>} images  An array to place the image path
     * @param {String} defaultImage  Default picture
     * @param {Number} size  How many pieces to divide the picture
     * @param {Function} getCurrentPage A callback function is used to get the current page number
     *
     */
    constructor({
        switchContainer,
        images,
        getCurrentPage = () => {},
        size = 10,
        defaultImage = DefaultImage,
    }) {
        this.switchContainer = switchContainer
        this.images = images
        this.defaultImage = defaultImage // Default image (white)
        this.size = size
        this.getCurrentPage = getCurrentPage.bind(this)

        this.currentIdx = 0 // Subscript of the number of pictures

        this.cns = null         // Canvas object
        this.ctx = null         // Canvas context
        this.cnsW = 0           // Canvas width
        this.cnsH = 0           // Canvas hight
        this.rows = 0           // How many lines to divide the picture according to size
        this.columns = 0        // How many columns are divided according to size
        this.widthScale = 0     //The ratio of the original width of the picture to the width of the canvas
        this.heightScale = 0    //The ratio of the original height of the picture to the height of the canvas

        this.onGoing = false
        this.init()
    }

    init() {
        this.createCnsElement()
        this.initDrawImage()
    }

    toPrev() {
        this.loop(0, this.columns - 1, -1)
    }

    toNext() {
        this.loop(0, 0, 1)
    }

    getSwitchContainerRect() {
        const { width, height } = this.switchContainer.getBoundingClientRect()
        return {
            width,
            height,
        }
    }
    // Create canvas and add it to switchContainer
    createCnsElement() {
        this.cns = document.createElement('canvas')
        this.ctx = this.cns.getContext('2d')
        const { width, height } = this.getSwitchContainerRect()
        this.cnsW = this.cns.width = width
        this.cnsH = this.cns.height = height
        this.rows = Math.ceil(height / this.size)
        this.columns = Math.ceil(width / this.size)

        this.switchContainer.appendChild(this.cns)
    }

    loadImage(url) {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve(img)
            }
            img.onerror = () => {
                img.src = this.defaultImage
            }
            img.src = url
        })
    }

    async initDrawImage() {
        const imgObj = await this.drawImage()
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.drawImageBlock(imgObj, i, j)
            }
        }
        this.getCurrentPage(this.currentIdx + 1)
    }

    async drawImage() {
        const imgObj = await this.loadImage(this.images[this.currentIdx])
        const { width, height } = imgObj
        this.widthScale = width / this.cnsW
        this.heightScale = height / this.cnsH

        return imgObj
    }

    /**
     *
     * @param {Image} imgObj  图片对象
     * @param {Number} i  行
     * @param {Number} j  列
     */
    drawImageBlock(imgObj, i, j) {
        this.ctx.drawImage(
            imgObj,
            j * this.size * this.widthScale,
            i * this.size * this.heightScale,
            this.size * this.widthScale,
            this.size * this.heightScale,
            j * this.size,
            i * this.size,
            this.size,
            this.size
        )
    }

    async loop(i, j, dir) {
        if (this.onGoing) {
            return
        }

        this.onGoing = true

        this.currentIdx = this.currentIdx + dir

        if (this.currentIdx > this.images.length - 1) {
            this.currentIdx = 0
        } else if (this.currentIdx < 0) {
            this.currentIdx = this.images.length - 1
        }

        const imgObj = await this.drawImage()

        let step = 0

        const animation = () => {
            const clearArr = this.rectAround(i, j, step)
            clearArr.forEach((item) => {
                this.clearClip(item.x, item.y)
                this.drawImageBlock(imgObj, item.x, item.y)
            })

            if (!clearArr.length) {
                this.onGoing = false
                this.getCurrentPage(this.currentIdx + 1)
                return
            }

            step++

            window.requestAnimationFrame(animation)
        }

        window.requestAnimationFrame(animation)
    }

    clearClip(i, j) {
        this.ctx.clearRect(this.size * j, this.size * i, this.size, this.size)
    }

    rectAround(i, j, step) {
        let result = []
        for (let m = i - step; m <= i + step; m++) {
            for (let n = j - step; n <= j + step; n++) {
                if (
                    Math.abs(m - i) + Math.abs(n - j) == step &&
                    m >= 0 &&
                    n >= 0 &&
                    m <= this.rows - 1 &&
                    n <= this.columns - 1
                ) {
                    result.push({ x: m, y: n })
                }
            }
        }
        return result
    }
}
