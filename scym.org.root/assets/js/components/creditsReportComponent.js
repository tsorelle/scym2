var Tops;
(function (Tops) {
    var creditsReportComponent = (function () {
        function creditsReportComponent(application, owner, name) {
            var _this = this;
            this.data = [];
            this.dataList = ko.observableArray();
            this.showAttendedOnly = ko.observable(false);
            this.headerTitle = ko.observable('');
            this.creditsTotal = ko.observable('');
            this.onFilterSelected = function (selection) {
                var me = _this;
                me.applyFilter();
            };
            this.applyFilter = function () {
                var me = _this;
                me.headerTitle(me.filter.getName(''));
                var selected = me.filter.getValue(0);
                var showAll = !me.showAttendedOnly();
                if (selected) {
                    var filtered = _.filter(me.data, function (item) {
                        return item.creditTypeId == selected && (showAll || item.attended == 'Yes');
                    });
                    me.dataList(filtered);
                }
                else {
                    if (showAll) {
                        me.dataList(me.data);
                    }
                    else {
                        var filtered = _.filter(me.data, function (item) {
                            return item.attended == 'Yes';
                        });
                        me.dataList(filtered);
                    }
                }
                me.getCreditsTotal();
                return true;
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
            };
            this.initialize = function (data) {
                var me = _this;
                me.filter.setOptions(data.creditTypes);
                me.filter.subscribe();
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.data = _.sortBy(data.report, 'registrationName');
                me.applyFilter();
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
            me.filter = new Tops.selectListObservable(me.onFilterSelected);
        }
        creditsReportComponent.prototype.getCreditsTotal = function () {
            var me = this;
            var list = me.dataList();
            var total = 0.00;
            _.each(list, function (item) {
                total += Number(item.amount);
            });
            var amount = Tops.USDollars.format(total, '(none)');
            me.creditsTotal(amount);
        };
        return creditsReportComponent;
    }());
    Tops.creditsReportComponent = creditsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=creditsReportComponent.js.map