package models

type TodoUpdateOrder struct {
	ID            string `json:"id"`
	Status        int    `json:"status,omitempty"`
	OrderInColumn int    `json:"order,omitempty"`
}
