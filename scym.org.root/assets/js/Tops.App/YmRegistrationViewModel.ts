///<reference path="../components/USDollars.ts"/>
/**
 * Created by Terry on 11/01/2015.
 */
/// <reference path="./App.ts" />
/// <reference path="user.d.ts" />
/// <reference path="registration.d.ts" />
/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
/// <reference path='../typings/bootstrap/bootstrap.d.ts' />
/// <reference path='../typings/jqueryui/jqueryui.d.ts' />
/// <reference path="../Tops.Peanut/Peanut.ts" />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />
/// <reference path='../components/editPanel.ts' />
/// <reference path='../components/searchListObservable.ts' />
/// <reference path="../components/textParser.ts" />

module Tops {

    export class userObservable {
        id:any = 0;
        name = ko.observable('');
        authenticated = ko.observable(false);
        isRegistrar = ko.observable(false);
        email = ko.observable('');
        registrationId = ko.observable(0);

        public assign(user:IRegistrationUser) {
            var me = this;
            me.id = user ? user.id : 0;
            me.name(user ? user.name : '');
            me.isRegistrar(user ? (user.isRegistrar == 1) : false);
            var authenticated = user ? (user.authenticated == 1) : false;
            me.authenticated(authenticated);
            me.email(user ? user.email : '');
            me.registrationId(user ? user.registrationId : 0);
        }
    }

    export class regButtonObservable {
        private status = 'inactive';
        isComplete = ko.observable(false);
        iconClasses = ko.observable('');
        label = ko.observable('');
        title = ko.observable('');


        constructor(label:string, status:string = 'inactive') {
            var me = this;
            me.label(label);
            me.setStatus(status);
        }

        public setStatus(status:string) {
            var me = this;
            var label = me.label();
            me.status = status;
            me.isVisible(status != 'inactive');
            switch (status) {
                case 'complete' :
                    me.css('btn btn-lg btn-block btn-success');
                    me.iconClasses('glyphicon glyphicon-ok');
                    me.title(label + " (completed)");
                    break;
                case 'incomplete' :
                    me.css('btn btn-lg btn-block btn-warning');
                    me.iconClasses('glyphicon glyphicon-forward');
                    me.title(label + " (incomplete)");
                    break;
                default :
                    me.css('btn btn-lg btn-block btn-primary');
                    me.iconClasses('');
                    me.title(label);
                    break;
            }
            me.isComplete(status == 'complete');
        }

        public setComplete() {
            var me = this;
            me.setStatus('complete');
        }

        public setIncomplete() {
            var me = this;
            me.setStatus('incomplete');
        }

        public isVisible = ko.observable(false);
        public css = ko.observable('');
    }


    export class financeInfoObservable extends editPanel {

        id = ko.observable(0);
        funds:ILookupItem[] = [];
        fundContributions:KnockoutObservableArray<IIndexedInput> = ko.observableArray([]);
        aidAmount:KnockoutObservable<any> = ko.observable('');
        aidAmountError = ko.observable('');

        // for reset
        financialAidAmount: any = '';
        donations : IIndexedItem[] = [];

        // summary
        feesList = ko.observableArray<IListItem>();
        creditsList = ko.observableArray<IListItem>();
        donationsList = ko.observableArray<IListItem>();
        feeTotal = ko.observable('');
        creditTotal = ko.observable('');
        donationTotal = ko.observable('');
        balance = ko.observable('');
        aidEligibility = ko.observable('');
        calculated = ko.observable(false);
        balanceDue:KnockoutObservable<any> = ko.observable();
        updatedDonationTotal : number = 0.00;

        constructor() {
            super();
            var me = this;
            me.setViewState('closed');
        }

        /**
         * reset fields
         */
        public clear() {
            var me = this;
            me.clearValidations();
            me.id(0);
            me.aidAmount('');
            me.isAssigned = false;
            me.clearAccountSummary();
        }

        public clearValidations() {
            var me = this;
            me.aidAmountError('');
//            me.simpleMealDonationError('');
//            me.ymDonationError('');
            var donationFields = me.fundContributions.removeAll();
            if (donationFields.length > 0) {
                _.each(donationFields, function (item:IInputItem) {
                    item.ErrorMessage = '';
                }, me);
                me.setFundContributions(donationFields);
            }
            me.hasErrors(false);
        }

        /**
         * set fields from registration DTO
         */
        public assign = (registration:IRegistrationInfo) => {
            var me = this;
            me.id(registration.registrationId);
            me.clearValidations();
            me.financialAidAmount = registration.financialAidAmount;
            me.aidAmount(registration.financialAidAmount);
            me.fundContributions([]);
            me.isAssigned = true;
        };

        public reset = () => {
            var me = this;
            me.clearValidations();
            me.aidAmount(me.financialAidAmount);
            me.setDonations(me.donations);
        };

        private clearAccountSummary() {
            var me = this;
            me.feesList([]);
            me.creditsList([]);
            me.donationsList([]);
            me.feeTotal('');
            me.creditTotal('');
            me.donationTotal('');
            me.aidEligibility('');
            me.balanceDue(null);
            me.calculated(false);
            me.balance("Not calculated yet");
            me.setDonations(me.donations);
        }

        private currencyValue(stringValue: string) {
            if (stringValue) {
                stringValue = stringValue.replace('$','').replace(',','').replace(' ','');
                if (jQuery.isNumeric(stringValue)) {
                    return parseFloat(stringValue);
                }
            }
            return null;
        }

        public assignAccountSummary = (summary:IAccountSummary) => {
            var me = this;
            me.feesList(summary.fees);
            me.creditsList(summary.credits);
            me.donationsList(summary.donations);
            me.feeTotal(summary.feeTotal);
            me.creditTotal(summary.creditTotal);
            me.donationTotal(summary.donationTotal);
            me.updatedDonationTotal = me.validateCurrency(summary.donationTotal);
            me.aidEligibility(summary.aidEligibility);

            var balanceDue = USDollars.toNumber(summary.balance);
            me.balanceDue(balanceDue);

            if (balanceDue === null) {
                me.calculated(false);
                me.balance("Not calculated yet")
            }
            else {
                me.calculated(true);
                var message = USDollars.balanceMessage(balanceDue);
                me.balance(message);
            }

            if (summary.funds && summary.funds.length > 0) {
                me.funds = summary.funds;
            }
            me.donations = summary.donations;
            me.setDonations(summary.donations);
        };

        public getDonations = ():IKeyValuePair[] => {
            var me = this;
            var result:IKeyValuePair[] = [];
            var donations = me.fundContributions();
            _.each(donations, function (donation:IIndexedInput) {
                // if (donation.Value) {

                    var item:IKeyValuePair = {
                        Key: donation.Key,
                        Value: donation.Value ? donation.Value : 0
                    };
                    result.push(item);
                // }
            }, me);

            return result;
        };

        private setFundContributions(contributions) {
            var me = this;
            me.fundContributions(contributions);
            jQuery('.description-link').popover();
        }

        public setDonations = (donations:IIndexedItem[]) => {
            var me = this;
            var contributions:IIndexedInput[] = [];
            me.fundContributions.removeAll();
            _.each(me.funds, function (item:ILookupItem) {
                var donation = _.find(donations, function (i:IIndexedItem) {
                    return i.Key == item.Key;
                }, me);
                var donationItem:IIndexedInput = {
                    Text: item.Text,
                    Key: item.Key,
                    Description: item.Description,
                    Value: (donation) ? donation.Value : '',
                    ErrorMessage: ''
                };
                contributions.push(donationItem);
            }, me);
            me.setFundContributions(contributions);
        };

        public updateRegistration = (registration:IRegistrationInfo) => {
            var me = this;
            registration.financialAidAmount = me.aidAmount();
            // registration.ymDonation = me.ymDonation();
            // registration.simpleMealDonation = me.simpleMealDonation();
        };

        getDonationsTotal() {
            var me = this;
            var result = 0.00;
            var contributions = me.fundContributions();
            _.each(contributions, function (item:IIndexedInput) {
                var amount = me.validateCurrency(me.aidAmount());
                if (amount) {
                    result += amount;
                }
            }, me);
            return result;
        }


