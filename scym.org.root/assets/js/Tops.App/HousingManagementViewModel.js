var Tops;
(function (Tops) {
    var HousingManagementViewModel = (function () {
        function HousingManagementViewModel() {
            var _this = this;
            this.currentForm = ko.observable('assignments');
            this.bindSection = function (containerName, context) {
                var me = _this;
                if (!context) {
                    context = me;
                }
                me.application.bindSection(containerName, context);
            };
            this.afterInit = function () {
                var me = _this;
                me.application.bindSection('tabs');
                me.application.bindSection('assignments');
                me.application.bindNode('housing-units-form');
                me.application.bindNode('housing-types-form');
                me.application.bindNode('housing-reports-form');
                me.application.showDefaultSection();
            };
            this.onRegistrationSelected = function (regId) {
                var me = _this;
                if (regId) {
                    me.housingLookupVm.searchFormVisible(false);
                    me.housingAssignmentsVM.getAssignments(regId);
                }
                else {
                    me.housingAssignmentsVM.reset();
                }
            };
            this.showAssignmentForm = function () {
                var me = _this;
                me.currentForm('assignments');
                me.housingAssignmentsVM.handleEvent('assignmentspageselected');
            };
            this.showHousingUnitsForm = function () {
                var me = _this;
                if (me.housingUnitsVm) {
                    me.currentForm('units');
                    me.housingUnitsVm.handleEvent('unitspageselected');
                }
                else {
                    me.application.bindComponent('housing-units', function () {
                        me.housingUnitsVm = new Tops.housingUnitsComponent(me.application, me);
                        return me.housingUnitsVm;
                    }, function () {
                        me.housingUnitsVm.getUnits();
                        me.currentForm('units');
                    });
                }
            };
            this.showHousingTypesForm = function () {
                var me = _this;
                if (me.housingTypesVm) {
                    me.currentForm('types');
                }
                else {
                    me.application.bindComponent('housing-types', function () {
                        me.housingTypesVm = new Tops.housingTypesComponent(me.application, me);
                        return me.housingTypesVm;
                    }, function () {
                        me.housingTypesVm.getTypes();
                        me.currentForm('types');
                    });
                }
            };
            this.showHousingReportsForm = function () {
                var me = _this;
                if (me.housingReportsVm) {
                    me.currentForm('reports');
                }
                else {
                    me.application.bindComponent('housing-reports', function () {
                        me.housingReportsVm = new Tops.housingReportsComponent(me.application, me);
                        return me.housingReportsVm;
                    }, function () {
                        me.housingReportsVm.initialize();
                        me.currentForm('reports');
                    });
                }
            };
            this.handleEvent = function (eventName, data) {
                if (data === void 0) { data = null; }
                var me = _this;
                switch (eventName) {
                    case 'housingtypesupdated':
                        var typesList = me.housingTypesToLookupList(data);
                        if (me.housingUnitsVm) {
                            me.housingUnitsVm.handleEvent(eventName, typesList);
                        }
                        if (me.housingTypesVm) {
                            me.housingAssignmentsVM.handleEvent(eventName, typesList);
                        }
                        break;
                    case 'housingunitsupdated':
                        me.housingAssignmentsVM.handleEvent(eventName, data);
                        break;
                    case 'assignmentformclosed':
                        me.housingLookupVm.searchFormVisible(true);
                        break;
                    case 'registrationselected':
                        me.onRegistrationSelected(data);
                        break;
                    case 'assignmentchangerequest':
                        me.showAssignmentForm();
                        me.onRegistrationSelected(data.registrationId);
                        break;
                }
            };
            var me = this;
            Tops.HousingManagementViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        HousingManagementViewModel.prototype.init = function (applicationPath, successFunction) {
            if (applicationPath === void 0) { applicationPath = '/'; }
            var me = this;
            successFunction = me.afterInit;
            me.application.initialize(applicationPath, function () {
                me.application.loadResources(['housingAssignmentComponent.js', 'housingLookupComponent.js', 'searchListObservable.js'], function () {
                    me.housingAssignmentsVM = new Tops.housingAssignmentComponent(me.application, me);
                    me.application.registerComponent('housing-assignment', me.housingAssignmentsVM, function () {
                        me.housingAssignmentsVM.initialize(function () {
                            me.housingLookupVm = new Tops.housingLookupComponent(me.application, me);
                            me.application.registerComponent('housing-lookup', me.housingLookupVm, function () {
                                me.application.loadComponent('modal-confirm', function () {
                                    successFunction();
                                });
                            });
                        });
                    });
                });
            });
        };
        HousingManagementViewModel.prototype.loadAssignmentsForm = function () {
            var me = this;
        };
        HousingManagementViewModel.prototype.loadLookupForm = function () {
            var me = this;
        };
        HousingManagementViewModel.prototype.housingTypesToLookupList = function (data) {
            var result = [];
            var types = _.sortBy(data, 'housingTypeDescription');
            _.each(types, function (type) {
                var item = {
                    Key: type.housingTypeId,
                    Text: type.housingTypeDescription,
                    Description: ''
                };
                result.push(item);
            });
        };
        return HousingManagementViewModel;
    }());
    Tops.HousingManagementViewModel = HousingManagementViewModel;
})(Tops || (Tops = {}));
Tops.HousingManagementViewModel.instance = new Tops.HousingManagementViewModel();
window.ViewModel = Tops.HousingManagementViewModel.instance;
//# sourceMappingURL=HousingManagementViewModel.js.map