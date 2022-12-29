"use strict";
exports.__esModule = true;
exports.MessageBox = void 0;
var MessageBox = /** @class */ (function () {
    function MessageBox() {
    }
    MessageBox.show = function (config, result, error) {
        MessageBox.showBase(config, function (apiResult) {
            if (apiResult.success) {
                if (result != null) {
                    result(apiResult.value);
                }
            }
            else if (error != null) {
                error(apiResult.error);
            }
        });
    };
    MessageBox.showAsync = function (config) {
        return new Promise(function (resolve, reject) {
            MessageBox.showBase(config, function (result) {
                if (result.success) {
                    resolve(result.value);
                }
                else {
                    reject(new Error(result.error));
                }
            });
        });
    };
    MessageBox.showBase = function (config, callback) {
        window._spidereye.invokeApi("f0631cfea99a_Dialog.showMessageBox", config, callback);
    };
    MessageBox.prototype.show = function (result, error) {
        MessageBox.show({ title: this.title, message: this.message, buttons: this.buttons }, result, error);
    };
    MessageBox.prototype.showAsync = function () {
        return MessageBox.showAsync({ title: this.title, message: this.message, buttons: this.buttons });
    };
    return MessageBox;
}());
exports.MessageBox = MessageBox;
