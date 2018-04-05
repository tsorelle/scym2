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
    var scymPerson = (function () {
        function scymPerson() {
            this.personId = null;
            this.firstName = '';
            this.middleName = '';
            this.lastName = '';
            this.username = '';
            this.addressId = null;
            this.phone = '';
            this.phone2 = '';
            this.email = '';
            this.newsletter = 0;
            this.dateOfBirth = '';
            this.notes = '';
            this.junior = 0;
            this.active = 1;
            this.sortkey = '';
            this.affiliationcode = '';
            this.memberaffiliation = '';
            this.otheraffiliation = '';
            this.directorylistingtypeid = 1;
            this.lastUpdate = '';
            this.organization = '';
            this.editState = Tops.editState.created;
        }
        return scymPerson;
    }());
    Tops.scymPerson = scymPerson;
    var scymAddress = (function () {
        function scymAddress() {
            this.addressId = null;
            this.addressname = '';
            this.addressTypeId = 1;
            this.address1 = '';
            this.address2 = '';
            this.city = '';
            this.state = '';
            this.postalcode = '';
            this.country = '';
            this.phone = '';
            this.notes = '';
            this.newsletter = 1;
            this.active = 1;
            this.sortkey = '';
            this.directorylistingtypeid = 1;
            this.lastUpdate = '';
            this.id = '';
            this.editState = Tops.editState.created;
        }
        return scymAddress;
    }());
    Tops.scymAddress = scymAddress;
    var addressPersonServiceRequest = (function () {
        function addressPersonServiceRequest() {
        }
        return addressPersonServiceRequest;
    }());
    Tops.addressPersonServiceRequest = addressPersonServiceRequest;
    var newPersonForAddressRequest = (function () {
        function newPersonForAddressRequest() {
        }
        return newPersonForAddressRequest;
    }());
    Tops.newPersonForAddressRequest = newPersonForAddressRequest;
    var newAddressForPersonRequest = (function () {
        function newAddressForPersonRequest() {
        }
        return newAddressForPersonRequest;
    }());
    Tops.newAddressForPersonRequest = newAddressForPersonRequest;
    var clientFamily = (function () {
        function clientFamily() {
            var _this = this;
            this.persons = [];
            this.selectedPersonId = null;
            this.newId = 0;
            this.changeCount = 0;
            this.visible = ko.observable(false);
            this.hasAddress = ko.observable(false);
            this.personCount = ko.observable(0);
            this.isLoaded = function () {
                var me = _this;
                return (me.address != null || me.persons.length > 0);
            };
        }
        clientFamily.prototype.setFamily = function (family) {
            var me = this;
            me.setAddress(family.address);
            var selected = me.setPersons(family.persons, family.selectedPersonId);
            return selected;
        };
        clientFamily.prototype.empty = function () {
            var me = this;
            me.address = null;
            me.hasAddress(false);
            me.persons = [];
            me.personCount(0);
            me.selectedPersonId = 0;
        };
        clientFamily.prototype.setAddress = function (address) {
            var me = this;
            me.address = address;
            me.hasAddress(address != null);
        };
        clientFamily.prototype.clearAddress = function (selectedPersonId) {
            if (selectedPersonId === void 0) { selectedPersonId = 0; }
            var me = this;
            me.address = null;
            me.hasAddress(false);
            var person = null;
            if (selectedPersonId) {
                person = me.selectPerson(selectedPersonId);
            }
            else {
                person = me.getSelected();
            }
            me.persons = [];
            if (person == null) {
                me.visible(false);
            }
            else {
                me.persons.push(person);
            }
        };
        clientFamily.prototype.getActivePersons = function () {
            var me = this;
            var result = _.filter(me.persons, function (person) {
                return person.editState != Tops.editState.deleted;
            });
            return result;
        };
        clientFamily.prototype.selectFirstPerson = function () {
            var me = this;
            var active = me.getActivePersons();
            var firstPerson = _.first(active);
            if (firstPerson) {
                me.selectedPersonId = firstPerson.personId;
            }
            else {
                me.selectedPersonId = 0;
            }
            return firstPerson;
        };
        clientFamily.prototype.setPersons = function (persons, selectedPersonId) {
            if (selectedPersonId === void 0) { selectedPersonId = 0; }
            var me = this;
            me.personCount(0);
            var selectedPerson = null;
            if (persons) {
                _.each(persons, function (person) {
                    person.editState = Tops.editState.unchanged;
                });
                me.persons = persons;
                if (selectedPersonId) {
                    selectedPerson = me.getPersonById(selectedPersonId);
                }
                if (!selectedPerson) {
                    selectedPerson = me.selectFirstPerson();
                }
            }
            else {
                me.persons = [];
            }
            me.personCount(persons.length);
            me.selectedPersonId = selectedPerson ? selectedPerson.personId : null;
            return selectedPerson;
        };
        clientFamily.prototype.addPersonToList = function (person, selected) {
            if (selected === void 0) { selected = true; }
            var me = this;
            var i = _.findIndex(me.persons, function (thePerson) {
                return thePerson.personId == person.personId;
            }, me);
            if (i > 0) {
                me.persons[i] = person;
            }
            else {
                me.persons.push(person);
                me.personCount(me.persons.length);
            }
            if (selected) {
                me.selectedPersonId = person.personId;
            }
        };
        clientFamily.prototype.getSelected = function () {
            var me = this;
            var selected = _.find(me.persons, function (person) {
                return me.selectedPersonId == person.personId;
            }, me);
            return selected;
        };
        clientFamily.prototype.getPersonById = function (id) {
            var me = this;
            if (!id) {
                return null;
            }
            var result = _.find(me.persons, function (person) {
                return id == person.personId;
            }, me);
            return result;
        };
        clientFamily.prototype.selectPerson = function (id) {
            var me = this;
            var selected = null;
            if (id) {
                selected = _.find(me.persons, function (person) {
                    return person.personId == id;
                }, me);
                if (selected) {
                    me.selectedPersonId = id;
                }
            }
            else {
                me.selectedPersonId = null;
            }
            return selected;
        };
        clientFamily.prototype.removePerson = function (personId) {
            var me = this;
            var currentPersons = me.persons;
            me.persons = _.reject(currentPersons, function (person) {
                return person.personId == personId;
            });
            var selected = me.selectFirstPerson();
            return selected;
        };
        return clientFamily;
    }());
    var saveOperations = (function () {
        function saveOperations() {
        }
        saveOperations.update = 'update';
        saveOperations.insert = 'insert';
        saveOperations.reassign = 'reassign';
        return saveOperations;
    }());
    Tops.saveOperations = saveOperations;
    var directoryEditPanel = (function (_super) {
        __extends(directoryEditPanel, _super);
        function directoryEditPanel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.searchList = new Tops.searchListObservable(2, 10);
            _this.directoryListingTypeId = ko.observable(1);
            _this.selectedDirectoryListingType = ko.observable(null);
            _this.directoryListingTypes = ko.observableArray([]);
            _this.getDirectoryListingItem = function () {
                var me = _this;
                var lookup = me.directoryListingTypes();
                var id = me.directoryListingTypeId();
                if (!id) {
                    id = 0;
                }
                var key = id.toString();
                var result = _.find(lookup, function (item) {
                    return item.Value == key;
                }, me);
                return result;
            };
            return _this;
        }
        return directoryEditPanel;
    }(Tops.editPanel));
    Tops.directoryEditPanel = directoryEditPanel;
    var personObservable = (function (_super) {
        __extends(personObservable, _super);
        function personObservable() {
            var _this = _super.call(this) || this;
            _this.personId = ko.observable('');
            _this.firstName = ko.observable('');
            _this.middleName = ko.observable('');
            _this.lastName = ko.observable('');
            _this.username = ko.observable('');
            _this.phone = ko.observable('');
            _this.phone2 = ko.observable('');
            _this.email = ko.observable('');
            _this.newsletter = ko.observable(0);
            _this.dateOfBirth = ko.observable('');
            _this.notes = ko.observable('');
            _this.junior = ko.observable(0);
            _this.active = ko.observable(1);
            _this.sortkey = ko.observable('');
            _this.affiliationcode = ko.observable('');
            _this.memberaffiliation = ko.observable('');
            _this.otheraffiliation = ko.observable('');
            _this.lastUpdate = ko.observable('');
            _this.organization = ko.observable('');
            _this.selectedAffiliation = ko.observable(null);
            _this.affiliations = ko.observableArray([]);
            _this.selectedMembershipAffiliation = ko.observable(null);
            _this.firstNameError = ko.observable('');
            _this.lastNameError = ko.observable('');
            _this.emailError = ko.observable('');
            _this.affiliationError = ko.observable('');
            _this.showOutsideMeeting = ko.observable(false);
            _this.membershipType = ko.observable('');
            _this.ignoreTriggers = false;
            _this.getAffiliationItem = function (key) {
                var me = _this;
                var lookup = me.affiliations();
                var result = _.find(lookup, function (item) {
                    return item.Value == key;
                }, me);
                return result;
            };
            _this.onAffiliationCodeSelected = function (selected) {
                var me = _this;
                if (!me.ignoreTriggers) {
                    if (selected) {
                        me.affiliationcode(selected.Value);
                    }
                    else {
                        me.affiliationcode('');
                    }
                    me.setMembershipType();
                }
            };
            _this.onMemberAffiliationSelected = function (selected) {
                var me = _this;
                if (!me.ignoreTriggers) {
                    if (selected) {
                        me.memberaffiliation(selected.Value);
                    }
                    else {
                        me.memberaffiliation('');
                    }
                    me.setMembershipType();
                }
            };
            _this.onMembershiptypeChanged = function (value) {
                var me = _this;
                if (!me.ignoreTriggers) {
                    if (value == 'attender') {
                        me.setMembershipAffiliation('NONE');
                    }
                    else if (value == 'member') {
                        var attending = me.affiliationcode();
                        me.setMembershipAffiliation(attending);
                    }
                }
            };
            _this.setMembershipType = function () {
                var me = _this;
                var type = me.getMembershipType();
                me.ignoreTriggers = true;
                me.membershipType(type);
                me.ignoreTriggers = false;
            };
            _this.computeAffiliation = function () {
                var me = _this;
                var key = me.affiliationcode();
                var result = me.getAffiliationItem(key);
                return result ? result.Name : '';
            };
            _this.computeMembership = function () {
                var me = _this;
                var key = me.memberaffiliation();
                var result = me.getAffiliationItem(key);
                return result ? result.Name : '';
            };
            _this.computeHasAffiliation = function () {
                var me = _this;
                var code = me.affiliationcode();
                if (code == 'NONE' || code === '' || code === null) {
                    return false;
                }
                return true;
            };
            _this.computeHasMembership = function () {
                var me = _this;
                var code = me.memberaffiliation();
                if (code == 'NONE' || code === '' || code === null) {
                    return false;
                }
                return true;
            };
            _this.computeEmailLink = function () {
                var me = _this;
                var email = me.email();
                return email ? 'mailto:' + me.fullName() + '<' + email + '>' : '#';
            };
            _this.assign = function (person) {
                var me = _this;
                if (!person) {
                    me.clear();
                    return;
                }
                me.isAssigned = true;
                me.clearValidations();
                me.firstName(person.firstName);
                me.middleName(person.middleName);
                me.lastName(person.lastName);
                me.username(person.username);
                me.phone(person.phone);
                me.phone2(person.phone2);
                me.email(person.email);
                me.newsletter(person.newsletter);
                me.dateOfBirth(person.dateOfBirth);
                me.notes(person.notes);
                me.junior(person.junior);
                me.active(person.active);
                me.sortkey(person.sortkey);
                me.affiliationcode(person.affiliationcode);
                me.memberaffiliation(person.memberaffiliation);
                me.otheraffiliation(person.otheraffiliation);
                me.directoryListingTypeId(person.directorylistingtypeid);
                me.lastUpdate(person.lastUpdate);
                me.personId(person.personId);
                me.organization(person.organization);
                var affiliationItem = me.getAffiliationItem(person.affiliationcode);
                me.selectedAffiliation(affiliationItem);
                affiliationItem = me.getAffiliationItem(person.memberaffiliation);
                me.selectedMembershipAffiliation(affiliationItem);
                var directoryListingItem = me.getDirectoryListingItem();
                me.selectedDirectoryListingType(directoryListingItem);
                me.setMembershipType();
            };
            _this.updateScymPerson = function (person) {
                var me = _this;
                person.active = me.active();
                var affiliation = me.selectedAffiliation();
                if (affiliation) {
                    me.affiliationcode(affiliation.Value);
                }
                person.affiliationcode = me.affiliationcode();
                affiliation = me.selectedMembershipAffiliation();
                var membershipAffiliationCode = affiliation ? affiliation.Value : 'NONE';
                if (affiliation) {
                    me.memberaffiliation(membershipAffiliationCode);
                }
                person.memberaffiliation = membershipAffiliationCode;
                var listingType = me.selectedDirectoryListingType();
                if (listingType) {
                    var listingCode = listingType.Value ? Number(listingType.Value) : 0;
                    me.directoryListingTypeId(listingCode);
                }
                person.directorylistingtypeid = me.directoryListingTypeId();
                person.personId = me.personId();
                person.dateOfBirth = me.dateOfBirth();
                if (person.dateOfBirth) {
                    me.junior(0);
                }
                person.junior = me.junior();
                person.email = me.email();
                person.firstName = me.firstName();
                person.lastName = me.lastName();
                person.middleName = me.middleName();
                person.newsletter = me.newsletter();
                person.notes = me.notes();
                person.otheraffiliation = me.otheraffiliation();
                person.phone = me.phone();
                person.phone2 = me.phone2();
                person.sortkey = me.sortkey();
                person.username = me.username();
                person.organization = me.organization();
            };
            _this.validate = function () {
                var me = _this;
                me.clearValidations();
                var valid = true;
                var value = me.firstName();
                if (!value) {
                    me.firstNameError(": Please enter the first name");
                    valid = false;
                }
                value = me.lastName();
                if (!value) {
                    me.lastNameError(": Please enter the last name");
                    valid = false;
                }
                value = me.email();
                if (value) {
                    var emailOk = Tops.Peanut.ValidateEmail(value);
                    if (!emailOk) {
                        me.emailError(': Please enter a valid email address.');
                        valid = false;
                    }
                }
                value = me.affiliationcode();
                if (!value) {
                    me.affiliationError(': Please select the attended meeting, or "None".');
                    valid = false;
                }
                me.hasErrors(!valid);
                return valid;
            };
            _this.fullName = function () {
                var me = _this;
                var first = _this.firstName();
                var middle = _this.middleName();
                var last = _this.lastName();
                return personObservable.makeFullName(first, middle, last);
            };
            var me = _this;
            me.affiliation = ko.computed(me.computeAffiliation);
            me.membership = ko.computed(me.computeMembership);
            me.hasAffiliation = ko.computed(me.computeHasAffiliation);
            me.hasMembership = ko.computed(me.computeHasMembership);
            me.emailLink = ko.computed(me.computeEmailLink);
            me.selectedAffiliation.subscribe(me.onAffiliationCodeSelected);
            me.selectedMembershipAffiliation.subscribe(me.onMemberAffiliationSelected);
            me.membershipType.subscribe(me.onMembershiptypeChanged);
            return _this;
        }
        personObservable.prototype.setMembershipAffiliation = function (value) {
            var me = this;
            me.ignoreTriggers = true;
            var item = me.getAffiliationItem(value);
            me.selectedMembershipAffiliation(item);
            me.memberaffiliation(value);
            me.ignoreTriggers = false;
        };
        personObservable.prototype.getMembershipType = function () {
            var me = this;
            var attender = me.affiliationcode();
            var member = me.memberaffiliation();
            if (member == 'OTHER' || attender == 'OTHER') {
                me.showOutsideMeeting(true);
                return 'other';
            }
            me.showOutsideMeeting(false);
            if (attender == 'NONE' || attender == '') {
                return '';
            }
            if (member == 'NONE' || member == '') {
                return 'attender';
            }
            if (member == attender) {
                return 'member';
            }
            return 'other';
        };
        personObservable.prototype.clear = function () {
            var me = this;
            me.isAssigned = false;
            me.clearValidations();
            me.firstName('');
            me.middleName('');
            me.lastName('');
            me.username('');
            me.phone('');
            me.phone2('');
            me.email('');
            me.newsletter(0);
            me.dateOfBirth('');
            me.notes('');
            me.junior(0);
            me.active(1);
            me.sortkey('');
            me.affiliationcode('');
            me.memberaffiliation('');
            me.otheraffiliation('');
            me.directoryListingTypeId = ko.observable(1);
            me.lastUpdate('');
            me.personId('');
            me.organization('');
            me.selectedAffiliation(null);
            me.selectedMembershipAffiliation(null);
            me.membershipType('');
        };
        personObservable.prototype.clearValidations = function () {
            var me = this;
            me.firstNameError('');
            me.lastNameError('');
            me.emailError('');
            me.affiliationError('');
            me.hasErrors(false);
        };
        personObservable.makeFullName = function (first, middle, last) {
            var result = first.trim();
            if (middle) {
                result = result + ' ' + middle.trim();
            }
            if (last) {
                result = result + ' ' + last.trim();
            }
            return result;
        };
        return personObservable;
    }(directoryEditPanel));
    Tops.personObservable = personObservable;
    var addressObservable = (function (_super) {
        __extends(addressObservable, _super);
        function addressObservable() {
            var _this = _super.call(this) || this;
            _this.addressId = ko.observable();
            _this.addressname = ko.observable('');
            _this.address1 = ko.observable('');
            _this.address2 = ko.observable('');
            _this.addressTypeId = ko.observable(1);
            _this.city = ko.observable('');
            _this.state = ko.observable('');
            _this.postalcode = ko.observable('');
            _this.country = ko.observable('');
            _this.phone = ko.observable('');
            _this.notes = ko.observable('');
            _this.active = ko.observable(1);
            _this.sortkey = ko.observable('');
            _this.lastUpdate = ko.observable('');
            _this.newsletter = ko.observable(0);
            _this.addressNameError = ko.observable('');
            _this.computeCityLocation = function () {
                var me = _this;
                var city = me.city();
                var state = me.state();
                var zip = me.postalcode();
                var result = city ? city : '';
                if (result) {
                    if (state) {
                        result = result + ', ';
                    }
                }
                if (state) {
                    result = result + state;
                }
                if (zip) {
                    result = result + ' ' + zip;
                }
                return result;
            };
            _this.validate = function () {
                var me = _this;
                me.clearValidations();
                var valid = true;
                var value = me.addressname();
                if (!value) {
                    me.addressNameError(": Please enter a name for the address");
                    me.hasErrors(true);
                    return false;
                }
                return true;
            };
            _this.assign = function (address) {
                var me = _this;
                me.isAssigned = true;
                me.clearValidations();
                me.addressname(address.addressname);
                me.address1(address.address1);
                me.address2(address.address2);
                me.city(address.city);
                me.state(address.state);
                me.postalcode(address.postalcode);
                me.country(address.country);
                me.phone(address.phone);
                me.notes(address.notes);
                me.active(address.active);
                me.sortkey(address.sortkey);
                me.lastUpdate(address.lastUpdate);
                me.addressId(address.addressId);
                me.newsletter(address.newsletter);
                me.addressTypeId(address.addressTypeId);
                me.directoryListingTypeId(address.directorylistingtypeid);
                var directoryListingItem = me.getDirectoryListingItem();
                me.selectedDirectoryListingType(directoryListingItem);
            };
            var me = _this;
            me.cityLocation = ko.computed(me.computeCityLocation);
            return _this;
        }
        addressObservable.prototype.search = function () {
            var me = this;
            me.viewState('search');
        };
        addressObservable.prototype.clear = function () {
            var me = this;
            me.isAssigned = false;
            me.clearValidations();
            me.addressname('');
            me.address1('');
            me.address2('');
            me.city('');
            me.state('');
            me.postalcode('');
            me.country('');
            me.phone('');
            me.notes('');
            me.active(1);
            me.newsletter(0);
            me.sortkey('');
            me.lastUpdate('');
            me.addressId(null);
            me.addressTypeId(1);
            me.directoryListingTypeId(1);
        };
        addressObservable.prototype.clearValidations = function () {
            var me = this;
            me.hasErrors(false);
            me.addressNameError('');
        };
        addressObservable.prototype.updateScymAddress = function (address) {
            var me = this;
            address.address1 = me.address1();
            address.address2 = me.address2();
            address.addressname = me.addressname();
            address.city = me.city();
            address.state = me.state();
            address.postalcode = me.postalcode();
            address.country = me.country();
            address.phone = me.phone();
            address.notes = me.notes();
            address.active = me.active();
            address.sortkey = me.sortkey();
            address.newsletter = me.newsletter();
            address.addressTypeId = me.addressTypeId();
            var listingType = me.selectedDirectoryListingType();
            if (listingType) {
                var listingCode = listingType.Value ? Number(listingType.Value) : 0;
                me.directoryListingTypeId(listingCode);
            }
            address.directorylistingtypeid = me.directoryListingTypeId();
        };
        return addressObservable;
    }(directoryEditPanel));
    Tops.addressObservable = addressObservable;
    var ScymDirectoryViewModel = (function () {
        function ScymDirectoryViewModel() {
            var _this = this;
            this.family = new clientFamily();
            this.insertAssociation = 'none';
            this.personUpdateOperation = 'update';
            this.searchValue = ko.observable('');
            this.searchType = ko.observable('');
            this.personForm = new personObservable();
            this.addressForm = new addressObservable();
            this.familiesList = new Tops.searchListObservable(6, 10);
            this.personsList = new Tops.searchListObservable(2, 12);
            this.addressesList = new Tops.searchListObservable(2, 12);
            this.addressPersonsList = ko.observableArray();
            this.userCanEdit = ko.observable(true);
            this.debugMode = ko.observable(false);
            this.userIsAuthorized = ko.observable(false);
            this.computeShowPersonViewButtons = function () {
                var me = _this;
                return (me.userCanEdit() && (me.addressForm.viewState() == 'view' || me.addressForm.viewState() == 'empty'));
            };
            this.computeShowAddPersonButton = function () {
                var me = _this;
                return (me.family.personCount() < 2 &&
                    (me.userCanEdit() && (me.personForm.viewState() == 'view' || me.personForm.viewState() == 'empty')));
            };
            this.computeShowEditButton = function () {
                var me = _this;
                return me.userCanEdit() && (me.personForm.viewState() == 'view' || me.personForm.viewState() == 'empty');
            };
            this.handleInitializationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.userCanEdit(response.canEdit);
                    me.personForm.affiliations(response.affiliationCodes);
                    me.personForm.directoryListingTypes(response.directoryListingTypes);
                    me.addressForm.directoryListingTypes(response.directoryListingTypes);
                    me.userIsAuthorized(true);
                    if (response.family) {
                        me.searchType('Persons');
                        me.selectFamily(response.family);
                    }
                }
                else {
                    me.userCanEdit(false);
                }
            };
            this.computePersonFormHeader = function () {
                var me = _this;
                var name = me.personForm.fullName();
                return name ? name : 'Person';
            };
            this.handleFindFamiliesResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.familiesList.setList(list);
                    me.familiesList.searchValue('');
                }
            };
            this.showPersonSearchResults = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = serviceResponse.Value;
                    me.personsList.setList(list);
                }
            };
            this.showAddressSearchResults = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var list = [];
                    if (me.family.address) {
                        var removeItem = new Tops.KeyValueDTO();
                        removeItem.Name = '(No address)';
                        removeItem.Value = null;
                        list.push(removeItem);
                        list = list.concat(serviceResponse.Value);
                    }
                    else {
                        list = serviceResponse.Value;
                    }
                    me.addressesList.setList(list);
                }
            };
            this.addPersonToAddress = function (personItem) {
                var me = _this;
                if (me.family.address == null) {
                    return;
                }
                var request = new addressPersonServiceRequest();
                request.addressId = me.family.address.addressId;
                request.personId = personItem.Value;
                me.application.hideServiceMessages();
                me.application.showWaiter('Updating...');
                me.peanut.executeService('directory.AddPersonToAddress', request, me.handleAddPersonToAddressResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleAddPersonToAddressResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var person = serviceResponse.Value;
                    me.personsList.reset();
                    me.family.addPersonToList(person);
                    me.buildPersonSelectList(person);
                    me.personForm.assign(person);
                    me.personForm.view();
                }
            };
            this.assignAddressToPerson = function (addressItem) {
                var me = _this;
                var request = new addressPersonServiceRequest();
                request.addressId = addressItem.Value;
                request.personId = me.family.selectedPersonId;
                me.application.hideServiceMessages();
                me.application.showWaiter('Updating...');
                me.peanut.executeService('directory.ChangePersonAddress', request, me.handleChangePersonAddress)
                    .always(function () {
                    me.application.hideWaiter();
                });
                me.addressesList.reset();
                me.addressForm.view();
            };
            this.handleChangePersonAddress = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var family = serviceResponse.Value;
                    var currentPersonId = family.selectedPersonId;
                    me.addressesList.reset();
                    var selected = me.family.setFamily(family);
                    me.refreshFamilyForms(selected);
                }
            };
            this.selectFamily = function (family) {
                var me = _this;
                me.addressPersonsList([]);
                var selected = me.family.setFamily(family);
                me.refreshFamilyForms(selected);
            };
            this.handleFamilyResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var family = serviceResponse.Value;
                    me.selectFamily(family);
                }
            };
            this.handleUpdateFamilyResponse = function (serviceResponse) {
                var me = _this;
                me.addressPersonsList([]);
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var family = serviceResponse.Value;
                    var selected = me.family.setFamily(family);
                    me.refreshFamilyForms(selected);
                }
            };
            this.displayFamily = function (item) {
                var me = _this;
                me.family.visible(false);
                me.familiesList.reset();
                me.personForm.clear();
                me.personForm.close();
                me.addressForm.clear();
                me.addressForm.close();
                me.addressPersonsList([]);
                var request = new Tops.KeyValueDTO();
                request.Name = me.searchType();
                request.Value = item.Value;
                me.application.hideServiceMessages();
                me.application.showWaiter('Locating family...');
                me.peanut.executeService('directory.GetFamily', request, me.handleFamilyResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.selectPerson = function (item) {
                var me = _this;
                if (item.Value == 'new') {
                    me.personForm.search();
                }
                else {
                    var selected = me.family.selectPerson(item.Value);
                    if (selected) {
                        me.buildPersonSelectList(selected);
                        me.personForm.assign(selected);
                        me.personForm.view();
                    }
                    else {
                        me.personForm.empty();
                    }
                }
            };
            this.handleUpdatePersonResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var person = serviceResponse.Value;
                    me.family.addPersonToList(person);
                    me.personForm.assign(person);
                    me.family.visible(true);
                    me.personForm.view();
                    me.addressForm.view();
                }
            };
            this.handleUpdateAddressResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var address = serviceResponse.Value;
                    var selected = me.family.setAddress(address);
                    me.addressForm.assign(address);
                    me.personForm.view();
                    me.addressForm.view();
                }
            };
            this.newPerson = function () {
                var me = _this;
                me.familiesList.reset();
                me.personForm.clear();
                me.addressForm.clear();
                me.family.empty();
                me.personForm.edit();
                me.addressForm.empty();
                me.family.visible(true);
            };
            this.newAddress = function () {
                var me = _this;
                me.familiesList.reset();
                me.personForm.clear();
                me.addressForm.clear();
                me.family.empty();
                me.addressForm.edit();
                me.personForm.empty();
                me.family.visible(true);
            };
            this.handleRemovePersonResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var selected = me.family.removePerson(me.family.selectedPersonId);
                    me.buildPersonSelectList(selected);
                    if (selected) {
                        me.personForm.assign(selected);
                        me.personForm.view();
                    }
                    else {
                        me.personForm.empty();
                    }
                }
            };
            this.handleClearAddressResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    me.family.clearAddress();
                    me.addressForm.empty();
                    me.personForm.view();
                }
            };
            var me = this;
            Tops.ScymDirectoryViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
            me.personFormHeader = ko.computed(me.computePersonFormHeader);
            me.showEditButton = ko.computed(me.computeShowEditButton);
            me.showAddPersonButton = ko.computed(me.computeShowAddPersonButton);
            me.showPersonViewButtons = ko.computed(me.computeShowPersonViewButtons);
        }
        ScymDirectoryViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            jQuery(function () {
                jQuery(".datepicker").datepicker();
            });
            me.application.initialize(applicationPath, function () {
                me.application.showWaiter('Initializing. Please wait...');
                me.getInitializations(successFunction);
            });
        };
        ScymDirectoryViewModel.prototype.getInitializations = function (doneFunction) {
            var me = this;
            me.application.hideServiceMessages();
            var personId = me.peanut.getRequestParam('pid');
            me.peanut.executeService('directory.InitDirectoryApp', personId, me.handleInitializationResponse)
                .always(function () {
                me.application.hideWaiter();
                if (doneFunction) {
                    doneFunction();
                    jQuery('#scym-directory').show();
                }
            });
        };
        ScymDirectoryViewModel.prototype.findFamiliesByPersonName = function () {
            var me = this;
            me.findFamilies('Persons');
        };
        ScymDirectoryViewModel.prototype.findFamiliesByAddressName = function () {
            var me = this;
            me.findFamilies('Addresses');
        };
        ScymDirectoryViewModel.prototype.findFamilies = function (searchType) {
            var me = this;
            me.searchType(searchType);
            me.family.visible(false);
            var request = new Tops.KeyValueDTO();
            request.Name = searchType;
            request.Value = me.familiesList.searchValue();
            me.application.hideServiceMessages();
            me.application.showWaiter('Searching...');
            me.peanut.executeService('directory.DirectorySearch', request, me.handleFindFamiliesResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        ScymDirectoryViewModel.prototype.findPersonForAddress = function () {
            var me = this;
            me.personsList.reset();
            me.personForm.search();
        };
        ScymDirectoryViewModel.prototype.createPersonForAddress = function () {
            var me = this;
            me.personForm.clear();
            var addressId = me.family.address ? me.family.address.addressId : null;
            me.personForm.edit(addressId);
        };
        ScymDirectoryViewModel.prototype.cancelPersonSearch = function () {
            var me = this;
            me.personsList.reset();
            me.personForm.view();
        };
        ScymDirectoryViewModel.prototype.findPersons = function () {
            var me = this;
            var request = new Tops.KeyValueDTO();
            request.Name = 'Persons';
            request.Value = me.personsList.searchValue();
            me.application.hideServiceMessages();
            me.application.showWaiter('Searching...');
            me.peanut.executeService('directory.DirectorySearch', request, me.showPersonSearchResults)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        ScymDirectoryViewModel.prototype.findAddresses = function () {
            var me = this;
            var request = new Tops.KeyValueDTO();
            request.Name = 'Addresses';
            request.Value = me.addressesList.searchValue();
            me.application.hideServiceMessages();
            me.application.showWaiter('Searching...');
            me.peanut.executeService('directory.DirectorySearch', request, me.showAddressSearchResults)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        ScymDirectoryViewModel.prototype.clearAddressSearchList = function () {
            var me = this;
            var removeItem = new Tops.KeyValueDTO();
            removeItem.Name = '(No address)';
            removeItem.Value = null;
            var list = [];
            if (me.family.address) {
                var removeItem = new Tops.KeyValueDTO();
                removeItem.Name = '(No address)';
                removeItem.Value = null;
                list.push(removeItem);
            }
            me.addressesList.setList(list);
        };
        ScymDirectoryViewModel.prototype.createAddressForPerson = function () {
            var me = this;
            me.addressesList.reset();
            me.addressForm.edit(me.family.selectedPersonId);
        };
        ScymDirectoryViewModel.prototype.cancelAddressSearch = function () {
            var me = this;
            me.addressesList.reset();
            me.addressForm.view();
        };
        ScymDirectoryViewModel.prototype.refreshFamilyForms = function (selected) {
            var me = this;
            if (selected) {
                me.personForm.assign(selected);
                me.personForm.view();
            }
            else {
                me.personForm.empty();
            }
            if (me.family.address) {
                me.addressForm.assign(me.family.address);
                me.buildPersonSelectList(selected);
                me.addressForm.view();
            }
            else {
                me.addressPersonsList([]);
                me.addressForm.empty();
            }
            me.buildPersonSelectList(selected);
            me.family.visible(true);
        };
        ScymDirectoryViewModel.prototype.buildPersonSelectList = function (selected) {
            var me = this;
            me.family.persons.sort(function (x, y) {
                if (x.personId === y.personId) {
                    return 0;
                }
                if (x.sortkey > y.sortkey) {
                    return 1;
                }
                return -1;
            });
            var personList = [];
            if (selected) {
                _.each(me.family.persons, function (person) {
                    if (person.editState != Tops.editState.deleted && person.personId != selected.personId) {
                        var item = new Tops.KeyValueDTO();
                        item.Name = personObservable.makeFullName(person.firstName, person.middleName, person.lastName);
                        item.Value = person.personId.toString();
                        personList.push(item);
                    }
                }, selected);
                if (me.userCanEdit()) {
                    var newPersonItem = new Tops.KeyValueDTO();
                    newPersonItem.Value = 'new';
                    newPersonItem.Name = 'Find or create new person';
                    personList.push(newPersonItem);
                }
            }
            me.addressPersonsList(personList);
        };
        ScymDirectoryViewModel.prototype.editPerson = function () {
            var me = this;
            var addressFormState = me.addressForm.viewState();
            var personFormState = me.personForm.viewState();
            me.personForm.edit();
        };
        ScymDirectoryViewModel.prototype.movePerson = function () {
            var me = this;
            me.addressesList.reset();
            me.clearAddressSearchList();
            me.addressForm.search();
        };
        ScymDirectoryViewModel.prototype.editAddress = function () {
            var me = this;
            me.addressForm.edit();
        };
        ScymDirectoryViewModel.prototype.cancelAddressEdit = function () {
            var me = this;
            if (me.family.isLoaded()) {
                me.addressForm.assign(me.family.address);
                me.addressForm.view();
            }
            else {
                me.family.visible(false);
                me.addressForm.clear();
            }
        };
        ScymDirectoryViewModel.prototype.cancelPersonEdit = function () {
            var me = this;
            if (me.family.isLoaded()) {
                var selected = me.family.getSelected();
                me.personForm.assign(selected);
                me.personForm.view();
            }
            else {
                me.family.visible(false);
                me.personForm.clear();
            }
        };
        ScymDirectoryViewModel.prototype.savePerson = function () {
            var me = this;
            if (!me.personForm.validate()) {
                return;
            }
            var person = null;
            var updateMessage = 'Updating person...';
            var personId = me.personForm.personId();
            if (!personId) {
                person = new scymPerson();
                person.editState = Tops.editState.created;
            }
            else {
                person = me.family.getPersonById(personId);
                person.editState = Tops.editState.updated;
            }
            me.personForm.updateScymPerson(person);
            if (person.editState == Tops.editState.created && me.personForm.relationId) {
                var request = new newPersonForAddressRequest();
                request.person = person;
                request.addressId = me.family.address ? me.family.address.addressId : null;
                me.application.showWaiter("Adding new person to address ...");
                me.peanut.executeService('directory.NewPersonForAddress', request, me.handleAddPersonToAddressResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
            else {
                var updateMessage = person.editState == Tops.editState.created ? 'Adding person ...' : 'Updating person...';
                me.application.showWaiter(updateMessage);
                me.peanut.executeService('directory.UpdatePerson', person, me.handleUpdatePersonResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        ScymDirectoryViewModel.prototype.saveAddress = function () {
            var me = this;
            if (!me.addressForm.validate()) {
                return;
            }
            var address = null;
            var addressId = me.addressForm.addressId();
            if (!addressId) {
                address = new scymAddress();
                address.editState = Tops.editState.created;
            }
            else {
                address = me.family.address;
                address.editState = Tops.editState.updated;
            }
            me.addressForm.updateScymAddress(address);
            if (address.editState == Tops.editState.created && me.addressForm.relationId) {
                var request = new newAddressForPersonRequest();
                request.address = address;
                request.personId = me.family.selectedPersonId;
                me.application.showWaiter("Adding new address for person ...");
                me.peanut.executeService('directory.NewAddressForPerson', request, me.handleChangePersonAddress)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
            else {
                var updateMessage = address.editState == Tops.editState.created ? 'Adding address ...' : 'Updating address...';
                me.application.showWaiter(updateMessage);
                me.peanut.executeService('directory.UpdateAddress', address, me.handleUpdateAddressResponse)
                    .always(function () {
                    me.application.hideWaiter();
                });
            }
        };
        ScymDirectoryViewModel.prototype.createSelectedPersonRequest = function () {
            var me = this;
            var request = new addressPersonServiceRequest();
            request.personId = me.family.selectedPersonId;
            request.addressId = me.family.address ? me.family.address.addressId : 0;
            return request;
        };
        ScymDirectoryViewModel.prototype.deletePerson = function () {
            var me = this;
            me.showPersonDeleteConfirmForm();
        };
        ScymDirectoryViewModel.prototype.hidePersonDeleteConfirmForm = function () {
            jQuery("#confirm-delete-person-modal").modal('hide');
        };
        ScymDirectoryViewModel.prototype.showPersonDeleteConfirmForm = function () {
            var me = this;
            jQuery("#confirm-delete-person-modal").modal('show');
        };
        ScymDirectoryViewModel.prototype.hideAddressDeleteConfirmForm = function () {
            jQuery("#confirm-delete-address-modal").modal('hide');
        };
        ScymDirectoryViewModel.prototype.showAddressDeleteConfirmForm = function () {
            var me = this;
            jQuery("#confirm-delete-address-modal").modal('show');
        };
        ScymDirectoryViewModel.prototype.executeDeletePerson = function () {
            var me = this;
            me.hidePersonDeleteConfirmForm();
            var request = me.family.selectedPersonId;
            me.application.hideServiceMessages();
            me.application.showWaiter('Delete person...');
            me.peanut.executeService('directory.DeletePerson', request, me.handleRemovePersonResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        ScymDirectoryViewModel.prototype.deleteAddress = function () {
            var me = this;
            me.showAddressDeleteConfirmForm();
        };
        ScymDirectoryViewModel.prototype.executeDeleteAddress = function () {
            var me = this;
            me.hideAddressDeleteConfirmForm();
            var addressId = me.family.address ? me.family.address.addressId : 0;
            if (!addressId) {
                return;
            }
            var request = addressId;
            me.application.hideServiceMessages();
            me.application.showWaiter('Deleting address...');
            me.peanut.executeService('directory.DeleteAddress', request, me.handleClearAddressResponse)
                .always(function () {
                me.application.hideWaiter();
            });
        };
        return ScymDirectoryViewModel;
    }());
    Tops.ScymDirectoryViewModel = ScymDirectoryViewModel;
})(Tops || (Tops = {}));
Tops.ScymDirectoryViewModel.instance = new Tops.ScymDirectoryViewModel();
window.ViewModel = Tops.ScymDirectoryViewModel.instance;
//# sourceMappingURL=ScymDirectoryViewModel.js.map