"use strict";
exports.__esModule = true;
exports.OpenFileDialog = void 0;
var OpenFileDialog = /** @class */ (function () {
    function OpenFileDialog() {
        this.fileFilters = [];
        this.multiselect = false;
    }
    OpenFileDialog.prototype.show = function (result, error) {
        this.showBase(function (apiResult) {
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
    OpenFileDialog.prototype.showAsync = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.showBase(function (result) {
                if (result.success) {
                    resolve(result.value);
                }
                else {
                    reject(new Error(result.error));
                }
            });
        });
    };
    OpenFileDialog.prototype.showBase = function (callback) {
        var config = {
            title: this.title,
            initialDirectory: this.initialDirectory,
            fileName: this.fileName,
            fileFilters: this.fileFilters,
            multiselect: this.multiselect
        };
        window._spidereye.invokeApi("f0631cfea99a_Dialog.showOpenFileDialog", config, callback);
    };
    return OpenFileDialog;
}());
exports.OpenFileDialog = OpenFileDialog;
