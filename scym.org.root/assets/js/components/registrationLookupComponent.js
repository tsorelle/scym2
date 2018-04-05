var Tops;
(function (Tops) {
    var registrationLookupComponent = (function () {
        function registrationLookupComponent(application, owner) {
            var _this = this;
            this.resultsVisible = ko.observable(true);
            this.searchFormVisible = ko.observable(true);
            this.searchType = ko.observable('');
            this.showResults = function () {
                _this.resultsVisible(true);
            };
            this.hideResults = function () {
                _this.resultsVisible(false);
            };
            this.getNext = function () {
                _this.onSelected(0);
            };
            this.onSelected = function (regId) {
                var me = _this;
                if (me.owner) {
                    me.owner.handleEvent('registrationselected', regId);
                }
            };
            this.getRegistration = function (item) {
                var me = _this;
                me.onSelected(parseInt(item.Value));
            };
            this.findAllRegistrations = function () {
                var me = _this;
                me.findRegistrations('allregistrations');
            };
            this.findRegistrationsByName = function () {
                var me = _this;
                me.searchType('');
                _this.onSelected(0);
                var value = me.registrationsList.searchValue().trim();
                if (value) {
                    me.findRegistrations('name', value);
                }
            };
            this.findRegistrations = function (searchType, searchValue) {
                if (searchType === void 0) { searchType = 'name'; }
                if (searchValue === void 0) { searchValue = null; }
                var me = _this;
                me.registrationsList.reset();
                me.application.hideServiceMessages();
                me.application.showWaiter('Searching...');
                var request = {
                    searchType: searchType,
                    searchValue: searchValue
                };
                me.peanut.executeService('registration.FindRegistrations', request, me.handleFindRegistrationsResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleFindRegistrationsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.registrationsList.setList(list);
                    me.registrationsList.searchValue('');
                    me.showResults();
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
        }
        registrationLookupComponent.prototype.initialize = function (finalFunction) {
            var me = this;
            me.application.loadResources('searchListObservable.js', function () {
                me.registrationsList = new Tops.searchListObservable(3, 4);
                if (finalFunction) {
                    finalFunction();
                }
            });
        };
        registrationLookupComponent.prototype.getFakeSearchResult = function () {
            var response = [
                {
                    Name: 'Terry SoRelle and Liz Yeats',
                    Value: '1'
                },
                {
                    Name: 'Joe Snow and Barabra Blow',
                    Value: '2'
                },
                {
                    Name: 'Winston Salem and family',
                    Value: '3'
                },
                {
                    Name: 'Joan Crawford',
                    Value: '4'
                },
                {
                    Name: 'The bunnies',
                    Value: '5'
                }
            ];
            return new Tops.fakeServiceResponse(response);
        };
        return registrationLookupComponent;
    }());
    Tops.registrationLookupComponent = registrationLookupComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=registrationLookupComponent.js.map