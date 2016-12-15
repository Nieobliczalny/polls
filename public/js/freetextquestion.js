define([], function () {
	//Element <free-text-question question="Pytanie:" required="false"></free-text-question>
	function FreeTextQuestion() {
		return {
			templateUrl: './views/freetextquestion.html',
			scope: {
				question: '=',
				required: '='
			},
			require: 'ngModel',
			link: function (scope, iElement, iAttrs, ngModelController) {
				scope.value = null;
				scope.isValid = true;
				checkValidity(scope.value);

				//Render przy aktualizacji modelu z zewnątrz
				ngModelController.$render = function () {
					scope.value = ngModelController.$viewValue;
					checkValidity();
				};

				//Aktualizacja modelu
				scope.$watch('value', function () {
					ngModelController.$setViewValue(scope.value);
					checkValidity();
				});

				//Sprawdzanie poprawności pola
				function checkValidity() {
					var isRequired = angular.isDefined(scope.required) ? scope.required : false;
					var hasValue = scope.value && (typeof scope.value !== 'undefined') ? true : false;
					ngModelController.$setValidity('empty', !isRequired || hasValue);
					scope.isValid = !ngModelController.$dirty || ngModelController.$valid;
				}
				scope.$watch('required', function () {
					checkValidity();
				});
			}
		};
	}
	return FreeTextQuestion;
});