angular.
    module('SOSearch').
    animation('.questions-table-row', function pageAnimationFactory() {
        return {
            enter: animateIn,
            leave: animateOut
        };

        // Программная анимация чтобы работала в IE9

        function animateIn(element, done) {
            element.
                css({
                    opacity: 0
                }).
                animate({
                    opacity: 1
                }, 700, done);

            return function animateInEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }

        function animateOut(element, done) {
            done();
            return function animateOutEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
    });