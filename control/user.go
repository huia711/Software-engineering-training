package control

import (
	"backend/logic"
	"backend/models"
	"backend/mysql"
	"backend/response"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	//"github.com/go-sql-driver/mysql"
)

// 注册
func RegisterHandler(c *gin.Context) {
	var userRegister *models.RegisterForm
	if err := c.ShouldBind(&userRegister); err != nil {
		response.Fail(c, nil, "注册失败")
	} else {
		//判断用户名是否存在
		var findUser models.User
		result := mysql.DB.Where("id=?", userRegister.Id).First(&findUser)
		if result.Error == nil {
			response.Fail(c, nil, "用户名已被使用!")
		} else if result.Error != nil {
			var newUser = models.User{
				Id:       userRegister.Id,
				Password: userRegister.Password,
				UserName: userRegister.UserName,
			}
			mysql.DB.Create(&newUser)
			response.Success(c, nil, "注册成功!")
		}
	}
}

// 登录
func LoginHandler(c *gin.Context) {
	var userLogin *models.LoginForm
	if err := c.ShouldBind(&userLogin); err != nil {
		response.Fail(c, nil, "登录失败")
	} else {
		var findUser models.User
		result := mysql.DB.Where("id=?", userLogin.Id).First(&findUser)
		if result.Error != nil {
			response.Fail(c, nil, "用户不存在!")
		} else if result.Error == nil {
			// 查找密码
			if findUser.Password != userLogin.Password {
				response.Fail(c, nil, "密码错误!")
			} else {
				token, err := logic.ReleaseToken(findUser) // 发放token
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"code": 500, "msg": "System err!"})
					fmt.Printf("token generate error:%v", err)
					return
				}
				response.Success(c, gin.H{"token": token, "username": findUser.UserName, "url": findUser.Url}, "登录成功!")
			}
		}
	}
}

func OnlineHandler(c *gin.Context) {

}

/*if user.ID == 0 {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"code": 422, "msg": "User not exist!"})
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil { // 判断密码是否正确
		c.JSON(http.StatusBadRequest, gin.H{"code": 400, "msg": "password err!"})
	}
	token, err := jwtpart.ReleaseToken(user) // 发放token
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"code": 500, "msg": "System err!"})
		log.Printf("token generate error:%v", err)
		return
	}
	response.Success(c, gin.H{"token": token}, "Login success!")
}*/

// 刷新token
func RefreshTokenHandler() {

}

// 获得用户信息
func UserInfoHandler() {

}
