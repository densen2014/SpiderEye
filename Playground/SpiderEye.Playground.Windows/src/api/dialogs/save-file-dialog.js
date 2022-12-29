"use strict";
exports.__esModule = true;
exports.SaveFileDialog = void 0;
var SaveFileDialog = /** @class */ (function () {
    function SaveFileDialog() {
        this.fileFilters = [];
        this.overwritePrompt = true;
    }
    SaveFileDialog.prototype.show = function (result, error) {
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
    SaveFileDialog.prototype.showAsync = function () {
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
    SaveFileDialog.prototype.showBase = function (callback) {
        var config = {
            title: this.title,
            initialDirectory: this.initialDirectory,
            fileName: this.fileName,
            fileFilters: this.fileFilters,
            overwritePrompt: this.overwritePrompt
        };
        window._spidereye.invokeApi("f0631cfea99a_Dialog.showSaveFileDialog", config, callback);
    };
    return SaveFileDialog;
}());
exports.SaveFileDialog = SaveFileDialog;
