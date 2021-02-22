'use strict';

var todoApp = angular.module('angularTodo', [
    'ngRoute', 'ngTagsInput'
]);

todoApp.config(['$routeProvider',
    function($routeProvider){
        $routeProvider.
            when('/todos',{
                templateUrl: 'partials/todoList.html',
                controller: 'TodoListController'
            }).
            otherwise({
                redirectTo: '/todos'
            });
    }

])
