define([], function () {
    //Element <table-question question="Pytanie:" required="false" multiple="true" options="model"></table-question>
    function TableQuestion() {
        return {
            templateUrl: './views/tablequestion.html',
            scope: {
                question: '=',
                required: '=',
                multiple: '=',
                options: '='
            },
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ngModelController) {
                var value = [];
                scope.isValidTotal = true;
                scope.isDirty = false;
                scope.isValid = [];
                checkValidity();
                checkMultiple();
                //Funkcje pomocnicze do ustawiania wartości nowego modelu
                function clearSelectionInRow(row) {
                    var elements = iElement[0].querySelectorAll('[data-row=' + row + ']');
                    for (var i = 0; i < elements.length; i++) {
                        elements[i].checked = false;
                    }
                };
                function setSelectedOnValue(row, v) {
                    var column = -1;
                    for (var i = 0; i < scope.options[row].answers.length; i++) {
                        if (scope.options[row].answers[i].value == v) column = i;
                    }
                    if (column < 0) {
                        if (scope.options[row].allowCustomValue) {
                            iElement[0].querySelectorAll('.table_question_' + scope.$id + '_' + row + '_' + column).val(v)[0].dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                    else {
                        var elements = iElement[0].querySelectorAll('.table_question_' + scope.$id + '_' + row + '_' + column);
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].checked = true;
                        }
                    }
                };

                //Render przy aktualizacji modelu z zewnątrz
                ngModelController.$render = function () {
                    if (ngModelController.$viewValue) {
                        for (var i = 0; i < scope.options.length; i++) {
                            if (scope.multiple === true) {
                                clearSelectionInRow(i);
                                value[i] = [];
                                for (var j = 0; j < ngModelController.$viewValue[i].length; j++) {
                                    value[i][j] = ngModelController.$viewValue[i][j];
                                    setSelectedOnValue(i, value[i][j]);
                                }
                            } else {
                                value[i] = ngModelController.$viewValue[i];
                                clearSelectionInRow(i);
                                setSelectedOnValue(i, value[i]);
                            }
                        }
                    }
                    checkValidity(ngModelController.$viewValue);
                };

                //Aktualizacja modelu
                iElement.on('change', 'input[type=checkbox],input[type=radio]', function (e) {
                    var row = parseInt(e.target.getAttribute('data-row'));
                    if (scope.multiple === true) {
                        if (e.target.checked && value[row].indexOf(e.target.value) < 0 && e.target.value.length > 0) value[row].push(e.target.value);
                        else if (!e.target.checked && value[row].indexOf(e.target.value) > -1) value[row].splice(value[row].indexOf(e.target.value), 1);
                    }
                    else if (e.target.checked && value[row] != e.target.value) value[row] = e.target.value;
                    scope.isDirty = true;
                    ngModelController.$setViewValue(value);
                    checkValidity(value);
                });

                iElement.on('input', 'input[type=text]', function (e) {
                    var row = parseInt(e.target.getAttribute('data-row'));
                    var customCheckbox = iElement.find('.table_question_' + scope.$id + '_' + row + '_custom');

                    if (scope.multiple === true && customCheckbox[0].checked && customCheckbox.val() && value[row].indexOf(customCheckbox.val()) != -1) value[row].splice(value[row].indexOf(customCheckbox.val()), 1);

                    customCheckbox.val(e.target.value);
                    customCheckbox[0].checked = e.target.value.trim().length > 0 ? true : false;
                    customCheckbox[0].dispatchEvent(new Event('change', { bubbles: true }));
                });

                //Aktualizacja wskaźników poprawności pola
                function updateValidityIndicators(v, valid) {
                    ngModelController.$setValidity('empty', valid);
                    scope.isValidTotal = !scope.isDirty || ngModelController.$valid;
                    for (var i = 0; i < scope.options.length; i++) {
                        if (scope.multiple === true && (v && v[i] && v[i].length == 0)) scope.isValid[i] = !scope.isDirty;
                        else if (scope.multiple !== true && (v && v[i] && v[i].trim().length == 0)) scope.isValid[i] = !scope.isDirty;
                        else scope.isValid[i] = true;
                    }
                };

                //Sprawdzanie poprawności pola
                function checkValidity(v) {
                    var isRequired = angular.isDefined(scope.required) ? scope.required : false;
                    var hasValue = v && v.length > 0 ? true : false;
                    if (isRequired && v) {
                        for (var i = 0; i < scope.options.length; i++) {
                            if (scope.multiple === true && v[i].length == 0) hasValue = false;
                            else if (scope.multiple !== true && (!v[i] || v[i].trim().length == 0)) hasValue = false;
                        }
                    }
                    var valid = !isRequired || hasValue;
                    if (!scope.$$phase && scope.isDirty) scope.$apply(updateValidityIndicators.bind(this, v, valid));
                    else updateValidityIndicators(v, valid);
                }
                scope.$watch('required', function () {
                    checkValidity(ngModelController.$viewValue);
                });

                //Możliwość zaznaczenia paru odpowiedzi
                function checkMultiple() {
                    var changeOccurred = false;
                    if (scope.multiple === true) {
                        if ((scope.options.length > 0 && !Array.isArray(value[0])) || value.length > scope.options.length) {
                            value = [];
                            changeOccurred = true;
                        }
                        for (var i = 0; i < scope.options.length; i++) {
                            if (!Array.isArray(value[i])) {
                                value[i] = [];
                                changeOccurred = true;
                            }
                        }
                    } else {
                        if ((scope.options.length > 0 && Array.isArray(value[0])) || value.length > scope.options.length) value = [];
                        for (var i = 0; i < scope.options.length; i++) {
                            if (Array.isArray(value[i])) {
                                value[i] = null;
                                changeOccurred = true;
                            }
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
    return TableQuestion;
});