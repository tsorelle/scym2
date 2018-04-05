var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Tops;
(function (Tops) {
    var userObservable = (function () {
        function userObservable() {
            this.id = 0;
            this.name = ko.observable('');
            this.authenticated = ko.observable(false);
            this.isRegistrar = ko.observable(false);
            this.email = ko.observable('');
            this.registrationId = ko.observable(0);
        }
        userObservable.prototype.assign = function (user) {
            var me = this;
            me.id = user ? user.id : 0;
            me.name(user ? user.name : '');
            me.isRegistrar(user ? (user.isRegistrar == 1) : false);
            var authenticated = user ? (user.authenticated == 1) : false;
            me.authenticated(authenticated);
            me.email(user ? user.email : '');
            me.registrationId(user ? user.registrationId : 0);
        };
        return userObservable;
    }());
    Tops.userObservable = userObservable;
    var regButtonObservable = (function () {
        function regButtonObservable(label, status) {
            if (status === void 0) { status = 'inactive'; }
            this.status = 'inactive';
            this.isComplete = ko.observable(false);
            this.iconClasses = ko.observable('');
            this.label = ko.observable('');
            this.title = ko.observable('');
            this.isVisible = ko.observable(false);
            this.css = ko.observable('');
            var me = this;
            me.label(label);
            me.setStatus(status);
        }
        regButtonObservable.prototype.setStatus = function (status) {
            var me = this;
            var label = me.label();
            me.status = status;
            me.isVisible(status != 'inactive');
            switch (status) {
                case 'complete':
                    me.css('btn btn-lg btn-block btn-success');
                    me.iconClasses('glyphicon glyphicon-ok');
                    me.title(label + " (completed)");
                    break;
                case 'incomplete':
                    me.css('btn btn-lg btn-block btn-warning');
                    me.iconClasses('glyphicon glyphicon-forward');
                    me.title(label + " (incomplete)");
                    break;
                default:
                    me.css('btn btn-lg btn-block btn-primary');
                    me.iconClasses('');
                    me.title(label);
                    break;
            }
            me.isComplete(status == 'complete');
        };
        regButtonObservable.prototype.setComplete = function () {
            var me = this;
            me.setStatus('complete');
        };
        regButtonObservable.prototype.setIncomplete = function () {
            var me = this;
            me.setStatus('incomplete');
        };
        return regButtonObservable;
    }());
    Tops.regButtonObservable = regButtonObservable;
    var financeInfoObservable = (function (_super) {
        __extends(financeInfoObservable, _super);
        function financeInfoObservable() {
            var _this = _super.call(this) || this;
            _this.id = ko.observable(0);
            _this.funds = [];
            _this.fundContributions = ko.observableArray([]);
            _this.aidAmount = ko.observable('');
            _this.aidAmountError = ko.observable('');
            _this.financialAidAmount = '';
            _this.donations = [];
            _this.feesList = ko.observableArray();
            _this.creditsList = ko.observableArray();
            _this.donationsList = ko.observableArray();
            _this.feeTotal = ko.observable('');
            _this.creditTotal = ko.observable('');
            _this.donationTotal = ko.observable('');
            _this.balance = ko.observable('');
            _this.aidEligibility = ko.observable('');
            _this.calculated = ko.observable(false);
            _this.balanceDue = ko.observable();
            _this.updatedDonationTotal = 0.00;
            _this.assign = function (registration) {
                var me = _this;
                me.id(registration.registrationId);
                me.clearValidations();
                me.financialAidAmount = registration.financialAidAmount;
                me.aidAmount(registration.financialAidAmount);
                me.fundContributions([]);
                me.isAssigned = true;
            };
            _this.reset = function () {
                var me = _this;
                me.clearValidations();
                me.aidAmount(me.financialAidAmount);
                me.setDonations(me.donations);
            };
            _this.assignAccountSummary = function (summary) {
                var me = _this;
                me.feesList(summary.fees);
                me.creditsList(summary.credits);
                me.donationsList(summary.donations);
                me.feeTotal(summary.feeTotal);
                me.creditTotal(summary.creditTotal);
                me.donationTotal(summary.donationTotal);
                me.updatedDonationTotal = me.validateCurrency(summary.donationTotal);
                me.aidEligibility(summary.aidEligibility);
                var balanceDue = Tops.USDollars.toNumber(summary.balance);
                me.balanceDue(balanceDue);
                if (balanceDue === null) {
                    me.calculated(false);
                    me.balance("Not calculated yet");
                }
                else {
                    me.calculated(true);
                    var message = Tops.USDollars.balanceMessage(balanceDue);
                    me.balance(message);
                }
                if (summary.funds && summary.funds.length > 0) {
                    me.funds = summary.funds;
                }
                me.donations = summary.donations;
                me.setDonations(summary.donations);
            };
            _this.getDonations = function () {
                var me = _this;
                var result = [];
                var donations = me.fundContributions();
                _.each(donations, function (donation) {
                    var item = {
                        Key: donation.Key,
                        Value: donation.Value ? donation.Value : 0
                    };
                    result.push(item);
                }, me);
                return result;
            };
            _this.setDonations = function (donations) {
                var me = _this;
                var contributions = [];
                me.fundContributions.removeAll();
                _.each(me.funds, function (item) {
                    var donation = _.find(donations, function (i) {
                        return i.Key == item.Key;
                    }, me);
                    var donationItem = {
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
            _this.updateRegistration = function (registration) {
                var me = _this;
                registration.financialAidAmount = me.aidAmount();
            };
            _this.validate = function () {
                var me = _this;
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
                _.each(contributions, function (item) {
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
            var me = _this;
            me.setViewState('closed');
            return _this;
        }
        financeInfoObservable.prototype.clear = function () {
            var me = this;
            me.clearValidations();
            me.id(0);
            me.aidAmount('');
            me.isAssigned = false;
            me.clearAccountSummary();
        };
        financeInfoObservable.prototype.clearValidations = function () {
            var me = this;
            me.aidAmountError('');
            var donationFields = me.fundContributions.removeAll();
            if (donationFields.length > 0) {
                _.each(donationFields, function (item) {
                    item.ErrorMessage = '';
                }, me);
                me.setFundContributions(donationFields);
            }
            me.hasErrors(false);
        };
        financeInfoObservable.prototype.clearAccountSummary = function () {
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
        };
        financeInfoObservable.prototype.currencyValue = function (stringValue) {
            if (stringValue) {
                stringValue = stringValue.replace('$', '').replace(',', '').replace(' ', '');
                if (jQuery.isNumeric(stringValue)) {
                    return parseFloat(stringValue);
                }
            }
            return null;
        };
        financeInfoObservable.prototype.setFundContributions = function (contributions) {
            var me = this;
            me.fundContributions(contributions);
            jQuery('.description-link').popover();
        };
        financeInfoObservable.prototype.getDonationsTotal = function () {
            var me = this;
            var result = 0.00;
            var contributions = me.fundContributions();
            _.each(contributions, function (item) {
                var amount = me.validateCurrency(me.aidAmount());
                if (amount) {
                    result += amount;
                }
            }, me);
            return result;
        };
        financeInfoObservable.prototype.validateCurrency = function (value) {
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
        ;
        financeInfoObservable.prototype.donationsChanged = function () {
            var me = this;
            var currentTotal = me.donationTotal();
            var total = me.validateCurrency(currentTotal);
            total = total ? total : 0.00;
            return me.updatedDonationTotal != total;
        };
        return financeInfoObservable;
    }(Tops.editPanel));
    Tops.financeInfoObservable = financeInfoObservable;
    var contactInfoObservable = (function (_super) {
        __extends(contactInfoObservable, _super);
        function contactInfoObservable() {
            var _this = _super.call(this) || this;
            _this.name = ko.observable('');
            _this.address = ko.observable('');
            _this.city = ko.observable('');
            _this.phone = ko.observable('');
            _this.email = ko.observable('');
            _this.notes = ko.observable('');
            _this.nameError = ko.observable('');
            _this.emailError = ko.observable('');
            _this.codeError = ko.observable('');
            _this.contactError = ko.observable('');
            _this.assign = function (registration) {
                var me = _this;
                me.clearValidations();
                me.name(registration.name);
                me.address(registration.address);
                me.city(registration.city);
                me.email(registration.email);
                me.phone(registration.phone);
                me.notes(registration.notes);
            };
            _this.updateRegistration = function (registration) {
                var me = _this;
                registration.name = me.name();
                registration.address = me.address();
                registration.city = me.city();
                registration.email = me.email();
                registration.phone = me.phone();
                registration.notes = me.notes();
            };
            _this.validate = function () {
                var me = _this;
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
                    if (!Tops.Peanut.ValidateEmail(email)) {
                        me.emailError(': This is not a valid email address');
                        valid = false;
                    }
                }
                else if (!hasPhoneOrAddress) {
                    me.contactError('You must enter some form of contact information: email, phone or address.');
                    valid = false;
                }
                me.hasErrors(!valid);
                return valid;
            };
            var me = _this;
            me.setViewState('closed');
            me.hasAddress = ko.computed(function () {
                return me.address() || me.city() ? true : false;
            });
            return _this;
        }
        contactInfoObservable.prototype.clear = function () {
            var me = this;
            me.clearValidations();
            me.name('');
            me.address('');
            me.city('');
            me.phone('');
            me.email('');
        };
        contactInfoObservable.prototype.clearValidations = function () {
            var me = this;
            me.nameError('');
            me.emailError('');
            me.codeError('');
            me.contactError('');
            me.hasErrors(false);
        };
        return contactInfoObservable;
    }(Tops.editPanel));
    Tops.contactInfoObservable = contactInfoObservable;
    var registrationObservable = (function () {
        function registrationObservable() {
            var _this = this;
            this.id = ko.observable(0);
            this.registrationCode = ko.observable('');
            this.contactInfoForm = new contactInfoObservable();
            this.financeInfoForm = new financeInfoObservable();
            this.familyMembers = ko.observableArray();
            this.updateRegistration = function (registration) {
                var me = _this;
                registration.registrationId = me.id();
                registration.registrationCode = me.registrationCode();
                me.contactInfoForm.updateRegistration(registration);
                me.financeInfoForm.updateRegistration(registration);
            };
        }
        registrationObservable.prototype.clear = function () {
            var me = this;
            me.registrationCode('');
        };
        registrationObservable.prototype.assign = function (registration) {
            var me = this;
            me.id(registration.registrationId);
            me.registrationCode(registration.registrationCode);
            me.contactInfoForm.assign(registration);
            me.financeInfoForm.assign(registration);
        };
        return registrationObservable;
    }());
    Tops.registrationObservable = registrationObservable;
    var attenderObservable = (function (_super) {
        __extends(attenderObservable, _super);
        function attenderObservable() {
            var _this = _super.call(this) || this;
            _this.id = ko.observable(0);
            _this.showCreditTypeDropdown = ko.observable(true);
            _this.changed = ko.observable(false);
            _this.firstName = ko.observable('');
            _this.lastName = ko.observable('');
            _this.middleName = ko.observable('');
            _this.dateOfBirth = ko.observable('');
            _this.affiliationCode = ko.observable('');
            _this.otherAffiliation = ko.observable('');
            _this.firstTimer = ko.observable(false);
            _this.teacher = ko.observable(false);
            _this.guest = ko.observable(false);
            _this.notes = ko.observable('');
            _this.linens = ko.observable(false);
            _this.housingTypeId = ko.observable('');
            _this.attended = ko.observable(false);
            _this.singleOccupant = ko.observable(false);
            _this.vegetarian = ko.observable(false);
            _this.glutenFree = ko.observable(false);
            _this.mealThursDinner = ko.observable(false);
            _this.mealFriBreakfast = ko.observable(false);
            _this.mealFriLunch = ko.observable(false);
            _this.mealFriDinner = ko.observable(false);
            _this.mealSatBreakfast = ko.observable(false);
            _this.mealSatLunch = ko.observable(false);
            _this.mealSatDinner = ko.observable(false);
            _this.mealSunBreakfast = ko.observable(false);
            _this.simpleMeal = ko.observable(false);
            _this.specialNeedsTypes = ko.observableArray();
            _this.housingTypes = ko.observableArray();
            _this.generationTypes = ko.observableArray();
            _this.affiliationCodes = ko.observableArray();
            _this.creditTypes = ko.observableArray();
            _this.gradeLevels = ko.observableArray();
            _this.timePeriods = ko.observableArray();
            _this.lookupsAssigned = false;
            _this.selectedSpecialNeedsType = ko.observable(null);
            _this.selectedHousingType = ko.observable(null);
            _this.selectedGenerationType = ko.observable(null);
            _this.selectedAffiliationCode = ko.observable(null);
            _this.selectedCreditType = ko.observable(null);
            _this.selectedAgeGroup = ko.observable(null);
            _this.selectedGradeLevel = ko.observable(null);
            _this.selectedArrivalTime = ko.observable(null);
            _this.selectedDepartureTime = ko.observable(null);
            _this.attenderFullName = ko.computed(function () {
                return '';
            });
            _this.isChild = ko.computed(function () {
                return false;
            });
            _this.singleOccupancyApplies = ko.computed(function () {
                return false;
            });
            _this.firstNameError = ko.observable('');
            _this.lastNameError = ko.observable('');
            _this.arrivalTimeError = ko.observable('');
            _this.departureTimeError = ko.observable('');
            _this.dateOfBirthError = ko.observable('');
            _this.housingPreferenceError = ko.observable('');
            _this.initialize = function () {
                var me = _this;
                me.attenderFullName = ko.computed(function () {
                    return Tops.textParser.makeFullName(me.firstName(), me.lastName(), me.middleName());
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
                    return false;
                });
            };
            _this.setDefaults = function (attender) {
                if (attender === void 0) { attender = null; }
                var me = _this;
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
            _this.assign = function (attender) {
                var me = _this;
                me.clearValidations();
                me.id(attender.attenderId);
                me.changed(attender.changed);
                me.firstName(attender.firstName);
                me.lastName(attender.lastName);
                me.middleName(attender.middleName);
                me.dateOfBirth(attender.dateOfBirth);
                me.otherAffiliation(attender.otherAffiliation);
                me.notes(attender.notes);
                me.firstTimer(attender.firstTimer ? true : false);
                me.teacher(attender.teacher ? true : false);
                me.guest(attender.guest ? true : false);
                me.linens(attender.linens ? true : false);
                me.vegetarian(attender.vegetarian ? true : false);
                me.attended(attender.attended ? true : false);
                var privateOccupant = attender.singleOccupant ? true : false;
                me.singleOccupant(privateOccupant);
                me.glutenFree(attender.glutenFree ? true : false);
                me.setAttenderMeals(attender);
                me.setLookupValue(me.specialNeedsTypes(), me.selectedSpecialNeedsType, attender.specialNeedsTypeId);
                me.setLookupValue(me.generationTypes(), me.selectedGenerationType, attender.generationId);
                me.setLookupValue(me.gradeLevels(), me.selectedGradeLevel, attender.gradeLevel);
                me.setLookupValue(me.creditTypes(), me.selectedCreditType, attender.creditTypeId);
                me.setLookupValue(me.housingTypes(), me.selectedHousingType, attender.housingTypeId);
                me.setLookupValue(me.timePeriods(), me.selectedArrivalTime, attender.arrivalTime);
                me.setLookupValue(me.timePeriods(), me.selectedDepartureTime, attender.departureTime);
                me.setLookupValue(me.affiliationCodes(), me.selectedAffiliationCode, attender.affiliationCode);
            };
            _this.updateAttender = function (attender) {
                var me = _this;
                attender.attenderId = me.id();
                attender.changed = me.changed();
                attender.firstName = me.firstName();
                attender.lastName = me.lastName();
                attender.middleName = me.middleName();
                attender.dateOfBirth = me.dateOfBirth();
                attender.otherAffiliation = me.otherAffiliation();
                attender.notes = me.notes();
                attender.firstTimer = me.firstTimer() ? 1 : 0;
                attender.teacher = me.teacher() ? 1 : 0;
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
                attender.affiliationCode = me.getLookupValue(me.selectedAffiliationCode);
                attender.creditTypeId = me.getLookupValue(me.selectedCreditType);
                attender.housingTypeId = me.getLookupValue(me.selectedHousingType);
                attender.arrivalTime = me.getLookupValue(me.selectedArrivalTime);
                attender.departureTime = me.getLookupValue(me.selectedDepartureTime);
            };
            _this.validate = function () {
                var me = _this;
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
            var me = _this;
            me.setViewState('closed');
            return _this;
        }
        attenderObservable.prototype.clear = function () {
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
            me.selectedGradeLevel(null);
            me.setLookupValue(me.timePeriods(), me.selectedArrivalTime, 42);
            me.setLookupValue(me.timePeriods(), me.selectedDepartureTime, 72);
        };
        attenderObservable.prototype.clearValidations = function () {
            var me = this;
            me.firstNameError('');
            me.lastNameError('');
            me.arrivalTimeError('');
            me.departureTimeError('');
            me.dateOfBirthError('');
            me.housingPreferenceError('');
            me.hasErrors(false);
        };
        attenderObservable.prototype.assignLookupLists = function (lists, showAllCreditTypes) {
            if (showAllCreditTypes === void 0) { showAllCreditTypes = false; }
            var me = this;
            me.lookupsAssigned = true;
            me.housingTypes(lists.housingTypes);
            me.affiliationCodes(lists.affiliationCodes);
            var times = me.buildTimeLookup();
            me.timePeriods(times);
            me.generationTypes([
                { Text: 'Adult', Value: '1', Description: '' },
                { Text: 'Youth (age 4 through 18)', Value: '2', Description: '' },
                { Text: 'Infant (through age 3)', Value: '5', Description: '' },
                { Text: '', Value: '', Description: '' }
            ]);
            me.specialNeedsTypes([
                { Text: 'Hearing impaired', Value: '1', Description: '' },
                { Text: 'Mobility impaired', Value: '2', Description: '' },
                { Text: 'Other, see notes', Value: '500', Description: '' }
            ]);
            me.gradeLevels([
                { Text: 'Preschool', Value: 'PS', Description: '' },
                { Text: 'Kindergarten', Value: 'K', Description: '' },
                { Text: 'First', Value: '1', Description: '' },
                { Text: 'Second', Value: '2', Description: '' },
                { Text: 'Third', Value: '3', Description: '' },
                { Text: 'Fourth', Value: '4', Description: '' },
                { Text: 'Fifth', Value: '5', Description: '' },
                { Text: 'Sixth', Value: '6', Description: '' },
                { Text: 'Seventh', Value: '7', Description: '' },
                { Text: 'Eighth', Value: '8', Description: '' },
                { Text: 'Ninth', Value: '9', Description: '' },
                { Text: 'Tenth', Value: '10', Description: '' },
                { Text: 'Eleventh', Value: '11', Description: '' },
                { Text: 'Twelth', Value: '12', Description: '' }
            ]);
            if (showAllCreditTypes) {
                me.creditTypes([
                    { Text: 'General attender', Value: '0', Description: '' },
                    { Text: 'Teacher', Value: '2', Description: '' },
                    { Text: 'Guest', Value: '3', Description: '' },
                    { Text: 'SCYM Staff', Value: '4', Description: '' }
                ]);
                me.showCreditTypeDropdown(true);
            }
            else {
                me.creditTypes([
                    { Text: 'General attender', Value: '0', Description: '' }
                ]);
                me.showCreditTypeDropdown(false);
            }
        };
        attenderObservable.prototype.buildTimeLookup = function () {
            var me = this;
            var result = [];
            var minCode = 42;
            var maxCode = 72;
            for (var day = 4; day < 8; day += 1) {
                for (var time = 1; time < 4; time += 1) {
                    var code = (day * 10) + time;
                    result.push({
                        Text: me.timeCodeToStr(code),
                        Value: code,
                        Description: ''
                    });
                }
            }
            return result;
        };
        attenderObservable.prototype.timeCodeToStr = function (timeCode) {
            var time = 'error';
            var day = 'error';
            switch (Math.floor(timeCode / 10)) {
                case 4:
                    day = 'Thursday';
                    break;
                case 5:
                    day = 'Friday';
                    break;
                case 6:
                    day = 'Saturday';
                    break;
                case 7:
                    day = 'Sunday';
                    break;
            }
            switch (timeCode % 10) {
                case 1:
                    time = 'morning';
                    break;
                case 2:
                    time = 'noon';
                    break;
                case 3:
                    time = 'evening';
                    break;
            }
            return day + ' ' + time;
        };
        attenderObservable.prototype.setAttenderMeals = function (attender) {
            var me = this;
            attender.meals.forEach(function (mealtime) {
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
        };
        attenderObservable.prototype.setGeneration = function (generationId) {
            var me = this;
            me.setLookupValue(me.generationTypes(), me.selectedGenerationType, generationId);
        };
        attenderObservable.prototype.setLookupValue = function (list, selection, value) {
            var result = _.find(list, function (item) {
                return item.Value == value;
            });
            selection(result);
        };
        attenderObservable.prototype.getLookupValue = function (selection) {
            var me = this;
            var item = selection();
            return (item) ? item.Value : null;
        };
        return attenderObservable;
    }(Tops.editPanel));
    Tops.attenderObservable = attenderObservable;
    var AnnualSessionInfo = (function () {
        function AnnualSessionInfo() {
        }
        return AnnualSessionInfo;
    }());
    var startupFormObservable = (function () {
        function startupFormObservable() {
            var _this = this;
            this.securityAnswer = ko.observable('');
            this.validationError = ko.observable('');
            this.askSecurityQuestion = ko.observable(true);
            this.validate = function () {
                var me = _this;
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
            };
        }
        return startupFormObservable;
    }());
    var lookupFormObservable = (function () {
        function lookupFormObservable() {
            var _this = this;
            this.lookupCode = ko.observable('');
            this.validationError = ko.observable('');
            this.getLookupCode = function () {
                var me = _this;
                var code = me.lookupCode().trim();
                me.lookupCode(code.toLowerCase());
                me.validationError(code ? '' : 'Please enter something.');
                return code;
            };
        }
        lookupFormObservable.prototype.clear = function () {
            this.lookupCode('');
            this.validationError('');
        };
        return lookupFormObservable;
    }());
    var YmRegistrationViewModel = (function () {
        function YmRegistrationViewModel() {
            var _this = this;
            this.initialAttender = null;
            this.debugging = ko.observable(false);
            this.registrationChanged = ko.observable(false);
            this.attendersChanged = ko.observable(false);
            this.currentDonationsTotal = '';
            this.sessionInfo = new AnnualSessionInfo();
            this.user = new userObservable();
            this.registrationStatus = ko.observable(-1);
            this.registrationReceivedDate = null;
            this.lookupCode = ko.observable('');
            this.modalInput = ko.observable('');
            this.addressSearchValue = ko.observable('');
            this.addressSearchWarning = ko.observable('');
            this.showConfirmationCheckbox = ko.observable(false);
            this.sendConfirmation = ko.observable(true);
            this.deleteAttenderMessage = ko.observable('');
            this.selectedAttender = null;
            this.previousBalance = null;
            this.startupForm = new startupFormObservable();
            this.lookupForm = new lookupFormObservable();
            this.attenderForm = new attenderObservable();
            this.registrationForm = new registrationObservable();
            this.familyMembers = [];
            this.attenderList = ko.observableArray([]);
            this.updatedAttenders = [];
            this.deletedAttenders = [];
            this.currentForm = ko.observable('');
            this.accountReviewed = ko.observable(false);
            this.registerButton = new regButtonObservable("Summary", 'ready');
            this.contactButton = new regButtonObservable("Contact");
            this.attendersButton = new regButtonObservable("Attenders");
            this.accountButton = new regButtonObservable("Account");
            this.registrationLoadLocation = '';
            this.formTitle = ko.observable('Registration Summary');
            this.datesText = ko.observable('');
            this.locationText = ko.observable('');
            this.housingAssignmentList = ko.observableArray();
            this.saveContactInfo = function () {
                var me = _this;
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
            this.checkForUnsavedChanges = function () {
                var me = _this;
                if (me.registrationForm.id()) {
                    return (me.attendersChanged() || me.registrationChanged());
                }
                else {
                    var name = me.registrationForm.contactInfoForm.name();
                    var lookup = me.registrationForm.registrationCode();
                    return (name.trim() && lookup.trim() && me.attendersChanged());
                }
            };
            this.saveChanges = function () {
                var me = _this;
                if (me.checkReadyToSave()) {
                    if (me.registrationForm.id()) {
                        me.registrationLoadLocation = me.currentForm();
                    }
                    me.uploadChanges();
                }
            };
            this.handleSaveChangesResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.loadRegistration(response);
                    me.attendersButton.setStatus('complete');
                    me.accountButton.setStatus('complete');
                    me.accountReviewed(response.registration.statusId > 1);
                }
            };
            this.showAddressSearchResults = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.addressSearchResults.setList(list);
                    if (list.length == 0) {
                        me.addressSearchWarning('No addresses were found for this name.');
                    }
                }
            };
            this.selectAddress = function (item) {
                var me = _this;
                jQuery("#address-search-modal").modal('hide');
                me.addressSearchResults.reset();
                me.application.showWaiter('Loading address...');
                me.application.hideServiceMessages();
                var request = item.Value;
                me.peanut.executeService('registration.FindRegistrationAddress', request, me.handleSearchAddressResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleSearchAddressResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var address = serviceResponse.Value;
                    me.familyMembers = address.persons;
                    me.familyMemberResults.setList(address.persons);
                    me.registrationForm.contactInfoForm.name(address.name);
                    me.registrationForm.contactInfoForm.address(address.address);
                    me.registrationForm.contactInfoForm.city(address.city);
                }
            };
            this.selectFamilyMember = function (member) {
                var me = _this;
                me.familyMembers = _.filter(me.familyMembers, function (m) {
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
            this.endFamilyMemberSelection = function () {
                var me = _this;
                jQuery("#family-member-modal").modal('hide');
                me.familyMembers = [];
            };
            this.afterInit = function () {
                var me = _this;
                me.application.bindSection('reg-header', me);
                me.application.bindSection('nav-column', me);
                me.application.bindSection('form-header', me);
                me.application.bindSection('form-section', me);
                me.application.bindSection('modals-section', me);
                me.application.showDefaultSection();
            };
            this.showContactFormHelp = function () {
                jQuery("#contact-form-help").modal('show');
            };
            this.showAttenderNavHelp = function () {
                jQuery("#attender-nav-help").modal('show');
            };
            this.handleInitializationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.user.assign(response.user);
                    me.sessionInfo.year = response.sessionInfo.year;
                    me.sessionInfo.startDate = response.sessionInfo.startDate;
                    me.sessionInfo.endDate = response.sessionInfo.endDate;
                    var start = new Date(response.sessionInfo.startDate);
                    var today = new Date();
                    var preYM = today < start;
                    var isRegistrar = response.user.isRegistrar ? true : false;
                    var showMessageCheck = isRegistrar || (!preYM);
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
            this.handleRegistrationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.loadRegistration(response);
                }
                else {
                    me.lookupForm.validationError('Sorry, cannot locate this registration.');
                }
            };
            this.handleVerifyLookupResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var code = me.lookupForm.lookupCode();
                    var result = serviceResponse.Value;
                    if (!result) {
                        me.lookupForm.validationError("Lookup code '" + code + "' is already in use.");
                        return;
                    }
                    me.registrationForm.contactInfoForm.edit();
                    me.registrationChanged(false);
                    me.attendersChanged(false);
                    me.registrationForm.registrationCode(code);
                    if (Tops.Peanut.ValidateEmail(code)) {
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
            this.saveContactInfoAndDone = function () {
                var me = _this;
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
            this.saveFinanceInfo = function () {
                var me = _this;
                if (!me.registrationForm.financeInfoForm.validate()) {
                    window.location.assign('#account-errors');
                    return;
                }
                me.registrationChanged(true);
                me.saveChanges();
            };
            this.cancelContactChanges = function () {
                var me = _this;
                if (me.registrationStatus() == 1) {
                    me.registrationForm.contactInfoForm.clear();
                }
                else {
                    me.registrationForm.contactInfoForm.assign(me.currentRegistration);
                    me.registrationForm.contactInfoForm.setViewState();
                }
            };
            this.cancelFinanceChanges = function () {
                var me = _this;
                if (me.registrationStatus() == 1) {
                    me.registrationForm.financeInfoForm.clear();
                }
                else {
                    me.registrationForm.financeInfoForm.reset();
                    me.registrationForm.financeInfoForm.setViewState();
                }
            };
            this.endAddAttenders = function () {
                var me = _this;
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
            this.saveAttenderAndShowList = function () {
                var me = _this;
                if (me.saveAttender()) {
                    me.showAttendersList();
                }
            };
            this.doCancelRegistration = function () {
                var me = _this;
                jQuery("#confirm-cancel-modal").modal('hide');
                var request = me.registrationForm.id();
                me.application.hideServiceMessages();
                me.application.showWaiter('Cancelling registration...');
                me.peanut.executeService('registration.CancelRegistration', request, me.handleRegistrationCancel)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleRegistrationCancel = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.registrationStatus(0);
                    me.contactButton.setStatus('inactive');
                    me.attendersButton.setStatus('inactive');
                    me.accountButton.setStatus('inactive');
                }
            };
            this.showAccountsForm = function () {
                var me = _this;
                if ((!me.registrationForm.financeInfoForm.calculated()) || me.balanceInvalid()) {
                    me.updateCosts();
                }
                else if (me.registrationForm.id()) {
                    if (me.currentForm() != 'accounts') {
                        me.showAccountDetails();
                    }
                }
                else {
                    me.showFeesAndDonationsPage();
                }
            };
            this.showAccountDetails = function () {
                var me = _this;
                me.registrationForm.financeInfoForm.setViewState();
                me.currentForm('accounts');
            };
            this.showFeesAndDonationsPage = function () {
                var me = _this;
                me.currentForm('accounts');
                me.formTitle('Fees and Donations');
                me.registrationForm.financeInfoForm.edit();
                window.location.assign('#form-column');
            };
            this.updateCosts = function () {
                var me = _this;
                var request = {
                    registrationReceivedDate: me.registrationReceivedDate,
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
            this.handleGetCostResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.registrationForm.financeInfoForm.assignAccountSummary(response);
                    me.showFeesAndDonationsPage();
                }
            };
            this.showSummaryForm = function () {
                var me = _this;
                me.formTitle("Registration");
                me.currentForm("registration");
                window.location.assign('#reg-header');
            };
            this.editSelectedAttender = function (item) {
                var me = _this;
                var id = item.Value;
                var attender = me.getAttender(id);
            };
            this.removeSelectedAttender = function (item) {
                var me = _this;
                me.selectedAttender = item;
                me.deleteAttenderMessage("Remove attender '" + item.Text + "'?");
                jQuery("#confirm-attender-delete-modal").modal('show');
            };
            this.deleteSelectedAttender = function () {
                var me = _this;
                jQuery("#confirm-attender-delete-modal").modal('hide');
                if (me.selectedAttender) {
                    me.attendersChanged(true);
                    var id = me.selectedAttender.Value;
                    var attenderList = me.attenderList();
                    attenderList = _.filter(attenderList, function (attenderItem) {
                        return attenderItem.Value != id;
                    });
                    me.attenderList(attenderList);
                    var updated = _.filter(me.updatedAttenders, function (attender) {
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
            this.uncancel = function () {
                var me = _this;
                alert('Uncancel not implemented yet.');
            };
            this.handleGetAttenderResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    showAllCreditTypes = true;
                    if (response) {
                        if (response.lookups) {
                            var showAllCreditTypes = (me.user.isRegistrar() ||
                                (response.attender && response.attender.creditTypeId && response.attender.creditTypeId > 2));
                            me.attenderForm.assignLookupLists(response.lookups, showAllCreditTypes);
                        }
                    }
                    me.editAttender(response.attender);
                }
            };
            this.showAttendersList = function () {
                var me = _this;
                me.attenderForm.setViewState();
                me.formTitle('Attenders');
                me.showAttenderForm();
            };
            this.showAttenderForm = function () {
                var me = _this;
                me.currentForm('attenders');
                window.location.assign('#reg-header');
                if (me.attenderForm.id() == 0 && me.familyMembers.length > 0) {
                    jQuery("#family-member-modal").modal('show');
                }
            };
            this.showContactForm = function () {
                var me = _this;
                me.formTitle('Contact Information');
                me.currentForm('contact');
                window.location.assign('#reg-header');
            };
            this.editContactForm = function () {
                var me = _this;
                me.registrationForm.contactInfoForm.edit();
            };
            this.editAccountsForm = function () {
                var me = _this;
                me.registrationForm.financeInfoForm.edit();
                me.showAccountsForm();
            };
            this.sendRegistrarMessage = function () {
                var me = _this;
                var messageText = me.modalInput().trim();
                if (messageText) {
                    me.modalInput('');
                    var message = {
                        toName: 'Registrar',
                        mailboxCode: 'registrar',
                        fromName: me.currentRegistration.name,
                        fromAddress: me.currentRegistration.email,
                        subject: 'Registration inquiry',
                        body: messageText,
                        registrationCode: me.currentRegistration.registrationCode
                    };
                    me.application.showWaiter('Sending message. Please wait...');
                    me.peanut.executeService('mailboxes.SendMessage', message, function (serviceResponse) {
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
            this.handleServiceResponseTemplate = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                }
            };
            var me = this;
            Tops.YmRegistrationViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        YmRegistrationViewModel.getCurrentYmYear = function () {
            var currentTime = new Date();
            var month = currentTime.getMonth();
            var year = currentTime.getFullYear();
            if (month > 5) {
                year += 1;
            }
            return year.toString();
        };
        YmRegistrationViewModel.prototype.uploadChanges = function () {
            var me = this;
            var request = me.getRegistrationChanges();
            if (!request) {
                me.application.showWarning('No changes were found to save.');
                return;
            }
            me.application.hideServiceMessages();
            me.application.showWaiter('Saving changes...');
            me.peanut.executeService('registration.SaveRegistrationChanges', request, me.handleSaveChangesResponse)
                .fail(function () {
                var errorInfo = me.peanut.errorInfo;
            })
                .always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            successFunction = me.afterInit;
            jQuery(function () {
                jQuery(".datepicker").datepicker({
                    changeYear: true,
                    yearRange: 'c-20:c+20'
                });
            });
            window.onbeforeunload = function () {
                if (me.hasUnsavedChanges()) {
                    if (me.registrationStatus() ? true : false && me.attendersButton.isComplete()) {
                        me.accountReviewed(true);
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
            me.application.initialize(applicationPath, function () {
                me.application.loadResources(['scym-registration.css', 'textParser.js', 'searchListObservable.js', 'USDollars.js', 'Dates.js'], function () {
                    me.familyMemberResults = new Tops.searchListObservable(2, 6);
                    me.addressSearchResults = new Tops.searchListObservable(2, 6);
                    me.application.loadComponent('modal-confirm', function () {
                        me.attenderForm.initialize();
                        me.getInitialInfo(successFunction);
                    });
                });
            });
        };
        YmRegistrationViewModel.prototype.showAddressSearch = function () {
            var me = this;
            me.addressSearchValue('');
            me.addressSearchResults.reset();
            jQuery("#address-search-modal").modal('show');
        };
        YmRegistrationViewModel.prototype.findAddresses = function () {
            var me = this;
            me.addressSearchWarning('');
            var request = new Tops.KeyValueDTO();
            request.Name = 'Addresses';
            request.Value = me.addressSearchValue();
            me.application.showWaiter('Searching...');
            me.peanut.executeService('directory.DirectorySearch', request, me.showAddressSearchResults)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.getInitialInfo = function (successFunction) {
            var me = this;
            me.application.hideServiceMessages();
            me.application.showWaiter('Loading...');
            var request = null;
            var regcode = Tops.HttpRequestVars.Get('code');
            if (regcode) {
                request = {
                    type: 'code',
                    value: regcode,
                    getFundList: true
                };
            }
            else {
                var id = Tops.HttpRequestVars.Get('id');
                if (id) {
                    request = {
                        type: 'id',
                        value: id,
                        getFundList: true
                    };
                }
            }
            var selectAttender = me.peanut.getRequestParam('aid');
            var initialAttender = (selectAttender) ? selectAttender : null;
            me.peanut.executeService('registration.RegistrationInit', request, me.handleInitializationResponse)
                .always(function () {
                me.application.hideWaiter();
                if (initialAttender && me.registrationForm.registrationCode()) {
                    me.getAttender(initialAttender);
                }
                if (successFunction) {
                    successFunction();
                }
            });
        };
        YmRegistrationViewModel.prototype.setWelcomeForm = function () {
            var me = this;
            me.currentForm('welcome');
            me.formTitle('Welcome, begin or continue your registration');
        };
        YmRegistrationViewModel.prototype.getRegistration = function () {
            var me = this;
            var request = {
                type: 'id',
                value: me.user.registrationId(),
                getFundList: me.registrationForm.financeInfoForm.fundContributions().length > 0 ? 0 : 1
            };
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting your registration...');
            me.peanut.executeService('registration.GetRegistration', request, me.handleRegistrationResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.findRegistration = function () {
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
                me.peanut.executeService('registration.GetRegistration', request, me.handleRegistrationResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        YmRegistrationViewModel.prototype.loadRegistration = function (response) {
            var me = this;
            me.registrationReceivedDate = response.registration.receivedDate;
            me.registrationStatus(response.registration.statusId);
            me.currentRegistration = response.registration;
            me.currentDonationsTotal = response.accountSummary.donationTotal;
            me.previousBalance = Tops.USDollars.toNumber(response.accountSummary.balance);
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
            me.accountButton.setStatus(response.registration.statusId == 1 ? 'incomplete' : 'complete');
            me.updatedAttenders = [];
            me.deletedAttenders = [];
            switch (me.registrationLoadLocation) {
                case 'contact':
                    me.showContactForm();
                    break;
                case 'attenders':
                    me.showAttenderForm();
                    break;
                case 'accounts':
                    me.showAccountDetails();
                    break;
                default:
                    me.showSummaryForm();
                    break;
            }
            me.registrationLoadLocation = '';
        };
        YmRegistrationViewModel.prototype.startRegistration = function () {
            var me = this;
            if (me.startupForm.validate()) {
                me.newRegistration();
            }
        };
        YmRegistrationViewModel.prototype.newRegistration = function () {
            var me = this;
            me.registrationReceivedDate = null;
            me.registrationForm.clear();
            me.lookupForm.clear();
            me.formTitle('Begin your registration');
            me.currentForm('startnew');
            if (me.user.authenticated()) {
                me.lookupForm.lookupCode(me.user.email());
            }
        };
        YmRegistrationViewModel.prototype.startLookup = function () {
            var me = this;
            if (me.user.authenticated() || me.startupForm.validate()) {
                me.lookupForm.clear();
                me.formTitle('Find your registration');
                me.currentForm('lookup');
                if (me.user.authenticated()) {
                    me.lookupForm.lookupCode(me.user.email());
                }
            }
        };
        YmRegistrationViewModel.prototype.startNewRegistration = function () {
            var me = this;
            me.registrationReceivedDate = null;
            me.registrationForm.clear();
            me.attenderList([]);
            var code = me.lookupForm.getLookupCode();
            me.previousBalance = null;
            if (code) {
                me.verifyLookupCode(code);
            }
        };
        YmRegistrationViewModel.prototype.verifyLookupCode = function (code) {
            var me = this;
            var request = code;
            me.application.hideServiceMessages();
            me.application.showWaiter('Verifying lookup code...');
            me.peanut.executeService('registration.CheckRegistrationCode', request, me.handleVerifyLookupResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.endContactEdit = function () {
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
        };
        YmRegistrationViewModel.prototype.addAttenders = function () {
            var me = this;
            var ready = me.endContactEdit();
            if (!ready) {
                return;
            }
            me.attendersButton.setStatus('incomplete');
            me.newAttender();
        };
        YmRegistrationViewModel.prototype.newAttender = function () {
            var me = this;
            me.getAttender(0);
        };
        YmRegistrationViewModel.prototype.saveAttenderAddNext = function () {
            var me = this;
            if (me.saveAttender()) {
                me.newAttender();
            }
        };
        YmRegistrationViewModel.prototype.saveAttenderAndDone = function () {
            var me = this;
            if (me.saveAttender()) {
                me.endAddAttenders();
            }
        };
        YmRegistrationViewModel.prototype.cancelAttenderEdit = function () {
            var me = this;
            var id = me.attenderForm.id();
            me.attenderForm.clear();
            if (me.attenderList().length > 0) {
                me.showAttendersList();
            }
        };
        YmRegistrationViewModel.prototype.cancelRegistration = function () {
            jQuery("#confirm-cancel-modal").modal('show');
        };
        YmRegistrationViewModel.prototype.confirmAndSave = function () {
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
            me.showSummaryForm();
        };
        ;
        YmRegistrationViewModel.prototype.checkRegistrationIsComplete = function () {
            var me = this;
            return (me.attendersButton.isComplete() && me.contactButton.isComplete() && me.accountButton.isComplete());
        };
        YmRegistrationViewModel.prototype.validateContactInfo = function () {
            var me = this;
            var isValid = me.registrationForm.contactInfoForm.validate();
            if (isValid) {
                me.registrationChanged(true);
            }
            else {
                window.location.assign('#contact-errors');
            }
            return isValid;
        };
        YmRegistrationViewModel.prototype.hasUnsavedChanges = function () {
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
        };
        YmRegistrationViewModel.prototype.reloadPage = function () {
            window.onbeforeunload = null;
            window.location.reload(true);
        };
        ;
        YmRegistrationViewModel.prototype.checkReadyToSave = function () {
            var me = this;
            if (me.registrationForm.financeInfoForm.viewState() == 'edit') {
                if (me.registrationForm.financeInfoForm.validate()) {
                    me.registrationForm.financeInfoForm.setViewState();
                    if (me.registrationForm.financeInfoForm.donationsChanged()) {
                        me.registrationChanged(true);
                    }
                }
                else {
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
        };
        YmRegistrationViewModel.prototype.saveAttender = function () {
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
                attender = _.find(me.updatedAttenders, function (a) {
                    return a.attenderId == id;
                });
                onUpdateList = (attender) ? true : false;
            }
            if (attender == null) {
                attender = {};
            }
            me.attenderForm.updateAttender(attender);
            if (isNew) {
                me.attenderList.push({
                    Text: me.attenderForm.attenderFullName(),
                    Value: id,
                    Description: ''
                });
            }
            if (!onUpdateList) {
                me.updatedAttenders.push(attender);
            }
            if (me.accountButton.isComplete()) {
                me.accountReviewed(true);
            }
            return true;
        };
        YmRegistrationViewModel.prototype.getTempAttenderId = function () {
            var me = this;
            var result = 0;
            _.each(me.updatedAttenders, function (attender) {
                if (result > attender.attenderId) {
                    result = attender.attenderId;
                }
            });
            return result - 1;
        };
        YmRegistrationViewModel.prototype.getAttender = function (attenderId) {
            var me = this;
            var attender = null;
            if (attenderId) {
                attender = _.find(me.updatedAttenders, function (item) {
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
            var request = {
                id: attenderId,
                includeLookups: me.attenderForm.lookupsAssigned ? 0 : 1
            };
            me.application.hideServiceMessages();
            me.application.showWaiter('Getting attender data...');
            me.peanut.executeService('registration.GetAttender', request, me.handleGetAttenderResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.editAttender = function (attender) {
            if (attender === void 0) { attender = null; }
            var me = this;
            if (attender) {
                me.attenderForm.assign(attender);
                me.formTitle("Update attender: " + Tops.textParser.makeFullName(attender.firstName, attender.lastName, attender.middleName));
            }
            else {
                me.attenderForm.clear();
                me.attenderForm.setDefaults(me.updatedAttenders.length > 0 ? me.updatedAttenders[0] : null);
                me.formTitle('New Attender');
            }
            me.attenderForm.edit();
            window.location.assign('#reg-header');
            me.showAttenderForm();
        };
        YmRegistrationViewModel.prototype.showWelcomeForm = function () {
            var me = this;
            me.currentForm('welcome');
        };
        ;
        YmRegistrationViewModel.prototype.editContactInfo = function () {
            var me = this;
            me.registrationForm.contactInfoForm.edit();
            me.showContactForm();
        };
        YmRegistrationViewModel.prototype.getRegistrationChanges = function () {
            var me = this;
            var registrationId = me.registrationForm.id();
            if (me.registrationChanged() || me.attendersChanged()) {
                var request = {
                    registration: { registrationId: registrationId },
                    updatedAttenders: me.updatedAttenders,
                    deletedAttenders: me.deletedAttenders,
                    donations: me.registrationForm.financeInfoForm.getDonations(),
                    sendConfirmation: me.sendConfirmation(),
                    previousBalance: me.previousBalance
                };
                if (me.registrationChanged() || registrationId < 1) {
                    request.registration = {
                        year: me.sessionInfo.year
                    };
                    me.registrationForm.updateRegistration(request.registration);
                }
                return request;
            }
            return null;
        };
        YmRegistrationViewModel.prototype.updateRegistrationNotes = function (noteText) {
            var me = this;
            me.application.showWaiter('Updating notes...');
            var request = {
                registrationId: me.registrationForm.id(),
                notes: noteText,
                action: 'appendNote'
            };
            me.peanut.executeService('registration.UpdateRegistrationNotes', request, function (serviceResponse) {
            }).always(function () {
                me.application.hideWaiter();
            });
        };
        YmRegistrationViewModel.prototype.showRegistrarContactForm = function () {
            var me = this;
            me.modalInput('');
            jQuery("#registrar-contact-modal").modal('show');
        };
        YmRegistrationViewModel.prototype.serviceCallTemplate = function () {
            var me = this;
            var request = null;
            me.application.hideServiceMessages();
            me.application.showWaiter('Message here...');
            me.peanut.executeService('directory.ServiceName', request, me.handleServiceResponseTemplate)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        return YmRegistrationViewModel;
    }());
    Tops.YmRegistrationViewModel = YmRegistrationViewModel;
})(Tops || (Tops = {}));
Tops.YmRegistrationViewModel.instance = new Tops.YmRegistrationViewModel();
window.ViewModel = Tops.YmRegistrationViewModel.instance;
//# sourceMappingURL=YmRegistrationViewModel.js.map