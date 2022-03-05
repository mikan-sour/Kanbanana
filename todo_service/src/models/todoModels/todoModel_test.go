package todoModels

import (
	"fmt"
	"testing"

	"github.com/jedzeins/ToDoList/todo_service/src/database"
	"github.com/stretchr/testify/require"
)

func TestGetUser(t *testing.T) {

	DB := database.InitMock()
	TestTodoDAO := TodoDAO{DB: DB}

	_, apiError := TestTodoDAO.GetTodos("aaa")
	require.NotEmpty(t, apiError)
	require.Equal(t, "pq: invalid input syntax for type uuid: \"aaa\"", apiError.ErrorMessage)

}

func TestGetUserWrongUUID(t *testing.T) {

	DB := database.InitMock()
	TestTodoDAO := TodoDAO{DB: DB}

	_, apiError := TestTodoDAO.GetTodos("fb2baf72-a1f3-4156-94de-83960ac79676")
	fmt.Println(apiError.ErrorMessage)
	require.NotEmpty(t, apiError)
	require.Equal(t, "No userID fb2baf72-a1f3-4156-94de-83960ac79676", apiError.ErrorMessage)

	// res, _ := TestTodoDAO.GetTodos("fb2baf72-a1f3-4156-94de-83960ac79675")
	// require.NotEmpty(t, res)
	// fmt.Println(res)
}
