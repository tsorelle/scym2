var Tops;
(function (Tops) {
    var mailBox = (function () {
        function mailBox() {
        }
        return mailBox;
    }());
    Tops.mailBox = mailBox;
    var waitMessage = (function () {
        function waitMessage() {
        }
        waitMessage.addTemplate = function (templateName, content) {
            waitMessage.templates[templateName] = content;
        };
        waitMessage.setWaiterType = function (waiterType) {
            waitMessage.waiterType = waiterType;
            waitMessage.waitDialog = jQuery(waitMessage.templates[waiterType]);
            return waitMessage.waitDialog;
        };
        waitMessage.show = function (message, waiterType) {
            if (message === void 0) { message = 'Please wait ...'; }
            if (waiterType === void 0) { waiterType = 'spin-waiter'; }
            if (waitMessage.visible) {
                waitMessage.setMessage(message);
            }
            else {
                var div = waitMessage.setWaiterType(waiterType);
                var span = div.find('#wait-message');
                span.text(message);
                div.modal();
                waitMessage.visible = true;
            }
        };
        waitMessage.setMessage = function (message) {
            if (waitMessage.waitDialog) {
                var span = waitMessage.waitDialog.find('#wait-message');
                span.text(message);
            }
        };
        waitMessage.setProgress = function (count, showLabel) {
            if (showLabel === void 0) { showLabel = false; }
            if (waitMessage.waiterType == 'progress-waiter') {
                var bar = waitMessage.waitDialog.find('#wait-progress-bar');
                var percent = count + '%';
                bar.css('width', percent);
                if (showLabel) {
                    bar.text(percent);
                }
            }
        };
        waitMessage.hide = function () {
            if (waitMessage.visible && waitMessage.waitDialog) {
                waitMessage.waitDialog.modal('hide');
                waitMessage.visible = false;
            }
        };
        waitMessage.waitDialog = null;
        waitMessage.waiterType = 'spin-waiter';
        waitMessage.templates = Array();
        waitMessage.visible = false;
        return waitMessage;
    }());
    Tops.waitMessage = waitMessage;
    var messageManager = (function () {
        function messageManager() {
            var _this = this;
            this.errorMessages = ko.observableArray([]);
            this.infoMessages = ko.observableArray([]);
            this.warningMessages = ko.observableArray([]);
            this.addMessage = function (message, messageType) {
                switch (messageType) {
                    case Tops.Peanut.errorMessageType:
                        _this.errorMessages.push({ type: messageManager.errorClass, text: message });
                        break;
                    case Tops.Peanut.warningMessageType:
                        _this.warningMessages.push({ type: messageManager.warningClass, text: message });
                        break;
                    default:
                        _this.infoMessages.push({ type: messageManager.infoClass, text: message });
                        break;
                }
            };
            this.setMessage = function (message, messageType) {
                switch (messageType) {
                    case Tops.Peanut.errorMessageType:
                        _this.errorMessages([{ type: messageManager.errorClass, text: message }]);
                        break;
                    case Tops.Peanut.warningMessageType:
                        _this.warningMessages([{ type: messageManager.warningClass, text: message }]);
                        break;
                    default:
                        _this.infoMessages([{ type: messageManager.infoClass, text: message }]);
                        break;
                }
            };
            this.clearMessages = function (messageType) {
                if (messageType === void 0) { messageType = Tops.Peanut.allMessagesType; }
                if (messageType == Tops.Peanut.errorMessageType || messageType == Tops.Peanut.allMessagesType) {
                    _this.errorMessages([]);
                }
                if (messageType == Tops.Peanut.warningMessageType || messageType == Tops.Peanut.allMessagesType) {
                    _this.warningMessages([]);
                }
                if (messageType == Tops.Peanut.infoMessageType || messageType == Tops.Peanut.allMessagesType) {
                    _this.infoMessages([]);
                }
            };
            this.clearInfoMessages = function () {
                _this.infoMessages([]);
            };
            this.clearErrorMessages = function () {
                _this.errorMessages([]);
            };
            this.clearWarningMessages = function () {
                _this.warningMessages([]);
            };
            this.setServiceMessages = function (messages) {
                var count = messages.length;
                var errorArray = [];
                var warningArray = [];
                var infoArray = [];
                for (var i = 0; i < count; i++) {
                    var message = messages[i];
                    switch (message.MessageType) {
                        case Tops.Peanut.errorMessageType:
                            errorArray.push({ type: messageManager.errorClass, text: message.Text });
                            break;
                        case Tops.Peanut.warningMessageType:
                            warningArray.push({ type: messageManager.warningClass, text: message.Text });
                            break;
                        default:
                            infoArray.push({ type: messageManager.infoClass, text: message.Text });
                            break;
                    }
                }
                _this.errorMessages(errorArray);
                _this.warningMessages(warningArray);
                _this.infoMessages(infoArray);
            };
        }
        messageManager.errorClass = "service-message-error";
        messageManager.infoClass = "service-message-information";
        messageManager.warningClass = "service-message-warning";
        return messageManager;
    }());
    var Application = (function () {
        function Application(currentViewModel) {
            var _this = this;
            this.applicationPath = "";
            this.componentLoader = null;
            this.serviceUrl = "tops/service";
            this.bindComponent = function (name, vmInstance, finalFunction) {
                var me = _this;
                me.usingComponentLoader(function () {
                    if (me.componentLoader.alreadyLoaded(name)) {
                        if (finalFunction) {
                            finalFunction();
                        }
                    }
                    else {
                        me.componentLoader.loadComponentInstance(name, vmInstance, function (vm) {
                            me.bindSection(name + '-container', vm);
                            if (finalFunction) {
                                finalFunction();
                            }
                        });
                    }
                });
            };
            var me = this;
            me.viewModel = currentViewModel;
            me.peanut = new Tops.Peanut(me);
            Application.current = me;
        }
        Application.prototype.getHtmlTemplate = function (name, successFunction) {
            var parts = name.split('-');
            var fileName = parts[0] + parts[1].charAt(0).toUpperCase() + parts[1].substring(1);
            var htmlSource = this.applicationPath +
                'assets/templates/' + fileName + '.html'
                + '?tv=' + Application.versionNumber;
            jQuery.get(htmlSource, successFunction);
        };
        Application.prototype.expandFileName = function (fileName) {
            if (!fileName) {
                return '';
            }
            var fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
            if (fileExtension) {
                switch (fileExtension.toLowerCase()) {
                    case 'css':
                        return this.applicationPath + 'assets/css/' + fileName
                            + '?tv=' + Application.versionNumber;
                    case 'js':
                        return this.applicationPath + 'assets/js/components/' + fileName
                            + '?tv=' + Application.versionNumber;
                }
            }
            return fileName;
        };
        Application.prototype.loadResources = function (names, successFunction) {
            var me = this;
            var params = null;
            if (_.isArray(names)) {
                params = [];
                for (var i = 0; i < names.length; i++) {
                    var path = me.expandFileName(names[i]);
                    params.push(path);
                }
            }
            else {
                params = me.expandFileName(names);
            }
            head.load(params, successFunction);
        };
        Application.prototype.loadJS = function (names, successFunction) {
            var params = null;
            if (_.isArray(names)) {
                params = [];
                for (var i = 0; i < names.length; i++) {
                    params.push(this.applicationPath + 'assets/js/components/' + names[i]
                        + "?tv=" + Application.versionNumber);
                }
            }
            else {
                params = names;
            }
            head.load(params, successFunction);
        };
        Application.prototype.loadCSS = function (name, successFunction) {
            head.load(this.applicationPath + 'assets/css/' + name
                + "?tv=" + Application.versionNumber, successFunction);
        };
        Application.prototype.usingComponentLoader = function (afterLoad) {
            var me = this;
            if (me.componentLoader) {
                afterLoad();
            }
            else {
                head.load(me.applicationPath + 'assets/js/components/TkoComponentLoader.js?tv=' + Application.versionNumber, function () {
                    me.componentLoader = new Tops.TkoComponentLoader(me.applicationPath);
                    Tops.TkoComponentLoader.versionNumber = Application.versionNumber;
                    afterLoad();
                });
            }
        };
        Application.prototype.componentIsLoaded = function (name) {
            var me = this;
            me.usingComponentLoader(function () {
                return me.componentLoader;
            });
        };
        Application.prototype.loadComponent = function (name, successFunction) {
            var me = this;
            me.usingComponentLoader(function () {
                me.componentLoader.load(name, successFunction);
            });
        };
        Application.prototype.loadComponentTemplate = function (componentName, htmlFileName, vmInstance, finalFunction) {
            if (finalFunction === void 0) { finalFunction = null; }
            var me = this;
            me.usingComponentLoader(function () {
                me.componentLoader.loadComponentTemplate(componentName, htmlFileName, vmInstance, finalFunction);
            });
        };
        Application.prototype.loadComponentInstance = function (name, vmInstance, finalFunction) {
            var me = this;
            me.usingComponentLoader(function () {
                me.componentLoader.loadComponentInstance(name, vmInstance, finalFunction);
            });
        };
        Application.prototype.bindNode = function (containerName, context) {
            var me = this;
            if (context == null) {
                context = me.viewModel;
            }
            var container = document.getElementById(containerName);
            ko.applyBindingsToNode(container, null, context);
        };
        ;
        Application.prototype.bindSection = function (containerName, context) {
            var me = this;
            if (context == null) {
                context = me.viewModel;
            }
            var container = document.getElementById(containerName);
            if (container == null) {
                if (containerName) {
                    alert("Error: Container element '" + containerName + "' for section binding not found.");
                }
                else {
                    alert("Error: not container name for section binding.");
                }
                return;
            }
            ko.applyBindings(context, container);
            jQuery("#" + containerName).show();
        };
        ;
        Application.prototype.loadWaitMessageTemplate = function (templateName, successFunction) {
            this.getHtmlTemplate(templateName, function (htmlSource) {
                waitMessage.addTemplate(templateName, htmlSource);
                successFunction();
            });
        };
        Application.prototype.showDefaultSection = function () {
            var container = document.getElementById(Tops.Application.defaultSectionId);
            jQuery("#" + Tops.Application.defaultSectionId).show();
        };
        Application.prototype.bindDefaultSection = function () {
            var me = this;
            me.bindSection(Tops.Application.defaultSectionId, me.viewModel);
        };
        Application.prototype.registerComponent = function (componentName, vm, finalFunction) {
            var me = this;
            me.usingComponentLoader(function () {
                me.componentLoader.registerComponent(componentName, vm, finalFunction);
            });
        };
        Application.prototype.registerAndBindComponent = function (componentName, vm, finalFunction) {
            var me = this;
            me.usingComponentLoader(function () {
                me.componentLoader.registerComponent(componentName, vm, function () {
                    me.bindSection(componentName + '-container', messageManager.instance);
                    if (finalFunction) {
                        finalFunction();
                    }
                });
            });
        };
        Application.prototype.initialize = function (applicationPath, successFunction) {
            var me = this;
            me.setApplicationPath(applicationPath);
            me.serviceUrl = me.applicationPath + me.serviceUrl;
            messageManager.instance = new messageManager();
            me.registerAndBindComponent('service-messages', messageManager.instance, function () {
                me.loadWaitMessageTemplate('spin-waiter', function () {
                    me.loadWaitMessageTemplate('progress-waiter', function () {
                        if (successFunction) {
                            successFunction();
                        }
                    });
                });
            });
        };
        Application.prototype.setApplicationPath = function (path) {
            var me = this;
            if (path) {
                me.applicationPath = "";
                if (path.charAt(0) != "/")
                    me.applicationPath = "/";
                me.applicationPath = me.applicationPath + path;
                if (path.charAt(path.length - 1) != "/") {
                    me.applicationPath = me.applicationPath + "/";
                }
            }
            else {
                me.applicationPath = "/";
            }
            var port = location.port;
            if ((!port) || port == '8080') {
                port = '';
            }
            else {
                port = ':' + port;
            }
            me.applicationPath = location.protocol + '//' + location.hostname + port + me.applicationPath;
        };
        Application.prototype.showServiceMessages = function (messages) {
            messageManager.instance.setServiceMessages(messages);
        };
        Application.prototype.hideServiceMessages = function () {
            messageManager.instance.clearMessages();
        };
        Application.prototype.showError = function (errorMessage) {
            if (errorMessage) {
                messageManager.instance.addMessage(errorMessage, Tops.Peanut.errorMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.errorMessageType);
            }
        };
        Application.prototype.showMessage = function (messageText) {
            if (messageText) {
                messageManager.instance.addMessage(messageText, Tops.Peanut.infoMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.infoMessageType);
            }
        };
        Application.prototype.showWarning = function (messageText) {
            if (messageText) {
                messageManager.instance.addMessage(messageText, Tops.Peanut.warningMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.warningMessageType);
            }
        };
        Application.prototype.setErrorMessage = function (messageText) {
            if (messageText) {
                messageManager.instance.setMessage(messageText, Tops.Peanut.errorMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.errorMessageType);
            }
        };
        Application.prototype.setInfoMessage = function (messageText) {
            if (messageText) {
                messageManager.instance.setMessage(messageText, Tops.Peanut.infoMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.infoMessageType);
            }
        };
        Application.prototype.setWarningMessage = function (messageText) {
            if (messageText) {
                messageManager.instance.setMessage(messageText, Tops.Peanut.warningMessageType);
            }
            else {
                messageManager.instance.clearMessages(Tops.Peanut.infoMessageType);
            }
        };
        Application.prototype.showWaiter = function (message) {
            if (message === void 0) { message = "Please wait . . ."; }
            waitMessage.show(message);
        };
        Application.prototype.hideWaiter = function () {
            waitMessage.hide();
        };
        Application.prototype.showProgress = function (message) {
            if (message === void 0) { message = "Please wait . . ."; }
            waitMessage.show(message, 'progress-waiter');
        };
        Application.prototype.setProgress = function (count) {
            waitMessage.setProgress(count);
        };
        Application.versionNumber = "1.3";
        Application.defaultSectionId = 'tops-view-section';
        return Application;
    }());
    Tops.Application = Application;
})(Tops || (Tops = {}));
//# sourceMappingURL=App.js.map