var Tops;
(function (Tops) {
    var housingReportsComponent = (function () {
        function housingReportsComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.selectedReport = ko.observable('requestCounts');
            this.requestCounts = ko.observableArray();
            this.assignmentCounts = ko.observableArray();
            this.occupants = ko.observableArray();
            this.occupantsFilter = ko.observable('All');
            this.rosterFilter = ko.observable('All');
            this.housingRoster = {
                daily: ko.observableArray(),
                unassigned: ko.observableArray(),
                visitors: ko.observableArray()
            };
            this.showHousingRequestCounts = function () {
                var me = _this;
                me.selectedReport('requestCounts');
                me.getReportData();
            };
            this.showHousingAssignmentCounts = function () {
                var me = _this;
                me.selectedReport('assignedCounts');
                me.getReportData();
            };
            this.showHousingRoster = function () {
                var me = _this;
                me.selectedReport('housingRoster');
                me.getReportData();
            };
            this.showWhoWhereReport = function () {
                var me = _this;
                me.selectedReport('occupants');
                me.getReportData();
            };
            this.refreshAll = function () {
                var me = _this;
                me.requestCounts([]);
                me.assignmentCounts([]);
                me.housingRoster.daily([]);
                me.housingRoster.unassigned([]);
                me.housingRoster.visitors([]);
                me.occupants([]);
                me.getReportData();
            };
            this.changeAssignment = function (item) {
                var me = _this;
                me.owner.handleEvent('assignmentchangerequest', item);
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        housingReportsComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.application.loadResources('DayGroupObservable.js', function () {
                me.getReportData();
            });
        };
        housingReportsComponent.prototype.needsData = function (currentReport) {
            var me = this;
            switch (currentReport) {
                case 'requestCounts':
                    return me.requestCounts().length == 0;
                case 'assignedCounts':
                    return me.assignmentCounts().length == 0;
                case 'housingRoster':
                    return me.housingRoster.daily().length + me.housingRoster.unassigned().length + me.housingRoster.visitors().length == 0;
                case 'occupants':
                    return me.occupants().length == 0;
                default:
                    alert("Report not implemented");
                    return false;
            }
        };
        housingReportsComponent.prototype.getReportData = function () {
            var me = this;
            var currentReport = me.selectedReport();
            if (me.needsData(currentReport)) {
                var request = {
                    id: 'housing.' + currentReport
                };
                me.application.showWaiter('Getting report data ...');
                me.peanut.executeService('registration.GetReportData', request, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        switch (currentReport) {
                            case 'requestCounts':
                                me.requestCounts(serviceResponse.Value);
                                break;
                            case 'assignedCounts':
                                me.assignmentCounts([]);
                                me.assignmentCounts(serviceResponse.Value);
                                break;
                            case 'housingRoster':
                                me.rosterFilter('All');
                                me.setHousingRoster(serviceResponse.Value);
                                break;
                            case 'occupants':
                                me.occupantsFilter('All');
                                Tops.DayGroupObservable.assign(me.occupants, serviceResponse.Value);
                                break;
                            default:
                                alert("Report not implemented");
                        }
                    }
                }).always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        housingReportsComponent.prototype.setHousingRoster = function (data) {
            var me = this;
            me.housingRoster.daily([]);
            me.housingRoster.unassigned([]);
            me.housingRoster.visitors([]);
            Tops.DayGroupObservable.assign(me.housingRoster.daily, data);
            var filtered = _.filter(data, function (item) {
                return item.assignedHousingType == 'NOT ASSIGNED';
            });
            me.housingRoster.unassigned(filtered);
            filtered = _.filter(data, function (item) {
                return item.assignedHousingType == 'DAY';
            });
            me.housingRoster.visitors(filtered);
        };
        housingReportsComponent.prototype.handleEvent = function (eventName, data) {
            if (data === void 0) { data = null; }
        };
        return housingReportsComponent;
    }());
    Tops.housingReportsComponent = housingReportsComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=housingReportsComponent.js.map