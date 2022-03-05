package todoModels

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/jedzeins/ToDoList/todo_service/src/models/apiModels"
	"github.com/jedzeins/ToDoList/todo_service/src/utils/dateUtils"
)

type Todo struct {
	ID            string    `json:"id"`
	OwnerID       string    `json:"ownerId,omitempty"`
	Title         string    `json:"title,omitempty"`
	Details       string    `json:"details,omitempty"`
	Priority      int       `json:"priority,omitempty"`
	Status        string    `json:"status,omitempty"`
	OrderInColumn int       `json:"order,omitempty"`
	DueDate       time.Time `json:"dueDate,omitempty"`
	CreatedDate   time.Time `json:"createdDate,omitempty"`
	ModifiedDate  time.Time `json:"modifiedDate,omitempty"`
}

type TodoDAO struct {
	ID string
	DB *sql.DB
}

func (t *TodoDAO) GetTodos(user string) (*sql.Rows, *apiModels.ApiError) {

	var getQuery = fmt.Sprintf("SELECT id,owner_id,title,details,priority,status,order_in_column,due_date,created_date,last_modified_date FROM todos WHERE owner_id = '%s';", user)
	rows, err := t.DB.Query(getQuery)

	if err != nil {
		return nil, &apiModels.ApiError{ErrorMessage: err.Error()}
	}

	return rows, nil
}

func (t *TodoDAO) GetOneTodo(id string) *sql.Row {
	var getQuery = "SELECT * FROM todos WHERE id = $1;"

	return t.DB.QueryRow(getQuery, id)
}

func (t *TodoDAO) PostTodo(todo *Todo, formattedDueDateString string) *sql.Row {

	var insertQuery = `
	INSERT INTO todos 
		(owner_id,title,details,priority,status, order_in_column,due_date)
		values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`

	return t.DB.QueryRow(insertQuery, todo.OwnerID, todo.Title, todo.Details, todo.Priority, todo.Status, todo.OrderInColumn, formattedDueDateString)
}

func (t *TodoDAO) DeleteTodo(id string) (bool, *apiModels.ApiError) {
	var deleteQuery = "DELETE FROM todos WHERE id=$1 RETURNING id"

	res, err := t.DB.Exec(deleteQuery, id)

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

func (t *TodoDAO) UpdateTodo(todo *Todo) *sql.Row {
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

	return t.DB.QueryRow(updateQuery, todo.Title, todo.Details, todo.Priority, todo.Status, todo.OrderInColumn, dueDate, modifiedDate, todo.ID)

}

func (t *TodoDAO) UpdateOrderOfTodo(todo *TodoUpdateOrder) *sql.Row {
	modifiedDate := dateUtils.GetModifiedDate()
	updateOrderQuery := `
	UPDATE todos SET 
	status = $1,
	order_in_column = $2,
	last_modified_date = $3
	WHERE id = $4
	RETURNING id,status,order_in_column;
	`
	return t.DB.QueryRow(updateOrderQuery, todo.Status, todo.OrderInColumn, modifiedDate, todo.ID)
}

type TodoDTO struct {
	ID            string    `json:"id"`
	OwnerID       string    `json:"ownerId,omitempty"`
	Title         string    `json:"title,omitempty"`
	Details       string    `json:"details,omitempty"`
	Priority      int       `json:"priority,omitempty"`
	Status        string    `json:"status,omitempty"`
	OrderInColumn int       `json:"order,omitempty"`
	DueDate       time.Time `json:"dueDate,omitempty"`
	CreatedDate   time.Time `json:"createdDate,omitempty"`
	ModifiedDate  time.Time `json:"modifiedDate,omitempty"`
}
