package services

import (
	"time"

	"github.com/jedzeins/ToDoList/todo_service/src/models"
)

func HealthcheckService() models.HealthCheck {
	t := time.Now().Unix()
	tm := time.Unix(t, 0)

	return models.HealthCheck{
		Status: "Todo Service is Good! 順調している！",
		Time:   tm,
	}
}
