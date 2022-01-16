package models

import "time"

type HealthCheck struct {
	Status string    `json:"status"`
	Time   time.Time `json:"currentTime"`
}
