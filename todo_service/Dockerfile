FROM golang:1.13

ENV REPO_URL=github.com/jedzeins/ToDoList/todo_service
ENV GOPATH=/app
ENV APP_PATH=$GOPATH/src/$REPO_URL
ENV WORKPATH=$APP_PATH/src

COPY src $WORKPATH

WORKDIR $WORKPATH

RUN go get github.com/lib/pq
RUN go build -o todo_service . 
CMD ["./todo_service"]