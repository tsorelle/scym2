var Tops;
(function (Tops) {
    var monthLookupComponent = (function () {
        function monthLookupComponent(params) {
            var me = this;
            me.monthList = ko.observableArray([
                { Name: 'January', Value: 1 },
                { Name: 'February', Value: 2 },
                { Name: 'March', Value: 3 },
                { Name: 'April', Value: 4 },
                { Name: 'May', Value: 5 },
                { Name: 'June', Value: 6 },
                { Name: 'July', Value: 7 },
                { Name: 'August', Value: 8 },
                { Name: 'September', Value: 9 },
                { Name: 'October', Value: 10 },
                { Name: 'November', Value: 11 },
                { Name: 'December', Value: 12 }
            ]);
            var defaultMonth = 1;
            if (params.month) {
                defaultMonth = params.month;
            }
            if (params.selected) {
                me.selectedMonth = params.selected;
            }
            else {
                me.selectedMonth = ko.observable();
            }
            me.setMonth(defaultMonth);
            me.monthLabel = ko.observable();
            if (params.label) {
                me.monthLabel(params.label);
            }
            else {
                me.monthLabel('Month');
            }
        }
        monthLookupComponent.prototype.setMonth = function (month) {
            var me = this;
            var monthObject = _.find(me.monthList(), function (item) {
                return item.Value == month;
            });
            me.selectedMonth(monthObject);
        };
        return monthLookupComponent;
    }());
    Tops.monthLookupComponent = monthLookupComponent;
})(Tops || (Tops = {}));
Tops.TkoComponentLoader.addVM('month-lookup', Tops.monthLookupComponent);
//# sourceMappingURL=monthLookupComponent.js.map