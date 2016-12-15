define([], function () {
    //Element <simple-question question="Pytanie:" required="false" min="0" max="1" step="0.1" type="text" regex="pattern"></simple-question>
    function SimpleQuestion() {
        return {
            templateUrl: './views/simplequestion.html',
            scope: {
                question: '=',
                required: '=?',
                min: '=?',
                max: '=?',
                type: '=',
                step: '=?',
                pattern: '=?regex'
            },
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ngModelController) {
                scope.value = null;
                scope.isValid = true;
                checkValidity();

                //Render przy aktualizacji modelu z zewnątrz
                ngModelController.$render = function () {
                    if (scope.value != ngModelController.$viewValue) {
                        scope.value = ngModelController.$viewValue;
                        checkValidity();
                    }
                };

                //Sprawdzanie poprawności pola
                function checkValidity() {
                    var isRequired = angular.isDefined(scope.required) ? scope.required : false;
                    var hasValue = scope.value && (typeof scope.value !== 'undefined') ? true : false;
                    ngModelController.$setValidity('empty', !isRequired || hasValue);
                    scope.isValid = !ngModelController.$dirty || ngModelController.$valid;
                }

                //Aktualizacja modelu
                scope.$watch('value', function () {
                    ngModelController.$setViewValue(scope.value);
                    checkValidity();
                });

                scope.$watch('required', checkValidity);
                scope.$watch('min', checkValidity);
                scope.$watch('max', checkValidity);
                scope.$watch('type', function () {
                    scope.value = null;
                    ngModelController.$setPristine(true);
                    checkValidity();
                });
                scope.$watch('step', checkValidity);
                scope.$watch('pattern', checkValidity);
            }
        };
    }
    return SimpleQuestion;
});