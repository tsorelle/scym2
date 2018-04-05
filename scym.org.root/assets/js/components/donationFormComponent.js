var Tops;
(function (Tops) {
    var donationFormComponent = (function () {
        function donationFormComponent(owner, donationTypes) {
            var _this = this;
            this.amount = ko.observable('');
            this.errorMessage = ko.observable('');
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
                    donationTypeId: me.donationTypes.getValue(),
                    notes: me.notes().trim()
                };
                return result;
            };
            this.clear = function () {
                var me = _this;
                me.notes('');
                me.donationTypes.setValue(null);
                me.amount('');
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
                var typeId = me.donationTypes.getValue(0);
                if (typeId == 0) {
                    me.errorMessage('Please select a donation type.');
                    return false;
                }
                return true;
            };
            this.save = function () {
                var me = _this;
                if (me.validate()) {
                    var data = me.getValues();
                    me.hide();
                    me.owner.handleEvent('adddonation', data);
                }
            };
            this.cancel = function () {
                var me = _this;
                me.clear();
                me.owner.handleEvent('donationformclosed');
            };
            var me = this;
            me.owner = owner;
            me.donationTypes = new Tops.selectListObservable(null, donationTypes);
        }
        donationFormComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.clear();
            if (finalFunction) {
                finalFunction();
            }
        };
        return donationFormComponent;
    }());
    Tops.donationFormComponent = donationFormComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=donationFormComponent.js.map