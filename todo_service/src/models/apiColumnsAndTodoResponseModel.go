package models

type ApiColumnsAndTodoResponse struct {
	Todos   *[]Todo          `json:"todos"`
	Columns *ColumnsResponse `json:"columns"`
}
