var Tops;
(function (Tops) {
    var ageGroupsComponent = (function () {
        function ageGroupsComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.ageGroups = ko.observableArray();
            this.ageGroupForm = {
                hasErrors: ko.observable(false),
                nameError: ko.observable(''),
                cutoffError: ko.observable(''),
                errorMessage: ko.observable(''),
                name: ko.observable(''),
                cutoffAge: ko.observable('')
            };
            this.cutoffMonth = ko.observable();
            this.showNewAgeGroupDialog = function () {
                var me = _this;
                me.ageGroupForm.cutoffAge('');
                me.ageGroupForm.errorMessage('');
                me.ageGroupForm.name('');
                me.ageGroupForm.hasErrors(false);
                me.ageGroupForm.nameError('');
                me.ageGroupForm.cutoffError('');
                jQuery("#new-agegroup-modal").modal('show');
            };
            this.saveChanges = function () {
                _this.doUpdate();
            };
            this.addAgeGroup = function () {
                var me = _this;
                me.ageGroupForm.hasErrors(false);
                me.ageGroupForm.nameError('');
                me.ageGroupForm.cutoffError('');
                var nameText = me.ageGroupForm.name().trim();
                if (nameText == '') {
                    me.ageGroupForm.hasErrors(true);
                    me.ageGroupForm.nameError(': Please enter a group name.');
                }
                var cutoff = Tops.Peanut.validatePositiveWholeNumber(me.ageGroupForm.cutoffAge(), 18);
                if (cutoff.errorMessage) {
                    me.ageGroupForm.hasErrors(true);
                    me.ageGroupForm.cutoffError(':' + cutoff.errorMessage);
                }
                if (me.ageGroupForm.hasErrors()) {
                    return;
                }
                var newGroup = {
                    active: true,
                    cutoffAge: cutoff.value,
                    priorState: {
                        age: -1,
                        active: false
                    },
                    Description: '(new: save changes)',
                    errorMessage: '',
                    Text: nameText,
                    Value: 0
                };
                var list = me.ageGroups();
                list.push(newGroup);
                me.setAgeGroupList(list);
                jQuery("#new-agegroup-modal").modal('hide');
            };
            this.showUpdateAssignmentsDialog = function () {
                jQuery("#reassign-agegroup-modal").modal('show');
            };
            this.updateAssignments = function () {
                var me = _this;
                jQuery("#reassign-agegroup-modal").modal('hide');
                _this.doUpdate(me.cutoffMonth().Value);
            };
            this.removeGroup = function (item) {
                var me = _this;
                me.ageGroups.remove(item);
            };
            this.handleGetAgeGroups = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    _.each(list, function (item) {
                        item.errorMessage = '';
                        item.priorState = {
                            age: item.cutoffAge,
                            active: item.active ? true : false
                        };
                    });
                    me.ageGroups([]);
                    me.ageGroups(list);
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        ageGroupsComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.getAgeGroups();
            if (finalFunction) {
                finalFunction();
            }
        };
        ageGroupsComponent.prototype.getAgeGroups = function () {
            var me = this;
            me.ageGroups([]);
            var request = "all";
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting age groups...');
            me.peanut.executeService('registration.GetAgeGroupList', request, me.handleGetAgeGroups).always(function () {
                me.application.hideWaiter();
            });
        };
        ageGroupsComponent.prototype.doUpdate = function (cutoffMonth) {
            if (cutoffMonth === void 0) { cutoffMonth = 0; }
            var me = this;
            me.application.hideServiceMessages();
            var me = this;
            var updated = [];
            var list = me.ageGroups();
            var valid = true;
            _.each(list, function (item) {
                var validation = Tops.Peanut.validatePositiveWholeNumber(item.cutoffAge, 18);
                if (validation.errorMessage) {
                    valid = false;
                    item.errorMessage = validation.errorMessage;
                }
                else {
                    item.errorMessage = '';
                    var active = item.active ? true : false;
                    if (validation.text != item.priorState.age || active != item.priorState.active) {
                        item.Description = '(updated: save changes)';
                        updated.push({
                            id: item.Value,
                            cutoff: item.cutoffAge,
                            active: item.active,
                            name: item.Text
                        });
                    }
                    item.cutoffAge = validation.text;
                }
            });
            if (valid) {
                if (updated.length == 0 && cutoffMonth == 0) {
                    me.application.showWarning('No changes to save.');
                }
                else {
                    var request = {
                        updates: updated,
                        updateAssignments: cutoffMonth
                    };
                    me.application.hideServiceMessages();
                    me.application.showWaiter('Updating...');
                    me.peanut.executeService('registration.UpdateAgeGroups', request, function (serviceResponse) {
                        if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                            if (cutoffMonth) {
                                me.owner.handleEvent('youthlistchanged');
                            }
                            else {
                                me.owner.handleEvent('agegroupschanged');
                            }
                            me.handleGetAgeGroups(serviceResponse);
                        }
                    })
                        .always(function () {
                        me.application.hideWaiter();
                    });
                }
            }
            else {
                me.setAgeGroupList(list);
            }
        };
        ;
        ageGroupsComponent.prototype.setAgeGroupList = function (list) {
            var me = this;
            me.ageGroups([]);
            me.ageGroups(_.sortBy(list, function (item) {
                var value = item.cutoffAge;
                if (!value) {
                    return 0;
                }
                return parseInt(value);
            }));
        };
        return ageGroupsComponent;
    }());
    Tops.ageGroupsComponent = ageGroupsComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=ageGroupsComponent.js.map