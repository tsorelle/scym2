var Tops;
(function (Tops) {
    var USDollars = (function () {
        function USDollars() {
        }
        USDollars.toUSD = function (value, defaultResult) {
            if (defaultResult === void 0) { defaultResult = ''; }
            if (isNaN(value) || value < 0.005) {
                return defaultResult;
            }
            var s = value.toLocaleString();
            var dec = '00';
            var parts = s.split('.');
            if (parts.length > 1) {
                switch (parts[1].length) {
                    case 0:
                        break;
                    case 1:
                        dec = parts[1] + '0';
                        break;
                    case 2:
                        dec = parts[1];
                        break;
                }
            }
            return '$' + parts[0] + '.' + dec;
        };
        USDollars.format = function (value, defaultResult) {
            if (defaultResult === void 0) { defaultResult = ''; }
            value = USDollars.toNumber(value);
            return USDollars.toUSD(value, defaultResult);
        };
        USDollars.roundNumber = function (n) {
            if (n === 0) {
                return 0;
            }
            if (n) {
                var parts = n.toString().split('.');
                var dollars = Number(parts[0]);
                var cents = 0;
                var extra = 0;
                if (parts.length > 1) {
                    var c = parts[1].substr(0, 2);
                    cents = Number(c);
                    if (c.length == 1) {
                        cents = cents * 10;
                    }
                    extra = parts[1].substring(2, 3);
                }
                if (extra) {
                    if (Number(extra) > 5) {
                        cents += 1;
                    }
                    if (cents > 99) {
                        dollars += 1;
                        cents = 0;
                    }
                }
                var zeroPad = cents < 10 ? '0' : '';
                return Number(dollars + '.' + zeroPad + cents);
            }
            else {
                return null;
            }
        };
        USDollars.toNumber = function (n) {
            var t = typeof n;
            switch (t) {
                case 'number':
                    break;
                case 'string':
                    n = n.replace(/,/g, '').replace('$', '').trim();
                    if (isNaN(n)) {
                        return null;
                    }
                    break;
                default:
                    return null;
            }
            return USDollars.roundNumber(n);
        };
        USDollars.balanceMessage = function (n) {
            if (!n) {
                return (n === 0) ? 'Paid in full' : '';
            }
            if (n < 0) {
                return 'Refund due ' + USDollars.toUSD(Math.abs(Number(n)));
            }
            if (n < 0.009) {
                return 'Balance paid in full';
            }
            return 'Balance due ' + USDollars.toUSD(n);
        };
        return USDollars;
    }());
    Tops.USDollars = USDollars;
})(Tops || (Tops = {}));
//# sourceMappingURL=USDollars.js.map