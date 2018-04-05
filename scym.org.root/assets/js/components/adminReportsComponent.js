var Tops;
(function (Tops) {
    var adminReportsComponent = (function () {
        function adminReportsComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.reports = [];
            this.selectedReport = ko.observable('landing');
            this.showReptRegistrationsReceived = function () {
                var me = _this;
                me.loadReport('registrationsReceived', 'registrations-report', function (reportName) {
                    return new Tops.registrationsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptMealCounts = function () {
                var me = _this;
                me.loadReport('mealCounts', 'mealcounts-report', function (reportName) {
                    return new Tops.mealcountsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptMealRoster = function () {
                var me = _this;
                me.loadReport('mealRoster', 'meals-report', function (reportName) {
                    return new Tops.mealsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptRegisteredAttenders = function () {
                var me = _this;
                me.loadReport('registeredAttenders', 'attenders-report', function (reportName) {
                    return new Tops.attendersReportComponent(me.application, me, reportName);
                });
            };
            this.showReptAttendersByArrival = function () {
                var me = _this;
                me.loadReport('attendersByArrival', 'arrivals-report', function (reportName) {
                    return new Tops.arrivalsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptLedger = function () {
                var me = _this;
                me.loadReport('ledger', 'ledger-report', function (reportName) {
                    return new Tops.ledgerReportComponent(me.application, me, reportName);
                });
            };
            this.showReptPaymentsReceived = function () {
                var me = _this;
                me.loadReport('paymentsReceived', 'income-report', function (reportName) {
                    return new Tops.incomeReportComponent(me.application, me, reportName);
                });
            };
            this.showReptMiscCounts = function () {
                var me = _this;
                me.loadReport('miscCounts', 'registrars-report', function (reportName) {
                    return new Tops.registrarsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptFinancialAid = function () {
                var me = _this;
                me.loadReport('financialAid', 'financialaid-report', function (reportName) {
                    return new Tops.financialAidReportComponent(me.application, me, reportName);
                });
            };
            this.showReptCredits = function () {
                var me = _this;
                me.loadReport('credits', 'credits-report', function (reportName) {
                    return new Tops.creditsReportComponent(me.application, me, reportName);
                });
            };
            this.showReptSubsidies = function () {
                var me = _this;
                me.loadReport('subsidies', 'subsidies-report', function (reportName) {
                    return new Tops.subsidiesReportComponent(me.application, me, reportName);
                });
            };
            this.showDownloads = function () {
                var me = _this;
                me.selectedReport('downloads');
            };
            this.showRegistrarDownloads = function () {
                var me = _this;
                me.selectedReport('registrar-downloads');
            };
            this.refreshReports = function () {
                var me = _this;
                var current = me.selectedReport();
                _.each(me.reports, function (report) {
                    report.vm.handleEvent('refreshReport', current);
                });
            };
            this.handleEvent = function (eventName, data) {
                if (data === void 0) { data = null; }
                var me = _this;
                me.owner.handleEvent(eventName, data);
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        adminReportsComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.application.loadResources(['selectListObservable.js'], finalFunction);
        };
        adminReportsComponent.prototype.findReport = function (reportName) {
            var me = this;
            var report = _.find(me.reports, function (item) {
                return item.name == reportName;
            });
            return report;
        };
        adminReportsComponent.prototype.loadReport = function (reportName, componentName, factory) {
            var me = this;
            if (componentName == 'not-implemented') {
                me.selectedReport(reportName);
                return;
            }
            var report = me.findReport(reportName);
            if (report == null) {
                report = {
                    name: reportName,
                    vm: null
                };
                me.application.bindComponent(componentName, function () {
                    report.vm = factory(reportName);
                    me.reports.push(report);
                    return report.vm;
                }, function () {
                    me.getReportData(reportName, report.vm.initialize);
                    me.selectedReport(reportName);
                });
            }
            else {
                if (report.vm.select()) {
                    me.getReportData(reportName, report.vm.display);
                }
                me.selectedReport(reportName);
            }
        };
        ;
        adminReportsComponent.prototype.getReportData = function (reportName, dataHandler) {
            var me = this;
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting report data...');
            me.peanut.executeService('registration.GetReportData', { id: 'admin.' + reportName }, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    dataHandler(serviceResponse.Value);
                }
            }).always(function () {
                me.application.hideWaiter();
            });
        };
        return adminReportsComponent;
    }());
    Tops.adminReportsComponent = adminReportsComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=adminReportsComponent.js.map