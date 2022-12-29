"use strict";
exports.__esModule = true;
exports.FileFilter = void 0;
var FileFilter = /** @class */ (function () {
    function FileFilter(name) {
        var filters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            filters[_i - 1] = arguments[_i];
        }
        if (name == null) {
            throw new Error("No name provided");
        }
        this.name = name;
        this.filters = filters || [];
    }
    return FileFilter;
}());
exports.FileFilter = FileFilter;
