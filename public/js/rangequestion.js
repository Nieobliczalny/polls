define([], function () {
    //Element <range-question question="Pytanie:" required="false" min="0" max="1" step="0.1" type="text"></range-question>
    function RangeQuestion() {
        return {
            templateUrl: './views/rangequestion.html',
            scope: {
                question: '=',
                required: '=',
                min: '=',
                max: '=',
                type: '=',
                step: '='
            },
            require: 'ngModel',
            link: function (scope, iElement, iAttrs, ngModelController) {
                scope.value = [null, null];
                scope.isValid = true;
                checkValidity();
                //Render przy aktualizacji modelu z zewnątrz
                ngModelController.$render = function () {
                    if (ngModelController.$viewValue) {
                        scope.value[0] = ngModelController.$viewValue[0];
                        scope.value[1] = ngModelController.$viewValue[1];
                    }
                    checkValidity();
                };

                //Aktualizacja modelu
                function updateModel() {
                    ngModelController.$setViewValue(scope.value);
                    checkValidity();
                };
                scope.$watch('value[0]', updateModel);
                scope.$watch('value[1]', updateModel);

                //Sprawdzanie poprawności pola
                function checkValidity() {
                    var isRequired = angular.isDefined(scope.required) ? scope.required : false;
                    var hasValue = scope.value && Array.isArray(scope.value) && scope.value[0] && (typeof scope.value[0] !== 'undefined') &&
                        scope.value[1] && (typeof scope.value[1] !== 'undefined') &&
                        (typeof scope.value[0] === 'string' || typeof scope.value[1] === 'string' || scope.value[0] <= scope.value[1]) ? true : false;
                    ngModelController.$setValidity('empty', !isRequired || hasValue);
                    scope.isValid = !ngModelController.$dirty || ngModelController.$valid;
                }
                scope.$watch('required', checkValidity);
                scope.$watch('min', checkValidity);
                scope.$watch('max', checkValidity);
                scope.$watch('type', function () {
                    scope.value = [null, null];
                    ngModelController.$setPristine(true);
                    checkValidity();
                });
                scope.$watch('step', checkValidity);
            }
        };
    }
    return RangeQuestion;
});