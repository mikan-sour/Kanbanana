package repositories

import (
	"database/sql"
	"fmt"

	"github.com/jedzeins/ToDoList/todo_service/src/database"
	"github.com/jedzeins/ToDoList/todo_service/src/models/apiModels"
	"github.com/jedzeins/ToDoList/todo_service/src/models/todoModels"
	"github.com/jedzeins/ToDoList/todo_service/src/utils/dateUtils"
)

func GetTodos(user string) (*sql.Rows, *apiModels.ApiError) {

	var getQuery = fmt.Sprintf("SELECT id,owner_id,title,details,priority,status,order_in_column,due_date,created_date,last_modified_date FROM todos WHERE owner_id = '%s';", user)
	rows, err := database.DB.Query(getQuery)

	if err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	return rows, nil
}

func GetOneTodo(id string) *sql.Row {
	var getQuery = "SELECT * FROM todos WHERE id = $1;"

	return database.DB.QueryRow(getQuery, id)
}

// insert into (post)
func PostTodo(todo *todoModels.Todo, formattedDueDateString string) *sql.Row {

	var insertQuery = `
	INSERT INTO todos 
		(owner_id,title,details,priority,status, order_in_column,due_date)
		values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`

	return database.DB.QueryRow(insertQuery, todo.OwnerID, todo.Title, todo.Details, todo.Priority, todo.Status, todo.OrderInColumn, formattedDueDateString)
}

// delete todo
func DeleteTodo(id string) (bool, *apiModels.ApiError) {
	var deleteQuery = "DELETE FROM todos WHERE id=$1 RETURNING id"

	res, err := database.DB.Exec(deleteQuery, id)

	if err != nil {
		return false, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return false, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	if rowsAffected == 0 {
		return false, &apiModels.ApiError{ErrorMessage: fmt.Sprintf("ID %s not in DB, no rows deleted", id)}
	}

	return true, nil

}

// PATCH
func UpdateTodo(todo *todoModels.Todo) *sql.Row {
	modifiedDate := dateUtils.GetModifiedDate()
	dueDate := dateUtils.HandleNilDueDate(todo.DueDate)
	updateQuery := `UPDATE todos SET 
	title = $1,
	details = $2,
	priority = $3,
	status = $4,
	order_in_column = $5,
	due_date = $6,
	last_modified_date = $7
	WHERE id = $8
	RETURNING *;
	`

	return database.DB.QueryRow(updateQuery, todo.Title, todo.Details, todo.Priority, todo.Status, todo.OrderInColumn, dueDate, modifiedDate, todo.ID)

}

func UpdateOrderOfTodo(todo *todoModels.TodoUpdateOrder) *sql.Row {
	modifiedDate := dateUtils.GetModifiedDate()
	updateOrderQuery := `
	UPDATE todos SET 
	status = $1,
	order_in_column = $2,
	last_modified_date = $3
	WHERE id = $4
	RETURNING id,status,order_in_column;
	`
	return database.DB.QueryRow(updateOrderQuery, todo.Status, todo.OrderInColumn, modifiedDate, todo.ID)
}
