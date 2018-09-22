// __webpack_public_path__ = window.publicPath;

import img from './img/relative_path/cat.jpeg';

function component() {
    var element = document.createElement('div');
    var myIcon = new Image();
    myIcon.src = img;
    element.appendChild(myIcon);
    return element;
}

document.body.appendChild(component());

export default () => {
    console.log('bar');
};