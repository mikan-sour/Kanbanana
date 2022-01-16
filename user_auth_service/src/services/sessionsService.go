package services

import (
	"github.com/jedzeins/ToDoList/user_auth_service/src/database"
	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

func RegisterSession(ownerId string) (*models.Session, *models.ApiError) {

	s := models.Session{OwnerId: ownerId}

	// should this be with a repo? probably
	session, err := s.CreateSession(database.DB)

	if err != nil {
		return nil, err
	}

	return session, nil

}
