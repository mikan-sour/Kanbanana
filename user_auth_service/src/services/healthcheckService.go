package services

import (
	"time"

	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

func HealthcheckService() models.HealthCheck {
	t := time.Now().Unix()
	tm := time.Unix(t, 0)

	return models.HealthCheck{
		Status: "User Service is Good! 順調している！",
		Time:   tm,
	}
}
