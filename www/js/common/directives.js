/**
 * Created by Administrator on 2015/11/30.
 */
(function(){
    appModule
        .directive('ionRadioSty', IonRadioStyDir) //扩展自ion-radio的指令，修改了其模版
        .directive('ionCheckSty',IonCheckStyDir) //扩展自ion-check的指令，修改了其模版
        .directive('sdDatePicker',DatePickerInputDir)//自定义的日期选择指令
        .directive('searchInput',SearchInputDir)//带有删除键的查询工具条
        ;

    /**
     * 带有删除键的查询工具条
     * @returns {*}
     * @constructor
     */
    function SearchInputDir(){
        return {
            restrict:'E',
            replace:true,
            require:'?ngModel',
            transclude: true,
            template:'<div class="button-clear item-input-inset search-bar-in" >'+
                        '<div class="item-input-wrapper input-wrapper-bg-1">'+
                            '<i class="icon ion-search placeholder-i-1"></i>'+
                            '<input class="input" type="text"/>'+
                        '</div>'+
                        '<div class="width-5">'+
                            '<span class="icon ion-close placeholder-i-1 input-del-i"></span>'+
                            '<label class="input-q-btn">查  询</label>'+
                        '</div>'+
                      '</div>',
            compile:function(element,attr){
                var label = element.find('label');
                var span= element.find('span');
                var input = element.find('input');

                //label
                if(angular.isDefined(attr.btnClick)){
                    label.attr('ng-click',attr.btnClick);
                }
                //i
                if(angular.isDefined(attr.delClick)){
                    span.attr('ng-click',attr.delClick);
                }
                if(angular.isDefined(attr.delShow)){
                    span.attr('ng-show',attr.delShow);
                }
                //input
                angular.forEach({
                    'disabled': attr.disabled,
                    'ng-model': attr.ngModel,
                    'ng-disabled': attr.ngDisabled,
                    'placeholder':attr.placeholder
                }, function(value, name) {
                    if (angular.isDefined(value)) {
                        input.attr(name, value);
                    }
                });

            }
        }

    }

    //自定义的日期选择指令
    function DatePickerInputDir(){
        return {
            restrict:'E',
            replace:true,
            require:'?ngModel',
            transclude: true,
            template:
                '<label class="item-input-wrapper">'+
                '<input class="input" type="text" readonly/>'+
                '<i class="icon ion-calendar placeholder-icon"></i>'+
                '</label>',
            compile:function(element,attr){
                //自定义日期图标
                if(attr.icon){
                    var iconElm = element.find('i');
                    iconElm.removeClass('ion-calendar').addClass(attr.icon);
                }

                var label = element.find('label');
                if(angular.isDefined(attr.ngClick)){
                    label.attr('ng-click',attr.ngClick);
                }
                if(attr.class){
                    label.addClass(attr.class);
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
                    'required': attr.required,
                    'placeholder':attr.placeholder
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
        }
    }

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
                //可自定义选中时的图标
                if (attr.icon) {
                    var iconElm = element.find('i');
                    iconElm.removeClass('checkbox-icon').addClass(attr.icon);
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
            }
        };
    }

})();
