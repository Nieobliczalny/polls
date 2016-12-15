define([], function () {
    //Element <row-selection-question question="Pytanie:" required="false" multiple="true" options="model" allow-custom-value="true"></row-selection-question>
    function RowSelectionQuestion() {
        return {
            templateUrl: './views/rowselectionquestion.html',
            scope: {
                question: '=',
                required: '=',
                multiple: '=',
                options: '=',
                allowCustomValue: '='
            },
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ngModelController) {
                var value = [];
                scope.isValid = true;
                scope.isDirty = false;
                checkValidity();
                checkMultiple();
                function clearSelectionInRow(row) {
                    var elements = iElement[0].querySelectorAll('[data-row=' + row + ']');
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].checked = false;
                    }
                };
                function setSelectedOnValue(row, v) {
                    var column = -1;
                    for (var i = 0; i < scope.options.length; i++) {
                        if (scope.options[i].value == v) column = i;
                    }
                    if (column < 0) {
                        if (scope.allowCustomValue) {
                            iElement[0].querySelectorAll('.rs_question_' + scope.$id + '_' + row + '_' + column).val(v)[0].dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                    else {
                        var elements = iElement[0].querySelectorAll('.rs_question_' + scope.$id + '_' + row + '_' + column);
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].checked = true;
                        }
                    }
                };

                //Render przy aktualizacji modelu z zewnątrz
                ngModelController.$render = function () {
                    if (ngModelController.$viewValue) {
                        if (scope.multiple === true) {
                            clearSelectionInRow(0);
                            value = [];
                            for (var j = 0; j < ngModelController.$viewValue.length; j++) {
                                value[j] = ngModelController.$viewValue[j];
                                setSelectedOnValue(0, value[j]);
                            }
                        } else {
                            value = ngModelController.$viewValue;
                            clearSelectionInRow(0);
                            setSelectedOnValue(0, value);
                        }
                    }
                    checkValidity(ngModelController.$viewValue);
                };

                //Aktualizacja modelu
                iElement.on('change', 'input[type=checkbox],input[type=radio]', function (e) {
                    var row = parseInt(e.target.getAttribute('data-row'));
                    if (scope.multiple === true) {
                        if (e.target.checked && value.indexOf(e.target.value) < 0 && e.target.value.length > 0) value.push(e.target.value);
                        else if (!e.target.checked && value.indexOf(e.target.value) > -1) value.splice(value.indexOf(e.target.value), 1);
                    }
                    else if (e.target.checked && value != e.target.value) value = e.target.value;
                    scope.isDirty = true;
                    ngModelController.$setViewValue(value);
                    checkValidity();
                });

                iElement.on('input', 'input[type=text]', function (e) {
                    var row = parseInt(e.target.getAttribute('data-row'));
                    var customCheckbox = iElement.find('.rs_question_' + scope.$id + '_' + row + '_custom');

                    if (scope.multiple === true && customCheckbox[0].checked && customCheckbox.val() && value.indexOf(customCheckbox.val()) != -1) value.splice(value.indexOf(customCheckbox.val()), 1);

                    customCheckbox.val(e.target.value);
                    customCheckbox[0].checked = e.target.value.trim().length > 0 ? true : false;
                    customCheckbox[0].dispatchEvent(new Event('change', { bubbles: true }));
                });

                //Aktualizacja wskaźników poprawności pola
                function updateValidityIndicators(valid) {
                    ngModelController.$setValidity('empty', valid);
                    scope.isValid = !scope.isDirty || ngModelController.$valid;
                };

                //Sprawdzanie poprawności pola
                function checkValidity() {
                    var isRequired = angular.isDefined(scope.required) ? scope.required : false;
                    var hasValue = value && value.length > 0 ? true : false;
                    if (isRequired && value) {
                        for (var i = 0; i < scope.options.length; i++) {
                            if (scope.multiple === true && value.length == 0) hasValue = false;
                            else if (scope.multiple !== true && (!value || value.trim().length == 0)) hasValue = false;
                        }
                    }
                    var valid = !isRequired || hasValue;
                    if (!scope.$$phase && scope.isDirty) scope.$apply(updateValidityIndicators.bind(this, valid));
                    else updateValidityIndicators(valid);
                }
                scope.$watch('required', function () {
                    checkValidity();
                });

                //Możliwość zaznaczenia paru odpowiedzi
                function checkMultiple() {
                    var changeOccurred = false;
                    if (scope.multiple === true) {
                        if (!Array.isArray(value) || value.length > scope.options.length) {
                            value = [];
                            changeOccurred = true;
                        }
                    } else {
                        if (Array.isArray(value)) {
                            value = null;
                            changeOccurred = true;
                        }
                    }
                    if (changeOccurred) {
                        ngModelController.$setViewValue(value);
                        ngModelController.$render();
                    }
                };
                scope.$watch('multiple', function () {
                    checkMultiple();
                });

                //Dostępne opcje
                scope.$watch('options', function () {
                    //checkValidity(ngModelController.$viewValue);
                });
            }
        };
    }
    return RowSelectionQuestion;
});