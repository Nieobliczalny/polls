define([], function () {
	//Element <select-question question="Pytanie:" required="false" multiple="true" options="model"></select-question>
	function SelectQuestion() {
		return {
			templateUrl: './views/selectquestion.html',
			scope: {
				question: '=',
				required: '=',
				multiple: '=',
				options: '='
			},
			require: 'ngModel',
			link: function (scope, iElement, iAttrs, ngModelController) {
				var select = iElement.find('select');
				select.val(null);
				scope.isValid = true;
				scope.isDirty = false;
				checkValidity(select.val());
				checkMultiple();

				//Render przy aktualizacji modelu z zewnątrz
				ngModelController.$render = function () {
					select.val(ngModelController.$viewValue);
					checkValidity();
				};

				//Aktualizacja modelu
				select.on('change', function () {
					scope.isDirty = true;
					ngModelController.$setViewValue(select.val());
					checkValidity();
				});

				//Aktualizacja wskaźników poprawności pola
				function updateValidityIndicators(valid) {
					ngModelController.$setValidity('empty', valid);
					scope.isValid = !ngModelController.$dirty || ngModelController.$valid;
				};

				//Sprawdzanie poprawności pola
				function checkValidity() {
					var value = select.val();
					var isRequired = angular.isDefined(scope.required) ? scope.required : false;
					var hasValue = false;
					if (value) {
						if (Array.isArray(value)) hasValue = value.length > 0;
						else hasValue = value.trim().length > 0;
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
					select.attr('multiple', scope.multiple === true ? 'multiple' : null);
					if (scope.multiple !== true) {
						if (select.find('#select_question_disabled_' + scope.$id).length < 1) {
							var option = document.createElement('option');
							option.setAttribute('id', 'select_question_disabled_' + scope.$id);
							option.setAttribute('disabled', 'disabled');
							option.setAttribute('selected', 'selected');
							option.setAttribute('value', '');
							option.innerHTML = 'Wybierz opcję z listy';
							select.prepend(option);
						}
					} else {
						select.find('#select_question_disabled_' + scope.$id).remove();
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
	return SelectQuestion;
});