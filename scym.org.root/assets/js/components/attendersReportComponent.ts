/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path="../Tops.App/App.ts" />
/// <reference path="../Tops.Peanut/Peanut.ts" />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />
/// <reference path='../Tops.App/Registration.d.ts' />
///<reference path="selectListObservable.ts"/>
/**
 * Created by Terry on 2/8/2016.
 */

module Tops {

    interface IAttenderReportItem {
        year              : any;
        confirmed         : any;
        attenderId        : any;
        registrationId    : any;
        affiliationCode   : string;
        firstName         : string;
        middleName        : string;
        lastName          : string;
        attended          : any;
        feeCredit         : string;
        arrivalTime       : any;
        departureTime     : any;
        generationId      : any;
        ScymMembership    : any;
        AttenderName      : string;
        Affiliation       : string;
        FirstTimeAttender : string;
        Arrival           : string;
        Departure         : string;
        CheckedIn         : string;
        Generation        : string;
        Role              : string;
        housing           : string;
        notes             : string;
    }

    export class attendersReportComponent implements IReportComponent {
        private application:IPeanutClient;
        private peanut:Peanut;
        private owner : IReportOwner;
        private reportName;
        private reportData : IAttenderReportItem[] = [];

        attenderList = ko.observableArray<IAttenderReportItem>();
        notesView = ko.observableArray<IAttenderReportItem>();
        tableHeader = ko.observable('Attenders');
        notesHeader = ko.observable('Notes for attenders')
        firstTimersOnly = ko.observable(false);
        showNotes = ko.observable(false);
        checkedInFilter : selectListObservable;
        arrivalDayFilter: selectListObservable;
        sortOrder: selectListObservable;
        attenderForm = {
            name: ko.observable(''),
            notes: ko.observable('')
        };

        public constructor(application:IPeanutClient, owner: IReportOwner, name: string) {
            var me = this;
            me.application = application;
            me.peanut = application.peanut;
            me.owner = owner;
            me.reportName = name;

            me.checkedInFilter = new selectListObservable(me.onCheckedInFilterSelected,[
                {Name: 'Checked in', Value: 'Yes'},
                {Name: 'Not checked in', Value: 'No'}
            ]);
            me.arrivalDayFilter = new selectListObservable(me.onCheckedInFilterSelected,[
                {Name: 'Thursday', Value: 4},
                {Name: 'Friday', Value: 5},
                {Name: 'Saturday', Value: 6}
            ]);
            me.sortOrder = new selectListObservable(me.onCheckedInFilterSelected,[
                {Name: 'Name', Value: 'AttenderName'},
                {Name: 'Meeting', Value: 'Affiliation'},
                {Name: 'Arrival time', Value: 'arrivalTime'}
            ],'AttenderName');
        }

        onCheckedInFilterSelected = (selection: INameValuePair) => {
           var me = this;
            me.sortAndFilter();
        };

        lookupRegistration =  (item: IAttenderReportItem) => {
            var me = this;
            me.owner.handleEvent('registrationselected', item.registrationId);
        };


        onFirstTimersCheck = () => {
            var me = this;
            me.sortAndFilter();
            return true;
        };

        onArrivalDayFilterSelected = (selection: INameValuePair) => {
            var me = this;
            me.sortAndFilter();
        };

        onSortTypeSelected = (selection: INameValuePair) => {
            var me = this;
            me.sortAndFilter();
        };

        private sortAndFilter() {
            var me = this;
            var sortValue = me.sortOrder.getValue();
            var anyTimers = !me.firstTimersOnly();
            var checkedInValue = me.checkedInFilter.getValue('any');
            var arrivalDayValue = me.arrivalDayFilter.getValue(0);
            me.notesView([]);
            me.attenderList([]);
            var list = [];
            if (arrivalDayValue != 0) {
                list = _.sortBy(me.reportData,'arrivalTime');
            }

            list = _.sortBy(me.reportData,sortValue);

            list = _.filter(list,function(item: IAttenderReportItem) {
                return (
                    (anyTimers || item.FirstTimeAttender == 'Yes') &&
                    (checkedInValue == 'any' || item.CheckedIn == checkedInValue) &&
                    (arrivalDayValue === 0 || (Math.floor(item.arrivalTime / 10) == arrivalDayValue)));
            });
            me.attenderList(list);
            list = _.filter(list,function(item: IAttenderReportItem) {
                return item.notes != '';
            });
            me.notesView(list);


            var headerPrefix = me.firstTimersOnly() ? 'First time attenders' : 'Attenders';
            var headerNotesPrefix = me.firstTimersOnly() ? 'Notes for first time attenders' : 'Notes for attenders';
            var header = ' ';
            if (arrivalDayValue != 0) {
                header = header + ' arriving ' + me.arrivalDayFilter.getName();
            }
            if (checkedInValue == 'Yes') {
                header = header + ', checked in';
            }
            else if (checkedInValue == 'No') {
                header = header + ', not checked in';
            }
            me.tableHeader(headerPrefix + header);
            me.notesHeader(headerNotesPrefix + header);
        }

        showHousingAssignments = (item: IAttenderReportItem) => {
            var me = this;
            me.owner.handleEvent('housingassignmentsrequested',item.registrationId);
        };

        showAttenderNotes = (item: IAttenderReportItem) => {
            var me = this;
            me.attenderForm.name(item.AttenderName);
            me.attenderForm.notes(item.notes);
            jQuery("#attender-report-notes-modal").modal('show');
        };

        initialize = (data: any) => {
            var me = this;
            me.display(data);
            me.sortOrder.subscribe();
            me.arrivalDayFilter.subscribe();
            me.checkedInFilter.subscribe();
        };

        display = (data:any)=> {
            var me = this;
            me.reportData = data;
            me.sortAndFilter();
        };

        select = ()  => {
            var me = this;
            if (me.attenderList().length == 0) {
                me.owner.getReportData(me.reportName,me.display);
            }
        };

        handleEvent = (eventName:string, data?:any)=>{
            var me = this;
            switch (eventName) {
                case 'refreshReport' :
                    if (data == me.reportName) {
                        me.owner.getReportData(me.reportName,me.display);
                    }
                    break;
            }
        };
    }
}
