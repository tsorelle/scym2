var Tops;
(function (Tops) {
    var registrationFinanceComponent = (function () {
        function registrationFinanceComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.lookups = [];
            this.registrationId = ko.observable();
            this.updating = ko.observable(false);
            this.donations = ko.observableArray();
            this.payments = ko.observableArray();
            this.charges = ko.observableArray();
            this.credits = ko.observableArray();
            this.selectedAccountItem = null;
            this.deleteMessage = ko.observable('');
            this.registrationName = ko.observable('');
            this.registrationCode = ko.observable('');
            this.paymentFormHidden = ko.observable(true);
            this.donationFormHidden = ko.observable(true);
            this.chargeFormHidden = ko.observable(true);
            this.creditFormHidden = ko.observable(true);
            this.notesView = ko.observable('');
            this.balance = ko.observable(0.00);
            this.totalDue = ko.observable('');
            this.accountStatus = ko.observable('');
            this.paymentTotal = ko.observable('');
            this.creditTotal = ko.observable('');
            this.chargeTotal = ko.observable('');
            this.donationTotal = ko.observable('');
            this.currentDate = ko.pureComputed(function () {
                return (new Date()).toDateString();
            });
            this.showPaymentForm = function () {
                var me = _this;
                if (me.paymentForm) {
                    me.showForm(me.paymentForm, me.paymentFormHidden);
                }
                else {
                    me.paymentForm = new Tops.paymentFormComponent(me);
                    me.application.registerAndBindComponent('newpayment-form', me.paymentForm, function () {
                        me.showForm(me.paymentForm, me.paymentFormHidden);
                    });
                }
            };
            this.showDonationForm = function () {
                var me = _this;
                if (me.donationForm) {
                    me.showForm(me.donationForm, me.donationFormHidden);
                }
                else {
                    me.application.bindComponent('donation-form', function () {
                        var lookup = me.getLookup('donation');
                        me.donationForm = new Tops.donationFormComponent(me, lookup);
                        return me.donationForm;
                    }, function () {
                        me.showForm(me.donationForm, me.donationFormHidden);
                    });
                }
            };
            this.showCreditForm = function () {
                var me = _this;
                if (me.creditForm) {
                    me.showForm(me.creditForm, me.creditFormHidden);
                }
                else {
                    me.application.bindComponent('credit-form', function () {
                        var lookup = me.getLookup('credit');
                        me.creditForm = new Tops.creditFormComponent(me, lookup);
                        return me.creditForm;
                    }, function () {
                        me.showForm(me.creditForm, me.creditFormHidden);
                    });
                }
            };
            this.showChargeForm = function () {
                var me = _this;
                var me = _this;
                if (me.chargeForm) {
                    me.showForm(me.chargeForm, me.chargeFormHidden);
                }
                else {
                    me.application.bindComponent('charge-form', function () {
                        var lookup = me.getLookup('fee');
                        me.chargeForm = new Tops.chargeFormComponent(me, lookup);
                        return me.chargeForm;
                    }, function () {
                        me.showForm(me.chargeForm, me.chargeFormHidden);
                    });
                }
            };
            this.show = function () {
                jQuery('#finance-component-wrapper');
            };
            this.assignAccountItems = function (response) {
                var me = _this;
                me.registrationId(response.registrationId);
                me.registrationCode(response.registrationCode);
                me.registrationName(response.registrationName);
                me.payments(response.payments);
                me.charges(response.charges);
                me.credits(response.credits);
                me.donations(response.donations);
                me.calculateTotals(response);
                me.owner.handleEvent('accountloaded', response.registrationId);
            };
            this.hideForm = function (form, hideFlag) {
                var me = _this;
                hideFlag(true);
                form.hide();
            };
            this.showForm = function (form, hideFlag) {
                var me = _this;
                hideFlag(false);
                form.clear();
                form.show();
            };
            this.handleEvent = function (eventName, data) {
                var me = _this;
                switch (eventName) {
                    case 'addpayment':
                        me.hideForm(me.paymentForm, me.paymentFormHidden);
                        me.updateAccount(data, 'payment', 'add');
                        break;
                    case 'addcharge':
                        me.hideForm(me.chargeForm, me.chargeFormHidden);
                        me.updateAccount(data, 'charge', 'add');
                        break;
                    case 'addcredit':
                        me.hideForm(me.creditForm, me.creditFormHidden);
                        me.updateAccount(data, 'credit', 'add');
                        break;
                    case 'adddonation':
                        me.hideForm(me.donationForm, me.donationFormHidden);
                        me.updateAccount(data, 'donation', 'add');
                        break;
                    case 'removepayment':
                        me.updateAccount(data, 'payment', 'remove');
                        break;
                    case 'removecharge':
                        me.updateAccount(data, 'charge', 'remove');
                        break;
                    case 'removecredit':
                        me.updateAccount(data, 'credit', 'remove');
                        break;
                    case 'removedonation':
                        me.updateAccount(data, 'donation', 'remove');
                        break;
                    case 'paymentformclosed':
                        me.hideForm(me.paymentForm, me.paymentFormHidden);
                        break;
                    case 'chargeformclosed':
                        me.hideForm(me.chargeForm, me.chargeFormHidden);
                        break;
                    case 'creditformclosed':
                        me.hideForm(me.creditForm, me.creditFormHidden);
                        break;
                    case 'donationformclosed':
                        me.hideForm(me.donationForm, me.donationFormHidden);
                        break;
                    case 'dashboardclosed':
                        me.registrationId(0);
                        break;
                }
            };
            this.showNotes = function (item) {
                var me = _this;
                me.notesView(item.notes);
                jQuery("#finance-item-notes-modal").modal('show');
            };
            this.deleteItem = function (item) {
                var me = _this;
                me.selectedAccountItem = item;
                me.deleteMessage('Delete this ' + item.itemType + '?');
                jQuery("#confirm-acount-item-delete-modal").modal('show');
            };
            this.removeItem = function () {
                var me = _this;
                jQuery("#confirm-acount-item-delete-modal").modal('hide');
                me.updateAccount(me.selectedAccountItem.id, me.selectedAccountItem.itemType, 'remove');
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        registrationFinanceComponent.prototype.clearDisplay = function () {
            var me = this;
            me.payments([]);
            me.charges([]);
            me.credits([]);
            me.donations([]);
            me.balance(0.00);
            me.totalDue('');
            me.accountStatus('');
            me.paymentTotal('');
            me.creditTotal('');
            me.chargeTotal('');
            me.donationTotal('');
            me.paymentFormHidden(true);
            me.creditFormHidden(true);
            me.chargeFormHidden(true);
            me.donationFormHidden(true);
        };
        registrationFinanceComponent.prototype.prepareService = function (registrationId) {
            var me = this;
            me.clearDisplay();
            me.registrationId(0);
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting account details...');
            return {
                registrationId: registrationId,
                includeLookups: false
            };
        };
        registrationFinanceComponent.prototype.initialize = function (registrationId, finalFunction) {
            var me = this;
            me.application.loadResources(['selectListObservable.js'], function () {
                var request = me.prepareService(registrationId);
                request.includeLookups = true;
                me.peanut.executeService('registration.GetAccountDetails', request, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        var response = serviceResponse.Value;
                        me.assignAccountItems(response);
                        me.lookups = response.lookups;
                        jQuery('#finance-view-container').show();
                        me.application.hideWaiter();
                        if (finalFunction) {
                            finalFunction();
                        }
                    }
                })
                    .fail(function () {
                    me.application.hideWaiter();
                });
            });
        };
        registrationFinanceComponent.prototype.getLookup = function (lookupType) {
            var me = this;
            return _.filter(me.lookups, function (item) {
                return item.lookupType == lookupType;
            });
        };
        registrationFinanceComponent.prototype.refreshAccount = function () {
            var me = this;
            me.getAccount(me.registrationId());
        };
        registrationFinanceComponent.prototype.getAccount = function (registrationId, finalFunction) {
            var me = this;
            var request = me.prepareService(registrationId);
            me.peanut.executeService('registration.GetAccountDetails', request, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.assignAccountItems(response);
                    me.show();
                    if (finalFunction) {
                        finalFunction();
                    }
                }
            })
                .always(function () {
                me.application.hideWaiter();
            });
        };
        registrationFinanceComponent.prototype.updateAccount = function (data, itemType, action) {
            var me = this;
            var request = {
                registrationId: me.registrationId(),
                itemType: itemType,
                data: data,
                action: action
            };
            me.application.hideServiceMessages();
            var message = action == 'add' ? 'Adding' : 'Removing';
            me.application.showWaiter(message + ' a ' + itemType + '...');
            me.peanut.executeService('registration.UpdateAccount', request, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.assignAccountItems(response);
                    var balanceChangeNotice = {
                        registrationId: me.registrationId(),
                        balance: me.balance()
                    };
                    me.owner.handleEvent('balancechanged', balanceChangeNotice);
                }
            }).always(function () {
                me.application.hideWaiter();
            });
        };
        registrationFinanceComponent.prototype.sumItems = function (items) {
            var total = 0.0;
            _.each(items, function (item) {
                total += Number(item.amount);
            });
            return Tops.USDollars.roundNumber(total);
        };
        registrationFinanceComponent.prototype.formatCost = function (value, observable) {
            var text = (value > 0.00) ? '(' + Tops.USDollars.toUSD(value) + ' total)' : '(none)';
            observable(text);
        };
        registrationFinanceComponent.prototype.setBalance = function (balance) {
            var me = this;
            balance = Tops.USDollars.roundNumber(balance);
            me.balance(balance);
            var balanceMessage = Tops.USDollars.balanceMessage(balance);
            me.accountStatus(balanceMessage);
        };
        registrationFinanceComponent.prototype.calculateTotals = function (response) {
            var me = this;
            var paymentTotal = me.sumItems(response.payments);
            var creditTotal = me.sumItems(response.credits);
            var chargeTotal = me.sumItems(response.charges);
            var donationTotal = me.sumItems(response.donations);
            var totalDue = Tops.USDollars.roundNumber((chargeTotal + donationTotal) - creditTotal);
            var balance = (chargeTotal + donationTotal) - (creditTotal + paymentTotal);
            me.setBalance(balance);
            me.formatCost(totalDue, me.totalDue);
            me.formatCost(paymentTotal, me.paymentTotal);
            me.formatCost(creditTotal, me.creditTotal);
            me.formatCost(chargeTotal, me.chargeTotal);
            me.formatCost(donationTotal, me.donationTotal);
        };
        return registrationFinanceComponent;
    }());
    Tops.registrationFinanceComponent = registrationFinanceComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=registrationFinanceComponent.js.map