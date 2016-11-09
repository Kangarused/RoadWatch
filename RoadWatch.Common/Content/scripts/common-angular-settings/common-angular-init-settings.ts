﻿/// <reference path="common-angular-settings.d.ts" />
angularApplication
    .config(['datetimepickerProvider', datetimepickerProvider => {
        datetimepickerProvider.setOptions({
            icons: {
                time: 'fa fa-clock-o',
                date: 'fa fa-calendar-o',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-crosshairs',
                clear: 'fa fa-trash-0',
                close: 'fa fa-times'
            },
            format: 'DD/MM/YYYY h:mm a'
        });
    }])
    .config([
        'datepickerProvider', datetimepickerProvider => {
            datetimepickerProvider.setOptions({
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar-o',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-crosshairs',
                    clear: 'fa fa-trash-0',
                    close: 'fa fa-times'
                },
                format: 'DD/MM/YYYY',
                minDate: '1900-01-01',
                maxDate: '2100-01-01'
            });
        }
    ])
    .config([
        'timepickerProvider', datetimepickerProvider => {
            datetimepickerProvider.setOptions({
                icons: {
                    time: 'fa fa-clock-o',
                    date: 'fa fa-calendar-o',
                    up: 'fa fa-chevron-up',
                    down: 'fa fa-chevron-down',
                    previous: 'fa fa-chevron-left',
                    next: 'fa fa-chevron-right',
                    today: 'fa fa-crosshairs',
                    clear: 'fa fa-trash-0',
                    close: 'fa fa-times'
                },
                format: 'h:mm a'
            });
        }
    ])
    .config([
        '$validationProvider', $validationProvider => {
            $validationProvider.showSuccessMessage = false;
            $validationProvider.showErrorMessage = true;
            $validationProvider.setErrorHTML(msg => "<span class=\"help-block\">" + msg + "</span>");

            $validationProvider.validCallback = (element) => {
                $(element).parents('.form-group:first').removeClass('has-error');
            };

            $validationProvider.invalidCallback = (element) => {
                $(element).parents('.form-group:first').addClass('has-error');
            };
        }
    ])
    .run([
        '$state', '$rootScope', ($state, $rootScope) => {
            $rootScope.$state = $state;
        }
    ]);