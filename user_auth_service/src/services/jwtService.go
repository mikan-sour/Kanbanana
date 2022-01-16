package services

import (
	"time"

	//"github.com/golang-jwt/jwt"
	"github.com/dgrijalva/jwt-go"
	"github.com/jedzeins/ToDoList/user_auth_service/src/models"
)

var (
	secret1 = []byte("3456yujhgfde4%^&YG")
	secret2 = []byte("<MnbgyUIJKmnhy&*IK")
)

func GenerateSignedTokens(ownerId string, sessionId string) (string, string, *models.ApiError) {

	expTimeRT := time.Now().Add(time.Hour * 24 * 7).Unix()
	expTimeAT := time.Now().Add(time.Minute * 15).Unix()

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sessionId": sessionId,
		"nbf":       expTimeRT,
	})

	refreshTokenString, err := refreshToken.SignedString(secret1)

	if err != nil {
		return "", "", &models.ApiError{ErrorMessage: err.Error()}
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"ownerId":   ownerId,
		"sessionId": sessionId,
		"nbf":       expTimeAT,
	})

	accessTokenString, err := accessToken.SignedString(secret2)

	if err != nil {
		return "", "", &models.ApiError{ErrorMessage: err.Error()}
	}

	return refreshTokenString, accessTokenString, nil

}
