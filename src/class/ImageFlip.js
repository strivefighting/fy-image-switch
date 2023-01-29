import '../styles/flip.css'

const CONTAINER_CLASSNAME = 'containerContext'
const FRONT_CLASSNAME = 'frontImg'
const BACK_CLASSNAME = 'backImg'
const ANIMATE_CLASSNAME = 'rotateImg'


export default class ImageFlip {
    /**
     * 
     * @param {Element} switchContainer  A container for wrapping pictures
     * @param {Array<string>} images  An array to place the image path
     * @param {Number} duration Animation duration
     * @param {Function} getCurrentPage A callback function is used to get the current page number
     * 
     */
    constructor({ switchContainer, images, duration = 1, getCurrentPage = () => {} } = {}) {
        this.switchContainer = switchContainer
        this.images = images
        this.duration = duration
        this.getCurrentPage = getCurrentPage.bind(this)
        this.current = 1
        this.frontDom = null
        this.backDom = null
        this.backImgDom = null
        this.onGoing = false
        this.dir = null

        this.init()
    }

    init() {
        // Assemble dom structure
        this.frontDom = createElement('img')
        this.frontDom.className = FRONT_CLASSNAME
        this.frontDom.src = this.images[this.current - 1]

        this.backDom = createElement('div')
        this.backDom.className = BACK_CLASSNAME
        this.backImgDom = createElement('img')
        this.backImgDom.src = this.images[this.current]

        addClassName(this.switchContainer, CONTAINER_CLASSNAME)
        this.backDom.appendChild(this.backImgDom)
        this.switchContainer.appendChild(this.frontDom)
        this.switchContainer.appendChild(this.backDom)

        // Set animation duration
        this.setDuration()

        this.setCurrentPage()

        

        this.frontDom.addEventListener('animationend', () => {

            this.current = this.current + this.dir
            if (this.current <= 0) {
                this.current = this.images.length
            } else if (this.current > this.images.length) {
                this.current = 1
            }

            this.setCurrentPage()


            this.frontDom.src = this.images[this.current - 1]
            
            this.frontDom.onload = this.frontDom.onerror = () => {
                this.onGoing = false
                this.removeAmStyle()
            }
        })   
    }

    toPrev() {
        this.dir = -1
        this.backImgDom.src = this.images[this.current - 2] || this.images[this.images.length - 1]
        this.preToSwitch()
    }

    toNext() {
        this.dir = 1
        this.backImgDom.src = this.images[this.current] || this.images[0]
        this.preToSwitch()
    }

    preToSwitch() {
        this.backImgDom.onload = this.backImgDom.onerror = () => {
            this.toSwitch()
        }
    }

    toSwitch() {
        if (this.onGoing) {
            return
        }

        this.onGoing = true

        this.setDeg(this.dir)
        this.addAmStyle()
    }

    setCurrentPage() {
        this.getCurrentPage(this.current)
    }

    setDeg() {
        const deg = `${this.dir * 180}deg`
        setPropertyFn(this.frontDom, '--deg', deg)
        setPropertyFn(this.backDom, '--deg', deg)
    }

    setDuration() {
        const dur = `${this.duration}s`
        setPropertyFn(this.frontDom, '--duration', dur)
        setPropertyFn(this.backDom, '--duration', dur)
    }

    addAmStyle() {
        addClassName(this.frontDom, ANIMATE_CLASSNAME)
        addClassName(this.backDom, ANIMATE_CLASSNAME)
    }

    removeAmStyle() {
        removeClassName(this.frontDom, ANIMATE_CLASSNAME)
        removeClassName(this.backDom, ANIMATE_CLASSNAME)
    }
}

function createElement(tagName) {
    return document.createElement(tagName)
}

function setPropertyFn(node, propertyName, propertyValue) {
    node.style.setProperty(propertyName, propertyValue)
}

function addClassName(node, className) {
    node.classList.add(className)
}

function removeClassName(node, className) {
    node.classList.remove(className)
}
