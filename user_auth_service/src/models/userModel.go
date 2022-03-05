package models

import (
	"database/sql"
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

type UserDAO struct {
	User User
	DB   *sql.DB
}

func (u *UserDAO) GetUserFromUsernamePassword(creds CredentialsPost) *ApiError {
	var (
		insertUserQueryString = "SELECT * FROM users WHERE username = $1 and password = $2;"
	)

	err := u.DB.QueryRow(insertUserQueryString, creds.Username, creds.Password).Scan(
		&u.User.ID, &u.User.Username, &u.User.Active, &u.User.IsAdmin, &u.User.CreatedDate)

	if err != nil {
		return &ApiError{ErrorMessage: err.Error()}
	}

	return nil
}
