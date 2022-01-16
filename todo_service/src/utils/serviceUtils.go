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
