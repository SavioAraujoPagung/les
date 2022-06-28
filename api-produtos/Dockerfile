FROM golang:1.17 as builder

RUN mkdir /api-produtos

WORKDIR /go/src/app/api-produtos

COPY . .

RUN go mod vendor

RUN go build cmd/main.go
EXPOSE 6666

ENTRYPOINT ["./main"]

FROM scratch
COPY --from=builder /usr/src/app/main .
ENTRYPOINT ["./main"]