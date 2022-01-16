package models

import (
	"database/sql"
	"fmt"
	"time"
)

type Session struct {
	ID          string    `json:"sessionId"`
	OwnerId     string    `json:"ownerId"`
	CreatedDate time.Time `json:"createdDate"`
}

func (s *Session) CreateSession(DB *sql.DB) (*Session, *ApiError) {
	var insertSessionQuery = "INSERT INTO sessions(owner_id) VALUES('%s') RETURNING id, owner_id;"

	err := DB.QueryRow(fmt.Sprintf(insertSessionQuery, s.OwnerId)).Scan(&s.ID, &s.OwnerId)

	if err != nil {
		return nil, &ApiError{ErrorMessage: err.Error()}
	}
	return &Session{s.ID, s.OwnerId, s.CreatedDate}, nil
}
