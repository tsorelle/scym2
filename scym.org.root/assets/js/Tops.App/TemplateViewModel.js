var Tops;
(function (Tops) {
    var VmNameViewModel = (function () {
        function VmNameViewModel() {
            var _this = this;
            this.foo = false;
            this.handleServiceResponseTemplate = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                }
            };
            var me = this;
            Tops.VmNameViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        VmNameViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                if (successFunction) {
                    successFunction();
                }
            });
        };
        VmNameViewModel.prototype.serviceCallTemplate = function () {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.application.showWaiter('Message here...');
            me.peanut.executeService('directory.ServiceName', request, me.handleServiceResponseTemplate)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        return VmNameViewModel;
    }());
    Tops.VmNameViewModel = VmNameViewModel;
})(Tops || (Tops = {}));
Tops.VmNameViewModel.instance = new Tops.VmNameViewModel();
window.ViewModel = Tops.VmNameViewModel.instance;
//# sourceMappingURL=TemplateViewModel.js.map