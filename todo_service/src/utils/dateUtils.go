package utils

import (
	"strings"
	"time"
)

func HandleNilDueDate(dueDate time.Time) string {
	dueDateRaw := time.Now().Add(time.Hour * 24 * 7).UTC()
	dueDateStr := strings.Split(dueDateRaw.String(), " +")[0]

	// handle nil DueDate to default to 1 week later
	if !dueDate.IsZero() {
		dueDateStr = strings.Split(dueDate.String(), " +")[0]
	}

	return dueDateStr
}

func GetModifiedDate() string {
	now := time.Now().UTC()
	return strings.Split(now.String(), " +")[0]
}
