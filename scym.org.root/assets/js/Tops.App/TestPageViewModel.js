var Tops;
(function (Tops) {
    var TestPageViewModel = (function () {
        function TestPageViewModel() {
            this.messageText = ko.observable('');
            this.itemName = ko.observable('');
            this.itemId = ko.observable(1);
            var me = this;
            Tops.TestPageViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        TestPageViewModel.prototype.onGetItem = function () {
            var me = this;
            me.application.showWaiter('Please wait...');
            me.peanut.getFromService('TestGetService', 3, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.itemName(serviceResponse.Value.name);
                    me.itemId(serviceResponse.Value.id);
                }
                else {
                    alert("Service failed");
                }
            }).always(function () {
                me.application.hideWaiter();
            });
        };
        TestPageViewModel.prototype.onPostItem = function () {
            var me = this;
            var request = {
                testMessageText: me.itemName()
            };
            me.application.showWaiter('Please wait...');
            me.peanut.executeService('TestService', request)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        TestPageViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.application.showMessage("initialized");
                if (successFunction) {
                    successFunction();
                }
            });
        };
        TestPageViewModel.prototype.onAddMessageClick = function () {
            var me = this;
            var msg = me.messageText();
            me.application.showMessage(msg);
            me.messageText('');
        };
        TestPageViewModel.prototype.onAddErrorMessageClick = function () {
            var me = this;
            var msg = me.messageText();
            me.application.showError(msg);
            me.messageText('');
        };
        TestPageViewModel.prototype.onAddWarningMessageClick = function () {
            var me = this;
            var msg = me.messageText();
            me.application.showWarning(msg);
            me.messageText('');
        };
        TestPageViewModel.prototype.onShowSpinWaiter = function () {
            var count = 0;
            Tops.waitMessage.show("Hello " + (new Date()).toISOString());
            var t = window.setInterval(function () {
                if (count > 100) {
                    clearInterval(t);
                    Tops.waitMessage.hide();
                }
                else {
                    Tops.waitMessage.setMessage('Counting ' + count);
                }
                count += 1;
            }, 100);
        };
        TestPageViewModel.prototype.onShowWaiter = function () {
            var count = 0;
            Tops.waitMessage.show("Hello " + (new Date()).toISOString(), 'progress-waiter');
            var t = window.setInterval(function () {
                if (count > 100) {
                    clearInterval(t);
                    Tops.waitMessage.hide();
                }
                else {
                    Tops.waitMessage.setMessage('Counting ' + count);
                    Tops.waitMessage.setProgress(count, true);
                }
                count += 1;
            }, 100);
        };
        TestPageViewModel.prototype.onHideWaiter = function () {
            Tops.waitMessage.hide();
        };
        return TestPageViewModel;
    }());
    Tops.TestPageViewModel = TestPageViewModel;
})(Tops || (Tops = {}));
Tops.TestPageViewModel.instance = new Tops.TestPageViewModel();
window.ViewModel = Tops.TestPageViewModel.instance;
//# sourceMappingURL=TestPageViewModel.js.map