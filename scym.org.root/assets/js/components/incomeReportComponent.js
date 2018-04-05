var Tops;
(function (Tops) {
    var incomeReportComponent = (function () {
        function incomeReportComponent(application, owner, name) {
            var _this = this;
            this.paymentList = ko.observableArray();
            this.checkTotal = ko.observable('');
            this.cashTotal = ko.observable('');
            this.incomeTotal = ko.observable('');
            this.checkCount = ko.observable(0);
            this.cashCount = ko.observable(0);
            this.incomeCount = ko.observable(0);
            this.selectedPayment = ko.observable({
                payor: '',
                registrationId: 0,
                registrationName: '',
                type: '',
                checkNumber: '',
                amountFormatted: '',
                paymentType: 0
            });
            this.applySort = function (selection) {
                var me = _this;
                me.sortAndFilter(me.filter.getValue(), selection.Value);
            };
            this.applyFilter = function (selection) {
                var me = _this;
                me.sortAndFilter(selection.Value, me.filter.getValue());
            };
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                me.payments = data;
                me.setTotals();
                me.sortAndFilter();
            };
            this.select = function () {
                var me = _this;
                if (me.paymentList().length == 0) {
                    me.owner.getReportData(me.reportName, me.display);
                }
            };
            this.showPaymentNotes = function (item) {
                var me = _this;
                me.selectedPayment(item);
                jQuery("#payment-notes-modal").modal('show');
            };
            this.lookupSelectedRegistration = function () {
                var me = _this;
                jQuery("#payment-notes-modal").modal('hide');
                me.owner.handleEvent('registrationselected', me.selectedPayment().registrationId);
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
                        else {
                            me.paymentList([]);
                        }
                        break;
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
            me.reportName = name;
            me.sort = new Tops.selectListObservable(me.applySort, [
                { Name: 'Payor name', Value: 1 },
                { Name: 'Amount', Value: 2 }
            ], 1);
            me.sort.subscribe();
            me.filter = new Tops.selectListObservable(me.applyFilter, [
                { Name: 'Show all', Value: 0 },
                { Name: 'Cash', Value: 1 },
                { Name: 'Checks', Value: 2 }
            ], 0);
            me.filter.subscribe();
        }
        incomeReportComponent.prototype.setTotals = function () {
            var me = this;
            var checkAmount = 0.00;
            var cashAmount = 0.00;
            var totalAmount = 0.00;
            var checkCount = 0;
            var cashCount = 0;
            var totalCount = 0;
            _.each(me.payments, function (item) {
                if (item.paymentType == 1) {
                    cashAmount += Number(item.amount);
                    cashCount += 1;
                }
                else {
                    checkAmount += Number(item.amount);
                    checkCount += 1;
                }
            });
            me.cashTotal(Tops.USDollars.toUSD(cashAmount, '(no cash recieved)'));
            me.checkTotal(Tops.USDollars.toUSD(checkAmount, '(no checks recieved)'));
            me.incomeTotal(Tops.USDollars.toUSD(checkAmount + cashAmount, '(no income recieved)'));
            me.cashCount(cashCount);
            me.checkCount(checkCount);
            me.incomeCount(checkCount + cashCount);
        };
        incomeReportComponent.prototype.sortAndFilter = function (filterValue, sortValue) {
            if (filterValue === void 0) { filterValue = 0; }
            if (sortValue === void 0) { sortValue = 1; }
            var me = this;
            var list = _.sortBy(me.payments, function (item) {
                return sortValue == 1 ? item.payor.toLowerCase() : Number(item.amount);
            });
            if (filterValue > 0) {
                list = _.filter(list, function (item) {
                    return item.paymentType == filterValue;
                });
            }
            me.paymentList([]);
            me.paymentList(list);
        };
        return incomeReportComponent;
    }());
    Tops.incomeReportComponent = incomeReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=incomeReportComponent.js.map