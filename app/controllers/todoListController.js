todoApp.controller('TodoListController', function TodoListController($scope, $http) {
    // $scope.msg = "Welcome to world of angular";
    $scope.form = {name: '', tags: []}
    $scope.btnText = 'Add'
    $scope.editobj = {}
    $http.get('http://localhost:3001/api/todo_items.json').then(function(res) {
        $scope.todos = res.data;
    });

    function createTodo(payload){
        $http.post('http://localhost:3001/api/todo_items.json', payload).then(function(res){
            $scope.todos.unshift(res.data)
            $scope.form = {name: '', tags: []}
        })
    }

    function updateTodo(payload) {
        $http.put('http://localhost:3001/api/todo_items/'+$scope.editobj.todo_item.id.$oid+'.json', payload).then(function(res){
            let itemIndex = $scope.todos.findIndex(elm => elm.todo_item.id.$oid == res.data.todo_item.id.$oid);
            $scope.todos[itemIndex] = res.data
            $scope.form = {name: '', tags: []}
            $scope.btnText = 'Add'
        })
    }

    $scope.submitForm = function(){
        let tags = this.form.tags.map((m) => m.text)
        if ($scope.btnText == 'Add'){
            let payload = { todo_item: {name: $scope.form.name, status: 'start', tags: tags}}
            createTodo(payload)
        } else {
            let payload = { todo_item: {name: $scope.form.name, tags: tags}}
            updateTodo(payload)
        }
        
    }

    $scope.markDelete = function(todo){
        console.log("thodo is ", todo)
        if (todo !== undefined){
            $http.put('http://localhost:3001/api/todo_items/'+todo.todo_item.id.$oid+'/mark_unmark_delete.json').then(function(res){
            $scope.todos.filter(item => {
            if (item.todo_item.id.$oid === todo.todo_item.id.$oid){
                item.todo_item.is_deleted = res.data.todo_item.is_deleted
            }
            return todo;
        });
       })
        }
       
    }

    $scope.editTodo = function(todo){
        let tags = []
        $scope.editobj = todo
        todo.todo_item.tags.map((tag) => {
            tags.push({text: tag.tag.name})
        })
        $scope.form = {name: todo.todo_item.name, tags: tags}
        $scope.btnText = 'Update'
    }
});