var Tops;
(function (Tops) {
    var subsidiesReportComponent = (function () {
        function subsidiesReportComponent(application, owner, name) {
            var _this = this;
            this.dataList = ko.observableArray();
            this.headerTitle = ko.observable('');
            this.showAttendedOnly = ko.observable(false);
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
                return true;
            };
            this.initialize = function (data) {
                var me = _this;
                me.filter.setOptions(_.filter(data.creditTypes, function (item) {
                    return (item.Value != 999 && item.Value != 1);
                }));
                me.filter.subscribe();
                me.display(data);
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
            };
            this.display = function (data) {
                var me = _this;
                me.data = _.sortBy(data.report, 'sortName');
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
        return subsidiesReportComponent;
    }());
    Tops.subsidiesReportComponent = subsidiesReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=subsidiesReportComponent.js.map