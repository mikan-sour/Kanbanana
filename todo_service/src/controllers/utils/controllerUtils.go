package utils

import (
	"encoding/json"
	"net/http"

	"github.com/jedzeins/ToDoList/todo_service/src/models/apiModels"
)

func ResponseError(w http.ResponseWriter, statusCode int, errMsg string) {
	var errorResponse = apiModels.ApiError{ErrorMessage: errMsg}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(errorResponse)
}

func ResponseSuccess(w http.ResponseWriter, payload interface{}, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(payload)
}
