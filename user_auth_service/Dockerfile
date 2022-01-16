FROM golang:1.13

ENV REPO_URL=github.com/jedzeins/ToDoList/user_auth_service
ENV GOPATH=/app
ENV APP_PATH=$GOPATH/src/$REPO_URL
ENV WORKPATH=$APP_PATH/src

COPY src $WORKPATH

WORKDIR $WORKPATH

RUN go get github.com/lib/pq
RUN go build -o user_auth_service . 
CMD ["./user_auth_service"]