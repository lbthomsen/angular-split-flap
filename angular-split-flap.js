/*
 * AngularJS module: ngSplitFlap
 */
(function () {

    var module = angular.module("ngSplitFlap", []);

    module.directive("splitFlap", [
        function () {
            return {
                restrict: "E",
                replace: true,
                scope: {
                    value: "@",
                    length: "@",
                    size: "@",
                    deck: "@"
                },
                controller: ["$log", "$scope",
                    function ($log, $scope) {
                        $log.debug("SplitFlapController: starting - length = " + $scope.length);

                        var that = this;
                        that.characters = [];
                        that.class = [
                            $scope.size
                        ]

                        for (var i = 0; i < $scope.length; ++i) {
                            that.characters.push("\xa0");
                        }

                        that.setCharacters = function (value) {
                            for (var i = 0; i < value.length; ++i) {
                                that.characters[i] = value.charAt(i);
                            }
                        };

                        $scope.$watch("value", function () {
                            //$log.debug("SplitFlapController: value has changed - now = %o", $scope.value);
                            that.setCharacters($scope.value.substring(0, $scope.length));
                        });

                    }
                ],
                controllerAs: "splitFlapCtrl",
                template: '<div class="flapper" ng-class="size"><split-flap-character ng-repeat="character in splitFlapCtrl.characters track by $index" value="{{character}}" deck="{{deck}}"/></div>'
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
                    deck: "@"
                },
                controller: ["$log", "$scope", "$timeout",
                    function ($log, $scope, $timeout, ngAudio) {
                        $log.debug("SplitFlapCharacerController: starting");

                        var deck = ($scope.deck || "\xa0ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.-!:;");
                        var deckIdx = 0;
                        var timeout = null;

                        var that = this;
                        that.character = deck.charAt(deckIdx);

                        if (deckIdx + 1 < deck.length) {
                            that.nextCharacter = deck.charAt(deckIdx + 1);
                        } else {
                            that.nextCharacter = deck.charAt(0);
                        }

                        that.moveTo = function (character) {
                            if (timeout) {
                                $timeout.cancel(timeout);
                            }
                            timeout = $timeout(function () {
                                deckIdx = deckIdx + 1;
                                if (deckIdx >= deck.length) {
                                    deckIdx = 0;
                                }
                                that.character = deck.charAt(deckIdx);
                                if (deckIdx + 1 < deck.length) {
                                    that.nextCharacter = deck.charAt(deckIdx + 1);
                                } else {
                                    that.nextCharacter = deck.charAt(0);
                                }

                                if (character !== that.character) {
                                    that.moveTo(character);
                                }
                            }, 50);

                        };

                        $scope.$watch("value", function () {
                            //$log.debug("SplitFlapCharacterController: value changed - now = %o", $scope.value);
                            //that.character = $scope.value;
                            that.moveTo($scope.value);
                        });
                    }
                ],
                controllerAs: "splitFlapCharacterCtrl",
                template: '<div class=digit"><div class="back top">{{splitFlapCharacterCtrl.nextCharacter}}</div><div class="back bottom">{{splitFlapCharacterCtrl.character}}</div><div class="front top" ng-class="splitFlapCharacterCtrl.topClass">{{splitFlapCharacterCtrl.character}}</div><div class="front bottom" ng-class="splitFlapCharacterCtrl.botClass">{{splitFlapCharacterCtrl.nextCharacter}}</div></div>'
            };
        }
    ]);

})();
/*
 * vim: ts=4 et nowrap autoindent
 */
