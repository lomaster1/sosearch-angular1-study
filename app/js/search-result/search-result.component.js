angular
    .module("SOSearch")
    .component('searchResult', {
        templateUrl: 'js/search-result/search-result.template.html',
        controller: [
            '$location', '$routeParams', 'Stackoverflow', 'KeyboardNavigation', '$timeout',
            function SearchResultCtrl($location, $routeParams, Stackoverflow, KeyboardNavigation, $timeout) {
                var me = this;

                // Загрузка вопросов по запросу.
                var query = $routeParams.query;
                me.items = query ? Stackoverflow.search({ intitle: query }) : Stackoverflow.questions();

                // Переход к информации о вопросе.
                me.showQuestionDetails = function (questionId) {
                    $location.path('/question/' + questionId);
                };

                // Наиболее популярные вопросы.
                me.mostPopularQuestion = null;

                me.showMostPopularQuestion = function (by, data) {
                    switch (by) {
                        case 'user':
                            me.mostPopularQuestion = Stackoverflow.questionsByUser({
                                'userId': data,
                                'sort': 'votes',
                                'order': 'desc'
                            });
                            break;
                        case 'tag':
                            // /questions?page=1&pagesize=10&order=desc&sort=votes&tagged=' + data + '&site=stackoverflow';
                            me.mostPopularQuestion = Stackoverflow.questions({
                                'tagged': data,
                                'sort': 'votes',
                                'order': 'desc'
                            });
                            break;
                        default:
                            me.mostPopularQuestion = null;
                    }
                };


                // Клавиатурная навигация.
                me.focusedComponent = null;
                var onKeyDown = function (key) {
                    if (key === 'esc') {
                        me.focusedComponent = null;
                        return;
                    }
                    if (!me.focusedComponent) {
                        me.focusedComponent = 'questions';
                    } else {
                        if (key === 'tab') {
                            // Если панель "быстрого отображения" открыта, можно табом переместится на неё.
                            if (me.focusedComponent === 'questions' && me.mostPopularQuestion) {
                                me.focusedComponent = 'additional';
                            } else {
                                me.focusedComponent = 'questions';
                            }
                        }
                    }
                    //console.log('focusedComponent: ' + me.focusedComponent);
                };
                KeyboardNavigation.bind('searchResult', onKeyDown);
                me.$onDestroy = function () {
                    KeyboardNavigation.unbind('searchResult');
                };

            }]
    });
