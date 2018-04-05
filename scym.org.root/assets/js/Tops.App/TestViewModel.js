var Tops;
(function (Tops) {
    var TestViewModel = (function () {
        function TestViewModel() {
            this.currentForm = ko.observable('formone');
            this.hideme = ko.observable(true);
            var me = this;
            Tops.TestViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        TestViewModel.prototype.toggleForm = function () {
            var me = this;
            var form = me.currentForm() == 'formone' ? 'formtwo' : 'formone';
            me.currentForm(form);
            me.hideme(form == 'formone');
        };
        TestViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                if (successFunction) {
                    successFunction();
                }
            });
        };
        return TestViewModel;
    }());
    Tops.TestViewModel = TestViewModel;
})(Tops || (Tops = {}));
Tops.TestViewModel.instance = new Tops.TestViewModel();
window.ViewModel = Tops.TestViewModel.instance;
//# sourceMappingURL=TestViewModel.js.map