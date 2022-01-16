package main

import (
	"fmt"

	"github.com/jedzeins/ToDoList/user_auth_service/src/app"
)

func main() {
	app.StartApp()
	fmt.Printf("STARTING USER-SERVICE ON PORT %s\n", ":8082")
}
