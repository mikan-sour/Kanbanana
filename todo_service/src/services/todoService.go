package services

import (
	"fmt"

	"github.com/jedzeins/ToDoList/todo_service/src/models"
	"github.com/jedzeins/ToDoList/todo_service/src/repositories"
	"github.com/jedzeins/ToDoList/todo_service/src/utils"
)

// get all & format
func GetTodosService(user string) (*[]models.Todo, *models.ApiError) {

	rows, err := repositories.GetTodos(user)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	todos := []models.Todo{}

	for rows.Next() {
		var todo models.Todo

		if err := rows.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
			fmt.Println("err: %w", err)
			return nil, &models.ApiError{ErrorMessage: err.Error()}
		}
		todos = append(todos, todo)

	}

	return &todos, nil
}

// get one
func GetOneTodoService(id string) (*models.Todo, *models.ApiError) {
	var todo = models.Todo{}
	result := repositories.GetOneTodo(id)
	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &models.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil
}

// post

func PostTodoService(todoPost *models.Todo) (*models.Todo, *models.ApiError) {

	dueDateStr := utils.HandleNilDueDate(todoPost.DueDate)

	var todo = models.Todo{}
	result := repositories.PostTodo(todoPost, dueDateStr)

	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &models.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil

}

// patch

func UpdateTodoService(todoPost *models.Todo) (*models.Todo, *models.ApiError) {
	var todo = models.Todo{}

	result := repositories.UpdateTodo(todoPost)
	if err := result.Scan(&todo.ID, &todo.OwnerID, &todo.Title, &todo.Details, &todo.Priority, &todo.Status, &todo.OrderInColumn, &todo.DueDate, &todo.CreatedDate, &todo.ModifiedDate); err != nil {
		return nil, &models.ApiError{ErrorMessage: err.Error()}
	}

	return &todo, nil
}

// delete
func DeleteTodoService(id string) (bool, *models.ApiError) {
	res, err := repositories.DeleteTodo(id)
	if err != nil {
		return false, err
	}
	fmt.Println(res)
	return true, nil
}

// update order of todos
func UpdateOrderOfTodosService(toBeUpdatedTodos []models.TodoUpdateOrder) ([]models.TodoUpdateOrder, *models.ApiError) {

	channel := make(chan models.TodoUpdateOrder)
	go utils.HandleConcurrentUpdates(toBeUpdatedTodos, channel)

	returnTodos := []models.TodoUpdateOrder{}

	for {
		resultTodo := models.TodoUpdateOrder{}

		todo, open := <-channel
		if !open {
			break
		}
		queryResult := repositories.UpdateOrderOfTodo(&todo)
		if err := queryResult.Scan(&resultTodo.ID, &resultTodo.Status, &resultTodo.OrderInColumn); err != nil {
			return nil, &models.ApiError{ErrorMessage: err.Error()}
		}

		returnTodos = append(returnTodos, resultTodo)
	}

	return returnTodos, nil

}

// Format columns from slice of Todos
func FormatColumnsResponseService(todoSlice []models.Todo) (*models.ColumnsResponse, *models.ApiError) {
	var columnResponse = models.ColumnsResponse{}
	utils.PrepColumnResponse(&columnResponse)

	for i := 0; i < len(todoSlice); i++ {
		switch todoSlice[i].Status {
		case 1:
			columnResponse.Todo.Tasks = append(columnResponse.Todo.Tasks, todoSlice[i].ID)
		case 2:
			columnResponse.Doing.Tasks = append(columnResponse.Todo.Tasks, todoSlice[i].ID)
		case 3:
			columnResponse.Done.Tasks = append(columnResponse.Todo.Tasks, todoSlice[i].ID)
		default:
			return nil, &models.ApiError{ErrorMessage: fmt.Sprintf("Status of %s was not 1, 2, or 3", todoSlice[i].ID)}
		}
	}

	return &columnResponse, nil

}
