var Tops;
(function (Tops) {
    var RegisterDocumentRequest = (function () {
        function RegisterDocumentRequest() {
        }
        return RegisterDocumentRequest;
    }());
    Tops.RegisterDocumentRequest = RegisterDocumentRequest;
    var RegisterDocumentViewModel = (function () {
        function RegisterDocumentViewModel() {
            this.docTitle = ko.observable('');
            this.filename = ko.observable('');
            this.publicPath = ko.observable('');
            this.privatePath = ko.observable('');
            this.documentAccess = ko.observable('public');
            this.authorized = ko.observable(false);
            var me = this;
            Tops.RegisterDocumentViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        RegisterDocumentViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.application.showWaiter('Initializing. Please wait...');
                me.peanut.executeService('InitRegisterDocument', null, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        var response = serviceResponse.Value;
                        me.publicPath(response.publicPath);
                        me.privatePath(response.privatePath);
                        me.authorized(true);
                    }
                }).always(function () {
                    me.application.hideWaiter();
                    if (successFunction) {
                        successFunction();
                    }
                });
            });
        };
        RegisterDocumentViewModel.prototype.submitDocument = function () {
            var me = this;
            var request = new RegisterDocumentRequest();
            request.filename = me.filename();
            request.title = me.docTitle();
            request.access = me.documentAccess();
            me.application.showWaiter('Register document. Please wait...');
            me.peanut.executeService('RegisterDocument', request, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var uri = '/node/' + serviceResponse.Value.toString();
                    window.location = uri;
                    me.docTitle('');
                    me.filename('');
                }
            }).always(function () {
                me.application.hideWaiter();
            });
        };
        return RegisterDocumentViewModel;
    }());
    Tops.RegisterDocumentViewModel = RegisterDocumentViewModel;
})(Tops || (Tops = {}));
Tops.RegisterDocumentViewModel.instance = new Tops.RegisterDocumentViewModel();
window.ViewModel = Tops.RegisterDocumentViewModel.instance;
//# sourceMappingURL=RegisterDocumentViewModel.js.map