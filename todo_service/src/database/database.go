package database

import (
	"database/sql"
	"fmt"
	"os/exec"
	"time"

	_ "github.com/lib/pq"
)

var (
	Host         = "localhost" // if using docker compose, should be name of service, else "localhost"
	Port         = 5434
	User         = "postgres"
	Password     = "password"
	databaseName = "postgres"
	DB           *sql.DB
)

func Initialize() error {
	time.Sleep(3 * time.Second)
	dns := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", Host, Port, User, Password, databaseName)

	var err error
	DB, err = sql.Open("postgres", dns)
	if err != nil {
		panic(err)
	}

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	return err

}

func InitMock() *sql.DB {
	time.Sleep(1 * time.Second)
	dns := fmt.Sprintf("host=%s port=%d user=%s password=%s sslmode=disable", Host, Port, User, Password)

	DB, err := sql.Open("postgres", dns)
	if err != nil {
		fmt.Errorf("err: %s", err.Error())
		return nil
	}

	exec.Command("/bin/sh", "../db_init/init_mock.sh")

	return DB

}

func MockTeardown(DB *sql.DB) {

	_, err := DB.Exec("DROP DATABASE mock")
	if err != nil {
		panic(err)
	}

	defer DB.Close()
}
