let getOptions = require('loader-utils').getOptions;

module.exports =  function (src) {
    const options = getOptions(this);
    console.log('xheldon-loader options:', options);
    let str = src.split(' ').map((item) => {
        let firstLetter = item.charAt(0).toUpperCase();
        item = firstLetter + item.substr(1);
        return item;
    }).join(' ');
    return `export default ${JSON.stringify(str)}`;
};