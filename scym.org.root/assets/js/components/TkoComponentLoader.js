var Tops;
(function (Tops) {
    var TkoComponentLoader = (function () {
        function TkoComponentLoader(applicationPath, htmlPath, vmPath) {
            if (applicationPath === void 0) { applicationPath = ''; }
            if (htmlPath === void 0) { htmlPath = 'assets/templates'; }
            if (vmPath === void 0) { vmPath = 'assets/js/components'; }
            this.applicationPath = applicationPath;
            this.htmlPath = htmlPath;
            this.vmPath = vmPath;
            this.components = [];
            TkoComponentLoader.instance = this;
        }
        TkoComponentLoader.addVM = function (componentName, vm) {
            TkoComponentLoader.instance.components[componentName] = vm;
        };
        TkoComponentLoader.prototype.getVM = function (componentName) {
            var me = this;
            return (componentName in me.components) ? me.components[componentName] : null;
        };
        TkoComponentLoader.prototype.nameToFileName = function (componentName) {
            var me = this;
            var parts = componentName.split('-');
            var fileName = parts[0];
            if (parts.length > 1) {
                fileName += parts[1].charAt(0).toUpperCase() + parts[1].substring(1);
            }
            return fileName;
        };
        TkoComponentLoader.prototype.alreadyLoaded = function (componentName) {
            var me = this;
            return (componentName in me.components);
        };
        TkoComponentLoader.prototype.loadComponentTemplate = function (componentName, htmlFileName, vmInstance, finalFunction) {
            var me = this;
            var htmlPath = me.applicationPath + me.htmlPath + '/' + htmlFileName + '.html?tv=' + TkoComponentLoader.versionNumber;
            jQuery.get(htmlPath, function (htmlSource) {
                ko.components.register(componentName, {
                    viewModel: vmInstance,
                    template: htmlSource
                });
                if (finalFunction) {
                    finalFunction();
                }
            });
        };
        TkoComponentLoader.prototype.load = function (componentName, finalFunction) {
            var me = this;
            if (componentName in me.components) {
                if (finalFunction) {
                    finalFunction();
                }
                return;
            }
            var fileName = me.nameToFileName(componentName);
            var htmlPath = me.applicationPath + me.htmlPath + '/' + fileName + '.html?tv=' +
                TkoComponentLoader.versionNumber;
            jQuery.get(htmlPath, function (htmlSource) {
                var src = me.applicationPath + me.vmPath + '/' + fileName + 'Component.js?tv='
                    + TkoComponentLoader.versionNumber;
                head.load(src, function () {
                    var vm = me.getVM(componentName);
                    if (vm) {
                        ko.components.register(componentName, {
                            viewModel: vm,
                            template: htmlSource
                        });
                    }
                    if (finalFunction) {
                        finalFunction();
                    }
                });
            });
        };
        TkoComponentLoader.prototype.registerComponent = function (componentName, vm, finalFunction) {
            var me = this;
            var fileName = me.nameToFileName(componentName);
            var htmlPath = me.applicationPath + me.htmlPath + '/' + fileName + '.html?tv=' + TkoComponentLoader.versionNumber;
            jQuery.get(htmlPath, function (htmlSource) {
                if (vm) {
                    ko.components.register(componentName, {
                        viewModel: { instance: vm },
                        template: htmlSource
                    });
                }
                if (finalFunction) {
                    finalFunction(vm);
                }
            });
        };
        TkoComponentLoader.prototype.loadComponentInstance = function (name, vmInstance, finalFunction) {
            var me = this;
            var fileName = me.nameToFileName(name);
            var htmlPath = me.applicationPath + me.htmlPath + '/' + fileName + '.html?tv=' + TkoComponentLoader.versionNumber;
            jQuery.get(htmlPath, function (htmlSource) {
                var src = me.applicationPath + me.vmPath + '/' + fileName + 'Component.js?tv=' + TkoComponentLoader.versionNumber;
                head.load(src, function () {
                    var vm = (jQuery.isFunction(vmInstance)) ? vmInstance() : vmInstance;
                    if (vm) {
                        ko.components.register(name, {
                            viewModel: { instance: vm },
                            template: htmlSource
                        });
                    }
                    if (finalFunction) {
                        finalFunction(vm);
                    }
                });
            });
        };
        TkoComponentLoader.versionNumber = '0.0';
        return TkoComponentLoader;
    }());
    Tops.TkoComponentLoader = TkoComponentLoader;
})(Tops || (Tops = {}));
//# sourceMappingURL=TkoComponentLoader.js.map