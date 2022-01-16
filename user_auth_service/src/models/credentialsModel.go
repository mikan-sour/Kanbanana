package models

// sent from client to BE

type CredentialsPost struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
