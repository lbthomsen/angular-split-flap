/*
 * AngularJS module: ngSplitFlap
 */
(function () {

    var module = angular.module("ngSplitFlap", []);

    module.directive("splitFlap", ["$log", 
        function ($log) {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    value: "@",
                    length: "@",
                    size: "@",
                    deck: "@", 
                    time: "@"
                }, 
                controller: ["$log", "$scope", "$window", 
                    function ($log, $scope, $window) {
                        $log.debug("SplitFlapController: starting - window = %o", $window);

                        var that = this;
                        that.characters = [];
                        that.class = [
                            $scope.size
                        ];

                        that.resetAll = function () {
                            that.characters.length = 0;
                            for (var i = 0; i < $scope.length; ++i) {
                                that.characters.push("\xa0");
                            }
                        };

                        that.setCharacters = function (value) {
                            for (var i = 0; i < value.length; ++i) {
                                that.characters[i] = value.charAt(i);
                            }
                        };

                        $scope.$watch("value", function () {
                            that.resetAll();
                            that.setCharacters($scope.value.substring(0, $scope.length).replace(/ /, "\xa0"));
                        });

                    }
                ],
                controllerAs: "splitFlapCtrl",
                template: '<div class="flapper" ng-class="size"><split-flap-character ng-repeat="character in splitFlapCtrl.characters track by $index" value="{{character}}" deck="{{deck}}" time="{{time}}"/></div>'
            };
        }
    ]);

    module.directive("splitFlapCharacter", [
        function () {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    value: "@",
                    deck: "@", 
                    time: "@"
                },
                controller: ["$log", "$scope", "$timeout",
                    function ($log, $scope, $timeout, ngAudio) {
                        $log.debug("SplitFlapCharacerController: starting");
                        
                        var timerTime = Number($scope.time || "0.05");
                        var transitionTime = (timerTime * 0.45).toString() + "s";
                        
                        $log.debug("SplitFlapCharacterController: timerTime = %o, transitionTime = %o", timerTime, transitionTime);

                        var deck = ($scope.deck || "\xa0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-!:;");
                        var deckIdx = 0;
                        var timeout = null;

                        var that = this;
                        that.flipClass = {
                            flip: 0
                        };
                        
                        that.topFlipStyle = {
                            "transition-duration": "0"
                        };
                        
                        that.bottomFlipStyle = {
                            "transition-duration": "0", 
                            "transition-delay": "0"
                        };

                        that.resetCharacters = function () {
                            that.topFlipStyle["transition-duration"] = "0";
                            that.bottomFlipStyle["transition-duration"] = "0";
                            that.bottomFlipStyle["transition-delay"] = "0";
                            that.flipClass.flip = 0;
                            that.character = deck.charAt(deckIdx);

                            if (deckIdx + 1 < deck.length) {
                                that.nextCharacter = deck.charAt(deckIdx + 1);
                            } else {
                                that.nextCharacter = deck.charAt(0);
                            }
                        };

                        that.resetCharacters();

                        that.moveTo = function (character) {

                            if (timeout) {
                                $timeout.cancel(timeout);
                            }

                            that.resetCharacters();

                            if (that.character !== character) {
                                that.topFlipStyle["transition-duration"] = transitionTime;
                            that.bottomFlipStyle["transition-duration"] = transitionTime;
                            that.bottomFlipStyle["transition-delay"] = transitionTime;
                                that.flipClass.flip = 1;
                                timeout = $timeout(function () {
                                    deckIdx = deckIdx + 1;
                                    if (deckIdx >= deck.length)
                                        deckIdx = 0;
                                    that.moveTo(character);
                                }, timerTime * 1000);
                            }

                        };

                        $scope.$watch("value", function () {
                            //$log.debug("SplitFlapCharacterController: value changed - now = %o", $scope.value);
                            //that.character = $scope.value;
                            that.moveTo($scope.value);
                        });
                    }
                ],
                controllerAs: "splitFlapCharacterCtrl",
                template: '<div class="digit"><div class="back top">{{splitFlapCharacterCtrl.nextCharacter}}</div><div class="back bottom">{{splitFlapCharacterCtrl.character}}</div><div class="front top" ng-class="splitFlapCharacterCtrl.flipClass" ng-style="splitFlapCharacterCtrl.topFlipStyle">{{splitFlapCharacterCtrl.character}}</div><div class="front bottom" ng-class="splitFlapCharacterCtrl.flipClass" ng-style="splitFlapCharacterCtrl.bottomFlipStyle">{{splitFlapCharacterCtrl.nextCharacter}}</div></div>'
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
