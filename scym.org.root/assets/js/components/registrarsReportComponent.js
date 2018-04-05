var Tops;
(function (Tops) {
    var registrarsReportComponent = (function () {
        function registrarsReportComponent(application, owner, name) {
            var _this = this;
            this.dataList = ko.observableArray();
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.dataList(data);
            };
            this.select = function () {
                var me = _this;
                if (me.dataList().length == 0) {
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
                        else {
                            me.dataList([]);
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
        return registrarsReportComponent;
    }());
    Tops.registrarsReportComponent = registrarsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=registrarsReportComponent.js.map