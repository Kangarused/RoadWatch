'use strict';
angular
    .module('datetimepicker', [])
    .provider('datetimepicker', function () {
        var default_options = {};

        this.setOptions = function (options) {
            default_options = options;
        };

        this.$get = function () {
            return {
                getOptions: function () {
                    return default_options;
                }
            };
        };
    })
    .provider('datepicker', function () {
        var default_options = {};

        this.setOptions = function (options) {
            default_options = options;
        };

        this.$get = function () {
            return {
                getOptions: function () {
                    return default_options;
                }
            };
        };
    })
    .provider('timepicker', function () {
        var default_options = {};

        this.setOptions = function (options) {
            default_options = options;
        };

        this.$get = function () {
            return {
                getOptions: function () {
                    return default_options;
                }
            };
        };
    })
    .factory('datetimepickerfactory', ['$timeout', function ($timeout) {
        return {
            createInstance: function (defaultOptions, icon) {
                return {
                    require: '?ngModel',
                    restrict: 'AE',
                    link: function ($scope, $element, $attrs, ngModelCtrl) {
                        var options = defaultOptions;

                        //wrap in input group and add the addon icon. note - link can run multiple times, check we haven't already added the wrapping.
                        if ($element.context.parentElement.className.indexOf('input-group') === -1) {
                            $element.wrap('<div class="input-group"></div>');
                            $element.after('<span class="input-group-addon datepicker-button"><span class="fa fa-' + icon + '"></span></span>');
                            //add a validation message after the input group
                            var inputGroupElement = angular.element($element.context.parentElement);
                            var messageId = $attrs['name'] + '-validation-message';
                            inputGroupElement.after('<span id="' + messageId + '">');
                            $element.attr('message-id', messageId);
                        }

                        var datepickerElement = angular.element($element.context.parentElement);

                        datepickerElement.on('dp.change', function (e) {
                            if (ngModelCtrl) {
                                $timeout(function () {
                                    var isoValue = datepickerElement.data('DateTimePicker').date() ?
                                        datepickerElement.data('DateTimePicker').date().format("YYYY-MM-DDTHH:mm:ssZ") : null;
                                    if (isoValue != ngModelCtrl.$viewValue) {
                                        ngModelCtrl.$setViewValue(isoValue);
                                    }
                                });
                            }
                        }).datetimepicker(options);

                        function setPickerValue() {
                            var date = options.defaultDate || null;

                            if (ngModelCtrl && ngModelCtrl.$viewValue) {
                                date = ngModelCtrl.$viewValue;
                            }
                            if (date != null) {
                                datepickerElement.data('DateTimePicker').date(new Date(date));
                            } else {
                                datepickerElement.data('DateTimePicker').date(new Date(null));
                            }
                        }

                        if (ngModelCtrl) {
                            ngModelCtrl.$render = function () {
                                setPickerValue();
                            };
                        }

                        setPickerValue();
                    }
                };
            }
        }
    }])
    .directive('datetimepicker', ['$timeout', 'datetimepicker', 'datetimepickerfactory', function ($timeout, datetimepicker, datetimepickerfactory) {
        return datetimepickerfactory.createInstance(datetimepicker.getOptions(), 'calendar');
    }])
    .directive('datepicker', ['$timeout', 'datepicker', 'datetimepickerfactory', function ($timeout, datepicker, datetimepickerfactory) {
        return datetimepickerfactory.createInstance(datepicker.getOptions(), 'calendar');
    }])
    .directive('timepicker', ['$timeout', 'timepicker', 'datetimepickerfactory', function ($timeout, timepicker, datetimepickerfactory) {
        return datetimepickerfactory.createInstance(timepicker.getOptions(), 'clock-o');
    }]);