var Tops;
(function (Tops) {
    var financialAidReportComponent = (function () {
        function financialAidReportComponent(application, owner, name) {
            var _this = this;
            this.dataList = ko.observableArray();
            this.showAttendedOnly = ko.observable(false);
            this.totalAid = ko.observable('');
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.data = data;
                var totalAidCalculated = 0.00;
                var totalAttendedAidCalculated = 0.00;
                _.each(data, function (item) {
                    totalAidCalculated += Number(item.amount);
                    if (item.attended == 'Yes') {
                        totalAttendedAidCalculated += Number(item.amount);
                    }
                });
                me.totalAidCalculated = Tops.USDollars.format(totalAidCalculated, '(none)');
                me.totalAttendedAidCalculated = Tops.USDollars.format(totalAttendedAidCalculated, '(none)');
                me.filter();
            };
            this.filter = function () {
                var me = _this;
                if (me.showAttendedOnly()) {
                    var filtered = _.filter(me.data, function (item) {
                        return (item.attended == 'Yes');
                    });
                    me.dataList(filtered);
                    me.totalAid(me.totalAttendedAidCalculated);
                }
                else {
                    me.dataList(me.data);
                    me.totalAid(me.totalAidCalculated);
                }
                return true;
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
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
        return financialAidReportComponent;
    }());
    Tops.financialAidReportComponent = financialAidReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=financialaidReportComponent.js.map