package app

import (
	"fmt"

	"github.com/jedzeins/ToDoList/todo_service/src/database"
	"github.com/jedzeins/ToDoList/todo_service/src/models"
)

var App = models.App{}

func StartApp() {

	err := database.Initialize()
	if err != nil {
		fmt.Errorf("error initializing the DB w/ data: %w", err)
		return
	}

	fmt.Printf("DB CONNECTED ON PORT :%d\n", database.Port)

	makeRouter(App)
}
