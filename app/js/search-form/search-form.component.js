angular
    .module("SOSearch")
    .component('searchForm', {
        templateUrl: 'js/search-form/search-form.template.html',
        controller: ['$location', function SearchFormCtrl($location) {
            var me = this;

            me.doSearch = function (query) {
                $location.path('/result/' + (query ? query : ''));
                return false;
            };

        }]
    });
