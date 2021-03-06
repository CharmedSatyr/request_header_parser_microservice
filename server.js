const express = require('express'),
    app = express(),
    useragent = require('express-useragent'),
    mu = require('mu2'),
    port = process.env.PORT || 5000;

app.use(useragent.express());

mu.root = __dirname + '/public';

app.get([
    '/', '/:json'
], function(req, res) {
    mu.clearCache();

    const header = {
        protocol: req.protocol,
        method: req.method,
        source: req.useragent.source,
        browser: req.useragent.browser,
        version: req.useragent.version,
        ip: req.ip,
        language: req.headers["accept-language"],
        os: req.useragent.os,
        platform: req.useragent.platform,
        isDesktop: req.useragent.isDesktop,
        isMobile: req.useragent.isMobile
    }

    let stream = mu.compileAndRender('index.html', {result: JSON.stringify(header)});

    req.params.json
        ? res.json(header)
        : stream.pipe(res);

});

app.listen(port, function() {
    console.log('Listening on port', port);
});
