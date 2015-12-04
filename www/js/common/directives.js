/**
 * Created by Administrator on 2015/11/30.
 */
(function(){
    appModule
        .directive('ionRadioSty', IonRadioStyDir) //扩展自ion-radio的指令，修改了其模版
        .directive('ionCheckSty',IonCheckStyDir) //扩展自ion-check的指令，修改了其模版
        ;

    //扩展自ion-radio的指令，修改了其模版
    function IonRadioStyDir(){
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            transclude: true,
            template:
                '<label class="item item-checkbox">' +
                '<div class="checkbox checkbox-input-hidden disable-pointer-events">' +
                '<input type="radio" name="radio-group">' +
                '<i class="checkbox-icon"></i>' +
                '</div>' +
                '<div class="item-content disable-pointer-events" ng-transclude></div>' +
                '</label>',
            compile: function(element, attr) {
                if (attr.icon) {
                    var iconElm = element.find('i');
                    iconElm.removeClass('ion-checkmark').addClass(attr.icon);
                }

                var input = element.find('input');
                angular.forEach({
                    'name': attr.name,
                    'value': attr.value,
                    'disabled': attr.disabled,
                    'ng-value': attr.ngValue,
                    'ng-model': attr.ngModel,
                    'ng-disabled': attr.ngDisabled,
                    'ng-change': attr.ngChange,
                    'ng-required': attr.ngRequired,
                    'required': attr.required
                }, function(value, name) {
                    if (angular.isDefined(value)) {
                        input.attr(name, value);
                    }
                });

                return function(scope, element, attr) {
                    scope.getValue = function() {
                        return scope.ngValue || attr.value;
                    };
                };
            }
        };
    }

    //扩展自ion-check的指令，修改了其模版
    function IonCheckStyDir(){
        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            transclude: true,
            template:
                '<label class="item item-radio">' +
                '<input type="checkbox" >' +
                '<div class="radio-content">' +
                '<div class="item-content disable-pointer-events" ng-transclude></div>' +
                '<i class="radio-icon disable-pointer-events icon ion-checkmark"></i>' +
                '</div>' +
                '</label>',
            compile: function(element, attr) {
                var input = element.find('input');
                angular.forEach({
                    'name': attr.name,
                    'ng-value': attr.ngValue,
                    'ng-model': attr.ngModel,
                    'ng-checked': attr.ngChecked,
                    'ng-disabled': attr.ngDisabled,
                    'ng-true-value': attr.ngTrueValue,
                    'ng-false-value': attr.ngFalseValue,
                    'ng-change': attr.ngChange,
                    'ng-required': attr.ngRequired,
                    'required': attr.required
                }, function(value, name) {
                    if (angular.isDefined(value)) {
                        input.attr(name, value);
                    }
                });
                var checkboxWrapper = element[0].querySelector('.checkbox');
                checkboxWrapper.classList.add('checkbox-' + $ionicConfig.form.checkbox());
            }
        };
    }

})();
