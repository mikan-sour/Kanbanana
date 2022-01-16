package models

import "net/http"

type App struct {
	Router *http.Server
}
