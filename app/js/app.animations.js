angular.
    module('SOSearch').
    animation('.page', function pageAnimationFactory() {
        return {
            enter: animateIn,
            leave: animateOut
        };

        // Программная анимация чтобы работало в IE9

        function animateIn(element, done) {
            element.
                css({
                    'position': 'absolute',
                    'top': 0,
                    'left': '3000px'
                }).
                animate({
                    'left': 0
                }, 400, done);

            return function animateInEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }

        function animateOut(element, done) {
            element.
                css({
                    'position': 'absolute',
                    'top': 0,
                    'left': 0
                }).
                animate({
                    'left': '-3000px'
                }, 400, done);

            return function animateOutEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
    });