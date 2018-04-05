var Tops;
(function (Tops) {
    var selectListObservable = (function () {
        function selectListObservable(selectHandler, optionsList, defaultValue) {
            if (optionsList === void 0) { optionsList = []; }
            if (defaultValue === void 0) { defaultValue = null; }
            this.options = ko.observableArray();
            this.selected = ko.observable();
            var me = this;
            me.options(optionsList);
            me.setValue(defaultValue);
            me.selectHandler = selectHandler;
        }
        selectListObservable.prototype.setOptions = function (optionsList, defaultValue) {
            if (optionsList === void 0) { optionsList = []; }
            if (defaultValue === void 0) { defaultValue = null; }
            var me = this;
            me.options(optionsList);
            me.setValue(defaultValue);
        };
        selectListObservable.prototype.setValue = function (value) {
            var me = this;
            var options = me.options();
            var option = _.find(options, function (item) {
                return item.Value == value;
            });
            me.selected(option);
        };
        selectListObservable.prototype.getValue = function (defaultValue) {
            if (defaultValue === void 0) { defaultValue = ''; }
            var me = this;
            var selection = me.selected();
            return selection ? selection.Value : defaultValue;
        };
        selectListObservable.prototype.getName = function (defaultName) {
            if (defaultName === void 0) { defaultName = ''; }
            var me = this;
            var selection = me.selected();
            return selection ? selection.Name : defaultName;
        };
        selectListObservable.prototype.unsubscribe = function () {
            var me = this;
            me.subscription.dispose();
        };
        selectListObservable.prototype.subscribe = function () {
            var me = this;
            me.subscription = me.selected.subscribe(me.selectHandler);
        };
        return selectListObservable;
    }());
    Tops.selectListObservable = selectListObservable;
})(Tops || (Tops = {}));
//# sourceMappingURL=selectListObservable.js.map