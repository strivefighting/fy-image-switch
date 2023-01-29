import {
    ImageFlip,
    ImageDrop
} from './class/index.js'

const ImageSwitchStrategy = {
    flip: ImageFlip,
    drop: ImageDrop
}

/**
 * Picture switching animation
 * @date 2023-01-28
 * @param {String} 'flip | drop'
 * @param {Object} options Image switching object initialization parameters
 * @returns {Object} Picture switching object
 */
export default function ImageSwitch(type, options) {
    return new ImageSwitchStrategy[type](options)
}
