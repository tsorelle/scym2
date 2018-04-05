var Tops;
(function (Tops) {
    var registrationDashboardComponent = (function () {
        function registrationDashboardComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.testing = false;
            this.isRefreshLoad = false;
            this.registrationId = ko.observable();
            this.registration = {
                name: ko.observable(''),
                address: ko.observable(''),
                city: ko.observable(''),
                phone: ko.observable(''),
                email: ko.observable(''),
                notes: ko.observable(''),
                registrationCode: ko.observable(''),
                status: ko.observable(0),
                statusText: ko.observable(''),
                balanceDue: ko.observable(0.00),
                balance: ko.observable(''),
                housingAssignment: ko.observable(''),
                confirmed: ko.observable(false),
                registrarNotes: ko.observable('')
            };
            this.attenderForm = {
                arrived: ko.observable(''),
                name: ko.observable(''),
                ageGroup: ko.observable(''),
                dietPreference: ko.observable(''),
                specialNeeds: ko.observable(''),
                firstTimer: ko.observable(''),
                meeting: ko.observable(''),
                note: ko.observable(''),
                linens: ko.observable(''),
                housingAssignments: ko.observableArray([])
            };
            this.attenders = ko.observableArray();
            this.unCheckedCount = 0;
            this.dashboardCloseMessage = ko.observable('Closing?');
            this.changed = ko.observable(false);
            this.checkinEnabled = ko.observable(false);
            this.printInvoiceOnCheckin = ko.observable(true);
            this.showNotes = ko.observable(false);
            this.closeDashboard = function () {
                var me = _this;
                me.owner.getRegistrationContext(function (context) {
                    var errorMessage = '';
                    var today = me.testing ? new Date('2016-03-29') : new Date();
                    var ymStart = new Date(context.sessionInfo.startDate);
                    if (today >= ymStart) {
                        me.checkinEnabled(true);
                        if (me.unCheckedCount > 0) {
                            errorMessage = 'Some attenders not checked in';
                        }
                        if (me.registration.balanceDue()) {
                            if (errorMessage) {
                                errorMessage += ' and balance not paid. ';
                            }
                            else {
                                errorMessage = 'Balance not paid. ';
                            }
                        }
                        else if (errorMessage) {
                            errorMessage += '.';
                        }
                        if (errorMessage) {
                            errorMessage += ' Leave anyway?';
                        }
                    }
                    else {
                        me.checkinEnabled(false);
                    }
                    if (errorMessage) {
                        me.dashboardCloseMessage(errorMessage);
                        jQuery("#confirm-dashboard-close").modal('show');
                    }
                    else {
                        me.owner.handleEvent('dashboardclosed');
                    }
                });
            };
            this.exitDashboard = function () {
                var me = _this;
                jQuery("#confirm-dashboard-close").modal('hide');
                me.owner.handleEvent('dashboardclosed');
            };
            this.updateRegNotes = function () {
                var me = _this;
                jQuery("#dashboard-registration-notes-modal").modal('hide');
                me.application.hideServiceMessages();
                me.application.showWaiter('Updating notes...');
                var request = {
                    registrationId: me.registrationId(),
                    notes: me.registration.registrarNotes()
                };
                me.peanut.executeService('registration.UpdateRegistrationNotes', request, function (serviceResponse) {
                }).always(function () {
                    me.application.hideWaiter();
                });
            };
            this.showRegNotesModal = function () {
                jQuery("#dashboard-registration-notes-modal").modal('show');
            };
            this.showAttenderDetails = function (attender) {
                var me = _this;
                me.attenderForm.arrived(attender.arrived ? 'Yes' : 'No');
                me.attenderForm.name(attender.name);
                me.attenderForm.ageGroup(attender.ageGroup);
                me.attenderForm.dietPreference(attender.dietPreference);
                me.attenderForm.specialNeeds(attender.specialNeeds);
                me.attenderForm.firstTimer(attender.firstTimer);
                me.attenderForm.meeting(attender.meeting);
                me.attenderForm.note(attender.note);
                me.attenderForm.linens(attender.linens);
                me.attenderForm.housingAssignments(attender.housingAssignments);
                jQuery("#attender-detail-modal").modal('show');
            };
            this.checkIn = function () {
                var me = _this;
                var errorMessage = '';
                var attenders = me.attenders();
                var unchecked = attenders.length;
                _.each(attenders, function (attender) {
                    if (attender.arrived) {
                        unchecked -= 1;
                    }
                });
                if (unchecked) {
                    errorMessage = 'Some attenders are not checked';
                }
                var due = me.registration.balanceDue();
                if (due) {
                    var validPayment = me.paymentForm.validate();
                    if (!validPayment) {
                        errorMessage = 'Please correct the payment form or enter blank amount before saving';
                        me.dashboardCloseMessage(errorMessage);
                        jQuery("#dashboard-alert").modal('show');
                        return;
                    }
                    else {
                        var payment = me.paymentForm.getValues();
                        if (payment.amount < due) {
                            if (unchecked) {
                                errorMessage += ' and a balance is still outstanding';
                            }
                            else {
                                errorMessage = 'A balance is still outstanding';
                            }
                        }
                    }
                }
                if (errorMessage) {
                    errorMessage += '. Still want to save?';
                    me.dashboardCloseMessage(errorMessage);
                    jQuery("#confirm-dashboard-save").modal('show');
                }
                else {
                    me.saveAndExit(false);
                }
            };
            this.saveAndExit = function (closeModal) {
                if (closeModal === void 0) { closeModal = true; }
                var me = _this;
                if (closeModal) {
                    jQuery("#confirm-dashboard-save").modal('hide');
                }
                var paymentValues = me.paymentForm.getValues();
                if (paymentValues != null && paymentValues.amount < 1) {
                    paymentValues = null;
                }
                var request = {
                    registrationId: me.registrationId(),
                    payment: paymentValues,
                    attenders: []
                };
                _.each(me.attenders(), function (attender) {
                    request.attenders.push({
                        attenderId: attender.attenderId,
                        arrived: attender.arrived
                    });
                });
                me.application.hideServiceMessages();
                me.application.showWaiter('Checking in...');
                me.peanut.executeService('registration.CheckIn', request, me.handleCheckInResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleCheckInResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.changed(false);
                    me.owner.handleEvent('dashboardclosed', me.printInvoiceOnCheckin());
                }
            };
            this.toggleCheckin = function () {
                var me = _this;
                me.changed(true);
                return true;
            };
            this.printInvoice = function () {
                var me = _this;
                me.owner.handleEvent('printinvoice');
            };
            this.handleEvent = function (eventName, data) {
                var me = _this;
                switch (eventName) {
                    case 'balancechanged':
                        if (data.registrationId == me.registrationId()) {
                            me.setBalance(data.balance);
                        }
                        break;
                    case 'registrationdatarequest':
                        switch (data) {
                            case 'name':
                                me.paymentForm.handleEvent('registrationdataresponse', {
                                    name: 'name',
                                    value: me.registration.name()
                                });
                                break;
                            case 'balance':
                                me.paymentForm.handleEvent('registrationdataresponse', {
                                    name: 'balance',
                                    value: me.registration.balanceDue()
                                });
                                break;
                        }
                        break;
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        registrationDashboardComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.application.loadResources('paymentFormComponent.js', function () {
                me.paymentForm = new Tops.paymentFormComponent(me);
                me.application.registerComponent('payment-form', me.paymentForm, finalFunction);
            });
        };
        registrationDashboardComponent.prototype.refresh = function () {
            var me = this;
            me.isRefreshLoad = true;
            me.getRegistration(me.registrationId());
        };
        registrationDashboardComponent.prototype.getRegistrationHousing = function (registrationId) {
            var me = this;
            me.getRegistration(registrationId, 'registrationhousingloaded');
        };
        registrationDashboardComponent.prototype.getRegistration = function (registrationId, nextEvent) {
            if (nextEvent === void 0) { nextEvent = 'registrationdashboardloaded'; }
            var me = this;
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting the registration...');
            me.peanut.executeService('registration.GetRegistrationDashboard', registrationId, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.loadRegistrationResponse(serviceResponse.Value, nextEvent);
                }
                else {
                    me.application.hideWaiter();
                }
            }).fail(function () {
                me.application.hideWaiter();
            });
        };
        registrationDashboardComponent.prototype.setBalance = function (amount) {
            var me = this;
            amount = Tops.USDollars.toNumber(amount);
            me.registration.balanceDue(amount);
            var message = Tops.USDollars.balanceMessage(amount);
            me.registration.balance(message);
            if (amount < 0.01) {
                me.paymentForm.clear();
            }
        };
        registrationDashboardComponent.prototype.loadRegistrationResponse = function (response, nextEvent) {
            var me = this;
            var isRefresh = me.isRefreshLoad;
            me.isRefreshLoad = false;
            me.owner.getRegistrationContext(function (context) {
                var today = me.testing ? today = new Date('2016-03-29') : new Date();
                var ymStart = new Date(context.sessionInfo.startDate);
                me.checkinEnabled(today >= ymStart);
                me.paymentForm.clear();
                me.registrationId(response.registrationId);
                me.registration.name(response.name);
                me.registration.address(response.address);
                me.registration.city(response.city);
                me.registration.phone(response.phone);
                me.registration.email(response.email);
                me.registration.registrationCode(response.registrationCode);
                me.registration.status(response.status);
                me.registration.statusText(response.statusText);
                me.registration.housingAssignment(response.housingAssignment);
                me.registration.confirmed(response.confirmed);
                me.registration.registrarNotes(response.registrarNotes);
                var hasNotes = response.notes ? true : false;
                me.showNotes(hasNotes);
                me.registration.notes(response.notes);
                me.setBalance(response.balanceDue);
                me.unCheckedCount = response.attenders.length;
                _.each(response.attenders, function (attender) {
                    attender.arrived = (attender.arrived == 'Yes' || attender.arrived == true);
                    if (attender.arrived) {
                        me.unCheckedCount = -1;
                    }
                    if (attender.note) {
                        me.showNotes(true);
                    }
                });
                me.attenders(response.attenders);
                me.changed(false);
                me.application.hideWaiter();
                if (!isRefresh) {
                    me.owner.handleEvent(nextEvent, response.registrationId);
                }
            });
        };
        return registrationDashboardComponent;
    }());
    Tops.registrationDashboardComponent = registrationDashboardComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=registrationDashboardComponent.js.map