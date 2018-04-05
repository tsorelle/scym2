var Tops;
(function (Tops) {
    var EmailCorrection = (function () {
        function EmailCorrection() {
        }
        return EmailCorrection;
    }());
    Tops.EmailCorrection = EmailCorrection;
    var BounceListItem = (function () {
        function BounceListItem() {
            this.email = '';
            this.remove = false;
            this.correction = '';
            this.validation = '';
        }
        return BounceListItem;
    }());
    Tops.BounceListItem = BounceListItem;
    var EMailingsViewModel = (function () {
        function EMailingsViewModel() {
            var _this = this;
            this.fileLoadMessage = ko.observable('');
            this.correctionsCount = ko.observable(0);
            this.corrections = [];
            this.bounceList = ko.observableArray([]);
            this.bounceValidationErrors = ko.observable('');
            this.handleInitializationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var bounces = serviceResponse.Value;
                    me.setBounces(bounces);
                }
            };
            this.onFileSelected = function () {
                var me = _this;
                me.resetForms();
                var e = document.getElementById('fileselect');
                var file = e.files[0];
                if (file) {
                    var reader = new FileReader();
                    reader.onload = me.fileLoaded;
                    reader.readAsText(file, "UTF-8");
                }
            };
            this.fileLoaded = function (evt) {
                var me = _this;
                me.peanut.hideServiceMessages();
                var text = evt.target.result;
                me.correctionsCount(0);
                me.corrections = [];
                if (text) {
                    var lines = text.split('\n');
                    _.forEach(lines, function (line) {
                        if (line) {
                            var parts = line.split(',');
                            var partsCount = parts.length;
                            if (partsCount > 1) {
                                var correction = new EmailCorrection();
                                correction.address = parts[0];
                                if (parts[1] != 'mailable') {
                                    correction.status = parts[1];
                                    if (correction.status != 'bounced' && correction.status != 'unsubscribed' && partsCount > 3) {
                                        correction.status = parts[2];
                                        if (correction.status != 'unsubscribed') {
                                            correction.status = parts[3];
                                        }
                                    }
                                    if (correction.status == 'bounced' || correction.status == 'unsubscribed') {
                                        me.corrections.push(correction);
                                    }
                                }
                            }
                        }
                    }, me);
                    var count = me.corrections.length;
                    if (count < 1) {
                        me.fileLoadMessage("No corrections in this file. Did you chose the right one?");
                    }
                    else {
                        me.fileLoadMessage('Corrections found: ' + count);
                    }
                    me.correctionsCount(count);
                }
                else {
                    alert('read failed');
                }
            };
            this.uploadCorrections = function () {
                var me = _this;
                me.fileLoadMessage('');
                me.correctionsCount(0);
                var request = me.corrections;
                me.application.hideServiceMessages();
                me.application.showWaiter('Uploading corrections...');
                me.peanut.executeService('email.UploadCorrections', request, me.handleCorrectionUploadResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleCorrectionUploadResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var bounces = serviceResponse.Value;
                    me.setBounces(bounces);
                }
            };
            this.uploadBounceCorrections = function () {
                var me = _this;
                var bounces = me.bounceList();
                me.application.hideServiceMessages();
                var errorCount = 0;
                var count = bounces.length;
                for (var i = 0; i < count; i++) {
                    var correctionItem = bounces[i];
                    if (correctionItem.correction) {
                        if (!Tops.Peanut.ValidateEmail(correctionItem.correction)) {
                            bounces[i].validation = "Invalid Email Correction";
                            errorCount += 1;
                            continue;
                        }
                        bounces[i].validation = '';
                    }
                }
                if (errorCount == 0) {
                    me.bounceValidationErrors('');
                }
                else {
                    me.bounceValidationErrors('Corrections include ' + errorCount + ' invalid email addresses.');
                    me.bounceList([]);
                    me.bounceList(bounces);
                    return;
                }
                var request = _.filter(bounces, function (bounceItem) {
                    if (bounceItem.remove) {
                        bounceItem.correction = '';
                        return true;
                    }
                    var fix = bounceItem.correction ? bounceItem.correction.trim() : '';
                    return (fix != '');
                }, me);
                if (request.length < 1) {
                    me.application.showWarning('No corrections to upload.');
                    return;
                }
                me.application.showWaiter('Uploading e-mail address corrections...');
                me.peanut.executeService('email.CorrectBounces', request, me.handleBounceUpload)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleBounceUpload = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.resetForms();
                    var bounces = serviceResponse.Value;
                    me.setBounces(bounces);
                }
            };
            this.cancelBounceFixes = function () {
                var me = _this;
                me.resetForms();
            };
            this.handleServiceResponseTemplate = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                }
            };
            var me = this;
            Tops.EMailingsViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        EMailingsViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.application.hideServiceMessages();
                me.application.showWaiter('Initializing...');
                me.peanut.executeService('email.InitEmailListManagement', null, me.handleInitializationResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
                if (successFunction) {
                    successFunction();
                }
            });
        };
        EMailingsViewModel.prototype.setBounces = function (bounces) {
            var me = this;
            _.each(bounces, function (bounce) {
                bounce.remove = false;
            }, this);
            me.bounceList(bounces);
        };
        EMailingsViewModel.prototype.resetForms = function () {
            var me = this;
            me.fileLoadMessage('');
            me.correctionsCount(0);
            me.corrections = [];
            me.bounceValidationErrors('');
        };
        EMailingsViewModel.prototype.serviceCallTemplate = function () {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.application.showWaiter('Message here...');
            me.peanut.executeService('directory.ServiceName', request, me.handleServiceResponseTemplate)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        return EMailingsViewModel;
    }());
    Tops.EMailingsViewModel = EMailingsViewModel;
})(Tops || (Tops = {}));
Tops.EMailingsViewModel.instance = new Tops.EMailingsViewModel();
window.ViewModel = Tops.EMailingsViewModel.instance;
//# sourceMappingURL=EMailingsViewModel.js.map