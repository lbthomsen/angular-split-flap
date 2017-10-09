/*
 * Main Application
 */
(function () {

    var appName = "split-flap";

    var app = angular.module(appName, [
        "angularMoment", 
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

    app.controller("HeaderController", ["$log", "$scope", "$interval",
        function ($log, $scope, $interval) {
            $log.debug("HeaderController: starting");

            var that = this;
            that.title = "Angular Split-Flap (Solari) Display";
            var strings = [
                "AngularJS",
                "Split-Flap",
                "Solari",
                "Display"
            ];
            var idx = 0;
            var interval;
            
            that.value = strings[0];

            interval = $interval(function () {
                ++idx;
                if (idx >= strings.length)
                    idx = 0;
                that.value = strings[idx];
            }, 10000);

        }
    ]);

    app.controller("SingleController", ["$log", "$scope", "$interval",
        function ($log, $scope, $interval) {
            $log.debug("SingleController: starting");

            var that = this;
            var values = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var interval;
            var idx = 0;

            interval = $interval(function () {
                ++idx;
                if (idx >= values.length)
                    idx = 0;
                that.value = values.charAt(idx);
            }, 2000);

            that.value = values.charAt(idx);

        }
    ]);
    
    app.controller("ClockController", ["$log", "$scope", "$interval", "moment", 
        function ($log, $scope, $interval, moment) {
            $log.debug("ClockController: starting");

            var that = this;
            var interval = null;
            
            that.time = "";
            
            that.setClock = function() {
                that.time = moment().format("HH:mm:ss");
            };

            interval = $interval(function () {
                that.setClock();
            }, 1000);
            
            that.setClock();

        }
    ]);

    app.controller("TestController", ["$log", "$scope",
        function ($log, $scope) {
            $log.debug("TestController: starting");

            var that = this;
            that.flipButtonDisabled = false;

            that.flipClass = {
                flip: 0
            };

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
                that.flipClass.flip = 0;
                that.topClass["flip-in"] = 0;
                that.topClass["flip-out"] = 1;
                that.botClass["flip-in"] = 1;
                that.botClass["flip-out"] = 0;
            };

            that.flip = function () {
                $log.debug("TestController: flip clicked");
                that.flipClass.flip = 1;
                that.topClass["flip-in"] = 1;
                that.topClass["flip-out"] = 0;
                that.botClass["flip-in"] = 0;
                that.botClass["flip-out"] = 1;
            };

        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
