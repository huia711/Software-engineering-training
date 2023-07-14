-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(20) NOT NULL,
  `password` varchar(45) NOT NULL,
  `user_name` varchar(45) NOT NULL DEFAULT 'user',
  `url` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `head_url` varchar(255) DEFAULT NULL,
  `background_url` varchar(255) DEFAULT NULL,
  `alpha` double DEFAULT NULL,
  `background_color` varchar(255) DEFAULT NULL,
  `button_color` varchar(255) DEFAULT NULL,
  `custom_background_color` tinyint(4) DEFAULT '1',
  `custom_button_color` tinyint(4) DEFAULT '1',
  `preset_color` int(11) DEFAULT NULL,
  `background_alpha` double DEFAULT NULL,
  `button_alpha` double DEFAULT NULL,
  `search_item_count` int(11) DEFAULT NULL,
  `title` text,
  `icon` text,
  `text_icon` text,
  `custom` text,
  `font_color` varchar(255) DEFAULT NULL,
  `page` text,
  `record` text,
  `search_engine` varchar(255) DEFAULT NULL,
  `suggest_api` varchar(255) DEFAULT NULL,
  `open_new_page` varchar(255) DEFAULT NULL,
  `show_engine_icon` varchar(255) DEFAULT NULL,
  `show_engine_list` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `log` text,
  `date` text,
  PRIMARY KEY (`id`),
  KEY `idx_user_deleted_at` (`deleted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1','1','1','www.ddd.com www.hdfhf.com www.dsgsdgsd.com ','2023-06-15 20:19:05','2023-06-15 20:19:05',NULL,'http://localhost:2020/user/image/7298807808','http://localhost:2020/user/image/4',0.8,'#22514538','#000000',1,1,1,0.37,0.3,8,'7 1 1 ','http://www.ddd.com/favicon.ico http://www.hdfhf.com/favicon.ico http://www.dsgsdgsd.com/favicon.ico ','true false false ','true true true ','black','1 3 4 ',NULL,'Baidu','Baidu','Blank','false','true','English',NULL,NULL),('11','11','11',NULL,'2023-06-19 20:56:32','2023-06-19 20:56:32',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('111','111','111',NULL,'2023-06-21 16:34:07','2023-06-21 16:34:07',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('1111','1111','1111',NULL,'2023-06-21 18:28:42','2023-06-21 18:28:42',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('11111','11111','11111',NULL,'2023-06-21 18:31:18','2023-06-21 18:31:18',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('1671574045562245120','30','30',NULL,'2023-06-22 01:41:23','2023-06-22 01:41:23',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('1671576142374506496','555','555',NULL,'2023-06-22 01:49:43','2023-06-22 01:49:43',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('1672307512717611008','5','5',NULL,'2023-06-24 02:15:56','2023-06-24 02:15:56',NULL,'http://localhost:2020/user/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('1807038465','999','999',NULL,'2023-07-03 20:01:34','2023-07-03 20:01:34',NULL,'http://localhost:2020/user/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('2','2','2',NULL,'2023-06-15 20:19:05','2023-06-15 20:19:05',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('22','22','22',NULL,'2023-06-19 21:29:41','2023-06-19 21:29:41',NULL,'http://localhost:2020/user/image/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('4691251200','9','666',NULL,'2023-06-24 02:33:08','2023-06-24 02:33:08','2023-07-06 21:24:55','http://localhost:2020/user/1','http://localhost:2020/user/image/1',0.8,'#d9156214','#000000',1,1,-1,0.8,0.8,0,NULL,NULL,NULL,NULL,'white',NULL,NULL,'Baidu','Baidu','true','false','true','Auto',NULL,NULL),('8683426816','123456','123456','https://baidu.com/','2023-07-06 21:07:54','2023-07-06 21:07:54',NULL,'http://localhost:2020/user/1','http://localhost:2020/user/1',NULL,'#ffffff','#ffffff',1,1,100,0.8,0.8,0,'','','','','black','','','Baidu','Baidu','true','true','true','Auto',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-07  6:51:38