        validateCurrency(value:string):any {
            if (!value) {
                return '';
            }
            var value = value.replace(/\s+/g, '');
            var value = value.replace(',', '');
            var value = value.replace('$', '');
            if (!value) {
                return '';
            }
            var parts = value.split('.');
            if (parts.length > 2) {
                return false;
            }
            if (!jQuery.isNumeric(parts[0])) {
                return false;
            }
            if (parts.length == 1) {
                return parts[0] + '.00';
            }

            if (!jQuery.isNumeric(parts[1])) {
                return false;
            }

            return parts[0] + '.' + parts[1].substring(0, 2);
        };

        public donationsChanged() {
            var me = this;
            var currentTotal = me.donationTotal();
            var total = me.validateCurrency(currentTotal);
            total = total ? total : 0.00;
            return me.updatedDonationTotal != total;
        }

        public validate = ():boolean => {
            var me = this;
            me.clearValidations();
            var valid = true;

            var aidAmount = me.aidAmount();
            var amount = me.validateCurrency(me.aidAmount());
            if (amount === false) {
                me.aidAmountError(" Invalid amount.");
                valid = false;
            }
            else {
                me.aidAmount(amount);
            }

            var contributions = me.fundContributions();
            me.fundContributions([]);
            me.updatedDonationTotal = 0.0;
            _.each(contributions, function (item:IIndexedInput) {
                amount = me.validateCurrency(item.Value);
                if (amount === false) {
                    item.ErrorMessage = ":  Invalid amount.";
                    valid = false;
                }
                else {
                    item.Value = amount;
                    me.updatedDonationTotal += amount;
                }
            }, me);
            me.setFundContributions(contributions);

            me.hasErrors(!valid);
            return valid;
        };
    }

    export class contactInfoObservable extends editPanel {

        name = ko.observable('');
        address = ko.observable('');
        city = ko.observable('');
        phone = ko.observable('');
        email = ko.observable('');
        notes = ko.observable('');

        hasAddress:KnockoutComputed<boolean>;

        public nameError = ko.observable('');
        public emailError = ko.observable('');
        public codeError = ko.observable('');
        public contactError = ko.observable('');

        constructor() {
            super();
            var me = this;
            me.setViewState('closed');
            me.hasAddress = ko.computed(function () {
                return me.address() || me.city() ? true : false;
            });
        }

        /**
         * reset fields
         */
        public clear() {
            var me = this;
            me.clearValidations();
            me.name('');
            me.address('');
            me.city('');
            me.phone('');
            me.email('');
        }

        public clearValidations() {
            var me = this;
            me.nameError('');
            me.emailError('');
            me.codeError('');
            me.contactError('');
            me.hasErrors(false);
        }

        /**
         * set fields from person DTO
         */
        public assign = (registration:IRegistrationInfo) => {
            var me = this;
            me.clearValidations();
            me.name(registration.name);
            me.address(registration.address);
            me.city(registration.city);
            me.email(registration.email);
            me.phone(registration.phone);
            me.notes(registration.notes);
        };

        public updateRegistration = (registration:IRegistrationInfo) => {
            var me = this;
            registration.name = me.name();
            registration.address = me.address();
            registration.city = me.city();
            registration.email = me.email();
            registration.phone = me.phone();
            registration.notes = me.notes();
            // test
        };

        public validate = ():boolean => {
            var me = this;
            me.clearValidations();
            var valid = true;
            var name = me.name().trim();
            me.name(name);
            var email = me.email().trim();
            me.email(email);
            var phone = me.phone().trim();
            me.phone(phone);
            var address = me.address().trim();
            me.address(address);
            var city = me.city().trim();
            me.city(city);
            var hasPhoneOrAddress = phone.length > 0 || (address.length > 0 && city.length > 0);

            if (!name) {
                me.nameError(': A name is required for this registration.');
                valid = false;
            }

            if (email) {
                if (!Peanut.ValidateEmail(email)) {
                    me.emailError(': This is not a valid email address');
                    valid = false;
                }
            }
            else if (!hasPhoneOrAddress) {
                me.contactError('You must enter some form of contact information: email, phone or address.')
                valid = false;
            }
            me.hasErrors(!valid);
            return valid;
        };
    }

    export class registrationObservable {
        id = ko.observable(0);
        registrationCode = ko.observable('');
        contactInfoForm = new contactInfoObservable();
        financeInfoForm = new financeInfoObservable();
        familyMembers = ko.observableArray<IFamilyAttender>();

        public clear() {
            var me = this;
            me.registrationCode('');

        }

        public assign(registration:IRegistrationInfo) {
            var me = this;
            me.id(registration.registrationId);
            me.registrationCode(registration.registrationCode);
            me.contactInfoForm.assign(registration);
            me.financeInfoForm.assign(registration);
        }

        public updateRegistration = (registration:IRegistrationInfo) => {
            var me = this;
            registration.registrationId = me.id();
            registration.registrationCode = me.registrationCode();
            // registration.financialAidAmount
            me.contactInfoForm.updateRegistration(registration);
            me.financeInfoForm.updateRegistration(registration);
        };
    }

    export class attenderObservable extends editPanel {
        public id = ko.observable(0);
        showCreditTypeDropdown = ko.observable(true);
        changed = ko.observable(false);
        firstName = ko.observable('');
        lastName = ko.observable('');
        middleName = ko.observable('');
        dateOfBirth = ko.observable('');
        affiliationCode = ko.observable('');
        otherAffiliation = ko.observable('');
        firstTimer = ko.observable(false);
        teacher = ko.observable(false);
        // financialAidRequested = ko.observable(false);
        guest = ko.observable(false);
        notes = ko.observable('');
        linens = ko.observable(false);
        housingTypeId = ko.observable('');
        attended = ko.observable(false);
        singleOccupant = ko.observable(false);

        vegetarian = ko.observable(false);
        glutenFree = ko.observable(false);

        mealThursDinner = ko.observable(false);
        mealFriBreakfast = ko.observable(false);
        mealFriLunch = ko.observable(false);
        mealFriDinner = ko.observable(false);
        mealSatBreakfast = ko.observable(false);
        mealSatLunch = ko.observable(false);
        mealSatDinner = ko.observable(false);
        mealSunBreakfast = ko.observable(false);
        simpleMeal = ko.observable(false);

        // lookups
        specialNeedsTypes = ko.observableArray<IListItem>();
        housingTypes = ko.observableArray<IHousingTypeListItem>();
        generationTypes = ko.observableArray<IListItem>();
        affiliationCodes = ko.observableArray<IListItem>();
        creditTypes = ko.observableArray<IListItem>();
        gradeLevels = ko.observableArray<IListItem>();
        // ageGroups = ko.observableArray<IAgeGroup>();
        timePeriods = ko.observableArray<IListItem>();
        lookupsAssigned = false;

        public selectedSpecialNeedsType:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedHousingType:KnockoutObservable<IHousingTypeListItem> = ko.observable(null);
        public selectedGenerationType:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedAffiliationCode:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedCreditType:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedAgeGroup:KnockoutObservable<IAgeGroup> = ko.observable(null);
        public selectedGradeLevel:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedArrivalTime:KnockoutObservable<IListItem> = ko.observable(null);
        public selectedDepartureTime:KnockoutObservable<IListItem> = ko.observable(null);

        attenderFullName = ko.computed(function () {
            return ''
        }); // replaced in initialize function
        isChild = ko.computed(function () {
            return false
        }); // replaced in initialize function
        singleOccupancyApplies = ko.computed(function () {
            return false
        }); // replaced in initialize function

        // validation
        firstNameError = ko.observable('');  	// required
        lastNameError = ko.observable('');  		// required
        arrivalTimeError = ko.observable(''); 	// required
        departureTimeError = ko.observable(''); 	// required - on or after arrival
        dateOfBirthError = ko.observable('');  	// required if generation code is young friend
        housingPreferenceError = ko.observable('');

        constructor() {
            super();
            var me = this;
            me.setViewState('closed');
            // me.personFormHeader = ko.computed(me.computePersonFormHeader);

        }

