/**
 * Created by Terry on 10/26/2015.
 */
/// <reference path='../typings/knockout/knockout.d.ts' />
/// <reference path='../Tops.Peanut/Peanut.d.ts' />
/// <reference path='../typings/underscore/underscore.d.ts' />
var Tops;
(function (Tops) {
    /**
     * base class for person panel and address panel
     */
    var editPanel = (function () {
        function editPanel() {
            // todo: use refactored components
            this.viewState = ko.observable('');
            this.hasErrors = ko.observable(false);
            this.isAssigned = false;
            this.relationId = null;
        }
        /**
         * set view state 'edit'
         */
        editPanel.prototype.edit = function (relationId) {
            if (relationId === void 0) { relationId = null; }
            var me = this;
            me.viewState('edit');
            me.relationId = relationId;
        };
        /**
         * set view state 'closed'
         */
        editPanel.prototype.close = function () {
            var me = this;
            me.viewState('closed');
        };
        /**
         * set view state 'search'
         */
        editPanel.prototype.search = function () {
            var me = this;
            me.viewState('search');
        };
        /**
         * set view state 'empty'
         */
        editPanel.prototype.empty = function () {
            var me = this;
            me.viewState('empty');
        };
        /**
         * set view state 'view'
         */
        editPanel.prototype.view = function () {
            var me = this;
            if (me.isAssigned) {
                me.viewState('view');
            }
            else {
                me.viewState('empty');
            }
        };
        /**
         * Set view state, iqnore any constraints
         * @param state
         */
        editPanel.prototype.setViewState = function (state) {
            if (state === void 0) { state = 'view'; }
            var me = this;
            me.viewState(state);
        };
        return editPanel;
    })();
    Tops.editPanel = editPanel;
    // * Base class for observable container that handles search results.
    var searchListObservable = (function () {
        function searchListObservable(columnCount, maxInColumn) {
            var _this = this;
            this.searchValue = ko.observable('');
            this.selectionCount = ko.observable(0);
            this.hasMore = ko.observable(false);
            this.hasPrevious = ko.observable(false);
            this.selectionList = [];
            this.currentPage = 1;
            this.foundCount = ko.observable(0);
            /**
             * handle next-page click
             */
            this.nextPage = function () {
                var me = _this;
                if (me.currentPage < me.lastPage) {
                    me.currentPage = me.currentPage + 1;
                }
                me.hasMore(me.lastPage > me.currentPage);
                me.hasPrevious(me.currentPage > 1);
                me.parseColumns();
            };
            /**
             * handle previous-page click
             */
            this.previousPage = function () {
                var me = _this;
                if (me.currentPage > 1) {
                    me.currentPage = me.currentPage - 1;
                }
                me.hasMore(me.lastPage > me.currentPage);
                me.hasPrevious(me.currentPage > 1);
                me.parseColumns();
            };
            var me = this;
            me.columnCount = columnCount;
            me.maxInColumn = maxInColumn;
            me.itemsPerPage = columnCount * maxInColumn;
            for (var i = 1; i <= columnCount; i++) {
                me.selectionList[i] = ko.observableArray([]);
            }
        }
        /**
         * reset search observables
         */
        searchListObservable.prototype.reset = function () {
            var me = this;
            me.searchValue('');
            me.selectionCount(0);
            me.foundCount(0);
        };
        /**
         *  Assign result list
         */
        searchListObservable.prototype.setList = function (list) {
            var me = this;
            me.itemList = list;
            var itemCount = list.length;
            if (itemCount == 1 && list[0].Value === null) {
                me.foundCount(itemCount - 1);
            }
            else {
                me.foundCount(itemCount);
            }
            me.selectionCount(itemCount);
            me.currentPage = 1;
            me.lastPage = Math.ceil(itemCount / me.itemsPerPage);
            me.hasMore(me.lastPage > 1);
            me.hasPrevious(false);
            me.parseColumns();
        };
        /**
         * arrange list in observable columns
         */
        searchListObservable.prototype.parseColumns = function () {
            var me = this;
            var columns = [];
            var currentColumn = 0;
            var startIndex = me.itemsPerPage * (me.currentPage - 1);
            var lastIndex = startIndex + me.itemsPerPage;
            if (lastIndex >= me.itemList.length) {
                lastIndex = me.itemList.length - 1;
            }
            columns[0] = [];
            var j = 0;
            for (var i = startIndex; i <= lastIndex; i++) {
                columns[currentColumn][j] = me.itemList[i];
                if ((i + 1) % me.maxInColumn == 0) {
                    ++currentColumn;
                    columns[currentColumn] = [];
                    j = 0;
                }
                else {
                    j = j + 1;
                }
            }
            for (var i = 0; i < me.columnCount; i++) {
                me.selectionList[i + 1](columns[i]);
            }
        };
        return searchListObservable;
    })();
    Tops.searchListObservable = searchListObservable;
})(Tops || (Tops = {}));
//# sourceMappingURL=formComponents.js.map