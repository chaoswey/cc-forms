const {mix} = require('laravel-mix');

mix.setPublicPath('/');

mix.js('src/app.js', 'dist/app.js');

mix.options({processCssUrls: false}).sourceMaps();


mix.browserSync({
    proxy: false,
    server: true,
    files: [
        '*.html',
        'src/js/**/*.js',
        'src/components/**/*'
    ]
});