        initialize = () => {
            var me = this;
            // delayed initialization for loaded resources
            me.attenderFullName = ko.computed(function () {
                return textParser.makeFullName(me.firstName(), me.lastName(), me.middleName());
            });
            me.isChild = ko.computed(function () {
                var generation = me.selectedGenerationType();
                return (generation) ? generation.Value != 1 : false;
            });
            me.singleOccupancyApplies = ko.computed(function () {
                var housing = me.selectedHousingType();
                if (housing) {
                    return housing.category == 3;
                }
                return false
            });

        };

        /**
         * reset fields
         */
        public clear() {
            var me = this;
            me.clearValidations();
            me.id(0);
            me.changed(false);
            me.firstName('');
            me.lastName('');
            me.middleName('');


            me.dateOfBirth('');
            me.affiliationCode('');
            me.otherAffiliation('');
            me.firstTimer(false);
            me.teacher(false);
            // me.financialAidRequested(false);
            me.guest(false);
            me.notes('');
            me.linens(false);
            me.vegetarian(false);
            me.attended(false);
            me.singleOccupant(false);
            me.glutenFree(false);

            me.mealThursDinner(false);
            me.mealFriBreakfast(false);
            me.mealFriLunch(false);
            me.mealFriDinner(false);
            me.mealSatBreakfast(false);
            me.mealSatLunch(false);
            me.mealSatDinner(false);
            me.mealSunBreakfast(false);
            me.simpleMeal(false);

            me.selectedSpecialNeedsType(null);
            me.selectedHousingType(null);
            me.setLookupValue(me.generationTypes(), me.selectedGenerationType, 1);
            me.selectedAffiliationCode(null);
            me.setLookupValue(me.creditTypes(), me.selectedCreditType, 0);
            // me.selectedAgeGroup(null);
            me.selectedGradeLevel(null);
            me.setLookupValue(me.timePeriods(), me.selectedArrivalTime, 42);
            me.setLookupValue(me.timePeriods(), me.selectedDepartureTime, 72);
        }

        public clearValidations() {
            var me = this;
            me.firstNameError('');
            me.lastNameError('');
            me.arrivalTimeError('');
            me.departureTimeError('');
            me.dateOfBirthError('');
            me.housingPreferenceError('');
            me.hasErrors(false);
        }

        public assignLookupLists(lists:IAttenderLookups, showAllCreditTypes: boolean = false) {
            var me = this;
            me.lookupsAssigned = true;
            me.housingTypes(lists.housingTypes);
            me.affiliationCodes(lists.affiliationCodes);
            // me.ageGroups(lists.ageGroups);

            var times = me.buildTimeLookup();
            me.timePeriods(times);
            me.generationTypes(
                [
                    {Text: 'Adult', Value: '1', Description: ''},
                    {Text: 'Youth (age 4 through 18)', Value: '2', Description: ''},
                    {Text: 'Infant (through age 3)', Value: '5', Description: ''},
                    {Text: '', Value: '', Description: ''}
                ]
            );

            me.specialNeedsTypes(
                [
                    {Text: 'Hearing impaired', Value: '1', Description: ''},
                    {Text: 'Mobility impaired', Value: '2', Description: ''},
                    {Text: 'Other, see notes', Value: '500', Description: ''}
                ]
            );
            me.gradeLevels(
                [
                    {Text: 'Preschool', Value: 'PS', Description: ''},
                    {Text: 'Kindergarten', Value: 'K', Description: ''},
                    {Text: 'First', Value: '1', Description: ''},
                    {Text: 'Second', Value: '2', Description: ''},
                    {Text: 'Third', Value: '3', Description: ''},
                    {Text: 'Fourth', Value: '4', Description: ''},
                    {Text: 'Fifth', Value: '5', Description: ''},
                    {Text: 'Sixth', Value: '6', Description: ''},
                    {Text: 'Seventh', Value: '7', Description: ''},
                    {Text: 'Eighth', Value: '8', Description: ''},
                    {Text: 'Ninth', Value: '9', Description: ''},
                    {Text: 'Tenth', Value: '10', Description: ''},
                    {Text: 'Eleventh', Value: '11', Description: ''},
                    {Text: 'Twelth', Value: '12', Description: ''}
                ]
            );
            if (showAllCreditTypes) {
                me.creditTypes(
                    [
                        {Text: 'General attender', Value: '0', Description: ''},
                        {Text: 'Teacher', Value: '2', Description: ''},
                        {Text: 'Guest', Value: '3', Description: ''},
                        {Text: 'SCYM Staff', Value: '4', Description: ''}
                    ]
                );
                me.showCreditTypeDropdown(true);
            }
            else {
                me.creditTypes(
                    [
                        {Text: 'General attender', Value: '0', Description: ''}
                        // ,{Text: 'SCYM Staff', Value: '4', Description: ''}
                    ]
                );
                me.showCreditTypeDropdown(false);

            }
        }

        private buildTimeLookup():IListItem[] {
            var me = this;
            var result = [];
            var minCode = 42;
            var maxCode = 72;
            for (var day = 4; day < 8; day += 1) {
                for (var time = 1; time < 4; time += 1) {
                    var code = (day * 10) + time;
                    result.push(
                        {
                            Text: me.timeCodeToStr(code),
                            Value: code,
                            Description: ''
                        });
                }
            }
            return result;
        }

        private timeCodeToStr(timeCode) {
            var time = 'error';
            var day = 'error';
            switch (Math.floor(timeCode / 10)) {
                case 4 :
                    day = 'Thursday';
                    break;
                case 5 :
                    day = 'Friday';
                    break;
                case 6 :
                    day = 'Saturday';
                    break;
                case 7 :
                    day = 'Sunday';
                    break;
            }

            switch (timeCode % 10) {
                case 1 :
                    time = 'morning';
                    break;
                case 2 :
                    time = 'noon';
                    break;
                case 3 :
                    time = 'evening';
                    break;
            }

            return day + ' ' + time;
        }

        public setDefaults = (attender:IAttender = null) => {
            var me = this;
            if (attender) {
                me.setAttenderMeals(attender);
                me.setLookupValue(me.timePeriods(), me.selectedArrivalTime, attender.arrivalTime);
                me.setLookupValue(me.timePeriods(), me.selectedDepartureTime, attender.departureTime);
                me.setLookupValue(me.housingTypes(), me.selectedHousingType, attender.housingTypeId);
                me.setLookupValue(me.affiliationCodes(), me.selectedAffiliationCode, attender.affiliationCode);
            }
            else {
                me.mealThursDinner(true);
                me.mealFriBreakfast(true);
                me.mealFriLunch(true);
                me.mealFriDinner(true);
                me.mealSatBreakfast(true);
                me.mealSatLunch(true);
                me.mealSatDinner(true);
                me.mealSunBreakfast(true);
                me.simpleMeal(true);
            }
        };

        private setAttenderMeals(attender:IAttender) {
            var me = this;
            attender.meals.forEach(function (mealtime:number) {
                switch (mealtime) {
                    case 43:
                        me.mealThursDinner(true);
                        break;
                    case 51:
                        me.mealFriBreakfast(true);
                        break;
                    case 52:
                        me.mealFriLunch(true);
                        break;
                    case 53:
                        me.mealFriDinner(true);
                        break;
                    case 61:
                        me.mealSatBreakfast(true);
                        break;
                    case 62:
                        me.mealSatLunch(true);
                        break;
                    case 63:
                        me.mealSatDinner(true);
                        break;
                    case 71:
                        me.mealSunBreakfast(true);
                        break;
                    case 72:
                        me.simpleMeal(true);
                        break;
                }
            });

        }

