/**
 * Created by Xheldon on 16/7/19.
 */

var testApp = angular.module('testModule',[]);

testApp.controller('testController',function($scope){
    $scope.obj = [{
        name: 'a',
        sex: 'male',
        age: 9
    },{
        name: 'b',
        sex: 'female',
        age: 10
    },{
        name: 'c',
        sex: 'notmale',
        age: 11
    },{
        name: 'd',
        sex: 'notfemale',
        age: 12
    }];
    $scope.alertName = function(name){
        name.age++
    };
    $scope.selectOption = 'name';
});
