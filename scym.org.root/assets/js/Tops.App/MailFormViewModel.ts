/**
 * Created by Terry on 6/5/2015.
 */
// replace all occurances of 'MailForm' with the name of your model

/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path="./App.ts" />
/// <reference path="../Tops.Peanut/Peanut.ts" />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />
module Tops {
    export class mailMessage {
        toName : string;
        mailboxCode: string;
        fromName : string;
        fromAddress : string;
        subject : string;
        body : string;
    }

    export class getMailboxResponse {
        mailboxCode: string;
        mailboxName: string;
        fromName: string;
        fromAddress: string;
    }

    export class MailFormViewModel implements IMainViewModel {
        static instance: Tops.MailFormViewModel;
        private application: Tops.IPeanutClient;
        private peanut: Tops.Peanut;

        private mailboxCode = '';


        // Observables
        headerMessage = ko.observable('');
        fromAddress = ko.observable('');
        fromName = ko.observable('');
        messageSubject = ko.observable('');
        messageBody = ko.observable('');
        formVisible = ko.observable(true);

        subjectError = ko.observable('');
        bodyError = ko.observable('');
        fromNameError = ko.observable('');
        fromAddressError = ko.observable('');

        userIsAnonymous = ko.observable(false);



        // Constructor
        constructor() {
            var me = this;
            Tops.MailFormViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
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
            me.application.initialize(applicationPath,
                function() {
                    me.getMailbox(successFunction);
                }
            );
        }

        getMailbox(doneFunction?: () => void) {
            var me = this;
            var mailboxCode = me.peanut.getRequestParam('box');
            mailboxCode = mailboxCode ? mailboxCode : 'scym';
            me.application.showWaiter('Loading mailbox. Please wait...');
            me.peanut.getFromService( 'mailboxes.GetMailbox',mailboxCode, function (serviceResponse: Tops.IServiceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        var response = <getMailboxResponse>serviceResponse.Value;
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
                }
            ).always(function() {
                    me.application.hideWaiter();
                    if (doneFunction) {
                        doneFunction();
                        jQuery("#main-form").show();
                    }
                });
        }

        createMessage() {
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
                me.fromNameError(': Please enter your name.')
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
        }

        sendMessage() {
            var me = this;
            var message = me.createMessage();
            if (message) {
                var me = this;
                me.application.showWaiter('Sending message. Please wait...');
                me.peanut.executeService('mailboxes.SendMessage',message, function (serviceResponse:Tops.IServiceResponse) {
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        me.formVisible(false);
                        me.headerMessage('Thanks for your message.')
                    }
                }).always(function () {
                    me.application.hideWaiter();
                });
            }
        }
    }
}

Tops.MailFormViewModel.instance = new Tops.MailFormViewModel();
(<any>window).ViewModel = Tops.MailFormViewModel.instance;