        /**
         * set fields from DTO
         */
        public assign = (attender:IAttender) => {
            var me = this;
            me.clearValidations();
            me.id(attender.attenderId);
            me.changed(attender.changed);
            me.firstName(attender.firstName);
            me.lastName(attender.lastName);
            me.middleName(attender.middleName);
            me.dateOfBirth(attender.dateOfBirth);
            me.otherAffiliation(attender.otherAffiliation);
            me.notes(attender.notes);

            //boolean
            me.firstTimer(attender.firstTimer ? true : false);
            me.teacher(attender.teacher ? true : false);
            // me.financialAidRequested(attender.financialAidRequested ? true : false);
            me.guest(attender.guest ? true : false);
            me.linens(attender.linens ? true : false);
            me.vegetarian(attender.vegetarian ? true : false);
            me.attended(attender.attended ? true : false);
            var privateOccupant = attender.singleOccupant ? true: false;
            me.singleOccupant(privateOccupant);
            me.glutenFree(attender.glutenFree ? true : false);
            me.setAttenderMeals(attender);

            me.setLookupValue(me.specialNeedsTypes(), me.selectedSpecialNeedsType, attender.specialNeedsTypeId);
            me.setLookupValue(me.generationTypes(), me.selectedGenerationType, attender.generationId);
//            me.setLookupValue(me.ageGroups(), me.selectedAgeGroup, attender.ageGroupId);
            me.setLookupValue(me.gradeLevels(), me.selectedGradeLevel, attender.gradeLevel);
            me.setLookupValue(me.creditTypes(), me.selectedCreditType, attender.creditTypeId);
            me.setLookupValue(me.housingTypes(), me.selectedHousingType, attender.housingTypeId);
            me.setLookupValue(me.timePeriods(), me.selectedArrivalTime, attender.arrivalTime);
            me.setLookupValue(me.timePeriods(), me.selectedDepartureTime, attender.departureTime);
            me.setLookupValue(me.affiliationCodes(), me.selectedAffiliationCode, attender.affiliationCode);
        };

        public setGeneration(generationId:any) {
            var me = this;
            me.setLookupValue(me.generationTypes(), me.selectedGenerationType, generationId);
        }

        public updateAttender = (attender:IAttender) => {
            var me = this;
            attender.attenderId = me.id();
            attender.changed = me.changed();
            attender.firstName = me.firstName();
            attender.lastName = me.lastName();
            attender.middleName = me.middleName();
            attender.dateOfBirth = me.dateOfBirth();
            attender.otherAffiliation = me.otherAffiliation();
            attender.notes = me.notes();

            // boolean
            attender.firstTimer = me.firstTimer() ? 1 : 0;
            attender.teacher = me.teacher() ? 1 : 0;
            // attender.financialAidRequested = me.financialAidRequested() ? 1 : 0;
            attender.guest = me.guest() ? 1 : 0;
            attender.linens = me.linens() ? 1 : 0;
            attender.vegetarian = me.vegetarian() ? 1 : 0;
            attender.attended = me.attended() ? 1 : 0;
            attender.singleOccupant = me.singleOccupant() ? 1 : 0;
            attender.glutenFree = me.glutenFree() ? 1 : 0;

            attender.meals = [];
            if (me.mealThursDinner()) {
                attender.meals.push(43);
            }
            if (me.mealFriBreakfast()) {
                attender.meals.push(51);
            }
            if (me.mealFriLunch()) {
                attender.meals.push(52);
            }
            if (me.mealFriDinner()) {
                attender.meals.push(53);
            }
            if (me.mealSatBreakfast()) {
                attender.meals.push(61);
            }
            if (me.mealSatLunch()) {
                attender.meals.push(62);
            }
            if (me.mealSatDinner()) {
                attender.meals.push(63);
            }
            if (me.mealSunBreakfast()) {
                attender.meals.push(71);
            }
            if (me.simpleMeal()) {
                attender.meals.push(72);
            }

            attender.specialNeedsTypeId = me.getLookupValue(me.selectedSpecialNeedsType);
            attender.generationId = me.getLookupValue(me.selectedGenerationType);
            attender.gradeLevel = me.getLookupValue(me.selectedGradeLevel);
            // attender.ageGroupId = me.getLookupValue(me.selectedAgeGroup);
            attender.affiliationCode = me.getLookupValue(me.selectedAffiliationCode);
            attender.creditTypeId = me.getLookupValue(me.selectedCreditType);
            attender.housingTypeId = me.getLookupValue(me.selectedHousingType);
            attender.arrivalTime = me.getLookupValue(me.selectedArrivalTime);
            attender.departureTime = me.getLookupValue(me.selectedDepartureTime);
        };


        private setLookupValue(list:IListItem[], selection:KnockoutObservable<IListItem>, value:any) {
            var result = _.find(list, function (item:IListItem) {
                return item.Value == value;
            });
            selection(result);
        }

        private getLookupValue(selection:KnockoutObservable<IListItem>) {
            var me = this;
            var item = selection();
            return (item) ? item.Value : null;
        }

        public validate = ():boolean => {
            var me = this;
            me.clearValidations();
            var valid = true;

            var first = me.firstName().trim();
            me.firstName(first);
            var last = me.lastName().trim();
            me.lastName(last);
            if (!first) {
                me.firstNameError(': First name is required.');
                valid = false;
            }

            if (!last) {
                me.lastNameError(': Last name is required.');
                valid = false;
            }

            var arrival = null;
            var departure = null;
            if (me.selectedArrivalTime()) {
                arrival = me.selectedArrivalTime().Value;
            }
            else {
                me.arrivalTimeError(': Arrival time is required. Approximate is ok.');
                valid = false;
            }

            if (me.selectedDepartureTime()) {
                departure = me.selectedDepartureTime().Value;
            }
            else {
                me.departureTimeError(': Departure time is required. Approximate is ok.');
                valid = false;
            }

            if (arrival && departure && arrival > departure) {
                me.arrivalTimeError(': Arrival time must precede departure.');
                valid = false;
            }

            var generationId = me.getLookupValue(me.selectedGenerationType);
            if (generationId) {
                if (generationId != 1 && !me.dateOfBirth()) {
                    me.dateOfBirthError(': Date of birth is required for children. Approximate is ok.');
                    valid = false;
                }
            }

            var housingPreference = me.selectedHousingType();
            if (!housingPreference) {
                me.housingPreferenceError(': You must select your housing preference.');
                valid = false;
            }

            me.hasErrors(!valid);
            return valid;
        };

    }

    class AnnualSessionInfo {
        year:any;
        startDate:any;
        endDate:any;
    }

    class startupFormObservable {
        securityAnswer = ko.observable('');
        validationError = ko.observable('');
        askSecurityQuestion = ko.observable(true);

        public validate = () => {
            var me = this;
            if (me.askSecurityQuestion()) {
                var answer = me.securityAnswer().replace(/\s/g, "").toLowerCase();
                me.securityAnswer('');
                if (!answer) {
                    me.validationError(': Please answer the security question.');
                    return false;
                }

                if (answer != 'georgefox') {
                    me.validationError(': Your answer to the security question is incorrect.');
                    return false;
                }
            }
            me.askSecurityQuestion(false);
            return true;

        }
    }

    class lookupFormObservable {
        lookupCode = ko.observable('');
        validationError = ko.observable('');

        public getLookupCode = () => {
            var me = this;
            var code = me.lookupCode().trim();
            me.lookupCode(code.toLowerCase());
            me.validationError(code ? '' : 'Please enter something.');
            return code;
        };

        public clear() {
            this.lookupCode('');
            this.validationError('');
        }
    }

    export class YmRegistrationViewModel implements IMainViewModel {
        static instance:Tops.YmRegistrationViewModel;
        private application:Tops.IPeanutClient;
        private peanut:Tops.Peanut;
        private initialAttender : any = null;
        debugging = ko.observable(false);

        // state
        registrationChanged = ko.observable(false);
        attendersChanged = ko.observable(false);
        balanceInvalid:KnockoutComputed<boolean>; // used on accounts form


        private currentRegistration:IRegistrationInfo;
        private currentDonationsTotal : string = '';
        sessionInfo = new AnnualSessionInfo();
        user = new userObservable();
        registrationStatus = ko.observable(-1);
        registrationReceivedDate : any = null;

        // simple forms
        lookupCode = ko.observable('');
        modalInput = ko.observable('');
        addressSearchValue = ko.observable('');
        addressSearchWarning = ko.observable('');
        showConfirmationCheckbox = ko.observable(false);
        sendConfirmation = ko.observable(true);
        deleteAttenderMessage = ko.observable('');
        selectedAttender : IListItem = null;
        previousBalance : any = null;

