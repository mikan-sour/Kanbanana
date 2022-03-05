package controllers

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/jedzeins/ToDoList/user_auth_service/src/database"
	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

func Login(w http.ResponseWriter, r *http.Request) {
	// check if not post
	if r.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		w.Write([]byte("Can only send post requests"))
		return
	}

	// get username and pw from json
	decoder := json.NewDecoder(r.Body)
	var credentials models.CredentialsPost
	decodeErr := decoder.Decode(&credentials)

	if decodeErr != nil {
		msg := errors.New(fmt.Errorf("error decoding the body: %w", decodeErr).Error())
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(msg.Error()))
		return
	}

	// get user data from username and login
	var DAO = models.UserDAO{
		User: models.User{},
		DB:   database.DB,
	}
	fmt.Println(credentials.Password)
	DAO.GetUserFromUsernamePassword(credentials)
	// fmt.Println(DAO.User.ID)

	// get access token and refresh token

	// return that ish
}
