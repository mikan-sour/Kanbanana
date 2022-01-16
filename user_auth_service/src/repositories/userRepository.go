package repositories

import (
	"database/sql"

	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

func RegisterUser(username string, encryptedPW string, DB *sql.DB) (*models.User, *models.ApiError) {
	var (
		insertUserQueryString = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id, username, active, isadmin, created_date;"
		user                  = models.User{}
	)

	err := DB.QueryRow(insertUserQueryString, username, encryptedPW).Scan(
		&user.ID, &user.Username, &user.Active, &user.IsAdmin, &user.CreatedDate)

	if err != nil {
		return nil, &models.ApiError{ErrorMessage: err.Error()}
	}

	return &user, nil

}
