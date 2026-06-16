CREATE DATABASE  IF NOT EXISTS `chat_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chat_project`;
-- MySQL dump 10.13  Distrib 8.0.44, for macos15 (arm64)
--
-- Host: localhost    Database: chat_project
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'd434042c-d392-11f0-bda5-9ac305cefb81:1-428';

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` varchar(36) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES ('3c5e77c2-af31-4018-be94-8bf3602ba9e7','2026-06-16 20:48:05'),('test-1','2026-06-16 20:46:13');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(36) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `content` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `conversation_id` (`conversation_id`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'test-1','user','היי מה קורה קוראים לי שי?','2026-06-16 20:46:13'),(2,'test-1','assistant','היי שי! מה שלומך? איך אני יכול לעזור לך היום?','2026-06-16 20:46:15'),(3,'test-1','user','איך קוראים לי','2026-06-16 20:47:18'),(4,'test-1','assistant','קוראים לך שי. איך אני יכול לעזור לך היום, שי?','2026-06-16 20:47:19'),(5,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','user','hello chat can u tell me about water','2026-06-16 20:48:05'),(6,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','assistant','Of course! Water is a vital substance for all forms of life on Earth. Here are some key points about water:\n\n1. **Chemical Composition**: Water is a polar molecule composed of two hydrogen atoms covalently bonded to one oxygen atom (H₂O). This unique structure gives water many of its important properties.\n\n2. **States of Matter**: Water can exist in three states—liquid, solid (ice), and gas (water vapor). It can transition between these states through processes like melting, freezing, evaporation, and condensation.\n\n3. **Physical Properties**: Water has a high specific heat capacity, which means it can absorb and store large amounts of heat without significantly changing temperature. It also has a high surface tension and is known as the \"universal solvent\" because it can dissolve a wide range of substances.\n\n4. **Importance for Life**: Water is essential for biological processes. It serves as a solvent for biochemical reactions, helps regulate temperature in organisms, and plays a crucial role in transporting nutrients and waste in living systems.\n\n5. **Hydrological Cycle**: Water is continuously cycled through the environment in a process known as the hydrological cycle. This includes evaporation, precipitation, infiltration, runoff, and transpiration.\n\n6. **Freshwater Sources**: While about 71% of the Earth\'s surface is covered by water, only about 2.5% of it is freshwater, and much of that is trapped in glaciers and ice caps. The remaining accessible freshwater is found in rivers, lakes, and underground aquifers.\n\n7. **Human Use**: Water is critical for drinking, agricultural irrigation, sanitation, and industrial processes. Access to clean and safe drinking water is essential for public health.\n\n8. **Environmental Issues**: Water pollution, over-extraction of freshwater resources, and climate change are significant concerns that affect water availability and quality globally.\n\n9. **Cultural Significance**: Water holds cultural and spiritual significance in many societies, often symbolizing life, purity, and renewal.\n\nIf you have specific questions or topics about water you\'d like to explore further, feel free to ask!','2026-06-16 20:48:14'),(7,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','user','do you think water is healthy?','2026-06-16 20:48:39'),(8,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','assistant','Yes, water is essential for health and supports various bodily functions. Here are several reasons why water is considered healthy:\n\n1. **Hydration**: Water is the primary component of the human body, making up about 60% of body weight. Staying hydrated helps maintain bodily functions, including digestion, circulation, temperature regulation, and waste elimination.\n\n2. **Nutrient Transport**: Water aids in the transportation of nutrients to cells and the removal of waste products. It helps dissolve vitamins, minerals, and other nutrients, making them more accessible for absorption.\n\n3. **Temperature Regulation**: Water helps regulate body temperature through sweating and respiration. When the body heats up, water evaporates from the skin, cooling the body down.\n\n4. **Joint Lubrication**: Water is a key component of synovial fluid, which lubricates joints and helps reduce friction, allowing for smoother movement and reducing the risk of injury.\n\n5. **Digestion and Metabolism**: Water is vital for digestion and helps prevent constipation by keeping the digestive system functioning properly. It also plays a role in metabolic processes, such as converting food into energy.\n\n6. **Weight Management**: Drinking water can aid in weight management. It has no calories and can be consumed before meals to help create a feeling of fullness, potentially leading to reduced calorie intake.\n\n7. **Mood and Cognitive Function**: Adequate hydration is linked to improved mood, cognitive function, and physical performance. Dehydration can lead to fatigue, confusion, and decreased alertness.\n\n8. **Skin Health**: Proper hydration contributes to skin health by helping maintain moisture and elasticity, which can enhance overall appearance.\n\nWhile water is vital for health, it is also important to consume it in appropriate amounts. Individual needs can vary based on factors like age, activity level, climate, and overall health. Drinking too much water in a short period can lead to water intoxication or hyponatremia, a dangerous condition caused by an imbalance of electrolytes.\n\nOverall, regular consumption of safe, clean water is fundamental to maintaining good health.','2026-06-16 20:48:47'),(9,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','user','what it taste like','2026-06-16 20:49:10'),(10,'3c5e77c2-af31-4018-be94-8bf3602ba9e7','assistant','The taste of water is generally described as neutral, but there can be variations based on several factors, including:\n\n1. **Source**: Tap water, bottled water, and natural sources (like rivers or lakes) can taste different due to the minerals and impurities present. For example:\n   - **Tap water** may have a slight taste due to chlorine, fluoride, or minerals like calcium and magnesium.\n   - **Spring water** can have a fresh, clean taste, often attributed to the minerals it contains.\n   - **Distilled water** is very pure, typically having a flat, slightly bland taste because most minerals have been removed.\n\n2. **Temperature**: The temperature of water can also affect its taste. Cold water is often perceived as more refreshing, while warm water may have a more pronounced flavor profile, sometimes allowing any impurities to be tasted more easily.\n\n3. **Contaminants**: If water is contaminated with substances like sediment, chemicals, or bacteria, it can develop off-putting tastes or odors.\n\n4. **Personal Sensitivity**: People have different sensitivities to taste. Some individuals may be more attuned to certain minerals or contaminants, affecting their perception of water’s taste.\n\nOverall, the best-quality water is typically perceived as clean and refreshing, with little to no taste.','2026-06-16 20:49:14');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'chat_project'
--

--
-- Dumping routines for database 'chat_project'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-16 20:52:14
