var Tops;
(function (Tops) {
    var ledgerReportComponent = (function () {
        function ledgerReportComponent(application, owner, name) {
            var _this = this;
            this.showAttendedOnly = ko.observable(true);
            this.showBalanceSheet = ko.observable(true);
            this.reportHeader = ko.observable('');
            this.ledger = [];
            this.balances = [];
            this.itemlist = ko.observableArray();
            this.balanceList = ko.observableArray();
            this.showReportView = function () {
                var me = _this;
                me.reportHeader(me.reportView.getName());
                var itemGroup = me.reportView.getValue();
                var showAll = !me.showAttendedOnly();
                if (itemGroup) {
                    me.itemlist([]);
                    var filtered = _.filter(me.ledger, function (item) {
                        return item.ItemGroup == itemGroup && (showAll || item.attendedCount > 0);
                    });
                    me.itemlist(filtered);
                    me.showBalanceSheet(false);
                }
                else {
                    me.balanceList([]);
                    if (showAll) {
                        me.balanceList(me.balances);
                    }
                    else {
                        var filtered = _.filter(me.balances, function (item) {
                            return (item.attended > 0);
                        });
                        me.balanceList(filtered);
                    }
                    me.showBalanceSheet(true);
                }
                return true;
            };
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.ledger = _.sortBy(data.ledger, 'name');
                me.balances = _.sortBy(data.balanceSheet, 'name');
                me.showReportView();
            };
            this.select = function () {
                var me = _this;
                if (me.ledger.length == 0) {
                    me.owner.getReportData(me.reportName, me.display);
                }
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
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
            me.reportView = new Tops.selectListObservable(me.showReportView, [
                { Name: 'Balance Sheet', Value: 0 },
                { Name: 'Charges', Value: 1 },
                { Name: 'Donations', Value: 2 },
                { Name: 'Credits', Value: 3 },
                { Name: 'Payments', Value: 4 }
            ], 0);
            me.reportView.subscribe();
        }
        return ledgerReportComponent;
    }());
    Tops.ledgerReportComponent = ledgerReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=ledgerReportComponent.js.map