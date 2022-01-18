package models

import (
	"time"
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
