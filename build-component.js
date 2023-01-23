const fs = require('fs-extra');
const concat = require('concat');

build = async () => {
    const files = [
        './dist/angular-web-component/runtime.js',
        './dist/angular-web-component/polyfills.js',
        './dist/angular-web-component/main.js'
    ];

    await fs.ensureDir('dist/widget');
    await concat(files, 'dist/widget/news-widget.js');
}
build();