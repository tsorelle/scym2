var Tops;
(function (Tops) {
    var MeetingsMapViewModel = (function () {
        function MeetingsMapViewModel() {
            var _this = this;
            this.initMap = function () {
                alert('Map init.');
                var me = _this;
                me.application.hideServiceMessages();
                me.peanut.executeService('meetings.InitMeetingsApp', '', me.handleInitializationResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleInitializationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    var meetings = response.meetings;
                    for (var i = 0; i < meetings.length; i++) {
                        console.info(meetings[i].meetingName);
                    }
                }
                else {
                }
            };
            var me = this;
            Tops.MeetingsMapViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        MeetingsMapViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                if (successFunction) {
                    successFunction();
                }
            });
        };
        return MeetingsMapViewModel;
    }());
    Tops.MeetingsMapViewModel = MeetingsMapViewModel;
})(Tops || (Tops = {}));
Tops.MeetingsMapViewModel.instance = new Tops.MeetingsMapViewModel();
window.ViewModel = Tops.MeetingsMapViewModel.instance;
//# sourceMappingURL=MeetingsMapViewModel.js.map