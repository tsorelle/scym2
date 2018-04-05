var Tops;
(function (Tops) {
    var HelloWorldViewModel = (function () {
        function HelloWorldViewModel() {
            var me = this;
            Tops.HelloWorldViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        HelloWorldViewModel.prototype.onButtonClick = function () {
            var me = this;
            me.peanut.executeService('HelloWorld', null, function (serviceResponse) {
                me.application.hideWaiter();
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    alert('Success!');
                }
            }).fail(function () {
                alert('Failed');
            });
        };
        HelloWorldViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                if (successFunction) {
                    successFunction();
                }
            });
        };
        return HelloWorldViewModel;
    }());
    Tops.HelloWorldViewModel = HelloWorldViewModel;
})(Tops || (Tops = {}));
Tops.HelloWorldViewModel.instance = new Tops.HelloWorldViewModel();
window.ViewModel = Tops.HelloWorldViewModel.instance;
//# sourceMappingURL=HelloWorldViewModel.js.map