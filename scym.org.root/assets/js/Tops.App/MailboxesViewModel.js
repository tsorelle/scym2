var Tops;
(function (Tops) {
    var MailboxesViewModel = (function () {
        function MailboxesViewModel() {
            var _this = this;
            this.insertId = 0;
            this.mailboxList = ko.observableArray([]);
            this.updatedMailboxList = ko.observableArray([]);
            this.mailboxId = ko.observable('');
            this.mailboxCode = ko.observable('');
            this.mailboxName = ko.observable('');
            this.mailboxDescription = ko.observable('');
            this.mailboxEmail = ko.observable('');
            this.mailboxState = ko.observable(0);
            this.formHeading = ko.observable('');
            this.editMode = ko.observable('');
            this.mailboxDescriptionHasError = ko.observable(false);
            this.mailboxEmailHasError = ko.observable(false);
            this.mailboxNameHasError = ko.observable(false);
            this.mailboxCodeHasError = ko.observable(false);
            this.editMailbox = function (box) {
                var me = _this;
                me.clearValidation();
                me.editMode('update');
                me.mailboxId(box.id);
                me.mailboxCode(box.code);
                me.mailboxName(box.name);
                me.mailboxEmail(box.email);
                me.mailboxDescription(box.description);
                me.formHeading("Edit mailbox: " + box.code);
                me.mailboxState(2);
                me.showForm();
            };
            this.confirmRemoveMailbox = function (box) {
                var me = _this;
                box.state = 3;
                me.tempMailbox = box;
                me.mailboxCode(box.code);
                me.showConfirmForm();
            };
            var me = this;
            Tops.MailboxesViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        MailboxesViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.application.showWaiter('Getting mailbox list. Please wait...');
                me.getMailboxList(successFunction);
            });
        };
        MailboxesViewModel.prototype.hideForm = function () {
            jQuery("#mailbox-update-modal").modal('hide');
        };
        MailboxesViewModel.prototype.showForm = function () {
            var me = this;
            me.clearValidation();
            jQuery("#mailbox-update-modal").modal('show');
        };
        MailboxesViewModel.prototype.hideConfirmForm = function () {
            jQuery("#confirm-delete-modal").modal('hide');
        };
        MailboxesViewModel.prototype.showConfirmForm = function () {
            var me = this;
            jQuery("#confirm-delete-modal").modal('show');
        };
        MailboxesViewModel.prototype.getMailboxList = function (doneFunction) {
            var me = this;
            me.peanut.getFromService('mailboxes.GetMailboxList', null, function (serviceResponse) {
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.mailboxList(_.sortBy(list, function (box) { return box.name.toLowerCase(); }));
                }
                else {
                }
            }).always(function () {
                me.application.hideWaiter();
                if (doneFunction) {
                    doneFunction();
                }
            });
        };
        MailboxesViewModel.prototype.getMailbox = function () {
        };
        MailboxesViewModel.prototype.newMailbox = function () {
            var me = this;
            me.clearValidation();
            me.editMode('add');
            me.mailboxId('0');
            me.mailboxCode('');
            me.mailboxName('');
            me.mailboxEmail('');
            me.mailboxDescription('');
            me.formHeading('New mailbox');
            me.mailboxState(1);
            me.showForm();
        };
        MailboxesViewModel.prototype.clearValidation = function () {
            var me = this;
            me.mailboxCodeHasError(false);
            me.mailboxDescriptionHasError(false);
            me.mailboxEmailHasError(false);
            me.mailboxDescriptionHasError(false);
            me.mailboxNameHasError(false);
        };
        MailboxesViewModel.prototype.createMailboxDto = function () {
            var me = this;
            var valid = true;
            var box = new Tops.mailBox();
            box.id = me.mailboxId();
            box.code = me.mailboxCode();
            box.name = me.mailboxName();
            box.email = me.mailboxEmail();
            box.state = me.mailboxState();
            box.description = me.mailboxDescription();
            if (box.code == '') {
                me.mailboxCodeHasError(true);
                valid = false;
            }
            if (box.name == '') {
                me.mailboxNameHasError(true);
                valid = false;
            }
            var emailOk = Tops.Peanut.ValidateEmail(box.email);
            me.mailboxEmailHasError(!emailOk);
            if (!emailOk) {
                valid = false;
                me.mailboxEmailHasError(true);
            }
            if (valid) {
                return box;
            }
            return null;
        };
        MailboxesViewModel.prototype.updateMailbox = function () {
            var me = this;
            var box = me.createMailboxDto();
            if (box) {
                me.submitChanges(box);
            }
        };
        MailboxesViewModel.prototype.removeMailbox = function () {
            var me = this;
            me.hideConfirmForm();
            me.submitChanges(me.tempMailbox);
        };
        MailboxesViewModel.prototype.submitChanges = function (box) {
            var me = this;
            me.hideForm();
            me.application.showWaiter('Updating mailboxes. Please wait...');
            me.peanut.executeService('mailboxes.UpdateMailbox', box, function (serviceResponse) {
                me.application.hideWaiter();
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.hideForm();
                    var list = serviceResponse.Value;
                    me.mailboxList(_.sortBy(list, function (box) { return box.name.toLowerCase(); }));
                }
            }).fail(function () {
                me.application.hideWaiter();
            });
        };
        return MailboxesViewModel;
    }());
    Tops.MailboxesViewModel = MailboxesViewModel;
})(Tops || (Tops = {}));
Tops.MailboxesViewModel.instance = new Tops.MailboxesViewModel();
window.ViewModel = Tops.MailboxesViewModel.instance;
//# sourceMappingURL=MailboxesViewModel.js.map