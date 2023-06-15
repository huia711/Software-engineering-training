package models

import (
	"github.com/jinzhu/gorm"
)

// 用户基本属性
type User struct {
	gorm.Model
	Id       string `json:"id,string" db:"id"`
	Password string `json:"password" db:"password"`
	UserName string `json:"username" db:"user_name"`
	Url      string `json:"url" db:"url"`
}

// 数据表名字
func (User) TableName() string {
	return "user"
}

// 用户构造函数
func NewUser(name, password string) *User {
	return &User{
		UserName: name,
		Password: password,
	}
	//生成id。
}

// RegisterForm 注册请求参数
type RegisterForm struct {
	Id              string `form:"id"`
	UserName        string `form:"username"`
	Password        string `form:"password"`
	ConfirmPassword string `form:"confirmPassword"`
}

// 注册构造函数
func NewRegisterForm(name, password string) *RegisterForm {
	return &RegisterForm{
		UserName: name,
		Password: password,
	}
}

// LoginForm 登录请求参数
type LoginForm struct {
	Id       string `form:"id"`
	UserName string `form:"username"`
	Password string `form:"password"`
}
