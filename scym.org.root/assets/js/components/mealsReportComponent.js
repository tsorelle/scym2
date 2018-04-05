var Tops;
(function (Tops) {
    var mealsReportComponent = (function () {
        function mealsReportComponent(application, owner, name) {
            var _this = this;
            this.roster = [];
            this.attenderList = ko.observableArray();
            this.attendersOnly = ko.observable(false);
            this.tableHeader = ko.observable('Diners');
            this.dayHeader = ko.observable('Thursday dinner');
            this.sessionStarted = ko.observable(false);
            this.test = ko.observable('');
            this.initialize = function (data) {
                var me = _this;
                if (data) {
                    me.attendersOnly(data.showAttendedOnly);
                    me.display(data);
                    me.mealFilter.subscribe();
                    me.dietFilter.subscribe();
                }
            };
            this.display = function (data) {
                var me = _this;
                me.roster = data.attenders;
                me.applyFilters();
            };
            this.setAttenderFilter = function () {
                var me = _this;
                me.applyFilters();
                return true;
            };
            this.onDietFilterSelected = function (selected) {
                var me = _this;
                var value = (selected) ? selected.Value : '';
                if (value) {
                    me.tableHeader(selected.Name + ' diners');
                }
                else {
                    me.tableHeader('Diners');
                }
                me.applyFilters();
            };
            this.onMealFilterSelected = function (selected) {
                var me = _this;
                var value = (selected) ? selected.Value : '';
                me.applyFilters();
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
            me.dietFilter = new Tops.selectListObservable(me.onDietFilterSelected, [
                { Name: 'Vegetarian', Value: 'vegetarian' },
                { Name: 'Gluten free', Value: 'glutenfree' }
            ]);
            me.mealFilter = new Tops.selectListObservable(me.onMealFilterSelected, [
                { Name: 'Thursday dinner', Value: 43 },
                { Name: 'Friday breakfast', Value: 51 },
                { Name: 'Friday lunch', Value: 52 },
                { Name: 'Friday dinner', Value: 53 },
                { Name: 'Saturday breakfast', Value: 61 },
                { Name: 'Saturday lunch', Value: 62 },
                { Name: 'Saturday dinner', Value: 63 },
                { Name: 'Sunday breakfast', Value: 71 },
                { Name: 'Sunday lunch (simple meal)', Value: 73 }
            ], 43);
        }
        mealsReportComponent.prototype.applyFilters = function () {
            var me = this;
            if (me.roster.length == 0) {
                me.attenderList([]);
            }
            else {
                var mealValue = me.mealFilter.getValue();
                var allAttenders = !(me.sessionStarted() && (!me.attendersOnly()));
                var dietValue = me.dietFilter.getValue();
                var data = _.filter(me.roster, function (item) {
                    if (item.mealTime == mealValue && (allAttenders || item.attended == 1)) {
                        switch (dietValue) {
                            case 'glutenfree':
                                return item.glutenFree != '';
                            case 'vegetarian':
                                return item.vegetarian != '';
                            default:
                                return true;
                        }
                    }
                    return false;
                });
                me.attenderList(data);
            }
        };
        return mealsReportComponent;
    }());
    Tops.mealsReportComponent = mealsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=mealsReportComponent.js.map