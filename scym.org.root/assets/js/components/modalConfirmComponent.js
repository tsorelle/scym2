var Tops;
(function (Tops) {
    var modalConfirmComponent = (function () {
        function modalConfirmComponent(params) {
            var me = this;
            me.modalId = ko.observable(params.id);
            me.confirmClick = params.confirmClick;
            me.headerText = (typeof params.headerText == 'string') ? ko.observable(params.headerText) : params.headerText;
            me.bodyText = (typeof params.bodyText == 'string') ? ko.observable(params.bodyText) : params.bodyText;
            var buttonSet = (params.buttonSet) ? params.buttonSet : 'okcancel';
            me.showOkButton = ko.observable(buttonSet != 'alert');
            switch (buttonSet) {
                case 'alert':
                    me.okLabel = ko.observable('');
                    me.cancelLabel = ko.observable('Continue');
                    break;
                case 'yesno':
                    me.okLabel = ko.observable('Yes');
                    me.cancelLabel = ko.observable('No');
                    break;
                case 'okcancel':
                    me.okLabel = ko.observable('Ok');
                    me.cancelLabel = ko.observable('Cancel');
                    break;
                default:
                    var parts = buttonSet.split('||');
                    if (parts.length == 2) {
                        me.okLabel = ko.observable(parts[0]);
                        me.cancelLabel = ko.observable(parts[1]);
                    }
                    else {
                        me.okLabel = ko.observable('Ok');
                        me.cancelLabel = ko.observable('Cancel');
                    }
                    break;
            }
        }
        return modalConfirmComponent;
    }());
    Tops.modalConfirmComponent = modalConfirmComponent;
})(Tops || (Tops = {}));
Tops.TkoComponentLoader.addVM('modal-confirm', Tops.modalConfirmComponent);
//# sourceMappingURL=modalConfirmComponent.js.map