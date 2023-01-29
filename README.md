# fy-image-switch

[![NPM version](https://badgen.net/npm/v/fy-image-switch)](https://www.npmjs.com/package/fy-image-switch)
[![NPM Weekly Downloads](https://badgen.net/npm/dw/fy-image-switch)](https://www.npmjs.com/package/fy-image-switch)
[![NPM Total Downloads](https://badgen.net/npm/dt/fy-image-switch)](https://www.npmjs.com/package/fy-image-switch)
[![License](https://badgen.net/npm/license/fy-image-switch)](https://www.npmjs.com/package/fy-image-switch)

Some simple picture switching effects

Install with [npm](https://www.npmjs.com/), or [Yarn](https://yarnpkg.com/):

```bash
# via npm
npm install fy-image-switch --save

# or Yarn (note that it will automatically save the package to your `dependencies` in `package.json`)
yarn add fy-image-switch
```

## Usage

```typescript
// <script src="../dist/index-umd.js"></script>
// const {default: ImageSwitch} = require(fy-image-switch);
import ImageSwitch from 'fy-image-switch'

```

### flip

```html
<!-- html -->
<div class="image_wrap"></div>
<button id="prev">上一个</button>
<button id="next">下一个</button>
```

```css
/* css */
.image_wrap {
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
```
```typescript
// js
const imageFlipObj = ImageSwitch('flip', {
    switchContainer: document.querySelector('.image_wrap'),
    images: [
        './images/1.jpg',
        './images/2.jpeg',
        './images/3.jpg',
        './images/4.jpg',
    ],
    duration: 1,
    getCurrentPage: (page) => {
        console.log('当前页码：', page)
    },
})

const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

prev.onclick = () => {
    imageFlipObj.toPrev()
}

next.onclick = () => {
    imageFlipObj.toNext()
}
```
### drop

```html
<!-- html -->
<div id="cnsBox"></div>
    <button id="prev">上一个</button>
    <button id="next">下一个</button>
```
```css
/* css */
#cnsBox {
    width: 600px;
    height: 400px;
    background-color: gray;
    margin: 200px auto;
}
```

```typescript
// js
const imageDropObj = ImageSwitch('drop', {
    switchContainer: document.querySelector('#cnsBox'),
    images: [
        './images/1.jpg',
        './images/2.jpeg',
        './images/3.jpg',
        './images/4.jpg',
    ],
    // defaultImage: '../image/1.jpg',
    size: 20,
    getCurrentPage: (page) => {
        console.log('当前页码：', page)
    },
})

const prev = document.querySelector('#prev')
const next = document.querySelector('#next')

prev.onclick = () => {
    imageDropObj.toPrev()
}

next.onclick = () => {
    imageDropObj.toNext()
}
```

## Params

### flip



| Property     | Type            | Required? | Description                                                                                                                                 |
| :----------- | :-------------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------ |
| switchContainer | Element          |     ✓     | A container for wrapping pictures)                                                                           |
| images       | Array<string>          |     ✓     | An array to place the image path                                                                                                                           |
| duration     | Number          |          | Total duration of animation `default: 1s`                                                                                                                |
| getCurrentPage       | Function |          | A callback function is used to get the current page number |





### drop


| Property     | Type            | Required? | Description                                                                                                                                 |
| :----------- | :-------------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------------------ |
| switchContainer | Element          |     ✓     | A container for wrapping pictures)                                                                           |
| images       | Array<string>          |     ✓     | An array to place the image path                                                                                                                           |
| defaultImage     | String          |          | Default picture  
| size     | Number          |          | How many pieces to divide the picture, `default: 10   `                                                                                                           |
| getCurrentPage       | Function |          | A callback function is used to get the current page number |



## Example

To see an example of the code running, follow these steps:

1. Clone the repo, `https://github.com/strivefighting/fy-image-switch.git`
1. `cd examples`

The code of the example is in [`fy-image-switch`](https://github.com/strivefighting/fy-image-switch/blob/master/examples).
