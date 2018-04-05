var Tops;
(function (Tops) {
    var textParser = (function () {
        function textParser() {
        }
        textParser.makeFullName = function (first, last, middle) {
            if (middle === void 0) { middle = null; }
            var result = first ? first.trim() : '';
            if (middle) {
                result = result + ' ' + middle.trim();
            }
            if (last) {
                result = result + ' ' + last.trim();
            }
            return result;
        };
        return textParser;
    }());
    Tops.textParser = textParser;
})(Tops || (Tops = {}));
//# sourceMappingURL=textParser.js.map