var Tops;
(function (Tops) {
    var attendersReportComponent = (function () {
        function attendersReportComponent(application, owner, name) {
            var _this = this;
            this.reportData = [];
            this.attenderList = ko.observableArray();
            this.notesView = ko.observableArray();
            this.tableHeader = ko.observable('Attenders');
            this.notesHeader = ko.observable('Notes for attenders');
            this.firstTimersOnly = ko.observable(false);
            this.showNotes = ko.observable(false);
            this.attenderForm = {
                name: ko.observable(''),
                notes: ko.observable('')
            };
            this.onCheckedInFilterSelected = function (selection) {
                var me = _this;
                me.sortAndFilter();
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
            };
            this.onFirstTimersCheck = function () {
                var me = _this;
                me.sortAndFilter();
                return true;
            };
            this.onArrivalDayFilterSelected = function (selection) {
                var me = _this;
                me.sortAndFilter();
            };
            this.onSortTypeSelected = function (selection) {
                var me = _this;
                me.sortAndFilter();
            };
            this.showHousingAssignments = function (item) {
                var me = _this;
                me.owner.handleEvent('housingassignmentsrequested', item.registrationId);
            };
            this.showAttenderNotes = function (item) {
                var me = _this;
                me.attenderForm.name(item.AttenderName);
                me.attenderForm.notes(item.notes);
                jQuery("#attender-report-notes-modal").modal('show');
            };
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
                me.sortOrder.subscribe();
                me.arrivalDayFilter.subscribe();
                me.checkedInFilter.subscribe();
            };
            this.display = function (data) {
                var me = _this;
                me.reportData = data;
                me.sortAndFilter();
            };
            this.select = function () {
                var me = _this;
                if (me.attenderList().length == 0) {
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
            me.checkedInFilter = new Tops.selectListObservable(me.onCheckedInFilterSelected, [
                { Name: 'Checked in', Value: 'Yes' },
                { Name: 'Not checked in', Value: 'No' }
            ]);
            me.arrivalDayFilter = new Tops.selectListObservable(me.onCheckedInFilterSelected, [
                { Name: 'Thursday', Value: 4 },
                { Name: 'Friday', Value: 5 },
                { Name: 'Saturday', Value: 6 }
            ]);
            me.sortOrder = new Tops.selectListObservable(me.onCheckedInFilterSelected, [
                { Name: 'Name', Value: 'AttenderName' },
                { Name: 'Meeting', Value: 'Affiliation' },
                { Name: 'Arrival time', Value: 'arrivalTime' }
            ], 'AttenderName');
        }
        attendersReportComponent.prototype.sortAndFilter = function () {
            var me = this;
            var sortValue = me.sortOrder.getValue();
            var anyTimers = !me.firstTimersOnly();
            var checkedInValue = me.checkedInFilter.getValue('any');
            var arrivalDayValue = me.arrivalDayFilter.getValue(0);
            me.notesView([]);
            me.attenderList([]);
            var list = [];
            if (arrivalDayValue != 0) {
                list = _.sortBy(me.reportData, 'arrivalTime');
            }
            list = _.sortBy(me.reportData, sortValue);
            list = _.filter(list, function (item) {
                return ((anyTimers || item.FirstTimeAttender == 'Yes') &&
                    (checkedInValue == 'any' || item.CheckedIn == checkedInValue) &&
                    (arrivalDayValue === 0 || (Math.floor(item.arrivalTime / 10) == arrivalDayValue)));
            });
            me.attenderList(list);
            list = _.filter(list, function (item) {
                return item.notes != '';
            });
            me.notesView(list);
            var headerPrefix = me.firstTimersOnly() ? 'First time attenders' : 'Attenders';
            var headerNotesPrefix = me.firstTimersOnly() ? 'Notes for first time attenders' : 'Notes for attenders';
            var header = ' ';
            if (arrivalDayValue != 0) {
                header = header + ' arriving ' + me.arrivalDayFilter.getName();
            }
            if (checkedInValue == 'Yes') {
                header = header + ', checked in';
            }
            else if (checkedInValue == 'No') {
                header = header + ', not checked in';
            }
            me.tableHeader(headerPrefix + header);
            me.notesHeader(headerNotesPrefix + header);
        };
        return attendersReportComponent;
    }());
    Tops.attendersReportComponent = attendersReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=attendersReportComponent.js.map