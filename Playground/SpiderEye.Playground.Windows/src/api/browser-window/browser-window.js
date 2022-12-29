"use strict";
exports.__esModule = true;
exports.BrowserWindow = void 0;
var BrowserWindow = /** @class */ (function () {
    function BrowserWindow(config) {
        if (config == null) {
            throw new Error("No config provided");
        }
        this.config = config;
    }
    BrowserWindow.prototype.show = function (result, error) {
        this.showBase(function (apiResult) {
            if (apiResult.success) {
                if (result != null) {
                    result();
                }
            }
            else if (error != null) {
                error(apiResult.error);
            }
        });
    };
    BrowserWindow.prototype.showAsync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.showBase(function (result) {
                if (result.success) {
                    resolve();
                }
                else {
                    reject(new Error(result.error));
                }
            });
        });
    };
    BrowserWindow.prototype.showBase = function (callback) {
        window._spidereye.invokeApi("f0631cfea99a_Window.show", this.config, callback);
    };
    return BrowserWindow;
}());
exports.BrowserWindow = BrowserWindow;
