var Tops;
(function (Tops) {
    var DatePickerTestViewModel = (function () {
        function DatePickerTestViewModel() {
            this.mydate = ko.observable('');
            this.foo = false;
            var me = this;
            Tops.DatePickerTestViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        DatePickerTestViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            jQuery(function () {
                jQuery(".datepicker").datepicker();
            });
            me.application.initialize(applicationPath, function () {
                if (successFunction) {
                    successFunction();
                }
            });
        };
        return DatePickerTestViewModel;
    }());
    Tops.DatePickerTestViewModel = DatePickerTestViewModel;
})(Tops || (Tops = {}));
Tops.DatePickerTestViewModel.instance = new Tops.DatePickerTestViewModel();
window.ViewModel = Tops.DatePickerTestViewModel.instance;
//# sourceMappingURL=DatePickerTestViewModel.js.map