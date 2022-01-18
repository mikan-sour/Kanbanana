package utils

import (
	"time"

	"github.com/jedzeins/ToDoList/todo_service/src/models"
)

func HandleConcurrentUpdates(toBeUpdated []models.TodoUpdateOrder, c chan models.TodoUpdateOrder) {
	for i := 0; i < len(toBeUpdated); i++ {
		c <- toBeUpdated[i]
		time.Sleep(time.Millisecond * 100)
	}
	close(c)
}

func PrepColumnResponse(columnResponse *models.ColumnsResponse) {
	columnResponse.Todo.ID = "todo"
	columnResponse.Todo.Title = "To Do"
	columnResponse.Todo.Tasks = []string{}
	columnResponse.Doing.ID = "doing"
	columnResponse.Doing.Title = "Doing"
	columnResponse.Doing.Tasks = []string{}
	columnResponse.Done.ID = "done"
	columnResponse.Done.Title = "Done"
	columnResponse.Done.Tasks = []string{}
}
