var Tops;
(function (Tops) {
    var DownloadsViewModel = (function () {
        function DownloadsViewModel() {
            var _this = this;
            this.selectedAffiliation = ko.observable(null);
            this.affiliations = ko.observableArray([]);
            this.contactsDirListingOnly = ko.observable(false);
            this.addressesDirListingOnly = ko.observable(false);
            this.residencesOnly = ko.observable(false);
            this.includeKids = ko.observable(true);
            this.newsletter = ko.observable(false);
            this.handleGetAffiliationsResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.affiliations(list);
                }
            };
            this.submitContacts = function () {
                var me = _this;
                var options = '';
                var affiliation = me.selectedAffiliation();
                if (affiliation) {
                    var code = affiliation.Value;
                    options = '?aff=' + code;
                }
                var url = "/scym/download/contacts" + options;
                jQuery("#contacts-form").attr("action", url).submit();
            };
            this.download = function () {
                var me = _this;
            };
            var me = this;
            Tops.DownloadsViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        DownloadsViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                var request = null;
                me.application.hideServiceMessages();
                me.application.showWaiter('Initializing...');
                me.peanut.executeService('directory.GetAffiliationsList', request, me.handleGetAffiliationsResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
                jQuery('[data-toggle="popover"]').popover();
                if (successFunction) {
                    successFunction();
                }
            });
        };
        return DownloadsViewModel;
    }());
    Tops.DownloadsViewModel = DownloadsViewModel;
})(Tops || (Tops = {}));
Tops.DownloadsViewModel.instance = new Tops.DownloadsViewModel();
window.ViewModel = Tops.DownloadsViewModel.instance;
//# sourceMappingURL=DownloadsViewModel.js.map