var Tops;
(function (Tops) {
    var mealcountsReportComponent = (function () {
        function mealcountsReportComponent(application, owner, name) {
            var _this = this;
            this.registeredMeals = ko.observableArray();
            this.attendedMeals = ko.observableArray();
            this.selectedCountType = ko.observable();
            this.initialize = function (data) {
                var me = _this;
                me.display(data);
                me.selectedCountType('Requested');
            };
            this.display = function (data) {
                var me = _this;
                me.registeredMeals([]);
                me.attendedMeals([]);
                var subData = _.filter(data, function (item) {
                    return item.attendersOnly == 0;
                });
                var table = me.getReportCounts(subData);
                me.registeredMeals(table);
                subData = _.filter(data, function (item) {
                    return item.attendersOnly == 1;
                });
                if (subData.length > 0) {
                    table = me.getReportCounts(subData);
                    me.attendedMeals(table);
                }
            };
            this.select = function () {
                var me = _this;
                if (me.registeredMeals().length == 0) {
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
        }
        mealcountsReportComponent.prototype.getReportCounts = function (counts) {
            var result = [
                { mealTime: 43, meal: 'Thursday Dinner', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 51, meal: 'Friday Breakfast', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 52, meal: 'Friday Lunch', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 53, meal: 'Friday Dinner', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 61, meal: 'Saturday Breakfast', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 62, meal: 'Saturday Lunch', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 63, meal: 'Saturday Dinner', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 71, meal: 'Sunday Breakfast', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 },
                { mealTime: 72, meal: 'Sunday Lunch', regular: 0, vegetarian: 0, glutenFree: 0, both: 0, total: 0 }
            ];
            _.each(result, function (reportRow) {
                var mealTime = reportRow.mealTime;
                for (var dietType = 0; dietType < 4; dietType += 1) {
                    var countItem = _.find(counts, function (dataItem) {
                        return dataItem.mealTime == mealTime && dataItem.diettype == dietType;
                    });
                    if (countItem) {
                        switch (dietType) {
                            case 0:
                                reportRow.regular = parseInt(countItem.count);
                                break;
                            case 1:
                                reportRow.vegetarian = parseInt(countItem.count);
                                break;
                            case 2:
                                reportRow.glutenFree = parseInt(countItem.count);
                                break;
                            case 3:
                                reportRow.both = parseInt(countItem.count);
                                break;
                        }
                    }
                }
                reportRow.total = reportRow.regular + reportRow.both + reportRow.glutenFree + reportRow.vegetarian;
            });
            return result;
        };
        return mealcountsReportComponent;
    }());
    Tops.mealcountsReportComponent = mealcountsReportComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=mealcountsReportComponent.js.map