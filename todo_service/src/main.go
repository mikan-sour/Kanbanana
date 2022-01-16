package main

import (
	"fmt"

	"github.com/jedzeins/ToDoList/todo_service/src/app"
)

func main() {
	app.StartApp()
	fmt.Printf("STARTING TODO-SERVICE ON PORT %s\n", ":8080")
}
