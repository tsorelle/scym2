var Tops;
(function (Tops) {
    var RegistrationAdminViewModel = (function () {
        function RegistrationAdminViewModel() {
            var _this = this;
            this.context = null;
            this.currentForm = ko.observable('registrations');
            this.counts = {
                registrations: ko.observable(''),
                attenders: ko.observable('')
            };
            this.selectedRegistrationId = ko.observable(0);
            this.registrationChanged = false;
            this.afterInit = function () {
                var me = _this;
                me.application.bindSection('tabs');
                me.application.bindSection('registrations-form');
                me.application.bindNode('registration-finance-form');
                me.application.bindNode('assignments-form');
                me.application.bindNode('reports-form');
                me.application.showDefaultSection();
                me.getCounts();
            };
            this.getCounts = function () {
                var me = _this;
                var request = null;
                me.application.hideServiceMessages();
                me.peanut.executeService('registration.GetRegistrationCount', request, me.handleGetCountsResponse);
            };
            this.handleGetCountsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.counts.registrations(serviceResponse.Value.registrations);
                    me.counts.attenders(serviceResponse.Value.attenders);
                }
            };
            this.showRegistrationForm = function () {
                var me = _this;
                if (me.registrationChanged) {
                    me.registrationChanged = false;
                    me.registrationDashboardVm.refresh();
                }
                me.currentForm('registrations');
            };
            this.showFinanceForm = function (finalFunction) {
                var me = _this;
                if (typeof finalFunction !== 'function') {
                    finalFunction = null;
                }
                if (me.registrationFinanceVm) {
                    if (me.registrationFinanceVm.registrationId() != me.selectedRegistrationId() || (finalFunction)) {
                        me.registrationFinanceVm.getAccount(me.selectedRegistrationId(), function () {
                            me.currentForm('finance');
                            if (finalFunction) {
                                finalFunction();
                            }
                        });
                    }
                    else {
                        me.currentForm('finance');
                        if (finalFunction) {
                            finalFunction();
                        }
                    }
                }
                else {
                    me.application.bindComponent('registration-finance', function () {
                        me.registrationFinanceVm = new Tops.registrationFinanceComponent(me.application, me);
                        return me.registrationFinanceVm;
                    }, function () {
                        me.registrationFinanceVm.initialize(me.selectedRegistrationId(), finalFunction);
                    });
                }
            };
            this.showHousingAssignmentsForm = function () {
                var me = _this;
                if (me.housingAssignmentsVM) {
                    if (me.housingAssignmentsVM.registrationId() != me.selectedRegistrationId()) {
                        me.housingAssignmentsVM.getAssignments(me.selectedRegistrationId());
                    }
                    else {
                        me.currentForm('housing-assignments');
                    }
                }
                else {
                    me.application.bindComponent('housing-assignment', function () {
                        me.housingAssignmentsVM = new Tops.housingAssignmentComponent(me.application, me, true);
                        return me.housingAssignmentsVM;
                    }, function () {
                        me.housingAssignmentsVM.initialize(function () {
                            me.housingAssignmentsVM.getAssignments(me.selectedRegistrationId());
                        });
                    });
                }
            };
            this.showReportsForm = function () {
                var me = _this;
                if (me.adminReportsVm) {
                    me.currentForm('reports');
                }
                else {
                    me.application.bindComponent('admin-reports', function () {
                        me.adminReportsVm = new Tops.adminReportsComponent(me.application, me);
                        return me.adminReportsVm;
                    }, function () {
                        me.adminReportsVm.initialize(function () {
                            me.currentForm('reports');
                        });
                    });
                }
            };
            this.handleEvent = function (eventName, data) {
                if (data === void 0) { data = null; }
                var me = _this;
                switch (eventName) {
                    case 'houingassignmentsloaded':
                        me.currentForm('housing-assignments');
                        break;
                    case 'accountloaded':
                        me.currentForm('finance');
                        break;
                    case 'registrationselected':
                        if (data) {
                            me.registrationDashboardVm.getRegistration(data);
                        }
                        else {
                            me.selectedRegistrationId(0);
                            me.registrationLookupVm.hideResults();
                        }
                        me.registrationChanged = false;
                        break;
                    case 'registrationdashboardloaded':
                        me.selectedRegistrationId(data);
                        me.currentForm('registrations');
                        break;
                    case 'dashboardclosed':
                        if (data) {
                            me.showFinanceForm(function () {
                                window.print();
                                me.showRegistrationForm();
                                me.closeDashboard();
                            });
                        }
                        else {
                            me.closeDashboard();
                        }
                        break;
                    case 'housingassignmentsupdated':
                    case 'registrationchanged':
                        me.registrationChanged = true;
                        break;
                    case 'housingassignmentsrequested':
                        if (me.selectedRegistrationId() == data) {
                            me.currentForm('housing-assignments');
                        }
                        else {
                            me.registrationDashboardVm.getRegistration(data, 'registrationhousingloaded');
                            me.registrationChanged = false;
                        }
                        break;
                    case 'registrationhousingloaded':
                        me.registrationChanged = false;
                        me.selectedRegistrationId(data);
                        me.showHousingAssignmentsForm();
                        break;
                    case 'balancechanged':
                        me.registrationDashboardVm.handleEvent(eventName, data);
                        break;
                    case 'printinvoice':
                        me.showFinanceForm(function () {
                            window.print();
                        });
                }
            };
            this.getRegistrationContext = function (next) {
                var me = _this;
                if (me.context) {
                    next(me.context);
                }
                else {
                    me.application.hideServiceMessages();
                    me.peanut.executeService('registration.GetSessionInfo', null, function (serviceResponse) {
                        if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                            me.context = serviceResponse.Value;
                            next(me.context);
                        }
                        else {
                            next(null);
                        }
                    }).fail(function () {
                        me.application.hideWaiter();
                    });
                }
            };
            var me = this;
            Tops.RegistrationAdminViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
            me.mainTabLabel = ko.computed(function () {
                if (me.selectedRegistrationId()) {
                    return 'Check in';
                }
                return 'Registrations';
            });
        }
        RegistrationAdminViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            jQuery('.page-header').addClass('hidden-print');
            successFunction = me.afterInit;
            me.application.initialize(applicationPath, function () {
                me.application.loadResources([
                    'registrationLookupComponent.js',
                    'registrationDashboardComponent.js',
                    'paymentFormComponent.js',
                    'USDollars.js'
                ], function () {
                    me.registrationLookupVm = new Tops.registrationLookupComponent(me.application, me);
                    me.application.registerComponent('registration-lookup', me.registrationLookupVm, function () {
                        me.registrationLookupVm.initialize(function () {
                            me.registrationDashboardVm = new Tops.registrationDashboardComponent(me.application, me);
                            me.application.registerComponent('registration-dashboard', me.registrationDashboardVm, function () {
                                me.registrationDashboardVm.initialize(function () {
                                    me.application.loadComponent('modal-confirm', function () {
                                        successFunction();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };
        RegistrationAdminViewModel.prototype.closeDashboard = function () {
            var me = this;
            me.selectedRegistrationId(0);
            me.registrationChanged = false;
            if (me.registrationFinanceVm) {
                me.registrationFinanceVm.handleEvent('dashboardclosed');
            }
        };
        return RegistrationAdminViewModel;
    }());
    Tops.RegistrationAdminViewModel = RegistrationAdminViewModel;
})(Tops || (Tops = {}));
Tops.RegistrationAdminViewModel.instance = new Tops.RegistrationAdminViewModel();
window.ViewModel = Tops.RegistrationAdminViewModel.instance;
//# sourceMappingURL=RegistrationAdminViewModel.js.map