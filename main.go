package main

import (
	"backend/mysql"
	"log"
	"net/http"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	//"github.com/sirupsen/logrus"

	"backend/config"
	"backend/models"
	_ "backend/mysql"
	"backend/router"
)

var (
	cfgFile string
	//logger  = &logrus.Logger{}
	rootCmd = &cobra.Command{}
)

func initConfig() {
	config.MustInit(os.Stdout, cfgFile) // 配置初始化
}

func init() {
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "config/dev.yaml", "config file (default is $HOME/.cobra.yaml)")
	rootCmd.PersistentFlags().Bool("debug", true, "开启debug")
	viper.SetDefault("gin.mode", rootCmd.PersistentFlags().Lookup("debug"))
}

func main() {
	if err := Execute(); err != nil {
		log.Println("start fail:", err.Error())
		os.Exit(-1)
	}
}

func Execute() error {
	rootCmd.RunE = func(cmd *cobra.Command, args []string) error {
		_, err := mysql.Init(
			viper.GetString("db.hostname"),
			viper.GetInt("db.port"),
			viper.GetString("db.username"),
			viper.GetString("db.password"),
			viper.GetString("db.dbname"),
		) // 用viper将对应的参数取出来
		if err != nil {
			return err
		}

		mysql.DB.AutoMigrate(&models.User{}) // 将数据库的表自动映射为User

		defer mysql.DB.Close() // 最后别忘了把连接关了

		r := router.SetupRouter() // 初始化路由
		err = r.Run()
		if err != nil {
			return err
		}

		port := viper.GetString("port")
		log.Println("port = *** =", port)
		return http.ListenAndServe(port, nil) // listen and serve
	}

	return rootCmd.Execute()
}
