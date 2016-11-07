angular.
    module('SOSearch').
    config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
                when('/', {
                    template: '<search-form></search-form>',
                    controller: ['$scope', function ($scope) {
                    }]
                }).
                when('/result/:query?', {
                    template: '<search-result></search-result>',
                    controller: ['$scope', function ($scope) {
                    }]
                }).
                when('/question/:questionId', {
                    template: '<question-details></question-details>',
                    controller: ['$scope', function ($scope) {
                    }]
                }).
                otherwise('/');

            // Не работает в IE9.
            //$locationProvider.html5Mode(true);
        }
    ]);