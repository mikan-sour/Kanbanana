package app

import (
	"fmt"

	"github.com/jedzeins/ToDoList/user_auth_service/src/database"
	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

var App = models.App{}

func StartApp() {
	err := database.Initialize()
	if err != nil {
		fmt.Errorf("error initializing the DB w/ data: %w", err)
		return
	}

	fmt.Println("DB CONNECTED ON PORT", database.Port)

	makeRouter(App)
}
