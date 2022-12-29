export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diagonal(x, y) {
    return sqrt(square(x) + square(y));
}
function Hello() {
    var name;
    this.setName = function (thyName) {
        name = thyName;
    };
    this.sayHello = function () {
        console.log('Hello ' + name);
    };
}
export function invokeApi(id, parameters, callback) {
        window._spidereye.invokeApi(id, parameters, callback);
}

var SpiderEye = (function () {
    function SpiderEye() {} 
    Object.defineProperty(SpiderEye, "isReady", {
        get: function () {
            return window._spidereye != null;
        },
        enumerable: false,
        configurable: true
    });
    SpiderEye.onReady = function (callback) {
        if (callback == null) {
            throw new Error("No callback provided");
        }
        if (SpiderEye.isReady) {
            callback();
        }
        else {
            window.addEventListener("spidereye-ready", callback);
        }
    };
    SpiderEye.onReadyAsync = function () {
        return new Promise(function (resolve) {
            if (SpiderEye.isReady) {
                resolve();
            }
            else {
                window.addEventListener("spidereye-ready", function () { return resolve(); });
            }
        });
    };
    SpiderEye.invokeApi = function (id, parameters, callback) {
        SpiderEye.checkBridgeReady();
        window._spidereye.invokeApi(id, parameters, callback);
    };
    SpiderEye.invokeApiAsync = function (id, parameters) {
        return new Promise(function (resolve) {
            SpiderEye.invokeApi(id, parameters, function (result) { return resolve(result); });
        });
    };
    SpiderEye.addEventHandler = function (name, callback) {
        SpiderEye.checkBridgeReady();
        window._spidereye.addEventHandler(name, callback);
    };
    SpiderEye.removeEventHandler = function (name) {
        SpiderEye.checkBridgeReady();
        window._spidereye.removeEventHandler(name);
    };
    SpiderEye.checkBridgeReady = function () {
        if (!SpiderEye.isReady) {
            throw new Error("SpiderEye is not ready yet");
        }
    };
    return SpiderEye;
}());

export {
    SpiderEye,
    Hello
} 
