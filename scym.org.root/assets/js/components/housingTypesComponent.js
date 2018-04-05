var Tops;
(function (Tops) {
    var housingTypesComponent = (function () {
        function housingTypesComponent(application, owner) {
            if (owner === void 0) { owner = null; }
            var _this = this;
            this.housingTypes = ko.observableArray();
            this.changed = ko.observable(false);
            this.updateRequest = {
                updated: [],
                added: []
            };
            this.housingTypeForm = {
                id: ko.observable(),
                code: ko.observable(),
                description: ko.observable(),
                selectedCategory: ko.observable(),
                errorMessage: ko.observable()
            };
            this.categories = ko.observableArray([
                {
                    Name: 'None',
                    Value: 0
                },
                {
                    Name: 'Dorm',
                    Value: 1
                },
                {
                    Name: 'Cabin (lodge)',
                    Value: 2
                },
                {
                    Name: 'Motel Room',
                    Value: 3
                },
            ]);
            this.handleGetTypesResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    if (me.housingTypes().length > 0) {
                        me.notifyTypesUpdated(response);
                    }
                    me.changed(false);
                    me.updateRequest.added = [];
                    me.updateRequest.updated = [];
                    me.housingTypes(response);
                }
            };
            this.notifyTypesUpdated = function (data) {
                var me = _this;
                if (me.owner) {
                    me.owner.handleEvent('housingtypesupdated', data);
                }
            };
            this.showNewHousingTypeDialog = function () {
                var me = _this;
                me.housingTypeForm.id(0);
                me.housingTypeForm.code('');
                me.housingTypeForm.description('');
                me.housingTypeForm.selectedCategory(null);
                me.housingTypeForm.errorMessage('');
                jQuery("#housingtype-update-modal").modal('show');
            };
            this.addHousingType = function () {
                var me = _this;
                var newType = me.validateDialog();
                if (newType == null) {
                    return;
                }
                me.updateRequest.added.push({
                    housingTypeCode: newType.housingTypeCode,
                    housingTypeDescription: newType.housingTypeDescription,
                    category: newType.category
                });
                newType.active = true;
                var list = me.housingTypes();
                list.push(newType);
                me.housingTypes(_.sortBy(list, 'housingTypeDescription'));
                me.changed(true);
            };
            this.toggleActive = function (selelctedType) {
                var me = _this;
                if (selelctedType != null) {
                    me.changed(true);
                    var existing = _.find(me.updateRequest.updated, function (item) {
                        return item.id == selelctedType.housingTypeId;
                    });
                    if (existing == null) {
                        me.updateRequest.updated.push({
                            id: selelctedType.housingTypeId,
                            active: (selelctedType.active == 0)
                        });
                    }
                    else {
                        existing.active = (selelctedType.active == 0);
                    }
                }
                return true;
            };
            this.validateDialog = function () {
                var me = _this;
                var selectedCategory = me.housingTypeForm.selectedCategory();
                var result = {
                    housingTypeId: me.housingTypeForm.id(),
                    housingTypeCode: me.housingTypeForm.code(),
                    housingTypeDescription: me.housingTypeForm.description().trim(),
                    active: 1,
                    category: 0,
                    categoryName: ''
                };
                if (!result.housingTypeDescription) {
                    me.housingTypeForm.errorMessage('A description is required.');
                    return null;
                }
                if (!result.housingTypeCode) {
                    me.housingTypeForm.errorMessage('A code is required. It must be a unique one word identifier for the type.');
                    return null;
                }
                var selectedCategory = me.housingTypeForm.selectedCategory();
                if (selectedCategory) {
                    result.category = selectedCategory.Value;
                    result.categoryName = selectedCategory.Name;
                }
                else {
                    me.housingTypeForm.errorMessage('Please select a category.');
                    return null;
                }
                var parts = result.housingTypeCode.split(' ');
                if (parts.length > 1) {
                    me.housingTypeForm.errorMessage('A code cannot have spaces. It must be a unique one word identifier for the type.');
                    return null;
                }
                result.housingTypeCode = result.housingTypeCode.toUpperCase();
                var duplicate = _.find(me.housingTypes(), function (item) {
                    return item.housingTypeCode == result.housingTypeCode;
                }, me);
                if (duplicate) {
                    me.housingTypeForm.errorMessage('This type code is already in use. The code must be a unique one word identifier for the type.');
                    return null;
                }
                jQuery("#housingtype-update-modal").modal('hide');
                return result;
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        housingTypesComponent.prototype.getTypes = function () {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting housing types...');
            me.peanut.executeService('registration.GetHousingTypesEditList', request, me.handleGetTypesResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        housingTypesComponent.prototype.saveChanges = function () {
            var me = this;
            if (me.changed()) {
                me.application.showWaiter('Updating...');
                me.peanut.executeService('registration.UpdateHousingTypes', me.updateRequest, me.handleGetTypesResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        housingTypesComponent.prototype.getFakeResponse = function () {
            var fakeHousingTypes = [
                {
                    housingTypeId: 3,
                    housingTypeDescription: 'Night Owl Dorm for Women',
                    housingTypeCode: 'OWL',
                    category: 1
                },
                {
                    housingTypeId: 6,
                    housingTypeDescription: 'Family Cabin',
                    housingTypeCode: 'FAMILY',
                    category: 2
                },
                {
                    housingTypeId: 9,
                    housingTypeDescription: 'Camp Motel',
                    housingTypeCode: 'MOTEL',
                    category: 3
                }
            ];
            return new Tops.fakeServiceResponse(fakeHousingTypes);
        };
        return housingTypesComponent;
    }());
    Tops.housingTypesComponent = housingTypesComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=housingTypesComponent.js.map