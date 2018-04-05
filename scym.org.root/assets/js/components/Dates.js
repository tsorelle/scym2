var Tops;
(function (Tops) {
    var Dates = (function () {
        function Dates() {
        }
        Dates.getCurrentDateString = function () {
            var d = new Date();
            return d.toDateString();
        };
        Dates.getDayName = function (d, short) {
            if (short === void 0) { short = false; }
            switch (d) {
                case 0:
                    return short ? 'Sun' : 'Sunday';
                case 1:
                    return short ? 'Mon' : 'Monday';
                case 2:
                    return short ? 'Tue' : 'Tuesday';
                case 3:
                    return short ? 'Wed' : 'Wednesday';
                case 4:
                    return short ? 'Thu' : 'Thursday';
                case 5:
                    return short ? 'Fri' : 'Friday';
                case 6:
                    return short ? 'Sat' : 'Saturday';
                default:
                    return 'ERROR: invalid day number';
            }
        };
        Dates.getMonthName = function (m, short) {
            if (short === void 0) { short = false; }
            switch (m) {
                case 0:
                    return short ? 'Jan' : 'January';
                case 1:
                    return short ? 'Feb' : 'February';
                case 2:
                    return short ? 'Mar' : 'March';
                case 3:
                    return short ? 'Apr' : 'April';
                case 4:
                    return 'May';
                case 5:
                    return 'June';
                case 6:
                    return 'July';
                case 7:
                    return short ? 'Aug' : 'August';
                case 8:
                    return short ? 'Sept' : 'September';
                case 9:
                    return short ? 'Oct' : 'October';
                case 10:
                    return short ? 'Nov' : 'November';
                case 11:
                    return short ? 'Dec' : 'December';
                default:
                    return 'Error: invalid month number';
            }
        };
        Dates.formatCurrentDate = function (formatType, showDay) {
            if (formatType === void 0) { formatType = 'standard'; }
            if (showDay === void 0) { showDay = false; }
            return Dates.formatDate(new Date(), formatType, showDay);
        };
        Dates.formatDate = function (d, formatType, showDay) {
            if (formatType === void 0) { formatType = 'standard'; }
            if (showDay === void 0) { showDay = false; }
            if (!d) {
                return '';
            }
            var result = '';
            switch (formatType) {
                case 'long':
                    if (showDay) {
                        result = Dates.getDayName(d.getDay()) + ' ';
                    }
                    result += Dates.getMonthName(d.getMonth()) + ' ' +
                        d.getDate() + ', ' + d.getFullYear();
                    return result;
                case 'intl':
                    return d.getFullYear() + '-' + (d.getMonth() + 1) + d.getDate();
                case 'us':
                    return d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
                case 'iso':
                    return d.toISOString();
                case 'json':
                    return d.toJSON();
                default:
                    return d.toDateString();
            }
        };
        Dates.formatDateString = function (s, formatType, showDay) {
            if (formatType === void 0) { formatType = 'standard'; }
            if (showDay === void 0) { showDay = false; }
            if (!s) {
                return '';
            }
            var d = new Date(s);
            return Dates.formatDate(d, formatType, showDay);
        };
        return Dates;
    }());
    Tops.Dates = Dates;
})(Tops || (Tops = {}));
//# sourceMappingURL=Dates.js.map