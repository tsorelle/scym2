var Tops;
(function (Tops) {
    var scymMeeting = (function () {
        function scymMeeting() {
            this.meetingId = null;
            this.meetingName = '';
            this.state = '';
            this.area = '';
            this.address = '';
            this.affiliationCode = '';
            this.worshipTimes = '';
            this.worshipLocation = '';
            this.url = '';
            this.detailText = '';
            this.note = '';
            this.latitude = null;
            this.longitude = null;
            this.lastUpdate = '';
            this.active = 1;
            this.updatedBy = '';
            this.quarterlyMeetingId = null;
            this.quarterlyMeetingName = '';
            this.mailFormLink = '';
            this.email = '';
            this.editState = Tops.editState.created;
        }
        return scymMeeting;
    }());
    Tops.scymMeeting = scymMeeting;
    var scymQuarterlyMeeting = (function () {
        function scymQuarterlyMeeting() {
            this.quarterlyMeetingId = 0;
            this.quarterlyMeetingName = '';
            this.description = '';
            this.lastUpdate = '';
            this.active = 1;
            this.updatedBy = '';
            this.editState = Tops.editState.created;
        }
        return scymQuarterlyMeeting;
    }());
    Tops.scymQuarterlyMeeting = scymQuarterlyMeeting;
    var meetingObservable = (function () {
        function meetingObservable() {
            var _this = this;
            this.active = ko.observable(true);
            this.meetingId = ko.observable();
            this.meetingName = ko.observable('');
            this.state = ko.observable('');
            this.area = ko.observable('');
            this.address = ko.observable('');
            this.affiliationCode = ko.observable('');
            this.worshipTimes = ko.observable('');
            this.worshipLocation = ko.observable('');
            this.url = ko.observable('');
            this.detailText = ko.observable('');
            this.note = ko.observable('');
            this.latitude = ko.observable();
            this.longitude = ko.observable();
            this.lastUpdate = ko.observable('');
            this.updatedBy = ko.observable('');
            this.viewState = ko.observable('view');
            this.hasMailbox = ko.observable(false);
            this.email = ko.observable('');
            this.quarterlyMeeting = ko.observable(null);
            this.states = ko.observableArray([]);
            this.hasErrors = ko.observable(false);
            this.meetingNameError = ko.observable('');
            this.affiliationCodeError = ko.observable('');
            this.emailError = ko.observable('');
            this.areaError = ko.observable('');
            this.validate = function (meetings) {
                var me = _this;
                me.clearErrors();
                var valid = true;
                var value = me.meetingName();
                if (!value) {
                    me.meetingNameError(": Please enter the name of the meeting.");
                    valid = false;
                }
                value = me.area();
                if (!value) {
                    me.areaError(": Please city or area where the meeting is located.");
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
                value = me.affiliationCode();
                if (value) {
                    value = value.toLowerCase();
                    var meeting = _.find(meetings, function (m) {
                        var code = m.affiliationCode;
                        if (code) {
                            return code.toLowerCase() == value;
                        }
                    }, me);
                    if (meeting && (meeting.meetingId != me.meetingId())) {
                        me.affiliationCodeError('Affiliation codes must be unique. Another meeting uses this one.');
                        valid = false;
                    }
                }
                else {
                    me.affiliationCodeError(': a four or five letter affiliation code is required.');
                    valid = false;
                }
                me.hasErrors(!valid);
                return valid;
            };
        }
        meetingObservable.prototype.clearErrors = function () {
            var me = this;
            me.meetingNameError('');
            me.emailError('');
            me.areaError('');
            me.affiliationCodeError('');
            me.hasErrors(false);
        };
        meetingObservable.prototype.clear = function () {
            var me = this;
            me.active(true);
            me.meetingId(null);
            me.meetingName('');
            me.affiliationCode('');
            me.address('');
            me.area('');
            me.state('');
            me.worshipLocation('');
            me.worshipTimes('');
            me.quarterlyMeeting(null);
            me.detailText('');
            me.note('');
            me.lastUpdate('');
            me.updatedBy('');
            me.url('');
            me.hasMailbox(false);
            me.email('');
            me.latitude(null);
            me.longitude(null);
            me.clearErrors();
        };
        meetingObservable.prototype.assign = function (meeting) {
            var me = this;
            me.meetingId(meeting.meetingId);
            me.affiliationCode(meeting.affiliationCode);
            me.address(meeting.address);
            me.area(meeting.area);
            me.detailText(meeting.detailText);
            me.lastUpdate(meeting.lastUpdate);
            me.latitude(meeting.latitude);
            me.longitude(meeting.longitude);
            me.meetingName(meeting.meetingName);
            me.note(meeting.note);
            me.state(meeting.state);
            me.updatedBy(meeting.updatedBy);
            me.url(meeting.url);
            me.worshipLocation(meeting.worshipLocation);
            me.worshipTimes(meeting.worshipTimes);
            me.hasMailbox(meeting.mailFormLink ? true : false);
            me.active(meeting.active ? true : false);
            me.email(meeting.email);
            if (meeting.quarterlyMeetingId) {
                me.quarterlyMeeting({
                    Text: meeting.quarterlyMeetingName,
                    Value: meeting.quarterlyMeetingId,
                    Description: ''
                });
            }
            else {
                me.quarterlyMeeting(null);
            }
            me.clearErrors();
        };
        meetingObservable.prototype.update = function (meeting) {
            var me = this;
            meeting.active = me.active() ? 1 : 0;
            meeting.affiliationCode = me.affiliationCode();
            meeting.address = me.address();
            meeting.area = me.area();
            meeting.detailText = me.detailText();
            meeting.latitude = me.latitude();
            meeting.longitude = me.longitude();
            meeting.meetingName = me.meetingName();
            meeting.note = me.note();
            meeting.state = me.state();
            meeting.url = me.url();
            meeting.worshipLocation = me.worshipLocation();
            meeting.worshipTimes = me.worshipTimes();
            meeting.email = me.email();
            var quarterly = me.quarterlyMeeting();
            meeting.quarterlyMeetingId = (quarterly) ? quarterly.Value : null;
            meeting.editState = me.meetingId() ? Tops.editState.updated : Tops.editState.created;
        };
        return meetingObservable;
    }());
    Tops.meetingObservable = meetingObservable;
    var MeetingsViewModel = (function () {
        function MeetingsViewModel() {
            var _this = this;
            this.mapApiInitialized = false;
            this.meetings = [];
            this.meetingsColumn1 = ko.observableArray();
            this.meetingsColumn2 = ko.observableArray();
            this.quarterlies = ko.observableArray();
            this.states = ko.observableArray();
            this.meetingForm = new meetingObservable();
            this.userCanEdit = ko.observable(false);
            this.quarterlyMeetingFilter = ko.observable();
            this.statesFilter = ko.observable();
            this.activeFilter = ko.observable(true);
            this.filterOn = false;
            this.filterType = null;
            this.filterValue = null;
            this.showActiveOnly = true;
            this.initMap = function () {
                var me = _this;
                me.mapApiInitialized = true;
            };
            this.handleInitializationResponse = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var response = serviceResponse.Value;
                    me.meetings = response.meetings;
                    me.quarterlies(response.quarterlies);
                    me.states(['Arkansas', 'Missouri', 'Louisiana', 'Oklahoma', 'Texas', 'Four-states area (TX,AR,OK,LA)']);
                    me.quarterlyMeetingFilter.subscribe(me.applyQuarterlyFilter);
                    me.statesFilter.subscribe(me.applyStatesFilter);
                    me.activeFilter.subscribe(me.applyActiveFilter);
                    me.userCanEdit(response.canEdit);
                    me.filterType = '';
                    me.filterValue = null;
                    me.filterOn = true;
                    me.showActiveOnly = true;
                    me.filterActiveOnly();
                }
                else {
                }
            };
            this.applyStatesFilter = function (state) {
                var me = _this;
                if (me.filterOn) {
                    me.filterOn = false;
                    me.quarterlyMeetingFilter(null);
                    me.filterOn = true;
                    if (state) {
                        me.filterType = 'state';
                        me.filterValue = state;
                        me.filterByState();
                    }
                    else {
                        me.filterActiveOnly();
                    }
                }
            };
            this.applyQuarterlyFilter = function (quarterly) {
                var me = _this;
                if (me.filterOn) {
                    me.filterOn = false;
                    me.statesFilter(null);
                    me.filterOn = true;
                    if (quarterly) {
                        me.filterType = 'quarterly';
                        me.filterValue = quarterly.Value;
                        me.filterByQuarterly();
                    }
                    else {
                        me.filterActiveOnly();
                    }
                }
            };
            this.applyActiveFilter = function (filtered) {
                var me = _this;
                me.showActiveOnly = filtered;
                if (me.filterType == 'quarterly') {
                    me.filterByQuarterly();
                }
                else if (me.filterType == 'state') {
                    me.filterByState();
                }
                else {
                    me.filterActiveOnly();
                }
            };
            this.createMeeting = function () {
                var me = _this;
                me.selectedMeeting = new scymMeeting();
                me.selectedMeeting.editState = Tops.editState.created;
                me.selectedMeeting.meetingId = 0;
                me.meetingForm.assign(me.selectedMeeting);
                me.meetingForm.viewState('edit');
                me.showForm();
            };
            this.showMeetingForm = function (meeting) {
                var me = _this;
                me.selectedMeeting = meeting;
                me.meetingForm.assign(meeting);
                me.meetingForm.viewState('view');
                me.showForm();
            };
            this.editMeeting = function () {
                var me = _this;
                me.meetingForm.viewState('edit');
            };
            this.cancelEdit = function () {
                var me = _this;
                if (me.meetingForm.meetingId()) {
                    me.meetingForm.assign(me.selectedMeeting);
                    me.meetingForm.viewState('view');
                }
                else {
                    me.hideForm();
                }
            };
            this.updateMeeting = function () {
                var me = _this;
                if (me.meetingForm.validate(me.meetings)) {
                    var meeting = me.selectedMeeting;
                    me.meetingForm.update(meeting);
                    var address = (meeting.address) ? meeting.address : meeting.area;
                    if (!address) {
                        meeting.latitude = null;
                        meeting.longitude = null;
                        me.executeMeetingUpdate(meeting);
                    }
                    else {
                        var geoCoder = new google.maps.Geocoder();
                        geoCoder.geocode({ 'address': address }, function (results, status) {
                            if (status == google.maps.GeocoderStatus.OK) {
                                var location = results[0].geometry.location;
                                meeting.latitude = location.lat();
                                meeting.longitude = location.lng();
                            }
                            else {
                                meeting.latitude = null;
                                meeting.longitude = null;
                            }
                            me.executeMeetingUpdate(meeting);
                        });
                    }
                }
            };
            this.executeMeetingUpdate = function (meeting) {
                var me = _this;
                me.hideForm();
                me.application.hideServiceMessages();
                me.application.showWaiter('Updating meeting...');
                me.peanut.executeService('meetings.UpdateMeeting', meeting, me.handleMeetingUpdate)
                    .always(function () {
                    me.application.hideWaiter();
                });
            };
            this.handleMeetingUpdate = function (serviceResponse) {
                var me = _this;
                if (serviceResponse.Result == Tops.Peanut.serviceResultSuccess) {
                    var updated = serviceResponse.Value;
                    var currentIndex = _.findIndex(me.meetings, function (meeting) {
                        return meeting.meetingId == updated.meetingId;
                    }, me);
                    if (currentIndex) {
                        me.meetings[currentIndex] = updated;
                    }
                    else {
                        me.meetings.push(updated);
                    }
                    me.reapplyFilters();
                }
            };
            var me = this;
            Tops.MeetingsViewModel.instance = me;
            me.application = new Tops.Application(me);
            me.peanut = me.application.peanut;
        }
        MeetingsViewModel.prototype.init = function (applicationPath, successFunction) {
            var me = this;
            me.application.initialize(applicationPath, function () {
                me.application.showWaiter('Initializing. Please wait...');
                me.getInitializations(successFunction);
            });
        };
        MeetingsViewModel.prototype.getInitializations = function (doneFunction) {
            var me = this;
            me.application.hideServiceMessages();
            me.peanut.executeService('meetings.InitMeetingsApp', '', me.handleInitializationResponse)
                .always(function () {
                me.application.hideWaiter();
                if (doneFunction) {
                    doneFunction();
                    jQuery('#meetings-application-container').show();
                }
            });
        };
        MeetingsViewModel.prototype.reapplyFilters = function () {
            var me = this;
            if (me.filterType == 'quarterly') {
                me.filterByQuarterly();
            }
            else if (me.filterType == 'state') {
                me.filterByState();
            }
            else {
                me.filterActiveOnly();
            }
        };
        MeetingsViewModel.prototype.filterByQuarterly = function () {
            var me = this;
            me.filterType = 'quarterly';
            var meetingList = _.filter(me.meetings, function (meeting) {
                var meetingActive = meeting.active ? true : false;
                return (meeting.quarterlyMeetingId == me.filterValue && (meetingActive || me.showActiveOnly === false));
            }, me);
            me.loadColumns(meetingList);
        };
        MeetingsViewModel.prototype.filterByState = function () {
            var me = this;
            me.filterType = 'state';
            var meetingList = _.filter(me.meetings, function (meeting) {
                var meetingActive = meeting.active ? true : false;
                return (meeting.state == me.filterValue && (meetingActive || me.showActiveOnly === false));
            }, me);
            me.loadColumns(meetingList);
        };
        MeetingsViewModel.prototype.filterActiveOnly = function () {
            var me = this;
            me.filterType = '';
            var meetingList = _.filter(me.meetings, function (meeting) {
                var meetingActive = meeting.active ? true : false;
                return (meetingActive || me.showActiveOnly === false);
            }, me);
            me.loadColumns(meetingList);
        };
        MeetingsViewModel.prototype.loadColumns = function (meetingsList) {
            var me = this;
            var count = meetingsList.length;
            var meetings = [];
            var half = Math.ceil(count / 2) - 1;
            for (var i = 0; i < count; i++) {
                var meeting = meetingsList[i];
                meetings.push(meeting);
                if (i == half) {
                    me.meetingsColumn1(meetings);
                    meetings = [];
                }
            }
            me.meetingsColumn2(meetings);
        };
        MeetingsViewModel.prototype.getQuarterlyMeetingById = function (quarterlyId, quarters) {
            var me = this;
            var result = _.find(quarters, function (quarter) {
                return quarter.Value == quarterlyId;
            }, me);
            return result;
        };
        MeetingsViewModel.prototype.hideForm = function () {
            jQuery("#meeting-detail-modal").modal('hide');
        };
        MeetingsViewModel.prototype.showForm = function () {
            jQuery("#meeting-detail-modal").modal('show');
        };
        return MeetingsViewModel;
    }());
    Tops.MeetingsViewModel = MeetingsViewModel;
})(Tops || (Tops = {}));
Tops.MeetingsViewModel.instance = new Tops.MeetingsViewModel();
window.ViewModel = Tops.MeetingsViewModel.instance;
//# sourceMappingURL=MeetingsViewModel.js.map