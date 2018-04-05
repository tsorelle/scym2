var Tops;
(function (Tops) {
    var housingUnitsComponent = (function () {
        function housingUnitsComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.refreshNeeded = false;
            this.updateRequest = {
                updated: [],
                active: []
            };
            this.changed = ko.observable(false);
            this.housingUnits = ko.observableArray();
            this.housingTypes = ko.observableArray();
            this.unitForm = {
                heading: ko.observable(),
                unitId: ko.observable(0),
                unitname: ko.observable(),
                capacity: ko.observable(),
                selectedHousingType: ko.observable(),
                errorMessage: ko.observable(),
                active: ko.observable(true)
            };
            this.handleGetUnitsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess || serviceResponse.Result == Tops.Peanut.serviceResultWarnings) {
                    var response = serviceResponse.Value;
                    if (me.housingUnits().length > 0) {
                        me.notifyUnitsUpdate(response.units);
                    }
                    me.housingUnits(response.units);
                    if (response.types) {
                        me.housingTypes(response.types);
                    }
                    me.refreshNeeded = false;
                    me.updateRequest.active = [];
                    me.updateRequest.updated = [];
                    me.changed(false);
                }
            };
            this.toggleActive = function (selectedUnit) {
                var me = _this;
                if (selectedUnit != null) {
                    var newValue = (selectedUnit.active);
                    me.changed(true);
                    var existing = _.find(me.updateRequest.active, function (item) {
                        return item.unitname == selectedUnit.unitname;
                    });
                    if (existing == null) {
                        me.updateRequest.active.push({
                            id: selectedUnit.housingUnitId,
                            active: newValue
                        });
                    }
                    else {
                        existing.active = newValue;
                    }
                }
                return true;
            };
            this.saveChanges = function () {
                var me = _this;
                var request = me.updateRequest;
                me.application.showWaiter('Saving changes...');
                me.peanut.executeService('registration.UpdateHousingUnits', me.updateRequest, me.handleGetUnitsResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.showEditUnitDialog = function (unit) {
                var me = _this;
                me.unitForm.heading('Update Housing Unit');
                me.unitForm.unitId(unit.housingUnitId);
                me.unitForm.unitname(unit.unitname);
                me.unitForm.capacity(unit.capacity.toString());
                me.unitForm.selectedHousingType(me.getHousingType(unit.housingTypeId));
                me.unitForm.active(unit.active);
                me.unitForm.errorMessage('');
                me.showForm();
            };
            this.showNewUnitDialog = function () {
                var me = _this;
                me.unitForm.heading('New Housing Unit');
                me.unitForm.unitId(0);
                me.unitForm.unitname('');
                me.unitForm.capacity('2');
                me.unitForm.selectedHousingType(null);
                me.unitForm.errorMessage('');
                me.unitForm.active(true);
                me.showForm();
            };
            this.updateUnit = function () {
                var me = _this;
                var request = me.validateDialog();
                if (request == null) {
                    return;
                }
                me.changed(true);
                me.assignToUpdateList(me.updateRequest.updated, request);
                me.updateDisplayList(request);
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
            this.notifyUnitsUpdate = function (data) {
                var me = _this;
                if (me.owner) {
                    me.owner.handleEvent('housingunitsupdated', data);
                }
            };
            this.handleEvent = function (eventName, data) {
                if (data === void 0) { data = null; }
                var me = _this;
                switch (eventName) {
                    case 'housingtypesupdated':
                        me.refreshNeeded = true;
                        break;
                    case 'unitspageselected':
                        var changed = me.changed();
                        if (me.refreshNeeded && !me.changed()) {
                            me.getUnits();
                        }
                        break;
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        housingUnitsComponent.prototype.getUnits = function () {
            var me = this;
            var request = {
                units: 'all',
                types: 'none'
            };
            if (me.housingTypes().length == 0) {
                request.types = 'all';
            }
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting housing units...');
            me.peanut.executeService('registration.GetHousingUnits', request, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.updateRequest.active = [];
                    me.updateRequest.updated = [];
                    me.housingUnits(response.units);
                    if (response.types) {
                        me.housingTypes(response.types);
                    }
                }
            })
                .always(function () {
                me.application.hideWaiter();
            });
        };
        housingUnitsComponent.prototype.getTypes = function () {
            var me = this;
            var request = 'all';
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting housing types...');
            me.peanut.executeService('registration.GetHousingTypes', request, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.housingTypes(response);
                }
            })
                .always(function () {
                me.application.hideWaiter();
            });
        };
        housingUnitsComponent.prototype.updateDisplayList = function (request) {
            var me = this;
            var list = me.housingUnits();
            var existing = _.find(list, function (unit) {
                return request.unitname == unit.unitname;
            });
            if (existing == null) {
                existing = {
                    active: me.unitForm.active(),
                    capacity: request.capacity,
                    categoryName: '',
                    description: request.unitname,
                    housingCategoryId: null,
                    housingTypeId: request.housingTypeId,
                    housingTypeName: me.unitForm.selectedHousingType().Text,
                    housingUnitId: request.unitId,
                    unitname: request.unitname
                };
                list.push(existing);
            }
            else {
                existing.capacity = request.capacity;
                existing.housingTypeId = request.housingTypeId;
                existing.housingTypeName = me.unitForm.selectedHousingType().Text;
            }
            me.housingUnits([]);
            me.housingUnits(_.sortBy(list, 'unitname'));
        };
        housingUnitsComponent.prototype.assignToUpdateList = function (list, item) {
            var me = this;
            var existing = _.find(list, function (listItem) {
                return listItem.unitname == item.unitname;
            });
            if (existing == null) {
                list.push(item);
            }
            else {
                existing.capacity = item.capacity;
                existing.housingTypeId = item.housingTypeId;
            }
        };
        housingUnitsComponent.prototype.hideForm = function () {
            jQuery("#unit-update-modal").modal('hide');
        };
        housingUnitsComponent.prototype.showForm = function () {
            var me = this;
            jQuery("#unit-update-modal").modal('show');
        };
        housingUnitsComponent.prototype.hideConfirmForm = function () {
            jQuery("#confirm-unit-delete-modal").modal('hide');
        };
        housingUnitsComponent.prototype.showConfirmForm = function () {
            var me = this;
            jQuery("#confirm-unit-delete-modal").modal('show');
        };
        housingUnitsComponent.prototype.validateDialog = function () {
            var me = this;
            var housingTypeId = -1;
            var selectedType = me.unitForm.selectedHousingType();
            if (selectedType) {
                housingTypeId = selectedType.Key;
            }
            var request = {
                unitId: me.unitForm.unitId(),
                unitname: me.unitForm.unitname().trim(),
                capacity: parseInt(me.unitForm.capacity()),
                housingTypeId: housingTypeId
            };
            if (!request.unitname) {
                me.unitForm.errorMessage('A unit name is required.');
                return null;
            }
            if (isNaN(request.capacity)) {
                me.unitForm.errorMessage('Capacity should be a valid whole number.');
                return null;
            }
            if (request.housingTypeId < 1) {
                me.unitForm.errorMessage('Please select a housing type');
                return null;
            }
            jQuery("#unit-update-modal").modal('hide');
            return request;
        };
        ;
        return housingUnitsComponent;
    }());
    Tops.housingUnitsComponent = housingUnitsComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=housingUnitsComponent.js.map