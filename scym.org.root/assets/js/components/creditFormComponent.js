var Tops;
(function (Tops) {
    var creditFormComponent = (function () {
        function creditFormComponent(owner, creditTypes) {
            var _this = this;
            this.amount = ko.observable('');
            this.errorMessage = ko.observable('');
            this.description = ko.observable('');
            this.notes = ko.observable('');
            this.visible = ko.observable(false);
            this.show = function () {
                var me = _this;
                me.visible(true);
            };
            this.hide = function () {
                var me = _this;
                me.visible(false);
            };
            this.setValues = function (values) {
                var me = _this;
            };
            this.getValues = function () {
                var me = _this;
                var result = {
                    description: me.description().trim(),
                    notes: me.notes().trim(),
                    amount: Number(me.amount()),
                    creditTypeId: me.creditTypes.getValue()
                };
                return result;
            };
            this.clear = function () {
                var me = _this;
                me.amount('');
                me.creditTypes.setValue(null);
                me.description('');
                me.notes('');
            };
            this.getErrorMessage = function () {
                return _this.errorMessage();
            };
            this.validate = function (requireAmount) {
                if (requireAmount === void 0) { requireAmount = false; }
                var me = _this;
                me.errorMessage('');
                var amount = Tops.Peanut.validateCurrency(me.amount());
                if (amount === false) {
                    me.errorMessage('Please enter a valid payment amount.');
                    return false;
                }
                me.amount(amount);
                var typeId = me.creditTypes.getValue(0);
                if (typeId == 0) {
                    me.errorMessage('Please select a credit type.');
                    return false;
                }
                if (!me.description().trim()) {
                    me.errorMessage('Please enter a description.');
                    return false;
                }
                return true;
            };
            this.save = function () {
                var me = _this;
                if (me.validate()) {
                    var data = me.getValues();
                    me.hide();
                    me.owner.handleEvent('addcredit', data);
                }
            };
            this.cancel = function () {
                var me = _this;
                me.clear();
                me.owner.handleEvent('creditformclosed');
            };
            var me = this;
            me.owner = owner;
            me.creditTypes = new Tops.selectListObservable(null, creditTypes);
        }
        creditFormComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.clear();
            if (finalFunction) {
                finalFunction();
            }
        };
        return creditFormComponent;
    }());
    Tops.creditFormComponent = creditFormComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=creditFormComponent.js.map