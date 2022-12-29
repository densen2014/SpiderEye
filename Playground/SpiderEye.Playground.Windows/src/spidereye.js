"use strict";
exports.__esModule = true;
exports.SpiderEye = void 0;
var SpiderEye = /** @class */ (function () {
    function SpiderEye() {
    }
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
exports.SpiderEye = SpiderEye;
