var Tops;
(function (Tops) {
    var mailMessage = (function () {
        function mailMessage() {
        }
        return mailMessage;
    }());
    Tops.mailMessage = mailMessage;
    var getMailboxResponse = (function () {
        function getMailboxResponse() {
        }
        return getMailboxResponse;
    }());
    Tops.getMailboxResponse = getMailboxResponse;
    var MailFormViewModel = (function () {
        function MailFormViewModel() {
            this.mailboxCode = '';
            this.headerMessage = ko.observable('');
            this.fromAddress = ko.observable('');
            this.fromName = ko.observable('');
            this.messageSubject = ko.observable('');
            this.messageBody = ko.observable('');
            this.formVisible = ko.observable(true);
            this.subjectError = ko.observable('');
            this.bodyError = ko.observable('');
            this.fromNameError = ko.observable('');
            this.fromAddressError = ko.observable('');
            this.userIsAnonymous = ko.observable(false);
            var me = this;
            Tops.MailFormViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        MailFormViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.getMailbox(successFunction);
            });
        };
        MailFormViewModel.prototype.getMailbox = function (doneFunction) {
            var me = this;
            var mailboxCode = me.peanut.getRequestParam('box');
            mailboxCode = mailboxCode ? mailboxCode : 'scym';
            me.application.showWaiter('Loading mailbox. Please wait...');
            me.peanut.getFromService('mailboxes.GetMailbox', mailboxCode, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.mailboxCode = mailboxCode;
                    me.fromAddress(response.fromAddress);
                    me.fromName(response.fromName);
                    me.userIsAnonymous(response.fromAddress.trim() == '');
                    me.headerMessage("Send a message to: " + response.mailboxName);
                    me.formVisible(true);
                }
                else {
                    me.formVisible(false);
                    me.headerMessage('No mailbox found for ' + me.mailboxCode);
                }
            }).always(function () {
                me.application.hideWaiter();
                if (doneFunction) {
                    doneFunction();
                    jQuery("#main-form").show();
                }
            });
        };
        MailFormViewModel.prototype.createMessage = function () {
            var me = this;
            var message = new mailMessage();
            message.mailboxCode = me.mailboxCode;
            message.subject = me.messageSubject();
            message.body = me.messageBody();
            message.fromAddress = me.fromAddress();
            message.fromName = me.fromName();
            me.subjectError('');
            me.bodyError('');
            me.fromAddressError('');
            me.fromNameError('');
            var valid = true;
            if (message.fromAddress.trim() == '') {
                me.fromAddressError(': please enter your e-mail address');
                valid = false;
            }
            else {
                var fromAddressOk = Tops.Peanut.ValidateEmail(message.fromAddress);
                if (!fromAddressOk) {
                    me.fromAddressError(': This e-mail address is not valid.');
                    valid = false;
                }
            }
            if (message.fromName.trim() == '') {
                me.fromNameError(': Please enter your name.');
            }
            if (message.subject.trim() == '') {
                me.subjectError(': A subject is required');
                valid = false;
            }
            if (message.body.trim() == '') {
                me.bodyError(': Message text is required.');
                valid = false;
            }
            if (valid) {
                return message;
            }
            return null;
        };
        MailFormViewModel.prototype.sendMessage = function () {
            var me = this;
            var message = me.createMessage();
            if (message) {
                var me = this;
                me.application.showWaiter('Sending message. Please wait...');
                me.peanut.executeService('mailboxes.SendMessage', message, function (serviceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        me.formVisible(false);
                        me.headerMessage('Thanks for your message.');
                    }
                }).always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        return MailFormViewModel;
    }());
    Tops.MailFormViewModel = MailFormViewModel;
})(Tops || (Tops = {}));
Tops.MailFormViewModel.instance = new Tops.MailFormViewModel();
window.ViewModel = Tops.MailFormViewModel.instance;
//# sourceMappingURL=MailFormViewModel.js.map