        // complex forms
        startupForm = new startupFormObservable();
        lookupForm = new lookupFormObservable();
        attenderForm = new attenderObservable();
        registrationForm = new registrationObservable();
        private familyMembers:IFamilyAttender[] = [];
        familyMemberResults : searchListObservable;
        addressSearchResults : searchListObservable;


        // attenders
        attenderList:KnockoutObservableArray<IListItem> = ko.observableArray([]);
        private updatedAttenders:IAttender[] = [];
        private deletedAttenders = [];

        // navigation
        currentForm = ko.observable('');
        saveButtonVisible:KnockoutComputed<boolean>;
        accountReviewed = ko.observable(false);
        registerButton = new regButtonObservable("Summary", 'ready');
        contactButton = new regButtonObservable("Contact");
        attendersButton = new regButtonObservable("Attenders");
        accountButton = new regButtonObservable("Account");
        registrationLoadLocation = '';

        // Display text
        formTitle = ko.observable('Registration Summary');
        datesText = ko.observable('');
        locationText = ko.observable('');
        housingAssignmentList = ko.observableArray<IListItem>();
        registrationTitle:KnockoutComputed<string>;

        // Constructor
        constructor() {
            var me = this;
            Tops.YmRegistrationViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }

        saveContactInfo = () => {
            var me = this;
            if (me.validateContactInfo()) {
                me.registrationForm.contactInfoForm.view();
                window.location.assign('#reg-header');
                var id = me.registrationForm.id();
                if (me.registrationForm.id()) {
                    me.saveChanges();
                }
                else {
                    me.accountButton.setIncomplete();
                    me.registrationForm.financeInfoForm.edit();
                    me.showAccountsForm();
                }
            }
        };

        private checkForUnsavedChanges = ()  => {
            var me = this;

            if (me.registrationForm.id()) {
                return (me.attendersChanged() || me.registrationChanged());
            }
            else {
                var name = me.registrationForm.contactInfoForm.name();
                var lookup = me.registrationForm.registrationCode();
                return (name.trim() && lookup.trim() && me.attendersChanged());
            }
        };

        private static getCurrentYmYear() {
            var currentTime = new Date();
            var month = currentTime.getMonth();
            var year = currentTime.getFullYear();
            if (month > 5) {
                year += 1;
            }
            return year.toString();
        }

        saveChanges = () => {
            var me = this;
            if (me.checkReadyToSave()) {
                if (me.registrationForm.id()) {
                    me.registrationLoadLocation = me.currentForm();
                }
                me.uploadChanges();
            }
        };

        private uploadChanges() {
            var me = this;
            var request = me.getRegistrationChanges();
            if (!request) {
                me.application.showWarning('No changes were found to save.');
                return;
            }
            me.application.hideServiceMessages();
            me.application.showWaiter('Saving changes...');

            me.peanut.executeService('registration.SaveRegistrationChanges',request, me.handleSaveChangesResponse)
                .fail(function() {
                    var errorInfo = me.peanut.errorInfo;

                })
                .always(function() {
                    me.application.hideWaiter();
                });
        }

