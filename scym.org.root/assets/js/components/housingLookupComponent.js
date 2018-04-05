var Tops;
(function (Tops) {
    var housingLookupComponent = (function () {
        function housingLookupComponent(application, owner) {
            var _this = this;
            this.showMessagesButton = ko.observable(false);
            this.searchFormVisible = ko.observable(true);
            this.searchType = ko.observable('');
            this.getNext = function () {
                _this.onSelected(0);
                _this.onSelected(1);
            };
            this.onSelected = function (regId) {
                var me = _this;
                if (me.owner) {
                    me.owner.handleEvent('registrationselected', regId);
                }
            };
            this.sendConfirmations = function () {
                var me = _this;
                jQuery("#confirm-send-all-confirmations").modal('show');
            };
            this.doSendConfirmations = function () {
                var me = _this;
                var request = null;
                me.application.hideServiceMessages();
                me.application.showWaiter('Queing messages...');
                var response = null;
                me.handleSendConfirmationsResponse(response);
                me.application.hideWaiter();
            };
            this.handleSendConfirmationsResponse = function (serviceResponse) {
                var me = _this;
                me.showMessagesButton(false);
                jQuery("#confirm-send-all-confirmations").modal('hide');
            };
            this.getRegistration = function (item) {
                var me = _this;
                me.onSelected(parseInt(item.Value));
            };
            this.findAllRegistrations = function () {
                var me = _this;
                me.searchType('incomplete');
                jQuery("#search-all-modal").modal('show');
            };
            this.searchAll = function () {
                var me = _this;
                jQuery("#search-all-modal").modal('hide');
                _this.onSelected(0);
                me.findRegistrations(me.searchType());
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
                    me.showMessagesButton(me.searchType() == 'unconfirmed' &&
                        me.registrationsList.foundCount() > 0);
                }
            };
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
            me.registrationsList = new Tops.searchListObservable(3, 4);
        }
        housingLookupComponent.prototype.getFakeSearchResult = function () {
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
        return housingLookupComponent;
    }());
    Tops.housingLookupComponent = housingLookupComponent;
})(Tops || (Tops = {}));
//# sourceMappingURL=housingLookupComponent.js.map