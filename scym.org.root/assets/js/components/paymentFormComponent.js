var Tops;
(function (Tops) {
    var paymentFormComponent = (function () {
        function paymentFormComponent(owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.amount = ko.observable('');
            this.notes = ko.observable('');
            this.paymentType = ko.observable('check');
            this.paymentTypes = ['check', 'cash'];
            this.checkNumber = ko.observable('');
            this.errorMessage = ko.observable('');
            this.payor = ko.observable('');
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
                _this.amount(values.amount);
            };
            this.setAmount = function (amount) {
                _this.amount(amount);
            };
            this.getValues = function () {
                var me = _this;
                var paymentType = me.paymentType();
                var result = {
                    amount: Number(me.amount()),
                    type: paymentType,
                    payor: me.payor(),
                    notes: me.notes(),
                    checkNumber: paymentType == 'cash' ? 'cash' : me.checkNumber(),
                    paymentType: paymentType == 'cash' ? 1 : 2
                };
                return result;
            };
            this.clear = function () {
                var me = _this;
                me.amount('');
                me.paymentType('check');
                me.checkNumber('');
                me.notes('');
                me.payor('');
            };
            this.getErrorMessage = function () {
                return _this.errorMessage();
            };
            this.validate = function (requireAmount) {
                if (requireAmount === void 0) { requireAmount = false; }
                var me = _this;
                me.errorMessage('');
                var hasAmount = true;
                var value = me.amount();
                if (typeof value == 'string') {
                    value = value.trim();
                    hasAmount = value.trim() ? true : false;
                }
                if (requireAmount || hasAmount) {
                    var amount = Tops.Peanut.validateCurrency(value);
                    if (amount === false) {
                        me.errorMessage('Please enter a valid payment amount.');
                        return false;
                    }
                    if (me.paymentType() == 'check') {
                        var checkNumber = me.checkNumber().trim();
                        if (!checkNumber) {
                            me.errorMessage('A check number is required.');
                            return false;
                        }
                        else {
                            me.checkNumber(checkNumber);
                        }
                    }
                    if (!me.payor().trim()) {
                        me.errorMessage('Please enter a payor');
                        return false;
                    }
                }
                return true;
            };
            this.save = function () {
                var me = _this;
                if (me.validate()) {
                    var payment = me.getValues();
                    me.owner.handleEvent('addpayment', payment);
                    me.hide();
                }
            };
            this.cancel = function () {
                var me = _this;
                me.clear();
                me.owner.handleEvent('paymentformclosed');
            };
            this.fillBalance = function () {
                var me = _this;
                me.owner.handleEvent('registrationdatarequest', 'balance');
            };
            this.fillPayor = function () {
                var me = _this;
                me.owner.handleEvent('registrationdatarequest', 'name');
            };
            this.handleEvent = function (eventName, data) {
                var me = _this;
                switch (eventName) {
                    case 'registrationdataresponse':
                        if (data && data.name && data.value) {
                            switch (data.name) {
                                case 'name':
                                    me.payor(data.value);
                                    break;
                                case 'balance':
                                    me.amount(data.value);
                                    break;
                            }
                            break;
                        }
                }
            };
            var me = this;
            me.owner = owner;
        }
        paymentFormComponent.prototype.initialize = function (finalFunction) {
            var me = this;
        };
        return paymentFormComponent;
    }());
    Tops.paymentFormComponent = paymentFormComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=paymentFormComponent.js.map