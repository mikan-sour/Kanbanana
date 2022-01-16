package app

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/jedzeins/ToDoList/todo_service/src/controllers"
	"github.com/jedzeins/ToDoList/todo_service/src/models"
)

const Port = ":8080"

func makeRouter(app models.App) {
	http.HandleFunc("/health", controllers.HealthCheck)
	http.HandleFunc("/todos", controllers.TodosController)
	http.HandleFunc("/todos/update_order", controllers.UpdateTodosOrderController)

	app.Router = &http.Server{
		Addr:           Port,
		Handler:        nil,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	fmt.Println("SERVING ON PORT " + Port)
	log.Fatal(app.Router.ListenAndServe())
}
