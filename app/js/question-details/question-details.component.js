angular
    .module("SOSearch")
    .component('questionDetails', {
        templateUrl: 'js/question-details/question-details.template.html',
        controller: ['$routeParams', 'Stackoverflow', '$sce', function QuestionsDetailsCtrl($routeParams, Stackoverflow, $sce) {
            var me = this;
            var questionId = $routeParams.questionId;

            me.questionInfo = Stackoverflow.questionDetail({
                questionId: questionId
            });

            me.renderHtml = function (html_code) {
                return $sce.trustAsHtml(html_code);
            };

        }]
    });
