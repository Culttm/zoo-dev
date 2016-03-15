var loadExtScript = function (options) {
    var script = document.createElement('script');
        script.charset = options.charset || null;
        script.src = options.src;

    document.getElementsByTagName('head')[0].appendChild(script);

    var callbackTimer = setInterval(function() {
        var call = false;
        try {
            call = options.test.call();
        } catch (e) {}

        if (call) {
            clearInterval(callbackTimer);
            options.callback.call();
        }

    }, 10);
};

module.exports = loadExtScript;
