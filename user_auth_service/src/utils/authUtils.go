package utils

import (
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func SetRefreshTokenCookie(payload string, w http.ResponseWriter) {
	refreshTokenCookie := &http.Cookie{
		Name:     "jlpt",
		Value:    payload,
		HttpOnly: true,
		Secure:   true,
		Expires:  time.Now().Add(time.Hour * 24 * 7),
	}
	http.SetCookie(w, refreshTokenCookie)
}
