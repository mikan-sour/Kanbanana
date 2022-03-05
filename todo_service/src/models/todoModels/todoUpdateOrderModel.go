package todoModels

type TodoUpdateOrder struct {
	ID            string `json:"todoId"`
	Status        string `json:"columnId,omitempty"`
	OrderInColumn int    `json:"order,omitempty"`
}
