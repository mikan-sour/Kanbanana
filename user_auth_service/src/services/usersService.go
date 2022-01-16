package services

import (
	"errors"

	"github.com/jedzeins/ToDoList/user_auth_service/src/database"
	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
	"github.com/jedzeins/ToDoList/user_auth_service/src/repositories"
	"github.com/jedzeins/ToDoList/user_auth_service/src/utils"
)

func RegisterUser(creds models.CredentialsPost) (*models.User, *models.ApiError) {
	// check length of username and pw

	if len(creds.Username) < 6 || len(creds.Username) > 20 {
		lenErr := errors.New("username must be between 6 and 20 characters")
		return nil, &models.ApiError{ErrorMessage: lenErr.Error()}
	}

	if len(creds.Password) < 6 || len(creds.Password) > 20 {
		lenErr := errors.New("password must be between 6 and 20 characters")
		return nil, &models.ApiError{ErrorMessage: lenErr.Error()}
	}

	// hash pw

	hash, hashErr := utils.HashPassword(creds.Password)

	if hashErr != nil {
		return nil, &models.ApiError{ErrorMessage: hashErr.Error()}
	}

	// save in database

	user, err := repositories.RegisterUser(creds.Username, hash, database.DB)

	if err != nil {
		return nil, err
	}

	return user, nil

}
