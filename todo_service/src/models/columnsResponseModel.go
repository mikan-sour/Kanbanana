package models

type Column struct {
	ID    int      `json:"id"`
	Tasks []string `json:"tasks"`
	Title string   `json:"title"`
}

type ColumnsResponse struct {
	Todo  Column `json:"todo,omitempty"`
	Doing Column `json:"doing,omitempty"`
	Done  Column `json:"done,omitempty"`
}
