var Tops;
(function (Tops) {
    var chargeFormComponent = (function () {
        function chargeFormComponent(owner, feeTypes) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.amount = ko.observable('');
            this.errorMessage = ko.observable('');
            this.basis = ko.observable('');
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
                    amount: Number(me.amount()),
                    basis: me.basis().trim(),
                    notes: me.notes().trim(),
                    feeTypeId: me.feeTypesList.getValue()
                };
                return result;
            };
            this.clear = function () {
                var me = _this;
                me.amount('');
                me.basis('');
                me.notes('');
                me.errorMessage('');
                me.feeTypesList.setValue(null);
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
                var typeId = me.feeTypesList.getValue(0);
                if (typeId == 0) {
                    me.errorMessage('Please select a charge type.');
                    return false;
                }
                if (!me.basis().trim()) {
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
                    me.owner.handleEvent('addcharge', data);
                }
            };
            this.cancel = function () {
                var me = _this;
                me.clear();
                me.owner.handleEvent('chargeformclosed');
            };
            var me = this;
            me.owner = owner;
            me.feeTypesList = new Tops.selectListObservable(null, feeTypes);
            me.feeTypesList.selected.subscribe(function (item) {
                if ((!item) || item.Name == 'Other') {
                    me.basis('');
                }
                else {
                    me.basis(item.Name);
                }
            });
        }
        chargeFormComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.clear();
            if (finalFunction) {
                finalFunction();
            }
        };
        return chargeFormComponent;
    }());
    Tops.chargeFormComponent = chargeFormComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=chargeFormComponent.js.map