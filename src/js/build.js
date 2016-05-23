// Osztály alapjául szolgáló függvény létrehozása.
var dateClass = function (defaultDate) {
    this.cDate = new Date();

    this.construct = function () {
        this.cDate = defaultDate ? defaultDate : this.cDate;
    };

    this.toDoubleChars = function (num) {
        if (num < 10 && num > -10) {
            return '0' + num;
        }
        return '' + num;
    };

    this.toMysql = function () {
        var parts = [];
        parts.push(this.cDate.getFullYear());
        parts.push(this.toDoubleChars(this.cDate.getMonth() + 1));
        parts.push(this.toDoubleChars(this.cDate.getDate()));

        return parts.join('-');
    };

    this.construct();
};
//# sourceMappingURL=build.js.map
