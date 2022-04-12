FROM golang:1.17

RUN mkdir /api-produtos

WORKDIR /go/src/app/api-produtos

COPY . .

RUN go mod vendor

RUN go build cmd/main.go
EXPOSE 6666

ENTRYPOINT ["./main"]