package models

type Cliente struct {
	ID   int    `json:"id" gorm:"column:id"`
	Nome string `json:"nome" gorm:"column:nome"`
	Cpf  string `json:"cpf" gorm:"column:cpf"`
	Rfid string `json:"rfid" gorm:"column:rfid"`
}