        private handleSaveChangesResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var response = <IRegistrationResponse>serviceResponse.Value;
                me.loadRegistration(response);
                me.attendersButton.setStatus('complete');
                me.accountButton.setStatus('complete');
                me.accountReviewed(response.registration.statusId > 1);
            }
        };


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
        init(applicationPath:string, successFunction?:() => void) {
            var me = this;
            // overide default binding
            successFunction = me.afterInit;
            // setup messaging and other application initializations
            // initialize date popus if used
            jQuery(function () {
                jQuery(".datepicker").datepicker(
                    {
                        changeYear: true,
                        yearRange: 'c-20:c+20'
                    }
                );
            });

            window.onbeforeunload = function () {
                if (me.hasUnsavedChanges()) {
                    if (me.registrationStatus() ? true : false && me.attendersButton.isComplete()) {
                        me.accountReviewed(true); // show save button even if we are in 'new registration' wizard mode.
                    }
                    return "**** WARNING: If you reload or leave this page your changes will be lost. ****";
                }
            };

            jQuery('[data-toggle="tooltip"]').tooltip();
            jQuery('[data-toggle="popover"]').popover();

            me.registrationTitle = ko.computed(function () {
                var result = me.registrationForm.contactInfoForm.name();
                result = result ? result.trim() : '';
                return result ? result : 'New Registration';
            });

            me.saveButtonVisible = ko.computed(function () {
                return ((me.registrationChanged() || me.attendersChanged()) &&
                (me.registrationStatus() > 1 || me.accountReviewed()));
            });

            me.balanceInvalid = ko.computed(function () {
                if (me.registrationStatus() == 1) {
                    return false;
                }

                if (me.registrationForm.financeInfoForm.calculated() == false) {
                    return true;
                }
                return (me.attendersChanged() || me.registrationChanged());
            });

            me.application.initialize(applicationPath,
                function () {
                    me.application.loadResources(['scym-registration.css', 'textParser.js','searchListObservable.js','USDollars.js','Dates.js'],
                        function () {
                            me.familyMemberResults = new searchListObservable(2, 6);
                            me.addressSearchResults = new searchListObservable(2, 6);
                            me.application.loadComponent('modal-confirm', function() {
                                me.attenderForm.initialize();
                                me.getInitialInfo(successFunction);
                            });
                        }
                    );
                }
            );


            /*
             me.application.loadResources(['scym-registration.css','textParser.js'],
             function() {
             me.application.initialize(applicationPath,
             function() {
             me.attenderForm.initialize();
             me.getInitialInfo(successFunction);
             }
             );
             });
             */
        }


        showAddressSearch() {
            var me = this;
            me.addressSearchValue('');
            me.addressSearchResults.reset();
            jQuery("#address-search-modal").modal('show');
        }

        /**
         * On click find address button
         */
        public findAddresses() {
            var me = this;
            me.addressSearchWarning('');
            var request = new KeyValueDTO();
            request.Name = 'Addresses';
            request.Value = me.addressSearchValue();

            me.application.showWaiter('Searching...');
             me.peanut.executeService('directory.DirectorySearch',request, me.showAddressSearchResults)
             .always(function() {
                me.application.hideWaiter();
             });
        }

        /**
         * Service response handler for findAddresses
         * @param serviceResponse
         */
        public showAddressSearchResults = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var list = <INameValuePair[]>serviceResponse.Value;
                me.addressSearchResults.setList(list);
                if (list.length == 0) {
                    me.addressSearchWarning('No addresses were found for this name.');
                }
            }
        };

        /**
         * On click item link in found panel
         * @param item
         */
        public selectAddress = (item:INameValuePair) => {
            var me = this;
            jQuery("#address-search-modal").modal('hide');
            me.addressSearchResults.reset();
            me.application.showWaiter('Loading address...');
            me.application.hideServiceMessages();
             var request = item.Value;
             me.peanut.executeService('registration.FindRegistrationAddress',request,me.handleSearchAddressResponse)
             .always(function() {
                me.application.hideWaiter();
             });
        };

        private handleSearchAddressResponse = (serviceResponse:IServiceResponse)=> {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var address = <IFindRegistrationAddressResponse>serviceResponse.Value;
                me.familyMembers = address.persons;
                me.familyMemberResults.setList(address.persons);
                me.registrationForm.contactInfoForm.name(address.name);
                me.registrationForm.contactInfoForm.address(address.address);
                me.registrationForm.contactInfoForm.city(address.city);
            }
        };

        public selectFamilyMember = (member:IFamilyAttender) => {
            var me = this;
            me.familyMembers = _.filter(me.familyMembers, function (m:IFamilyAttender) {
                return member.Name != m.Name;
            });
            me.familyMemberResults.setList(me.familyMembers);
            me.attenderForm.firstName(member.firstName);
            me.attenderForm.middleName(member.middleName);
            me.attenderForm.lastName(member.lastName);
            me.attenderForm.setGeneration(member.generation);
            if (member.generation != 1) {
                me.attenderForm.dateOfBirth(member.dateOfBirth);
            }
            jQuery("#family-member-modal").modal('hide');
        };

        public endFamilyMemberSelection = () => {
            var me = this;
            jQuery("#family-member-modal").modal('hide');
            me.familyMembers = [];
        };

        public getInitialInfo(successFunction?:() => void) {
            var me = this;
            me.application.hideServiceMessages();
            me.application.showWaiter('Loading...');

            var request = null;
            var regcode = HttpRequestVars.Get('code');
            if (regcode) {
                request = {
                    type: 'code',
                    value: regcode,
                    getFundList: true
                }
            }
            else {
                var id = HttpRequestVars.Get('id');
                if (id) {
                    request = {
                        type: 'id',
                        value: id,
                        getFundList: true
                    }
                }
            }

            var selectAttender = me.peanut.getRequestParam('aid');
            var initialAttender = (selectAttender) ? selectAttender : null;

            me.peanut.executeService('registration.RegistrationInit', request, me.handleInitializationResponse)
                .always(function () {
                    me.application.hideWaiter();
                    if (initialAttender && me.registrationForm.registrationCode()) {
                        me.getAttender(initialAttender)
                    }
                    if (successFunction) {
                        successFunction();
                    }
                });
        }

        private afterInit = () => {
            var me = this;
            me.application.bindSection('reg-header',me);
            me.application.bindSection('nav-column',me);
            me.application.bindSection('form-header',me);
            me.application.bindSection('form-section',me);
            me.application.bindSection('modals-section',me);
            me.application.showDefaultSection();
        };

        showContactFormHelp = () => {
            jQuery("#contact-form-help").modal('show');
        };

        showAttenderNavHelp = () => {
            jQuery("#attender-nav-help").modal('show');
        };

        private handleInitializationResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var response = <IRegistrationInitResponse>serviceResponse.Value;
                me.user.assign(response.user);
                me.sessionInfo.year = response.sessionInfo.year;
                me.sessionInfo.startDate = response.sessionInfo.startDate;
                me.sessionInfo.endDate = response.sessionInfo.endDate;

                var start = new Date(response.sessionInfo.startDate);
                var today = new Date();
                var preYM = today < start;
                var isRegistrar = response.user.isRegistrar ? true : false;
                var showMessageCheck = isRegistrar || (!preYM);

                // for debugging
                // preYM = false;
                // isRegistrar = false;
                // showMessageCheck = true;

                me.sendConfirmation(preYM || (!isRegistrar));
                me.showConfirmationCheckbox(showMessageCheck);

                me.datesText(response.sessionInfo.datesText);
                me.locationText(response.sessionInfo.location);

                if (response.selectedRegistration) {
                    me.loadRegistration(response.selectedRegistration);
                }
                else {
                    me.setWelcomeForm();
                }
                jQuery('#application-container').show();
            }
        };

        private setWelcomeForm() {
            var me = this;
            me.currentForm('welcome');
            me.formTitle('Welcome, begin or continue your registration');
        }


        public getRegistration() {
            var me = this;
            var request = {
                type: 'id',
                value: me.user.registrationId(),
                getFundList: me.registrationForm.financeInfoForm.fundContributions().length > 0 ? 0 : 1
            };
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting your registration...');
            me.peanut.executeService('registration.GetRegistration',request, me.handleRegistrationResponse)
                .always(function() {
                    me.application.hideWaiter();
             });
        }

        public findRegistration() {
            var me = this;
            var code = me.lookupForm.getLookupCode();
            var request = {
                type: 'code',
                value: code,
                getFundList: me.registrationForm.financeInfoForm.fundContributions().length > 0 ? 0 : 1
            };
            if (code) {
                me.application.hideServiceMessages();
                me.application.showWaiter('Finding registration...');
                me.peanut.executeService('registration.GetRegistration',request, me.handleRegistrationResponse)
                    .always(function() {
                        me.application.hideWaiter();
                    });

            }
        }

        private handleRegistrationResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            // me.application.hideWaiter();
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var response = <IRegistrationResponse>serviceResponse.Value;
                me.loadRegistration(response);

            }
            else {
                me.lookupForm.validationError('Sorry, cannot locate this registration.')
            }

        };

        private loadRegistration(response:IRegistrationResponse) {
            var me = this;
            me.registrationReceivedDate = response.registration.receivedDate;
            me.registrationStatus(response.registration.statusId);
            me.currentRegistration = response.registration;
            me.currentDonationsTotal = response.accountSummary.donationTotal;
            me.previousBalance = USDollars.toNumber(response.accountSummary.balance);
            me.registrationForm.assign(response.registration);
            me.attenderList(response.attenderList);
            me.registrationForm.financeInfoForm.assignAccountSummary(response.accountSummary);
            me.registrationChanged(false);
            me.attendersChanged(false);
            me.contactButton.setComplete();
            var buttonStatus = response.attenderList.length == 0 ? 'incomplete' : 'complete';
            me.attendersButton.setStatus(buttonStatus);
            me.accountButton.setStatus(buttonStatus);
            me.registrationForm.financeInfoForm.setViewState(response.registration.statusId == 1 ? 'edit' : 'view');
            me.registrationForm.contactInfoForm.setViewState(response.registration.statusId == 1 ? 'edit' : 'view');
            me.housingAssignmentList(response.housingAssignments);
            me.accountButton.setStatus(response.registration.statusId == 1 ?  'incomplete' : 'complete' );
            me.updatedAttenders = [];
            me.deletedAttenders = [];
            switch (me.registrationLoadLocation) {
                case 'contact' :
                    me.showContactForm();
                    break;
                case 'attenders' :
                    me.showAttenderForm();
                    break;
                case 'accounts' :
                    me.showAccountDetails();
                    break;
                default: me.showSummaryForm();
                    break;
            }
            me.registrationLoadLocation = '';
        }

        public startRegistration() {
            var me = this;
            if (me.startupForm.validate()) {
                me.newRegistration();
            }
        }

        public newRegistration() {
            var me = this;
            me.registrationReceivedDate = null;
            me.registrationForm.clear();
            me.lookupForm.clear();
            me.formTitle('Begin your registration');
            me.currentForm('startnew');
            if (me.user.authenticated()) {
                me.lookupForm.lookupCode(me.user.email());
            }
        }


        public startLookup() {
            var me = this;
            if (me.user.authenticated() || me.startupForm.validate()) {
                me.lookupForm.clear();
                me.formTitle('Find your registration');
                me.currentForm('lookup');
                if (me.user.authenticated()) {
                    me.lookupForm.lookupCode(me.user.email());
                }
            }
        }

        startNewRegistration() {
            var me = this;
            me.registrationReceivedDate = null;
            me.registrationForm.clear();
            me.attenderList([]);
            var code = me.lookupForm.getLookupCode();
            me.previousBalance = null;
            if (code) {
                me.verifyLookupCode(code);
            }
        }

        verifyLookupCode(code: string) {
            var me = this;
            var request = code;

            me.application.hideServiceMessages();
            me.application.showWaiter('Verifying lookup code...');
            me.peanut.executeService('registration.CheckRegistrationCode', request, me.handleVerifyLookupResponse)
                .always(function () {
                    me.application.hideWaiter();
                });
        }

        private handleVerifyLookupResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var code = me.lookupForm.lookupCode();
                var result = serviceResponse.Value;
                if (!result) {
                    me.lookupForm.validationError("Lookup code '"+code+"' is already in use.");
                    return;
                }
                me.registrationForm.contactInfoForm.edit();
                me.registrationChanged(false);
                me.attendersChanged(false);
                me.registrationForm.registrationCode(code);
                if (Peanut.ValidateEmail(code)) {
                    me.registrationForm.contactInfoForm.email(code);
                }
                me.contactButton.setStatus('incomplete');
                me.registrationStatus(1);
                if (me.user.authenticated()) {
                    me.showAddressSearch();
                }
                me.editContactInfo();
            }
        };

        endContactEdit() {
            var me = this;
            var ready = me.validateContactInfo();
            if (!ready) {
                window.location.assign('#contact-errors');
                return false;
            }
            if (me.registrationForm.id()) {
                me.registrationForm.contactInfoForm.view();
            }
            window.location.assign('#reg-header');
            me.contactButton.setStatus('complete');
            return true;
        }

        saveContactInfoAndDone = () => {
            var me = this;
            var ready = me.endContactEdit();
            if (!ready) {
                return;
            }
            me.contactButton.setStatus('complete');
            if (me.registrationForm.id()) {
                me.saveChanges();
            }
            else {
                me.attendersButton.setComplete();
                me.accountButton.setIncomplete();
                me.registrationForm.financeInfoForm.edit();
                me.showAccountsForm();
            }
        };

        addAttenders() {
            var me = this;
            var ready = me.endContactEdit();
            if (!ready) {
                return;
            }
            me.attendersButton.setStatus('incomplete');
            me.newAttender();
        }

        saveFinanceInfo = ()  => {
            var me = this;
            if (!me.registrationForm.financeInfoForm.validate()) {
                window.location.assign('#account-errors');
                return;
            }
            me.registrationChanged(true);
            me.saveChanges();
        };

        cancelContactChanges = () => {
            var me = this;
            if (me.registrationStatus() == 1) {
                me.registrationForm.contactInfoForm.clear();
            }
            else {
                me.registrationForm.contactInfoForm.assign(me.currentRegistration);
                me.registrationForm.contactInfoForm.setViewState();
            }

        };

        cancelFinanceChanges = () => {
            var me = this;
            if (me.registrationStatus() == 1) {
                me.registrationForm.financeInfoForm.clear();
            }
            else {
                me.registrationForm.financeInfoForm.reset();
                me.registrationForm.financeInfoForm.setViewState();
            }
        };

        private newAttender() {
            var me = this;
            me.getAttender(0);
        }

        saveAttenderAddNext() {
            var me = this;
            if (me.saveAttender()) {
                me.newAttender();
            }
        }

        endAddAttenders = () => {
            var me = this;
            me.registrationForm.financeInfoForm.calculated(false);
            me.attenderForm.setViewState();
            if (me.registrationForm.id()) {
                me.saveChanges();
            }
            else {
                me.attendersButton.setComplete();
                me.accountButton.setIncomplete();
                me.registrationForm.financeInfoForm.edit();
                me.showAccountsForm();
            }
        };


        saveAttenderAndShowList = () => {
            var me = this;
            if (me.saveAttender()) {
                me.showAttendersList();
            }
        };

        saveAttenderAndDone() {
            var me = this;
            if (me.saveAttender()) {
                me.endAddAttenders();
            }
        }

        cancelAttenderEdit() {
            var me = this;
            var id = me.attenderForm.id();
            me.attenderForm.clear();
            if (me.attenderList().length > 0) {
                me.showAttendersList();
            }
        }

        cancelRegistration() {
            jQuery("#confirm-cancel-modal").modal('show');
        }

        doCancelRegistration = () => {
            var me = this;
            jQuery("#confirm-cancel-modal").modal('hide');

            var request = me.registrationForm.id();
            me.application.hideServiceMessages();
            me.application.showWaiter('Cancelling registration...');
            me.peanut.executeService('registration.CancelRegistration', request, me.handleRegistrationCancel)
                .always(function () {
                    me.application.hideWaiter();
                });
        };

        private handleRegistrationCancel = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                me.registrationStatus(0);
                me.contactButton.setStatus('inactive');
                me.attendersButton.setStatus('inactive');
                me.accountButton.setStatus('inactive');
            }
        };


        showAccountsForm = () => {
            var me = this;
            if ((!me.registrationForm.financeInfoForm.calculated()) || me.balanceInvalid()) {
                me.updateCosts();
            }
            else if (me.registrationForm.id()){
                if (me.currentForm() != 'accounts') {
                    me.showAccountDetails();
                }
            }
            else {
                me.showFeesAndDonationsPage();
            }
        };

        showAccountDetails = () => {
            var me = this;
            me.registrationForm.financeInfoForm.setViewState();
            me.currentForm('accounts');
        };

        public showFeesAndDonationsPage = () => {
            var me = this;
            me.currentForm('accounts');
            me.formTitle('Fees and Donations');
            me.registrationForm.financeInfoForm.edit();
            window.location.assign('#form-column');
        };

        updateCosts = () => {
            var me = this;
            var request:ICostUpdateRequest = {
                registrationReceivedDate : me.registrationReceivedDate,
                aidAmount: me.registrationForm.financeInfoForm.aidAmount(),
                donations: me.registrationForm.financeInfoForm.getDonations(),
                attenders: me.updatedAttenders,
                deletedAttenders: me.deletedAttenders,
                getFundList: me.registrationForm.financeInfoForm.fundContributions().length > 0 ? 0 : 1
            };
            me.application.hideServiceMessages();
            me.application.showWaiter('Calculating costs...');

            me.peanut.executeService('registration.GetRegistrationCost', request, me.handleGetCostResponse)
                .always(function () {
                    me.application.hideWaiter();
                });
        };

        private handleGetCostResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var response = <IAccountSummary>serviceResponse.Value;
                me.registrationForm.financeInfoForm.assignAccountSummary(response);
                me.showFeesAndDonationsPage();
            }
        };

        showSummaryForm = () => {
            var me = this;
            me.formTitle("Registration");
            me.currentForm("registration");
            window.location.assign('#reg-header');
        };

        confirmAndSave() {
            var me = this;
            if (!me.registrationForm.financeInfoForm.validate()) {
                window.location.assign('#account-errors');
                return;
            }
            if (me.registrationForm.financeInfoForm.donationsChanged()) {
                me.registrationChanged(true);
            }
            me.registrationForm.financeInfoForm.view();
            me.saveChanges();
            // todo: what happens when save fails?
            me.showSummaryForm();
        };

        checkRegistrationIsComplete() {
            var me = this;
            return (me.attendersButton.isComplete() && me.contactButton.isComplete() && me.accountButton.isComplete());
        }

        validateContactInfo():boolean {
            var me = this;
            var isValid = me.registrationForm.contactInfoForm.validate();
            if (isValid) {
                me.registrationChanged(true);
            }
            else {
                window.location.assign('#contact-errors');
            }
            return isValid;
        }

        hasUnsavedChanges():boolean {
            var me = this;
            if (me.registrationStatus() == 1) {
                return true;
            }
            if (me.registrationForm.financeInfoForm.viewState() == 'edit') {
                return true;
            }
            if (me.registrationForm.contactInfoForm.viewState() == 'edit') {
                return true;
            }
            if (me.attenderForm.viewState() == 'edit') {
                return true;
            }
            return (me.registrationChanged() || me.attendersChanged());
        }

        reloadPage() {
            window.onbeforeunload = null;
            window.location.reload(true);
        };

        checkReadyToSave() {
            var me = this;
            if (me.registrationForm.financeInfoForm.viewState() == 'edit') {
                if (me.registrationForm.financeInfoForm.validate()) {
                    me.registrationForm.financeInfoForm.setViewState();
                    if (me.registrationForm.financeInfoForm.donationsChanged()) {
                        me.registrationChanged(true);
                    }
                }
                else {
//                    me.application.showError('Please complete this form');
                    window.location.assign('#account-errors');
                    me.showAccountsForm();
                    return false;
                }
            }
            if (me.registrationForm.contactInfoForm.viewState() == 'edit') {
                if (me.validateContactInfo()) {
                    me.registrationForm.contactInfoForm.setViewState();
                }
                else {
                    me.application.showError('Please complete the contact information form.');
                    me.showContactForm();
                    return false;
                }
            }
            if (me.attenderForm.viewState() == 'edit') {
                me.application.showError('Please complete the attender form.');
                me.showAttenderForm();
                return false;
            }

            if (me.attenderList().length == 0) {
                me.application.showError('You must add at least one attender');
                me.showAttenderForm();
                return false;
            }

            return true;

        }



        editSelectedAttender = (item:IListItem) => {
            var me = this;
            var id = item.Value;
            var attender = me.getAttender(id);
        };

        removeSelectedAttender = (item:IListItem) => {
            var me = this;
            me.selectedAttender = item;
            me.deleteAttenderMessage("Remove attender '"+item.Text+"'?")
            jQuery("#confirm-attender-delete-modal").modal('show');
        };


        deleteSelectedAttender = () => {
            var me = this;
            jQuery("#confirm-attender-delete-modal").modal('hide');
            if (me.selectedAttender) {
                me.attendersChanged(true);
                var id = me.selectedAttender.Value;
                var attenderList = me.attenderList();
                attenderList = _.filter(attenderList, function (attenderItem:IListItem) {
                    return attenderItem.Value != id;
                });
                me.attenderList(attenderList);
                var updated = _.filter(me.updatedAttenders, function (attender:IAttender) {
                    return attender.attenderId != id;
                });
                me.updatedAttenders = updated;
                if (id > 0) {
                    me.deletedAttenders.push(id);
                }
                if (me.registrationForm.id()) {
                    me.saveChanges();
                }
                me.selectedAttender = null;
            }
        };

        uncancel = () => {
            var me = this;
            // todo: implement uncancel
            alert('Uncancel not implemented yet.')
        };

        saveAttender() {
            var me = this;
            me.attendersChanged(true);
            if (!me.attenderForm.validate()) {
                window.location.assign('#attender-errors');
                return false;
            }

            var onUpdateList = false;
            var attender = null;
            var id = me.attenderForm.id();
            var isNew = (!id);
            if (isNew) {
                id = me.getTempAttenderId();
                me.attenderForm.id(id);
            }
            else {
                attender = _.find(me.updatedAttenders, function (a:IAttender) {
                    return a.attenderId == id;
                });
                onUpdateList = (attender) ? true : false;
            }

            if (attender == null) {
                attender = {};
            }
            me.attenderForm.updateAttender(<IAttender>attender);

            if (isNew) {
                me.attenderList.push(
                    {
                        Text: me.attenderForm.attenderFullName(),
                        Value: id,
                        Description: ''
                    }
                );
            }

            if (!onUpdateList) {
                me.updatedAttenders.push(attender);
            }

            if (me.accountButton.isComplete()) {
                me.accountReviewed(true);
            }
            return true;
        }

        getTempAttenderId() {
            var me = this;
            var result = 0;
            _.each(me.updatedAttenders, function (attender:IAttender) {
                if (result > attender.attenderId) {
                    result = attender.attenderId;
                }
            });
            return result - 1;
        }


        getAttender(attenderId:any) {
            var me = this;
            var attender:IAttender = null;

            if (attenderId) {
                attender = _.find(me.updatedAttenders, function (item:IAttender) {
                    return item.attenderId == attenderId;
                });
                if (attender) {
                    me.editAttender(attender);
                    return;
                }
            }
            else {
                if (me.attenderForm.lookupsAssigned) {
                    me.editAttender();
                    return;
                }
            }

            var request:IGetAttenderRequest = {
                id: attenderId,
                includeLookups: me.attenderForm.lookupsAssigned ? 0 : 1
            };

            me.application.hideServiceMessages();
            me.application.showWaiter('Getting attender data...');

            me.peanut.executeService('registration.GetAttender',request, me.handleGetAttenderResponse)
                .always(function() {
                    me.application.hideWaiter();
                });

        }

        private handleGetAttenderResponse = (serviceResponse:IServiceResponse) => {
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {
                var response = <IGetAttenderResponse>serviceResponse.Value;
                showAllCreditTypes = true;
                if (response) {
                    if (response.lookups) {
                        var showAllCreditTypes =  (me.user.isRegistrar() ||
                            (response.attender && response.attender.creditTypeId && response.attender.creditTypeId > 2));
                        me.attenderForm.assignLookupLists(response.lookups, showAllCreditTypes);
                    }
                }
                me.editAttender(response.attender);
            }
        };


        private editAttender(attender:IAttender = null) {
            var me = this;
            if (attender) {
                me.attenderForm.assign(attender);
                me.formTitle("Update attender: " + textParser.makeFullName(attender.firstName, attender.lastName, attender.middleName));
            }
            else {
                me.attenderForm.clear();
                me.attenderForm.setDefaults(
                    me.updatedAttenders.length > 0 ? me.updatedAttenders[0] : null
                );
                me.formTitle('New Attender');
            }
            me.attenderForm.edit();
            window.location.assign('#reg-header');
            me.showAttenderForm();
        }

        showWelcomeForm() {
            var me = this;
            me.currentForm('welcome');
        };

        showAttendersList = () => {
            var me = this;
            me.attenderForm.setViewState();
            me.formTitle('Attenders');
            me.showAttenderForm();
        };

        showAttenderForm = () => {
            var me = this;
            me.currentForm('attenders');
            window.location.assign('#reg-header');
            if (me.attenderForm.id() == 0 && me.familyMembers.length > 0) {
                jQuery("#family-member-modal").modal('show');
            }
        };

        showContactForm = () => {
            var me = this;
            me.formTitle('Contact Information');
            me.currentForm('contact');
            window.location.assign('#reg-header');
        };

        editContactForm = () => {
            var me = this;
            me.registrationForm.contactInfoForm.edit();
        };

        editAccountsForm = () => {
            var me = this;
            me.registrationForm.financeInfoForm.edit();
            me.showAccountsForm();
        };


        private editContactInfo() {
            var me = this;
            me.registrationForm.contactInfoForm.edit();
            me.showContactForm();
        }


        getRegistrationChanges() {
            var me = this;
            var registrationId = me.registrationForm.id();
            if (me.registrationChanged() || me.attendersChanged()) {
                var request:IRegistrationUpdateRequest = {
                    registration: <IRegistrationInfo>{registrationId: registrationId},
                    updatedAttenders: me.updatedAttenders,
                    deletedAttenders: me.deletedAttenders,
                    donations: me.registrationForm.financeInfoForm.getDonations(),
                    sendConfirmation: me.sendConfirmation(),
                    previousBalance: me.previousBalance
                };
                if (me.registrationChanged() || registrationId < 1) {
                    request.registration = <IRegistrationInfo>{
                        year: me.sessionInfo.year
                    };
                    me.registrationForm.updateRegistration(<IRegistrationInfo>request.registration);
                }
                return request;
            }
            return null;
        }

        sendRegistrarMessage = () => {
            var me = this;
            var messageText = me.modalInput().trim();
            if (messageText) {
                me.modalInput('');
                var message  = {
                    toName: 'Registrar',
                    mailboxCode: 'registrar',
                    fromName: me.currentRegistration.name,
                    fromAddress: me.currentRegistration.email,
                    subject: 'Registration inquiry',
                    body: messageText,
                    registrationCode: me.currentRegistration.registrationCode
                };

                me.application.showWaiter('Sending message. Please wait...');
                me.peanut.executeService('mailboxes.SendMessage', message, function (serviceResponse:Tops.IServiceResponse) {
                    me.application.hideWaiter();
                    if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                        me.updateRegistrationNotes(messageText);
                    }
                }).fail(function () {
                    me.application.hideWaiter();
                });
                jQuery("#registrar-contact-modal").modal('hide');
            }
        };

        private updateRegistrationNotes(noteText: string) {
            var me = this;
            me.application.showWaiter('Updating notes...');
            var request = {
                registrationId: me.registrationForm.id(),
                notes: noteText,
                action: 'appendNote'
            };
            me.peanut.executeService('registration.UpdateRegistrationNotes',request,
                function (serviceResponse:IServiceResponse) {
                    // nothing to do
                }).always(function() {
                me.application.hideWaiter();
            });

        }

        showRegistrarContactForm() {
            var me = this;
            me.modalInput('');
            jQuery("#registrar-contact-modal").modal('show');
        }


// TEMPLATES
        public serviceCallTemplate() {
            // todo: delete serviceCallTemplate when not needed
            var me = this;
            var request = null; //

            me.application.hideServiceMessages();
            me.application.showWaiter('Message here...');
            me.peanut.executeService('directory.ServiceName', request, me.handleServiceResponseTemplate)
                .always(function () {
                    me.application.hideWaiter();
                });
        }

        private handleServiceResponseTemplate = (serviceResponse:IServiceResponse) => {
            // todo: delete handleServiceResponseTemplate when not needed
            var me = this;
            if (serviceResponse.Result == Peanut.serviceResultSuccess) {


            }
        };

    }
}

Tops.YmRegistrationViewModel.instance = new Tops.YmRegistrationViewModel();
(<any>window).ViewModel = Tops.YmRegistrationViewModel.instance;