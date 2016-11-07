angular
    .module("SOSearch")
    .component('questionsTable', {
        templateUrl: 'js/questions-table/questions-table.template.html',
        bindings: {
            id: '@',
            items: '<',
            onAuthorClick: '&',
            onTitleClick: '&',
            onTagClick: '&',
            focused: '<'
        },
        controller: [
            '$location', '$routeParams', 'KeyboardNavigation',
            function QuestionsTableCtrl($location, $routeParams, KeyboardNavigation) {
                var me = this;

                me.sortField = undefined;
                me.sortInvert = false;

                me.clickByUser = function (userId) {
                    me.onAuthorClick({
                        userId: userId
                    });
                };
                me.clickByTitle = function (questionId) {
                    me.onTitleClick({
                        questionId: questionId
                    });
                };
                me.clickByTag = function (tag) {
                    me.onTagClick({
                        tag: tag
                    });
                };

                // Сортировка таблицы. Осуществляется на клиенте.
                me.sort = function (fieldName) {
                    if (me.sortField == fieldName) {
                        me.sortInvert = !me.sortInvert;
                    } else {
                        me.sortField = fieldName;
                        me.sortInvert = false;
                    }
                };
                me.isSorted = function (fieldName, invert) {
                    return me.sortField == fieldName && me.sortInvert === invert;
                };

                // Клавиатурная навигация.
                me.activeRow = null;
                me.activeCell = null;
                var cellsCount = 4;
                var onKeyDown = function (key) {
                    if (me.focused) {
                        // Заголовок тоже считаем за строку.
                        var rowsCount = 1 + me.items.length;
                        switch (key) {
                            case 'right':
                                me.activeRow = me.activeRow !== null ? me.activeRow : 0;
                                me.activeCell = me.activeCell !== null ? me.activeCell + 1 : 0;
                                if (me.activeCell >= cellsCount) me.activeCell = 0;
                                break;
                            case 'left':
                                me.activeRow = me.activeRow !== null ? me.activeRow : 0;
                                me.activeCell = me.activeCell !== null ? me.activeCell - 1 : 0;
                                if (me.activeCell < 0) me.activeCell = cellsCount - 1;
                                break;
                            case 'down':
                                me.activeRow = me.activeRow !== null ? me.activeRow + 1 : 0;
                                me.activeCell = me.activeCell !== null ? me.activeCell : 0;
                                if (me.activeRow >= rowsCount) me.activeRow = 0;
                                break;
                            case 'up':
                                me.activeRow = me.activeRow !== null ? me.activeRow - 1 : 0;
                                me.activeCell = me.activeCell !== null ? me.activeCell : 0;
                                if (me.activeRow < 0) me.activeRow = rowsCount - 1;
                                break;
                            case 'return':
                                //TODO
                                $('#' + me.id).find('.active').click().find('a').click();
                                break;
                        }
                    } else {
                        if (key === 'esc') {
                            me.activeRow = null;
                            me.activeCell = null;
                        }
                    }
                    //console.log(key + ' - ' + me.focused + ' - ' + me.activeRow + ' - ' + me.activeCell);
                };
                KeyboardNavigation.bind(me.id, onKeyDown);
                me.$onDestroy = function () {
                    KeyboardNavigation.unbind(me.id);
                };
            }]
    });
