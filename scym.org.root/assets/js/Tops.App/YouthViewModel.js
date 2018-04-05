var Tops;
(function (Tops) {
    var YouthViewModel = (function () {
        function YouthViewModel() {
            var _this = this;
            this.currentForm = ko.observable('youthlist');
            this.handleEvent = function (eventName, data) {
                var me = _this;
                if (me.youthListVM) {
                    me.youthListVM.handleEvent(eventName, data);
                }
            };
            this.afterInit = function () {
                var me = _this;
                me.application.bindSection('tabs');
                me.application.bindSection('youth-list-form');
                me.application.bindNode('age-groups-form');
                me.application.bindNode('reports-form');
                me.application.showDefaultSection();
            };
            this.showYouthList = function () {
                var me = _this;
                me.currentForm('youthlist');
                me.handleEvent('youthlist-selected');
            };
            this.showAgeGroups = function () {
                var me = _this;
                if (me.ageGroupsVM) {
                    me.currentForm('agegroups');
                }
                else {
                    me.application.loadComponent('month-lookup', function () {
                        me.application.bindComponent('age-groups', function () {
                            me.ageGroupsVM = new Tops.ageGroupsComponent(me.application, me);
                            return me.ageGroupsVM;
                        }, function () {
                            me.ageGroupsVM.initialize(function () {
                                me.currentForm('agegroups');
                            });
                        });
                    });
                }
            };
            this.showReportsForm = function () {
                var me = _this;
                if (me.reportsVM) {
                    me.currentForm('reports');
                }
                else {
                    me.application.bindComponent('youth-reports', function () {
                        me.reportsVM = new Tops.youthReportsComponent(me.application);
                        return me.reportsVM;
                    }, function () {
                        me.currentForm('reports');
                    });
                }
            };
            var me = this;
            Tops.YouthViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        YouthViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            successFunction = me.afterInit;
            me.application.initialize(applicationPath, function () {
                me.application.loadResources(['youthListComponent.js'], function () {
                    me.youthListVM = new Tops.youthListComponent(me.application);
                    me.application.registerComponent('youth-list', me.youthListVM, function () {
                        me.youthListVM.initialize(function () {
                            successFunction();
                        });
                    });
                });
            });
        };
        return YouthViewModel;
    }());
    Tops.YouthViewModel = YouthViewModel;
})(Tops || (Tops = {}));
Tops.YouthViewModel.instance = new Tops.YouthViewModel();
window.ViewModel = Tops.YouthViewModel.instance;
//# sourceMappingURL=YouthViewModel.js.map