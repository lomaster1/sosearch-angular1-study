angular.
    module('SOSearch').
    factory('Stackoverflow', [
        '$resource', function ($resource) {

            var getItems = function (data, headersGetter, status) {
                return angular.fromJson(data).items;
            };

            return $resource(
                'http://api.stackexchange.com/2.2/:method',
                { 'pagesize': '10', 'order': 'desc', 'sort': 'activity', 'site': 'stackoverflow' },
                {
                    // /search?pagesize=10&order=desc&sort=activity&intitle=<query>&site=stackoverflow'
                    'search': {
                        method: 'GET',
                        params: {
                            'method': 'search'
                        },
                        isArray: true,
                        transformResponse: getItems
                    },
                    // /questions?pagesize=10&order=desc&sort=activity&site=stackoverflow
                    'questions': {
                        method: 'GET',
                        params: {
                            'method': 'questions'
                        },
                        isArray: true,
                        transformResponse: getItems
                    },
                    // /users/<data>/questions?page=1&pagesize=10&order=desc&sort=votes&site=stackoverflow
                    'questionsByUser': {
                        url: 'http://api.stackexchange.com/2.2/users/:userId/questions',
                        method: 'GET',
                        params: {},
                        isArray: true,
                        transformResponse: getItems
                    },
                    // /questions/' + questionId + '?order=desc&sort=activity&site=stackoverflow&filter=!-*f(6rc.(Xr5
                    'questionDetail': {
                        url: 'http://api.stackexchange.com/2.2/questions/:questionId',
                        method: 'GET',
                        params: {
                            'filter': '!-*f(6rc.(Xr5'
                        },
                        isArray: false,
                        transformResponse: [getItems, function (data, headersGetter, status) {
                            if (data.length > 0) {
                                return data[0];
                            } else {
                                return null;
                            }
                        }]
                    }
                });
        }
    ]);