angular
    .module("SOSearch")
    .factory('KeyboardNavigation', [
        '$rootScope',
        function KeyboardNavigation($rootScope) {
            var keyboardService = {};

            keyboardService.bind = function (namespace, cb) {
                $('body').on('keydown.' + namespace, function (e) {
                    var key = e.which;
                    switch (key) {
                        case 9: key = 'tab'; break;
                        case 27: key = 'esc'; break;
                        case 13: key = 'return'; break;
                        case 37: key = 'left'; break;
                        case 38: key = 'up'; break;
                        case 39: key = 'right'; break;
                        case 40: key = 'down'; break;
                        default: key = null;
                    }

                    if (key) {
                        e.stopPropagation();
                        e.preventDefault();

                        cb(key);

                        $rootScope.$apply();

                        return false;
                    }


                });
            };

            keyboardService.unbind = function (namespace) {
                $('body').off('keydown.' + namespace);
            };

            return keyboardService;
        }
    ]);