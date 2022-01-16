package models

import (
	"time"
)

// this is used to get the user from the DB
// Also returned to the client

type User struct {
	ID           string    `json:"id"`
	Username     string    `json:"username"`
	IsAdmin      bool      `json:"isAdmin"`
	Active       bool      `json:"active"`
	CreatedDate  time.Time `json:"createdDate,omitempty"`
	LastLogin    time.Time `json:"lastLogin,omitempty"`
	ModifiedDate time.Time `json:"modifiedDate,omitempty"`
	AccessToken  string    `json:"accessToken,omitempty"`
	RefreshToken string    `json:"refreshToken,omitempty"`
}
