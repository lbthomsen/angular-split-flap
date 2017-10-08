/*
 * Main Application
 */
(function () {

    var appName = "split-flap";

    var app = angular.module(appName, [
        "ngSplitFlap"
    ]);

    app.controller("AppController", ["$log", "$scope", "$interval",
        function ($log, $scope, $interval) {
            $log.debug("AppController: starting");

            var that = this;
            that.length = 20;
            that.value = "";

            that.fadeClass = "fade in";

            that.interval = $interval(function () {
                that.value = "Hello\xa0World\xa0" + new Date().toTimeString();
            }, 1000);

            $scope.$on("$destroy", function () {
                $interval.cancel(that.interval);
            });
        }
    ]);

    app.controller("TestController", ["$log", "$scope", 
        function ($log, $scope) {
            $log.debug("TestController: starting");

            var that = this;
            that.flipButtonDisabled = false;

            that.topClass = {
                "flip-in": 0, 
                "flip-out": 1
            };

            that.botClass = {
                "flip-in": 1, 
                "flip-out": 0
            };
            

            that.reset = function () {
                $log.debug("TestController: reset clicked");
                that.topClass["flip-in"] = 0;
                that.topClass["flip-out"] = 1;
                that.botClass["flip-in"] = 1;
                that.botClass["flip-out"] = 0;
            };

            that.flip = function () {
                $log.debug("TestController: flip clicked");
                that.topClass["flip-in"] = 1;
                that.topClass["flip-out"] = 0;
                that.botClass["flip-in"] = 0;
                that.botClass["flip-out"] = 1;
            };

        }
    ]);

//    app.directive("top", ["$log", "$animate",
//        function ($log, $animate) {
//            return {
//                restrict: "A",
//                scope: {
//                    top: "="
//                },
//                link: function (scope, element, attrs) {
//                    $log.debug("top link scope=%o attrs=%o", scope, attrs);
//
//                    scope.topElement = element[0];
//
//                    scope.$watch("top", function (top) {
//                        if (top) {
//                            $animate.removeClass(element, "ng-hide").then(scope.$parent.topShown());
//                        } else {
//                            $animate.addClass(element, "ng-hide").then(scope.$parent.topHidden());
//                        }
//                    });
//                }
//            };
//        }
//    ]);
//
//    app.directive("bot", ["$log", "$animate",
//        function ($log, $animate) {
//            return {
//                restrict: "A",
//                scope: {
//                    bot: "="
//                },
//                link: function (scope, element) {
//
//                    scope.botElement = element[0];
//
//                    scope.$watch("bot", function (bot) {
//                        if (bot) {
//                            $animate.removeClass(element, "ng-hide").then(scope.$parent.botShown());
//                        } else {
//                            $animate.addClass(element, "ng-hide").then(scope.$parent.botHidden());
//                        }
//                    });
//                }
//            };
//        }
//    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
