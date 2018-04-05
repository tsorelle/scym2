/**
 * Created by Terry on 11/4/2015.
 */
// replace all occurances of 'Test' with the name of your model

/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path="./App.ts" />
/// <reference path="../Tops.Peanut/Peanut.ts" />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />

// reference to jqueryui required if date popups are used.
/// <reference path='../typings/jqueryui/jqueryui.d.ts' />

module Tops {
    export class TestViewModel implements IMainViewModel {
        static instance: Tops.TestViewModel;
        private application: Tops.IPeanutClient;
        private peanut: Tops.Peanut;


        currentForm = ko.observable('formone');
        hideme = ko.observable(true);

        // Constructor
        constructor() {
            var me = this;
            Tops.TestViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }

        toggleForm() {
            // alert('Toggle');
            var me = this;
            var form = me.currentForm() == 'formone' ? 'formtwo' : 'formone';
            // alert('Toggle to ' + form);
            me.currentForm(form);
            me.hideme(form == 'formone');
        }

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
            // initialize date popus if used
            /*
             jQuery(function() {
             jQuery( ".datepicker" ).datepicker();
             });
             */

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

Tops.TestViewModel.instance = new Tops.TestViewModel();
(<any>window).ViewModel = Tops.TestViewModel.instance;