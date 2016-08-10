#!/usr/bin/env sh

mkdir -p public/js
ln -s ../../node_modules/jailed/lib/_JailedSite.js public/js/_JailedSite.js
ln -s ../../node_modules/jailed/lib/_frame.js public/js/_frame.js
ln -s ../../node_modules/jailed/lib/_frame.html public/js/_frame.html
ln -s ../../node_modules/jailed/lib/_pluginWebIframe.js public/js/_pluginWebIframe.js
ln -s ../../node_modules/jailed/lib/_pluginWebWorker.js public/js/_pluginWebWorker.js
ln -s ../../node_modules/jailed/lib/_pluginCore.js public/js/_pluginCore.js
# ln -s node_modules/jailed/lib/_pluginCore.js public/js/_pluginCore.js
# ln -s node_modules/jailed/lib/_pluginWeb.js public/js/_pluginWeb.js
