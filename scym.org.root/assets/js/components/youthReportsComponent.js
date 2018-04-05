var Tops;
(function (Tops) {
    var youthReportsComponent = (function () {
        function youthReportsComponent(application) {
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
        }
        youthReportsComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            if (finalFunction) {
                finalFunction();
            }
        };
        return youthReportsComponent;
    }());
    Tops.youthReportsComponent = youthReportsComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=youthReportsComponent.js.map