var Tops;
(function (Tops) {
    var registrationsReportComponent = (function () {
        function registrationsReportComponent(application, owner, name) {
            var _this = this;
            this.listData = [];
            this.registrationsList = ko.observableArray();
            this.selectedSortOrder = ko.observable();
            this.selectedFilter = ko.observable();
            this.printHeader = ko.observable('');
            this.currentSort = '';
            this.currentFilter = '';
            this.sortOrderList = ko.observableArray([
                { Name: 'Name', Value: 'name' },
                { Name: 'Received date', Value: 'received' },
            ]);
            this.filterList = ko.observableArray([
                { Name: 'All', Value: 'all' },
                { Name: 'Confirmed', Value: 'confirmed-yes' },
                { Name: 'Not confirmed', Value: 'confirmed-no' },
            ]);
            this.setPrintHeader = function () {
                var me = _this;
                switch (me.currentFilter) {
                    case 'confirmed-yes':
                        me.printHeader('Confirmed registrations');
                        break;
                    case 'confirmed-no':
                        me.printHeader('Registrations not confirmed');
                        break;
                    default:
                        me.printHeader('All registrations');
                        break;
                }
            };
            this.setSortOrder = function (value) {
                var me = _this;
                var order = _.find(me.sortOrderList(), function (item) {
                    return item.Value == value;
                });
                me.selectedSortOrder(order);
                me.currentSort = value;
            };
            this.setFilter = function (value) {
                var me = _this;
                var filter = _.find(me.filterList(), function (item) {
                    return item.Value == value;
                });
                me.selectedFilter(filter);
                me.currentFilter = value;
            };
            this.lookupRegistration = function (item) {
                var me = _this;
                me.owner.handleEvent('registrationselected', item.registrationId);
            };
            this.initialize = function (data) {
                var me = _this;
                me.setSortOrder('name');
                me.setFilter('all');
                me.selectedFilter.subscribe(me.onFilterChange);
                me.selectedSortOrder.subscribe(me.onSortOrderChange);
                me.display(data);
            };
            this.display = function (data) {
                var me = _this;
                data = me.applySort(data, me.currentFilter);
                me.listData = data;
                me.registrationsList(me.applyFilter(data, me.currentFilter));
            };
            this.select = function () {
                var me = _this;
                if (me.registrationsList().length == 0) {
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
            this.openRegistration = function (item) {
                alert('Open registration ' + item.registrationCode);
            };
            this.onFilterChange = function (filter) {
                var me = _this;
                var sorted = me.applySort(me.listData, me.currentSort);
                if (filter == null) {
                    me.registrationsList(sorted);
                }
                else {
                    if (me.currentFilter != filter.Value) {
                        var filtered = me.applyFilter(sorted, filter.Value);
                        me.registrationsList(filtered);
                    }
                }
            };
            this.onSortOrderChange = function (sortorder) {
                var me = _this;
                var sortType = 'name';
                if (sortorder != null) {
                    sortType = sortorder.Value;
                }
                me.currentSort = sortType;
                var sorted = me.applySort(me.registrationsList(), sortType);
                me.registrationsList(sorted);
            };
            this.applyFilter = function (list, filterType) {
                var me = _this;
                me.currentFilter = filterType;
                me.setPrintHeader();
                if (filterType == 'all') {
                    return list;
                }
                var filtered = _.filter(list, function (item) {
                    switch (filterType) {
                        case 'confirmed-yes':
                            return item.confirmed == 'Yes';
                        case 'confirmed-no':
                            return item.confirmed == 'No';
                        default:
                            return true;
                    }
                });
                return filtered;
            };
            this.applySort = function (list, sortType) {
                var me = _this;
                var sorted = _.sortBy(list, function (item) {
                    switch (sortType) {
                        case 'received':
                            return item.receivedDate;
                        default:
                            return item.name;
                    }
                });
                me.currentSort = sortType;
                return sorted;
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
            me.reportName = name;
        }
        return registrationsReportComponent;
    }());
    Tops.registrationsReportComponent = registrationsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=registrationsReportComponent.js.map