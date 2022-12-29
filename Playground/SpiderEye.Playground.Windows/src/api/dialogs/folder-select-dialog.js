"use strict";
exports.__esModule = true;
exports.FolderSelectDialog = void 0;
var FolderSelectDialog = /** @class */ (function () {
    function FolderSelectDialog() {
    }
    FolderSelectDialog.prototype.show = function (result, error) {
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
    FolderSelectDialog.prototype.showAsync = function () {
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
    FolderSelectDialog.prototype.showBase = function (callback) {
        var config = {
            title: this.title,
            selectedPath: this.selectedPath
        };
        window._spidereye.invokeApi("f0631cfea99a_Dialog.showFolderSelectDialog", config, callback);
    };
    return FolderSelectDialog;
}());
exports.FolderSelectDialog = FolderSelectDialog;
