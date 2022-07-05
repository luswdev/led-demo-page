#! /usr/bin/bash

# minify css and js
uglifyjs  ./scripts/led.js -o ./scripts/led.min.js
uglifyjs  ./scripts/main.js -o ./scripts/main.min.js
uglifycss ./styles/main.css > ./styles/main.min.css

cur=$(date +%s)

# prevent cache
sed -e "s/js?v={BUILD_TIMESTAMP}/min.js?v=${cur}/g" \
    -e "s/css?v={BUILD_TIMESTAMP}/min.css?v=${cur}/g" \
    _idea/index.html > index.html
