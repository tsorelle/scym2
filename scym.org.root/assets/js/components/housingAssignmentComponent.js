var Tops;
(function (Tops) {
    var housingAssignmentComponent = (function () {
        function housingAssignmentComponent(application, owner, confirmOnSave) {
            if (confirmOnSave === void 0) { confirmOnSave = false; }
            var _this = this;
            this.refreshNeeded = false;
            this.registrationId = ko.observable();
            this.housingTypes = ko.observableArray();
            this.housingUnits = ko.observableArray();
            this.housingUnitList = [];
            this.housingAssignments = ko.observableArray();
            this.defaultHousingUnit = ko.observable();
            this.defaultHousingType = ko.observable();
            this.defaultOccupancy = ko.observable('');
            this.defaultMotelOccupancy = '';
            this.assignedByAttender = ko.observable(false);
            this.confirmationText = ko.observable();
            this.canClose = ko.observable(false);
            this.canSave = ko.observable(false);
            this.canConfirm = ko.observable(false);
            this.canSend = ko.observable(false);
            this.showConfirmed = ko.observable(false);
            this.confirmOnSave = false;
            this.formTitle = ko.observable();
            this.showFormTitle = true;
            this.updatedAssignments = ko.observableArray();
            this.unassignedCount = 0;
            this.assingnmentCount = 0;
            this.cancelChanges = function () {
                var me = _this;
                me.updatedAssignments([]);
                if (me.confirmOnSave) {
                    var id = me.registrationId();
                    me.reset();
                    me.getAssignments(id);
                }
                else {
                    me.closeForm();
                }
            };
            this.handleGetAssignmentsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    var confirmed = (response.confirmed) ? true : false;
                    var counts = me.getAssignmentCounts(response.assignments);
                    me.unassignedCount = counts.unassigned;
                    me.canConfirm(false);
                    me.canSend(false);
                    me.canClose(false);
                    me.canSave(false);
                    me.updatedAssignments([]);
                    if (me.confirmOnSave) {
                        if (confirmed) {
                            me.showConfirmed(true);
                        }
                        else {
                            me.canConfirm(counts.assigned > 0);
                        }
                    }
                    else {
                        var canSend = (counts.assigned > 0);
                        me.canSend(canSend);
                        me.showConfirmed(canSend && confirmed);
                        me.canClose(true);
                    }
                    if (response.housingTypes) {
                        me.housingTypes(response.housingTypes);
                    }
                    if (response.units) {
                        me.housingUnitsDaily = [];
                        me.housingAvailatility = response.availability;
                        me.housingUnitList = me.buildHousingUnitList(0, response.units);
                        me.housingUnits(me.housingUnitList);
                    }
                    me.updatedAssignments([]);
                    me.showAssignments(response.assignments);
                    if (me.showFormTitle) {
                        me.formTitle("Housing assignments for " + response.registrationName);
                    }
                    me.owner.handleEvent('houingassignmentsloaded', response.registrationId);
                }
            };
            this.reset = function () {
                var me = _this;
                me.disableDefaultSubscriptions();
                me.housingAssignments([]);
                me.assignedByAttender(false);
            };
            this.buildHousingUnitList = function (day, sourceList) {
                if (day === void 0) { day = 0; }
                if (sourceList === void 0) { sourceList = null; }
                var me = _this;
                var result = [];
                var availablityList;
                if (sourceList == null) {
                    sourceList = me.housingUnitList;
                }
                if (day == 0) {
                    availablityList = me.housingAvailatility;
                }
                else {
                    availablityList = _.filter(me.housingAvailatility, function (item) {
                        return item.day == day;
                    });
                }
                _.each(sourceList, function (unit) {
                    var availability;
                    var occupants = 0;
                    if (day == 0) {
                        var items = _.filter(availablityList, function (a) {
                            return (a.housingUnitId == unit.housingUnitId);
                        });
                        if (items.length == 0) {
                            availability = null;
                        }
                        else {
                            availability = _.max(items, function (i) {
                                return Number(i.occupants);
                            });
                        }
                    }
                    else {
                        availability = _.find(availablityList, function (a) {
                            return (a.day == day && a.housingUnitId == unit.housingUnitId);
                        });
                    }
                    if (availability != null) {
                        occupants = Number(availability.occupants);
                    }
                    var description = unit.unitname + ' (';
                    var capacity = Number(unit.capacity);
                    if (occupants == capacity) {
                        description += 'Full';
                    }
                    else if (occupants > capacity) {
                        description += 'Overbooked';
                    }
                    else if (occupants == 0) {
                        description += unit.capacity + ' available';
                    }
                    else {
                        description += (unit.capacity - occupants) + ' left of ' + unit.capacity;
                    }
                    result.push({
                        housingTypeId: unit.housingTypeId,
                        housingUnitId: unit.housingUnitId,
                        unitname: unit.unitname,
                        housingTypeName: unit.housingTypeName,
                        housingCategoryId: unit.housingCategoryId,
                        categoryName: unit.housingTypeName,
                        capacity: unit.capacity,
                        description: description + ')'
                    });
                });
                return result;
            };
            this.getHousingAssignmentType = function (assignment) {
                var me = _this;
                var unit = _.find(me.housingUnitList, function (unit) {
                    return unit.housingUnitId == assignment.housingUnitId;
                }, me);
                return unit == null ? null : unit.housingTypeId;
            };
            this.getHousingUnit = function (id, unitList) {
                if (unitList === void 0) { unitList = null; }
                var me = _this;
                var selected = null;
                if (unitList == null) {
                    unitList = me.housingUnits();
                }
                if (id > 0) {
                    selected = _.find(unitList, function (unit) {
                        return unit.housingUnitId == id;
                    }, me);
                }
                return selected;
            };
            this.getHousingType = function (id) {
                var me = _this;
                var selected = null;
                if (id > 0) {
                    selected = _.find(me.housingTypes(), function (item) {
                        return item.Key == id;
                    }, me);
                }
                return selected;
            };
            this.getHousingUnitList = function (typeId, day) {
                if (typeId === void 0) { typeId = 0; }
                if (day === void 0) { day = 0; }
                var me = _this;
                var unitList = me.housingUnitList;
                if (day > 0 && me.housingUnitsDaily.length > 0) {
                    unitList = me.housingUnitsDaily[day - 4];
                }
                if (typeId) {
                    var filtered = _.filter(unitList, function (unit) {
                        return ((unit && unit.housingTypeId == typeId));
                    }, me);
                    return filtered;
                }
                else {
                    return unitList;
                }
            };
            this.onTypeChange = function (selected) {
                var me = _this;
                var id = 0;
                me.setOccupancy(selected);
                if (selected) {
                    id = selected.Key;
                }
                me.filterHousingUnitList(id);
            };
            this.onDefaultUnitChange = function (selected) {
                var me = _this;
                var housingUnitId = 0;
                if (selected) {
                    housingUnitId = selected.housingUnitId;
                }
                var wildcardAssignment = {
                    attenderId: 0,
                    assignments: [
                        {
                            day: 0,
                            housingUnitId: housingUnitId,
                            note: ''
                        }
                    ]
                };
                me.updatedAssignments([wildcardAssignment]);
                me.setChangedState();
                me.unassignedCount = 0;
            };
            this.filterHousingUnitList = function (typeId) {
                var me = _this;
                var filtered = me.getHousingUnitList(typeId);
                me.housingUnits(filtered);
                me.defaultHousingUnit(null);
            };
            this.disableDefaultSubscriptions = function () {
                var me = _this;
                if (me.defaultHousingTypeSubscription != null) {
                    me.defaultHousingTypeSubscription.dispose();
                    me.defaultHousingTypeSubscription = null;
                }
                if (me.defaultHousingUnitSubscription != null) {
                    me.defaultHousingUnitSubscription.dispose();
                    me.defaultHousingUnitSubscription = null;
                }
            };
            this.onShowAttenders = function (visible) {
                var me = _this;
                if (visible && me.housingUnitsDaily.length == 0) {
                    for (var day = 4; day < 7; day += 1) {
                        me.housingUnitsDaily[day - 4] = me.buildHousingUnitList(day, me.housingUnitList);
                    }
                }
            };
            this.showAssignmentDetail = function () {
                var me = _this;
                me.updatedAssignments([]);
                me.assignedByAttender(true);
            };
            this.updateAssignment = function (attenderId, assignment) {
                var me = _this;
                if (!assignment.housingUnitId) {
                    return;
                }
                me.setChangedState();
                if (me.unassignedCount) {
                    me.unassignedCount -= 1;
                }
                var updates = me.updatedAssignments();
                var update = _.find(updates, function (item) {
                    return item.attenderId == attenderId;
                });
                if (update == null) {
                    update = {
                        attenderId: attenderId,
                        assignments: [assignment]
                    };
                    updates.push(update);
                }
                else {
                    var existing = _.find(update.assignments, function (assignmentItem) {
                        return assignmentItem.day == assignment.day;
                    });
                    if (existing != null) {
                        existing.housingUnitId = assignment.housingUnitId;
                        existing.note = assignment.note;
                    }
                    else {
                        update.assignments.push(assignment);
                    }
                }
                me.updatedAssignments(updates);
            };
            this.saveAssignments = function () {
                var me = _this;
                var request = {
                    registrationId: me.registrationId(),
                    updates: []
                };
                if (me.assignedByAttender()) {
                    request.updates = me.updatedAssignments();
                }
                else {
                    var defaultUnitId = me.defaultHousingUnit().housingUnitId;
                    var assignments = me.housingAssignments();
                    me.housingAssignments([]);
                    _.each(assignments, function (attenderAssignment) {
                        _.each(attenderAssignment.assignments, function ($a) {
                            $a.housingUnitId = defaultUnitId;
                        });
                        request.updates.push({
                            attenderId: attenderAssignment.attender.attenderId,
                            assignments: attenderAssignment.assignments
                        });
                    });
                    me.housingAssignments(assignments);
                }
                if (request.updates.length > 0) {
                    me.application.hideServiceMessages();
                    me.application.showWaiter('Updating...');
                    me.peanut.executeService('registration.UpdateHousingAssignments', request, me.handleSaveAssingmentsResponse)
                        .always(function () {
                        me.application.hideWaiter();
                    });
                }
            };
            this.handleSaveAssingmentsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.updatedAssignments([]);
                    me.showConfirmed(false);
                    me.canConfirm(false);
                    me.canSave(false);
                    if (me.confirmOnSave) {
                        me.canSend(false);
                    }
                    else {
                        me.canClose(true);
                        me.canSend(me.unassignedCount == 0);
                    }
                    me.owner.handleEvent('housingassignmentsupdated');
                }
            };
            this.closeForm = function () {
                var me = _this;
                me.reset();
                if (me.owner) {
                    me.owner.handleEvent('assignmentformclosed');
                }
            };
            this.reloadPage = function () {
                var me = _this;
                window.location.reload(true);
            };
            this.onPageSelected = function () {
                var me = _this;
                if (me.refreshNeeded) {
                    me.refreshNeeded = false;
                    if (me.housingTypes().length + me.housingUnitList.length > 0) {
                        jQuery("#confirm-reload-modal").modal('show');
                    }
                }
            };
            this.handleEvent = function (eventName, data) {
                if (data === void 0) { data = null; }
                var me = _this;
                switch (eventName) {
                    case 'housingtypesupdated':
                        me.refreshNeeded = true;
                        break;
                    case 'housingunitsupdated':
                        me.refreshNeeded = true;
                        break;
                    case 'assignmentspageselected':
                        me.onPageSelected();
                        break;
                }
            };
            this.refreshHousingUnits = function () {
                var me = _this;
                var request = null;
                me.application.hideServiceMessages();
                var response = null;
                me.handleRefreshHousingUnits(response);
            };
            this.handleRefreshHousingUnits = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.housingUnitList = response.units;
                    me.housingAvailatility = response.availability;
                    me.housingUnitList = me.buildHousingUnitList(0, response.units);
                    me.housingUnits(me.housingUnitList);
                    me.housingUnitsDaily = [];
                    me.onShowAttenders(me.assignedByAttender());
                }
            };
            this.getConfirmationText = function () {
                var me = _this;
                var request = me.registrationId();
                me.application.hideServiceMessages();
                me.application.showWaiter('Message here...');
                me.peanut.executeService('registration.GetHousingConfirmationText', request, me.handleGetConfirmationTextResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleGetConfirmationTextResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.confirmationText(serviceResponse.Value);
                    jQuery("#confirmation-message-modal").modal('show');
                }
            };
            this.confirmAssignments = function () {
                var me = _this;
                jQuery("#confirmation-message-modal").modal('hide');
                var request = {
                    registrationId: me.registrationId()
                };
                me.application.hideServiceMessages();
                me.application.showWaiter('Confirming registration ...');
                me.peanut.executeService('registration.ConfirmRegistration', request, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        me.canConfirm(false);
                        me.owner.handleEvent('housingassignmentsupdated');
                    }
                })
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.sendConfirmationMessage = function () {
                var me = _this;
                jQuery("#confirmation-message-modal").modal('hide');
                var request = {
                    registrationId: me.registrationId(),
                    text: me.confirmationText()
                };
                me.application.hideServiceMessages();
                me.application.showWaiter('Confirming registration ...');
                me.peanut.executeService('registration.ConfirmRegistration', request, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        me.closeForm();
                    }
                })
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.showFormTitle = true;
            me.canClose(!confirmOnSave);
            me.canConfirm(false);
            me.canSend(false);
            me.confirmOnSave = confirmOnSave;
            me.owner = owner;
        }
        housingAssignmentComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.assignedByAttender.subscribe(me.onShowAttenders);
            me.application.loadComponent('housing-selector', function () {
                if (finalFunction) {
                    finalFunction();
                }
            });
        };
        housingAssignmentComponent.prototype.getAssignmentCounts = function (assignments) {
            var me = this;
            var counts = {
                assigned: 0,
                unassigned: 0
            };
            _.each(assignments, function (attender) {
                _.each(attender.assignments, function (assignment) {
                    if (assignment.housingUnitId == 0) {
                        counts.unassigned += 1;
                    }
                    else {
                        counts.assigned += 1;
                    }
                });
            });
            return counts;
        };
        housingAssignmentComponent.prototype.clearChanges = function () {
            var me = this;
            me.updatedAssignments([]);
        };
        housingAssignmentComponent.prototype.getAssignments = function (registrationId) {
            var me = this;
            me.registrationId(registrationId);
            me.housingAssignments([]);
            me.formTitle('');
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting assignments...');
            var request = {
                registrationId: registrationId,
                includeLookups: me.housingTypes().length == 0 || me.housingUnitList.length == 0
            };
            me.peanut.executeService('registration.GetHousingAssignments', request, me.handleGetAssignmentsResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        housingAssignmentComponent.prototype.setChangedState = function () {
            var me = this;
            me.canConfirm(false);
            me.canSend(false);
            me.canSave(true);
            me.canClose(false);
            me.showConfirmed(false);
        };
        housingAssignmentComponent.prototype.setOccupancy = function (housingType) {
            var me = this;
            me.defaultOccupancy('');
            if (housingType != null) {
                var category = housingType.category;
                var category = housingType.category;
                if (category == 3) {
                    me.defaultOccupancy(me.defaultMotelOccupancy);
                }
            }
        };
        housingAssignmentComponent.prototype.showAssignments = function (attenderAssignments) {
            var me = this;
            var defaultAssignment = null;
            var defaultType = null;
            var defaultUnit = null;
            var showDetail = false;
            me.defaultMotelOccupancy = '';
            me.disableDefaultSubscriptions();
            if (attenderAssignments.length) {
                var first = me.findFirst(attenderAssignments);
                if (first) {
                    defaultAssignment = me.findFirst(first.assignments);
                    showDetail = me.hasMixedAssignments(attenderAssignments, defaultAssignment.housingUnitId);
                    if (!showDetail) {
                        me.defaultMotelOccupancy = first.attender.occupancy;
                        if (defaultAssignment.housingUnitId == 0) {
                            defaultType = first.attender.housingPreference;
                            var otherPrefs = _.find(attenderAssignments, function (item) {
                                return item.attender.housingPreference != defaultType;
                            });
                            if (otherPrefs) {
                                showDetail = true;
                            }
                        }
                        else {
                            defaultType = me.getHousingAssignmentType(defaultAssignment);
                        }
                    }
                }
            }
            if (!showDetail) {
                var housingType = me.getHousingType(defaultType);
                me.setOccupancy(housingType);
                var unitList = me.getHousingUnitList(housingType.Key);
                me.housingUnits(unitList);
                me.defaultHousingType(housingType);
                var unit = null;
                if (defaultAssignment) {
                    unit = me.getHousingUnit(defaultAssignment.housingUnitId);
                }
                me.defaultHousingUnit(unit);
                me.defaultHousingTypeSubscription = me.defaultHousingType.subscribe(me.onTypeChange);
                me.defaultHousingUnitSubscription = me.defaultHousingUnit.subscribe(me.onDefaultUnitChange);
            }
            me.housingAssignments(attenderAssignments);
            me.assignedByAttender(showDetail);
        };
        housingAssignmentComponent.prototype.findFirst = function (items) {
            var first = _.find(items, function (item) {
                return true;
            });
            return first;
        };
        housingAssignmentComponent.prototype.hasMixedAssignments = function (items, id) {
            var result = _.find(items, function (item) {
                var misMatch = _.find(item.assignments, function (assignment) {
                    return assignment.housingUnitId != id;
                });
                return (misMatch != null);
            });
            return result != null;
        };
        return housingAssignmentComponent;
    }());
    Tops.housingAssignmentComponent = housingAssignmentComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=housingAssignmentComponent.js.map