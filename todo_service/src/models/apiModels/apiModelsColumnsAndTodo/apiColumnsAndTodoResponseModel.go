package apiModelsColumnsAndTodo

import (
	"github.com/jedzeins/ToDoList/todo_service/src/models"
	"github.com/jedzeins/ToDoList/todo_service/src/models/todoModels"
)

type ApiColumnsAndTodoResponse struct {
	Todos   *[]todoModels.Todo      `json:"todos"`
	Columns *models.ColumnsResponse `json:"columns"`
}
