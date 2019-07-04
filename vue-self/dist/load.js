function load(arr, cb) {
    var len = arr.length, total = 0;
    var head = document.getElementsByTagName('head')[0];
    arr.forEach(function (item) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = item;
        head.appendChild(script);
        script.onload = function () {
            total += 1;
            if (len === total) {
                cb();
            }
        };
    });
}
