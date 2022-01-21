package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/jedzeins/ToDoList/todo_service/src/models"
	"github.com/jedzeins/ToDoList/todo_service/src/services"
	"github.com/jedzeins/ToDoList/todo_service/src/utils"
)

func UpdateTodosOrderController(w http.ResponseWriter, r *http.Request) {
	// check if not post
	if r.Method != "POST" {
		utils.ResponseError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

	decoder := json.NewDecoder(r.Body)
	var todoPosts = []models.TodoUpdateOrder{}
	decodeErr := decoder.Decode(&todoPosts)

	if decodeErr != nil {
		utils.ResponseError(w, http.StatusInternalServerError, decodeErr.Error())
		return
	}

	res, err := services.UpdateOrderOfTodosService(todoPosts)
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
	}

	utils.ResponseSuccess(w, res, http.StatusOK)

}

func TodosController(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		handleGet(w, r)
	case "POST":
		handlePost(w, r)
	case "DELETE":
		handleDelete(w, r)
	case "PATCH":
		handlePatch(w, r)
	default:
		utils.ResponseError(w, http.StatusMethodNotAllowed, "Method not allowed")
		return
	}

}

func handlePatch(w http.ResponseWriter, r *http.Request) {

	decoder := json.NewDecoder(r.Body)
	var todoPost = models.Todo{}
	decodeErr := decoder.Decode(&todoPost)
	if decodeErr != nil {
		utils.ResponseError(w, http.StatusInternalServerError, decodeErr.Error())
		return
	}

	// submit to service
	todo, err := services.UpdateTodoService(&todoPost)

	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
		return
	}

	// response
	utils.ResponseSuccess(w, todo, http.StatusOK)

}

func handleDelete(w http.ResponseWriter, r *http.Request) {

	todoId, todoIdOk := r.URL.Query()["todo_id"]

	// case no ID
	if !todoIdOk || len(todoId) < 1 {
		utils.ResponseError(w, http.StatusInternalServerError, "Url Param 'todo_id' is missing")
		return
	}

	res, err := services.DeleteTodoService(todoId[0])

	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
		return
	}

	var apiResponse = models.ApiDeletedResponse{Deleted: res}

	utils.ResponseSuccess(w, apiResponse, http.StatusOK)

}

func handlePost(w http.ResponseWriter, r *http.Request) {

	// get the post data from the request
	decoder := json.NewDecoder(r.Body)
	var todoPost = models.Todo{}
	decodeErr := decoder.Decode(&todoPost)
	if decodeErr != nil {
		utils.ResponseError(w, http.StatusInternalServerError, decodeErr.Error())
		return
	}

	// submit to service
	todo, err := services.PostTodoService(&todoPost)

	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
		return
	}

	utils.ResponseSuccess(w, todo, http.StatusCreated)

}

func handleGet(w http.ResponseWriter, r *http.Request) {
	todoId, todoIdOk := r.URL.Query()["todo_id"]
	ownerId, ownerIdOk := r.URL.Query()["owner_id"]

	// case neither
	if (!ownerIdOk && !todoIdOk) || (len(ownerId) < 1 && len(todoId) < 1) {
		utils.ResponseError(w, http.StatusInternalServerError, "Url Param 'owner_id' and 'todo_id' is missing")
		return
	}

	// case both
	if (ownerIdOk && todoIdOk) || (len(ownerId) > 0 && len(todoId) > 0) {
		utils.ResponseError(w, http.StatusInternalServerError, "Url Param 'owner_id' and 'todo_id' are both present, which is bad...")
		return
	}

	if ownerIdOk {
		todos, err := services.GetTodosService(ownerId[0])

		if err != nil {
			utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
			return
		}

		columns, err := services.FormatColumnsResponseService(*todos)
		if err != nil {
			utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
			return
		}

		var apiResponse = models.ApiColumnsAndTodoResponse{Todos: todos, Columns: columns}

		utils.ResponseSuccess(w, apiResponse, http.StatusOK)

	} else {

		todo, err := services.GetOneTodoService(todoId[0])

		if err != nil {
			utils.ResponseError(w, http.StatusInternalServerError, err.ErrorMessage)
			return
		}

		utils.ResponseSuccess(w, todo, http.StatusOK)

	}
}
