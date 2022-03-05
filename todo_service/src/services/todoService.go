package services

import (
	"fmt"

	"github.com/jedzeins/ToDoList/todo_service/src/database"
	"github.com/jedzeins/ToDoList/todo_service/src/models"
	"github.com/jedzeins/ToDoList/todo_service/src/models/apiModels"
	"github.com/jedzeins/ToDoList/todo_service/src/models/todoModels"
	"github.com/jedzeins/ToDoList/todo_service/src/services/utils"
	"github.com/jedzeins/ToDoList/todo_service/src/utils/dateUtils"
)

var (
	mocks = false
)

// get all & format
func GetTodosService(user string) (*[]todoModels.Todo, *apiModels.ApiError) {

	// rows, err := repositories.GetTodos(user)

	todoDao := todoModels.TodoDAO{
		DB: database.DB,
	}

	rows, err := todoDao.GetTodos(user)

	if err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.ErrorMessage}
	}

	todos := []todoModels.Todo{}

	for rows.Next() {
		var todo todoModels.Todo

		if err := rows.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
			fmt.Println("err: %w", err)
			return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
		}
		todos = append(todos, todo)

	}

	// if len(todos) == 0 {
	// 	return nil, &apiModels.ApiError{ErrorMessage: fmt.Sprintf("No userID %s", user)}
	// }

	defer rows.Close()

	return &todos, nil
}

// get one
func GetOneTodoService(id string) (*todoModels.Todo, *apiModels.ApiError) {
	var todo = todoModels.Todo{}
	// result := repositories.GetOneTodo(id)

	todoDao := todoModels.TodoDAO{
		DB: database.DB,
	}

	result := todoDao.GetOneTodo(id)
	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil
}

// post

func PostTodoService(todoPost *todoModels.Todo) (*todoModels.Todo, *apiModels.ApiError) {

	dueDateStr := dateUtils.HandleNilDueDate(todoPost.DueDate)

	var todo = todoModels.Todo{}

	// result := repositories.PostTodo(todoPost, dueDateStr)
	todoDao := todoModels.TodoDAO{
		DB: database.DB,
	}

	result := todoDao.PostTodo(todoPost, dueDateStr)

	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil

}

// patch

func UpdateTodoService(todoPost *todoModels.Todo) (*todoModels.Todo, *apiModels.ApiError) {
	var todo = todoModels.Todo{}

	// result := repositories.UpdateTodo(todoPost)
	todoDao := todoModels.TodoDAO{
		DB: database.DB,
	}
	result := todoDao.UpdateTodo(todoPost)

	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil
}

// delete
func DeleteTodoService(id string) (bool, *apiModels.ApiError) {
	// res, err := repositories.DeleteTodo(id)
	todoDao := todoModels.TodoDAO{
		DB: database.DB,
	}
	res, err := todoDao.DeleteTodo(id)

	if err != nil {
		return false, err
	}

	return res, nil
}

// update order of todos
func UpdateOrderOfTodosService(toBeUpdatedTodos []todoModels.TodoUpdateOrder) ([]todoModels.TodoUpdateOrder, *apiModels.ApiError) {

	channel := make(chan todoModels.TodoUpdateOrder)
	go utils.HandleConcurrentUpdates(toBeUpdatedTodos, channel)

	returnTodos := []todoModels.TodoUpdateOrder{}

	for {
		resultTodo := todoModels.TodoUpdateOrder{}

		todo, open := <-channel
		if !open {
			break
		}
		// queryResult := repositories.UpdateOrderOfTodo(&todo)
		todoDao := todoModels.TodoDAO{
			DB: database.DB,
		}

		queryResult := todoDao.UpdateOrderOfTodo(&todo)

		if err := queryResult.Scan(&resultTodo.ID, &resultTodo.Status, &resultTodo.OrderInColumn); err != nil {
			return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
		}

		returnTodos = append(returnTodos, resultTodo)
	}

	return returnTodos, nil

}

// Format columns from slice of Todos
func FormatColumnsResponseService(todoSlice []todoModels.Todo) (*models.ColumnsResponse, *apiModels.ApiError) {
	var columnResponse = models.ColumnsResponse{}
	utils.PrepColumnResponse(&columnResponse)
	for i := 0; i < len(todoSlice); i++ {
		switch todoSlice[i].Status {
		case "todo":
			columnResponse.Todo.Tasks = append(columnResponse.Todo.Tasks, todoSlice[i].ID)
		case "doing":
			columnResponse.Doing.Tasks = append(columnResponse.Doing.Tasks, todoSlice[i].ID)
		case "done":
			columnResponse.Done.Tasks = append(columnResponse.Done.Tasks, todoSlice[i].ID)
		default:
			return nil, &apiModels.ApiError{ErrorMessage: fmt.Sprintf("Status of %s was not `todo`, `doing`, or `done`", todoSlice[i].ID)}
		}
	}

	return &columnResponse, nil

}
