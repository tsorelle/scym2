var Tops;
(function (Tops) {
    var youthListComponent = (function () {
        function youthListComponent(application) {
            var _this = this;
            this.refreshNeeded = 'agegroups';
            this.youthData = [];
            this.youthList = ko.observableArray();
            this.youthDetailForm = {
                youthId: null,
                attenderId: null,
                ageGroupId: null,
                attenderNotes: ko.observable(''),
                youthNotes: ko.observable(''),
                errorMessage: ko.observable(''),
                fullName: ko.observable(''),
                specialNeeds: ko.observable(''),
                dietPreference: ko.observable(''),
                generationName: ko.observable(''),
                dateOfBirth: ko.observable(''),
                age: ko.observable(),
                gradeLevel: ko.observable(''),
                registrationName: ko.observable(''),
                meeting: ko.observable(''),
                formsSubmitted: ko.observable(false),
                sponsor: ko.observable(''),
                ageGroup: ko.observable(''),
                arrivalTimeText: ko.observable('')
            };
            this.selectedSortOrder = ko.observable();
            this.selectedFilter = ko.observable();
            this.ageGroupList = ko.observableArray();
            this.selectedAgeGroup = ko.observable();
            this.currentSort = '';
            this.currentFilter = '';
            this.sortOrderList = ko.observableArray([
                { Name: 'Last name', Value: 'lastname' },
                { Name: 'First name', Value: 'firstname' },
                { Name: 'Age', Value: 'age' },
                { Name: 'Age group', Value: 'agegroup' },
                { Name: 'Arrival time', Value: 'arrival' },
                { Name: 'Meeting', Value: 'meeting' }
            ]);
            this.filterList = ko.observableArray();
            this.handleEvent = function (eventName, data) {
                var me = _this;
                switch (eventName) {
                    case 'agegroupschanged':
                        if (me.refreshNeeded != 'all') {
                            me.refreshNeeded = 'agegroups';
                        }
                        break;
                    case 'youthlistchanged':
                        me.refreshNeeded = 'all';
                        break;
                    case 'youthlist-selected':
                        me.refresh();
                        break;
                }
            };
            this.refresh = function () {
                var me = _this;
                var refreshNeeded = me.refreshNeeded;
                me.refreshNeeded = 'agegroups';
                jQuery("#youth-update-modal").modal('hide');
                if (refreshNeeded == 'all') {
                    me.getList();
                }
            };
            this.computePrintHeader = function () {
                var me = _this;
                var sort = me.selectedSortOrder();
                var filter = me.selectedFilter();
                var result = '';
                if (filter == null) {
                    result = 'All youth attenders';
                }
                else {
                    var values = filter.Value.split(':');
                    switch (values[0]) {
                        case 'day':
                            result = result + "Youth attending on " + filter.Name;
                            break;
                        case 'agegroup':
                            result = result + filter.Name;
                            break;
                    }
                }
                if (sort != null) {
                    result = result + ' sorted by ' + sort.Name;
                }
                return result;
            };
            this.getList = function () {
                var me = _this;
                var request = null;
                me.application.hideServiceMessages();
                me.peanut.executeService('registration.GetYouthList', request, me.handleRefreshList)
                    .always(function () {
                });
            };
            this.handleInitialList = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.youthData = serviceResponse.Value;
                    me.currentFilter = 'all';
                    me.currentSort = 'lastname';
                    me.youthList(me.youthData);
                    var filterList = me.createFilterList();
                    me.filterList(filterList);
                    me.selectedSortOrder({ Name: 'Last name', Value: 'lastname' });
                    me.selectedFilter.subscribe(me.onFilterChange);
                    me.selectedSortOrder.subscribe(me.onSortOrderChange);
                }
            };
            this.onFilterChange = function (filter) {
                var me = _this;
                var sorted = me.applySort(me.youthData, me.currentSort);
                if (filter == null) {
                    me.youthList(sorted);
                }
                else {
                    if (me.currentFilter != filter.Value) {
                        var filtered = me.applyFilter(sorted, filter.Value);
                        me.youthList(filtered);
                    }
                }
            };
            this.onSortOrderChange = function (sortorder) {
                var me = _this;
                var sortType = 'lastname';
                if (sortorder != null) {
                    sortType = sortorder.Value;
                }
                me.currentSort = sortType;
                var sorted = me.applySort(me.youthList(), sortType);
                me.youthList(sorted);
            };
            this.handleRefreshList = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.youthData = serviceResponse.Value;
                    var list = me.applySort(me.youthData, me.currentSort);
                    var filterList = me.createFilterList();
                    me.filterList(filterList);
                    if (me.currentFilter) {
                        var filter = _.find(filterList, function (item) {
                            if (item.Value == me.currentFilter) {
                                return true;
                            }
                        });
                        if (filter != null) {
                            list = me.applyFilter(list, me.currentFilter);
                        }
                    }
                    me.youthList(list);
                }
            };
            this.saveChanges = function () {
                var me = _this;
                var request = {
                    youthId: me.youthDetailForm.youthId,
                    sponsor: me.youthDetailForm.sponsor(),
                    ageGroupId: me.selectedAgeGroup().Value,
                    youthNotes: me.youthDetailForm.youthNotes(),
                    formsSubmitted: me.youthDetailForm.formsSubmitted()
                };
                me.application.hideServiceMessages();
                me.application.showWaiter('Updating...');
                me.peanut.executeService('registration.UpdateYouthInfo', request, me.handleRefreshList)
                    .always(function () {
                    me.application.hideWaiter();
                    jQuery("#youth-update-modal").modal('hide');
                });
            };
            this.handleUpdateYouthResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.handleRefreshList(serviceResponse);
                }
            };
            this.showDetailForm = function (youth) {
                var me = _this;
                me.assignYouthForm(youth);
                if (me.refreshNeeded == 'agegroups') {
                    me.getAgeGroupList();
                    me.refreshNeeded = '';
                }
                else {
                    me.showUpdateForm();
                }
            };
            this.showCombinedNotes = function (youth) {
                var me = _this;
                me.assignYouthForm(youth);
                jQuery("#youth-notes-modal").modal('show');
            };
            this.handleGetAgeGroupList = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.ageGroupList(list);
                    me.showUpdateForm();
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.printHeader = ko.computed(me.computePrintHeader);
        }
        youthListComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting youth list...');
            me.peanut.executeService('registration.GetYouthList', request, me.handleInitialList)
                .always(function () {
                me.application.hideWaiter();
                if (finalFunction) {
                    finalFunction();
                }
            });
        };
        youthListComponent.prototype.applyFilter = function (list, filterType) {
            var me = this;
            me.currentFilter = filterType;
            if (filterType == 'all') {
                return list;
            }
            var parts = filterType.split(':');
            var value = parseInt(parts[1]);
            var arriveValue = (value + 1) * 10;
            filterType = parts[0];
            var filtered = _.filter(list, function (item) {
                switch (filterType) {
                    case 'day':
                        return (item.arrivalTime <= arriveValue && item.departureTime >= arriveValue);
                    case 'agegroup':
                        return item.ageGroupId == value;
                }
            });
            return filtered;
        };
        youthListComponent.prototype.clearSort = function () {
        };
        youthListComponent.prototype.applySort = function (list, sortType) {
            var me = this;
            var sorted = _.sortBy(list, function (item) {
                switch (sortType) {
                    case 'firstname':
                        return item.firstName;
                    case 'age':
                        return parseInt(item.age);
                    case 'arrival':
                        return parseInt(item.arrivalTime);
                    case 'agegroup':
                        return parseInt(item.ageGroupCutoff);
                    case 'meeting':
                        return item.affiliationCode;
                    default:
                        return item.lastName;
                }
            });
            return sorted;
        };
        youthListComponent.prototype.assignYouthForm = function (youth) {
            var me = this;
            me.youthDetailForm.youthId = youth.youthId;
            me.youthDetailForm.attenderId = youth.attenderId;
            me.youthDetailForm.ageGroupId = youth.ageGroupId;
            me.youthDetailForm.errorMessage('');
            me.youthDetailForm.attenderNotes(youth.attenderNotes);
            me.youthDetailForm.youthNotes(youth.youthNotes);
            me.youthDetailForm.fullName(youth.fullName);
            me.youthDetailForm.specialNeeds(youth.specialNeeds);
            me.youthDetailForm.dietPreference(youth.dietPreference);
            me.youthDetailForm.generationName(youth.generationName);
            me.youthDetailForm.dateOfBirth(youth.dateOfBirth);
            me.youthDetailForm.age(youth.age);
            me.youthDetailForm.gradeLevel(youth.gradeLevel);
            me.youthDetailForm.registrationName(youth.registrationName);
            me.youthDetailForm.meeting(youth.meeting);
            me.youthDetailForm.formsSubmitted(youth.formsSubmitted);
            me.youthDetailForm.sponsor(youth.sponsor);
            me.youthDetailForm.ageGroup(youth.ageGroup);
            me.youthDetailForm.arrivalTimeText(youth.arrivalTimeText);
        };
        youthListComponent.prototype.getAgeGroupList = function () {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.peanut.executeService('registration.GetAgeGroupList', request, me.handleGetAgeGroupList)
                .always(function () {
            });
        };
        youthListComponent.prototype.showUpdateForm = function () {
            var me = this;
            var list = me.ageGroupList();
            var ageGroup = _.find(list, function (item) {
                return item.Value == me.youthDetailForm.ageGroupId;
            });
            me.selectedAgeGroup(ageGroup);
            jQuery("#youth-update-modal").modal('show');
        };
        youthListComponent.prototype.createFilterList = function () {
            var me = this;
            var result = [];
            var sorted = _.sortBy(me.youthData, function (item) {
                return item.ageGroupCutoff;
            });
            var ageGroupId = -1;
            _.each(sorted, function (item) {
                if (item.ageGroupId != ageGroupId) {
                    ageGroupId = item.ageGroupId;
                    result.push({
                        Name: item.ageGroup,
                        Value: 'agegroup:' + item.ageGroupId
                    });
                }
            });
            result.push({ Name: 'Thursday', Value: 'day:4' });
            result.push({ Name: 'Friday', Value: 'day:5' });
            result.push({ Name: 'Saturday', Value: 'day:6' });
            result.push({ Name: 'Sunday', Value: 'day:7' });
            return result;
        };
        return youthListComponent;
    }());
    Tops.youthListComponent = youthListComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=youthListComponent.js.map