// replace all occurances of 'DatePickerTest' with the name of your model

/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path="./App.ts" />
/// <reference path="../Tops.Peanut/Peanut.ts" />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />
/// <reference path='../typings/jqueryui/jqueryui.d.ts' />

module Tops {
    export class DatePickerTestViewModel implements IMainViewModel {
        static instance: Tops.DatePickerTestViewModel;
        private application: Tops.IPeanutClient;
        private peanut: Tops.Peanut;

        mydate = ko.observable('');

        // Constructor
        constructor() {
            var me = this;
            Tops.DatePickerTestViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }

        private foo = false;


        /**
         * @param applicationPath - root path of application or location of service script
         * @param successFunction - page inittializations such as ko.applyBindings() go here.
         *
         * Call this function in a script at the end of the page following the closing "body" tag.
         * e.g.
         *      ViewModel.init('/', function() {
         *          ko.applyBindings(ViewModel);
         *      });
         *
         */
        init(applicationPath: string, successFunction?: () => void) {
            var me = this;
            // setup messaging and other application initializations

            jQuery(function() {
                jQuery( ".datepicker" ).datepicker();
            });

            me.application.initialize(applicationPath,
                function() {
                    // do view model initializations here.

                    if (successFunction) {
                        successFunction();
                    }
                }
            );
        }
    }
}

Tops.DatePickerTestViewModel.instance = new Tops.DatePickerTestViewModel();
(<any>window).ViewModel = Tops.DatePickerTestViewModel.instance;