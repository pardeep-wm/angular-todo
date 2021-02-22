'use strict';

describe('Todo app  controllers', function(){
    beforeEach(module('angularTodo'));
    beforeEach(module('partials/todoList.html'));

    describe('TodoListController', function(){
        var scope, ctrl, $httpBackend, todo;

        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller){
            $httpBackend = _$httpBackend_;
            
            $httpBackend.expectGET('http://localhost:3001/api/todo_items.json')
            .respond([{todo_item: {name: 'test 1', status: 'started'}}, 
                      {todo_item: {name: 'test 2', status: 'not start'}}]);

            scope = $rootScope.$new();
            ctrl = $controller('TodoListController', {$scope: scope});
            todo = {todo_item: { id: {$oid: '1234'}, name: 'test1', tags: [], is_deleted: false}}
        }));

        it('should create a `todos` model with 2 todos', inject(function(){

            expect(scope.todos).toBeUndefined();
            $httpBackend.flush();
    
            expect(scope.todos).toEqual([{todo_item: {name: 'test 1', status: 'started'}}, {todo_item: {name: 'test 2', status: 'not start'}}])
        }));

        it('shold call markDelete method', inject(function(){
            let respose = {todo_item: { id: {$oid: '1234'}, name: 'test1', tags: [], is_deleted: true}}
            spyOn(scope, 'markDelete').withArgs(todo).and.returnValue(respose)
            let result = scope.markDelete(todo);
            
            expect(scope.markDelete).toHaveBeenCalled()
            expect(scope.markDelete).toHaveBeenCalledWith(todo)
            expect(result.todo_item.is_deleted).toEqual(true)
        }));

        it('should call editTodo method', inject(function(){
            let respose = {todo_item: { id: {$oid: '1234'}, name: 'edited', tags: [], is_deleted: true}}
            spyOn(scope, 'editTodo').withArgs(todo).and.returnValue(respose)

            let result = scope.editTodo(todo);
            expect(scope.editTodo).toHaveBeenCalled()
            expect(scope.editTodo).toHaveBeenCalledOnceWith(todo)
            expect(result.todo_item.name).toEqual('edited')
        }));

        it('should call submitForm method', inject(function(){
            spyOn(scope, 'submitForm')

            scope.submitForm();
            expect(scope.submitForm).toHaveBeenCalled()
        }));
    })
});