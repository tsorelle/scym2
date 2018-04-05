var Tops;
(function (Tops) {
    var arrivalsReportComponent = (function () {
        function arrivalsReportComponent(application, owner, name) {
            var _this = this;
            this.summary = ko.observableArray();
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.summary(data);
            };
            this.select = function () {
                var me = _this;
                if (me.summary().length == 0) {
                    me.owner.getReportData(me.reportName, me.display);
                }
            };
            this.handleEvent = function (eventName, data) {
                var me = _this;
                switch (eventName) {
                    case 'refreshReport':
                        if (data == me.reportName) {
                            me.owner.getReportData(me.reportName, me.display);
                        }
                        break;
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
            me.reportName = name;
        }
        return arrivalsReportComponent;
    }());
    Tops.arrivalsReportComponent = arrivalsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=arrivalsReportComponent.js.map