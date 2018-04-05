var Tops;
(function (Tops) {
    var DayGroupObservable = (function () {
        function DayGroupObservable() {
        }
        DayGroupObservable.getDayText = function (dayNumber) {
            switch (dayNumber) {
                case 4: return 'Thursday';
                case 5: return 'Friday';
                case 6: return 'Saturday';
                case 7: return 'Sunday';
                default: return 'unknown';
            }
        };
        DayGroupObservable.create = function (reportData) {
            var result = [];
            for (var i = 4; i < 7; i++) {
                var filtered = _.filter(reportData, function (item) {
                    return item.dayNumber == i;
                });
                if (filtered.length) {
                    result.push({
                        day: DayGroupObservable.getDayText(i),
                        items: ko.observable(filtered)
                    });
                }
            }
            return result;
        };
        DayGroupObservable.assign = function (observable, reportData) {
            var list = DayGroupObservable.create(reportData);
            observable([]);
            observable(list);
        };
        DayGroupObservable.getCount = function (observable) {
            var count = 0;
            var list = observable();
            _.each(list, function (group) {
                count = count + group.items().length;
            });
            return count;
        };
        return DayGroupObservable;
    }());
    Tops.DayGroupObservable = DayGroupObservable;
})(Tops || (Tops = {}));
//# sourceMappingURL=DayGroupObservable.js.map