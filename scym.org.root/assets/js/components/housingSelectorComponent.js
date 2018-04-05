var Tops;
(function (Tops) {
    var housingSelectorComponent = (function () {
        function housingSelectorComponent(params) {
            var _this = this;
            this.housingUnits = ko.observableArray();
            this.selectedUnit = ko.observable();
            this.selectedType = ko.observable();
            this.dayName = ko.observable();
            this.motelOccupancy = '';
            this.occupancy = ko.observable();
            this.attenderId = 0;
            this.note = ko.observable();
            this.onTypeChange = function (selected) {
                var me = _this;
                var id = 0;
                if (selected) {
                    id = selected.Key;
                    if (selected.category == 3) {
                        me.occupancy(me.motelOccupancy);
                    }
                    else {
                        me.occupancy('');
                    }
                }
                me.filterHousingUnitList(id);
            };
            this.onUnitChange = function (selected) {
                var me = _this;
                if (selected) {
                    me.assignment.housingUnitId = selected.housingUnitId;
                }
                else {
                    me.assignment.housingUnitId = 0;
                }
                me.owner.updateAssignment(me.attenderId, me.assignment);
            };
            this.onNoteChange = function (note) {
                var me = _this;
                me.assignment.note = note;
                me.owner.updateAssignment(me.attenderId, me.assignment);
            };
            var me = this;
            me.owner = params.owner;
            var attender = params.attender;
            me.assignment = params.assignment;
            me.attenderId = attender.attenderId;
            me.day = me.assignment.day;
            switch (me.assignment.day) {
                case 4:
                    me.dayName('Thursday');
                    break;
                case 5:
                    me.dayName('Friday');
                    break;
                case 6:
                    me.dayName('Saturday');
                    break;
                case 7:
                    me.dayName('Sunday');
                    break;
                default:
                    me.dayName('');
                    break;
            }
            me.note(me.assignment.note);
            me.housingTypes = me.owner.housingTypes;
            var housingUnitList = me.owner.getHousingUnitList(0, me.day);
            var unit = me.owner.getHousingUnit(me.assignment.housingUnitId, housingUnitList);
            var typeId = attender.housingPreference;
            if (unit != null && (unit.housingTypeId)) {
                typeId = unit.housingTypeId;
            }
            me.filterHousingUnitList(typeId);
            var type = me.owner.getHousingType(typeId);
            me.motelOccupancy = attender.occupancy;
            if (type.category == 3) {
                me.occupancy(me.motelOccupancy);
            }
            me.selectedType(type);
            me.selectedUnit(unit);
            me.selectedType.subscribe(me.onTypeChange);
            me.selectedUnit.subscribe(me.onUnitChange);
            me.note.subscribe(me.onNoteChange);
        }
        housingSelectorComponent.prototype.filterHousingUnitList = function (typeId) {
            var me = this;
            var filtered = me.owner.getHousingUnitList(typeId, me.day);
            me.housingUnits(filtered);
            me.selectedUnit(null);
        };
        return housingSelectorComponent;
    }());
    Tops.housingSelectorComponent = housingSelectorComponent;
})(Tops || (Tops = {}));
Tops.TkoComponentLoader.addVM('housing-selector', Tops.housingSelectorComponent);
//# sourceMappingURL=housingSelectorComponent.js.map