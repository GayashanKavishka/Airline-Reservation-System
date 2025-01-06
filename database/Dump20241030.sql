-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: bairways
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `Admin_ID` varchar(30) NOT NULL,
  `Password` varchar(30) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Last_logging_time` datetime DEFAULT NULL,
  PRIMARY KEY (`Admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','123','BAir','2024-10-24 15:33:21');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aircraft`
--

DROP TABLE IF EXISTS `aircraft`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraft` (
  `Aircraft_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Model_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Aircraft_ID`),
  KEY `Model_ID` (`Model_ID`),
  CONSTRAINT `aircraft_ibfk_1` FOREIGN KEY (`Model_ID`) REFERENCES `aircraft_model` (`Model_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,1),(2,1),(3,1),(4,2),(5,2),(6,2),(7,2),(8,3);
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aircraft_model`
--

DROP TABLE IF EXISTS `aircraft_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aircraft_model` (
  `Model_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Model_name` varchar(10) DEFAULT NULL,
  `EconomyClassSeatCount` int(11) DEFAULT NULL,
  `BusinessClassSeatCount` int(11) DEFAULT NULL,
  `PlatinumClassSeatCount` int(11) DEFAULT NULL,
  PRIMARY KEY (`Model_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aircraft_model`
--

LOCK TABLES `aircraft_model` WRITE;
/*!40000 ALTER TABLE `aircraft_model` DISABLE KEYS */;
INSERT INTO `aircraft_model` VALUES (1,'B737',150,20,10),(2,'B757',180,25,15),(3,'A380',400,50,20);
/*!40000 ALTER TABLE `aircraft_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `aircraftflightschedule`
--

DROP TABLE IF EXISTS `aircraftflightschedule`;
/*!50001 DROP VIEW IF EXISTS `aircraftflightschedule`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `aircraftflightschedule` AS SELECT 
 1 AS `Flight_ID`,
 1 AS `Route_ID`,
 1 AS `Departure_date_time`,
 1 AS `Expected_arrival_date_time`,
 1 AS `Flight_price`,
 1 AS `Created_By`,
 1 AS `Created_time`,
 1 AS `Modified_by`,
 1 AS `Modified_time`,
 1 AS `Model_name`,
 1 AS `EconomyClassSeatCount`,
 1 AS `BusinessClassSeatCount`,
 1 AS `PlatinumClassSeatCount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `airport`
--

DROP TABLE IF EXISTS `airport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airport` (
  `Airport_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Short_code` varchar(10) DEFAULT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Country` varchar(30) DEFAULT NULL,
  `State` varchar(30) DEFAULT NULL,
  `City` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`Airport_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES (1,'CGK','Soekarno-Hatta Intl','Indonesia','Jakarta','Jakarta'),(2,'DPS','Ngurah Rai Intl','Indonesia','Bali','Denpasar'),(3,'BIA','Bandaranaike Intl','Sri Lanka','Western Province','Colombo'),(4,'HRI','Mattala Rajapaksa Intl','Sri Lanka','Southern Province','Hambantota'),(5,'DEL','Indira Gandhi Intl','India','Delhi','New Delhi'),(6,'BOM','Chhatrapati  Maharaj','India','Maharashtra','Mumbai'),(7,'MAA','Chennai Intl','India','Tamil Nadu','Chennai'),(8,'BKK','Suvarnabhumi Airport','Thailand','Bangkok','Bangkok'),(9,'DMK','Don Mueang Intl','Thailand','Bangkok','Bangkok'),(10,'SIN','Singapore Changi Airport','Singapore','Singapore','Singapore'),(11,'JIA','Jaffna Int','Sri Lanka','North province','Jaffna');
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `Class_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ClassType` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`Class_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Economy'),(2,'Business'),(3,'Platinum');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `country` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`country`,`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('India','Delhi','New Delhi'),('India','Maharashtra','Mumbai'),('India','Tamil Nadu','Chennai'),('Indonesia','Bali','Denpasar'),('Indonesia','Jakarta','Jakarta'),('Singapore','Central Singapore','Singapore'),('Sri Lanka','North Province','Jaffna'),('Sri Lanka','Southern Province','Mattala'),('Sri Lanka','Western Province','Colombo'),('Thailand','Bangkok Metropolitan','Don Mueang'),('Thailand','Bangkok state','Bangkok');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `flightdiscountedprices`
--

DROP TABLE IF EXISTS `flightdiscountedprices`;
/*!50001 DROP VIEW IF EXISTS `flightdiscountedprices`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `flightdiscountedprices` AS SELECT 
 1 AS `Flight_ID`,
 1 AS `Reward_class`,
 1 AS `Discounted_Price`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `flightrevenuebyaircraft`
--

DROP TABLE IF EXISTS `flightrevenuebyaircraft`;
/*!50001 DROP VIEW IF EXISTS `flightrevenuebyaircraft`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `flightrevenuebyaircraft` AS SELECT 
 1 AS `Model_name`,
 1 AS `TotalRevenue`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `flightschedule`
--

DROP TABLE IF EXISTS `flightschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flightschedule` (
  `Flight_ID` varchar(7) NOT NULL,
  `Route_ID` int(11) DEFAULT NULL,
  `Aircraft_ID` int(11) DEFAULT NULL,
  `Departure_date_time` datetime DEFAULT NULL,
  `Expected_arrival_date_time` datetime DEFAULT NULL,
  `Flight_price` float DEFAULT NULL,
  `Created_By` varchar(20) DEFAULT NULL,
  `Created_time` date DEFAULT NULL,
  `Modified_by` varchar(20) DEFAULT NULL,
  `Modified_time` datetime DEFAULT NULL,
  PRIMARY KEY (`Flight_ID`),
  KEY `Route_ID` (`Route_ID`),
  KEY `Aircraft_ID` (`Aircraft_ID`),
  KEY `Created_By` (`Created_By`),
  KEY `Modified_by` (`Modified_by`),
  CONSTRAINT `flightschedule_ibfk_1` FOREIGN KEY (`Route_ID`) REFERENCES `route` (`Route_ID`),
  CONSTRAINT `flightschedule_ibfk_2` FOREIGN KEY (`Aircraft_ID`) REFERENCES `aircraft` (`Aircraft_ID`),
  CONSTRAINT `flightschedule_ibfk_3` FOREIGN KEY (`Created_By`) REFERENCES `admin` (`Admin_ID`),
  CONSTRAINT `flightschedule_ibfk_4` FOREIGN KEY (`Modified_by`) REFERENCES `admin` (`Admin_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flightschedule`
--

LOCK TABLES `flightschedule` WRITE;
/*!40000 ALTER TABLE `flightschedule` DISABLE KEYS */;
INSERT INTO `flightschedule` VALUES ('FL001',1,1,'2024-10-25 02:30:00','2024-10-25 04:30:00',120,'admin','2024-10-24','admin','2024-10-30 12:25:02'),('FL002',2,2,'2024-10-26 09:00:00','2024-10-26 11:30:00',180,'admin','2024-10-24',NULL,NULL),('FL003',3,3,'2024-10-27 07:45:00','2024-10-27 11:45:00',300,'admin','2024-10-24',NULL,NULL),('FL004',4,4,'2024-10-28 06:30:00','2024-10-28 12:30:00',400,'admin','2024-10-24',NULL,NULL),('FL005',5,5,'2024-10-29 14:00:00','2024-10-29 16:00:00',220,'admin','2024-10-24',NULL,NULL),('FL006',6,6,'2024-10-30 15:00:00','2024-10-30 18:00:00',320,'admin','2024-10-24',NULL,NULL),('FL007',7,7,'2024-10-31 12:30:00','2024-10-31 17:30:00',500,'admin','2024-10-24',NULL,NULL),('FL008',1,1,'2024-10-28 08:00:00','2024-10-29 10:00:00',150,'admin','2024-10-24',NULL,NULL),('FL009',2,2,'2024-10-16 01:15:00','2024-10-16 13:15:00',200,'admin','2024-10-30',NULL,NULL),('FL010',1,1,'2024-10-16 01:16:00','2024-10-16 13:19:00',200,'admin','2024-10-30',NULL,NULL);
/*!40000 ALTER TABLE `flightschedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER check_flight_schedule_before_insert
BEFORE INSERT ON FlightSchedule
FOR EACH ROW
BEGIN
    DECLARE duplicate_count INT;
    DECLARE conflicting_flights INT;

    -- Check for duplicate flight schedule
    SELECT COUNT(*)
    INTO duplicate_count
    FROM FlightSchedule
    WHERE Route_ID = NEW.Route_ID
    AND Aircraft_ID = NEW.Aircraft_ID
    AND Departure_date_time = NEW.Departure_date_time
    AND Expected_arrival_date_time = NEW.Expected_arrival_date_time;

    IF duplicate_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Duplicate flight schedule: This flight schedule already exists.';
    END IF;

    -- Check for aircraft availability conflicts
    SELECT COUNT(*)
    INTO conflicting_flights
    FROM FlightSchedule
    WHERE Aircraft_ID = NEW.Aircraft_ID
    AND (
        (NEW.Departure_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
        OR
        (NEW.Expected_arrival_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
    );

    IF conflicting_flights > 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Aircraft is already assigned to another flight at the same time.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER CheckAircraftScheduleConflict
BEFORE UPDATE ON flightschedule
FOR EACH ROW
BEGIN
    DECLARE conflict_count INT;

    -- Check for conflicts in other scheduled flights using the same aircraft
    SELECT COUNT(*) INTO conflict_count
    FROM flightschedule
    WHERE Aircraft_ID = NEW.Aircraft_ID
      AND Flight_ID != NEW.Flight_ID
      AND (
            (NEW.Departure_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
            OR 
            (NEW.Expected_arrival_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
            OR 
            (Departure_date_time BETWEEN NEW.Departure_date_time AND NEW.Expected_arrival_date_time)
            OR 
            (Expected_arrival_date_time BETWEEN NEW.Departure_date_time AND NEW.Expected_arrival_date_time)
      );

    -- Raise an error if there is a conflict
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Aircraft is already scheduled for another flight in the specified time period';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `passenger`
--

DROP TABLE IF EXISTS `passenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passenger` (
  `Passenger_ID` int(11) NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(50) DEFAULT NULL,
  `SecondName` varchar(50) DEFAULT NULL,
  `Country` varchar(50) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Phone_number` varchar(20) DEFAULT NULL,
  `Num_of_booking` int(11) DEFAULT NULL,
  PRIMARY KEY (`Passenger_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (1,'John','Doe','USA','1985-05-12','123 Elm St','New York','john.doe@example.com','Male','1234567890',5),(2,'Jane','Smith','Canada','1992-09-23','456 Oak St','Toronto','jane.smith@example.com','Female','1234567891',3),(3,'Michael','Johnson','Australia','1978-02-15','789 Pine St','Sydney','michael.johnson@example.com','Male','1234567892',8),(4,'Emily','Davis','UK','1995-07-07','101 Maple St','London','emily.davis@example.com','Female','1234567893',2),(5,'Robert','Brown','USA','1980-12-03','202 Cedar St','Los Angeles','robert.brown@example.com','Male','1234567894',10),(6,'Olivia','Garcia','Spain','1990-08-29','303 Birch St','Madrid','olivia.garcia@example.com','Female','1234567895',4),(7,'David','Martinez','Mexico','1982-11-15','404 Walnut St','Mexico City','david.martinez@example.com','Male','1234567896',7),(8,'Sophia','Miller','Germany','1988-03-11','505 Ash St','Berlin','sophia.miller@example.com','Female','1234567897',1),(9,'Daniel','Wilson','France','1993-06-22','606 Poplar St','Paris','daniel.wilson@example.com','Male','1234567898',5),(10,'Isabella','Lopez','Italy','1997-01-30','707 Spruce St','Rome','isabella.lopez@example.com','Female','1234567899',6),(11,'William','Taylor','Brazil','1986-10-05','808 Alder St','Rio de Janeiro','william.taylor@example.com','Male','1234567800',9),(12,'Ava','Anderson','South Africa','1991-04-14','909 Cypress St','Cape Town','ava.anderson@example.com','Female','1234567801',2),(13,'James','Thomas','USA','1984-08-09','1010 Magnolia St','Chicago','james.thomas@example.com','Male','1234567802',8),(14,'Charlotte','Harris','Australia','1989-11-01','1111 Juniper St','Melbourne','charlotte.harris@example.com','Female','1234567803',3),(15,'Alexander','White','UK','1981-05-19','1212 Larch St','Manchester','alexander.white@example.com','Male','1234567804',6),(16,'Amelia','Clark','New Zealand','1996-12-25','1313 Fir St','Auckland','amelia.clark@example.com','Female','1234567805',1),(17,'Henry','Rodriguez','Argentina','1983-03-17','1414 Holly St','Buenos Aires','henry.rodriguez@example.com','Male','1234567806',7),(18,'Mia','Lewis','Netherlands','1994-07-27','1515 Willow St','Amsterdam','mia.lewis@example.com','Female','1234567807',4),(19,'Ethan','Walker','Canada','1987-01-13','1616 Chestnut St','Vancouver','ethan.walker@example.com','Male','1234567808',9),(20,'Harper','Hall','USA','1998-06-02','1717 Redwood St','San Francisco','harper.hall@example.com','Female','1234567809',3),(21,'Lucas','Young','Mexico','1985-09-09','1818 Cypress St','Cancun','lucas.young@example.com','Male','1234567810',6),(22,'Ella','King','France','1993-10-11','1919 Dogwood St','Nice','ella.king@example.com','Female','1234567811',2),(23,'Sebastian','Wright','Germany','1982-11-22','2020 Maplewood St','Munich','sebastian.wright@example.com','Male','1234567812',8),(24,'Lily','Scott','Australia','1990-12-08','2121 Linden St','Brisbane','lily.scott@example.com','Female','1234567813',1),(25,'Jackson','Torres','Brazil','1995-02-28','2222 Hickory St','Sao Paulo','jackson.torres@example.com','Male','1234567814',5),(26,'Grace','Nguyen','Vietnam','1988-07-15','2323 Redwood St','Hanoi','grace.nguyen@example.com','Female','1234567815',9),(27,'Benjamin','Hill','South Korea','1981-03-03','2424 Sycamore St','Seoul','benjamin.hill@example.com','Male','1234567816',4),(28,'Scarlett','Flores','Chile','1992-09-19','2525 Pinewood St','Santiago','scarlett.flores@example.com','Female','1234567817',6),(29,'Elijah','Green','USA','1984-10-29','2626 Olive St','Houston','elijah.green@example.com','Male','1234567818',7),(30,'Zoe','Baker','UK','1997-06-17','2727 Birchwood St','Edinburgh','zoe.baker@example.com','Female','1234567819',3),(31,'Matthew','Carter','Ireland','1991-11-09','2828 Sequoia St','Dublin','matthew.carter@example.com','Male','1234567820',2),(32,'Hannah','Reed','Sweden','1990-05-24','2929 Maplewood St','Stockholm','hannah.reed@example.com','Female','1234567821',6),(33,'Aiden','Perez','Spain','1983-12-02','3030 Hemlock St','Barcelona','aiden.perez@example.com','Male','1234567822',8),(34,'Chloe','Morgan','Canada','1995-03-11','3131 Cedarwood St','Montreal','chloe.morgan@example.com','Female','1234567823',1),(35,'Noah','Murphy','USA','1986-07-23','3232 Oakwood St','Miami','noah.murphy@example.com','Male','1234567824',9),(36,'Ella','Rivera','Mexico','1982-04-04','3333 Elmwood St','Guadalajara','ella.rivera@example.com','Female','1234567825',3),(37,'Jacob','Bailey','Australia','1989-08-21','3434 Redwood St','Perth','jacob.bailey@example.com','Male','1234567826',7),(38,'Grace','Jenkins','UK','1987-02-18','3535 Cypresswood St','Birmingham','grace.jenkins@example.com','Female','1234567827',4),(39,'Logan','Cox','USA','1992-06-26','3636 Hollywood St','Boston','logan.cox@example.com','Male','1234567828',5),(40,'Sophie','Diaz','Portugal','1994-01-06','3737 Pinewood St','Lisbon','sophie.diaz@example.com','Female','1234567829',1),(41,'Lucas','Cooper','New Zealand','1988-09-12','3838 Alderwood St','Wellington','lucas.cooper@example.com','Male','1234567830',6),(42,'Ava','Gray','Netherlands','1996-12-22','3939 Oakwood St','Rotterdam','ava.gray@example.com','Female','1234567831',2),(43,'Mason','Gonzalez','Chile','1985-11-01','4040 Elmwood St','Valparaiso','mason.gonzalez@example.com','Male','1234567832',9),(44,'John','Doe','USA','1985-05-12','123 Elm St','New York','john.doe@example.com','Male','1234567890',5),(45,'Jane','Smith','Canada','1992-09-23','456 Oak St','Toronto','jane.smith@example.com','Female','1234567891',3),(46,'Michael','Johnson','Australia','1978-02-15','789 Pine St','Sydney','michael.johnson@example.com','Male','1234567892',8),(47,'Emily','Davis','UK','1995-07-07','101 Maple St','London','emily.davis@example.com','Female','1234567893',2),(48,'Robert','Brown','USA','1980-12-03','202 Cedar St','Los Angeles','robert.brown@example.com','Male','1234567894',10),(49,'Olivia','Garcia','Spain','1990-08-29','303 Birch St','Madrid','olivia.garcia@example.com','Female','1234567895',4),(50,'David','Martinez','Mexico','1982-11-15','404 Walnut St','Mexico City','david.martinez@example.com','Male','1234567896',7),(51,'Sophia','Miller','Germany','1988-03-11','505 Ash St','Berlin','sophia.miller@example.com','Female','1234567897',1),(52,'Daniel','Wilson','France','1993-06-22','606 Poplar St','Paris','daniel.wilson@example.com','Male','1234567898',5),(53,'Isabella','Lopez','Italy','1997-01-30','707 Spruce St','Rome','isabella.lopez@example.com','Female','1234567899',6),(54,'William','Taylor','Brazil','1986-10-05','808 Alder St','Rio de Janeiro','william.taylor@example.com','Male','1234567800',9),(55,'Ava','Anderson','South Africa','1991-04-14','909 Cypress St','Cape Town','ava.anderson@example.com','Female','1234567801',2),(56,'James','Thomas','USA','1984-08-09','1010 Magnolia St','Chicago','james.thomas@example.com','Male','1234567802',8),(57,'Charlotte','Harris','Australia','1989-11-01','1111 Juniper St','Melbourne','charlotte.harris@example.com','Female','1234567803',3),(58,'Alexander','White','UK','1981-05-19','1212 Larch St','Manchester','alexander.white@example.com','Male','1234567804',6),(59,'Amelia','Clark','New Zealand','1996-12-25','1313 Fir St','Auckland','amelia.clark@example.com','Female','1234567805',1),(60,'Henry','Rodriguez','Argentina','1983-03-17','1414 Holly St','Buenos Aires','henry.rodriguez@example.com','Male','1234567806',7),(61,'Mia','Lewis','Netherlands','1994-07-27','1515 Willow St','Amsterdam','mia.lewis@example.com','Female','1234567807',4),(62,'Ethan','Walker','Canada','1987-01-13','1616 Chestnut St','Vancouver','ethan.walker@example.com','Male','1234567808',9),(63,'Harper','Hall','USA','1998-06-02','1717 Redwood St','San Francisco','harper.hall@example.com','Female','1234567809',3),(64,'Lucas','Young','Mexico','1985-09-09','1818 Cypress St','Cancun','lucas.young@example.com','Male','1234567810',6),(65,'Ella','King','France','1993-10-11','1919 Dogwood St','Nice','ella.king@example.com','Female','1234567811',2),(66,'Sebastian','Wright','Germany','1982-11-22','2020 Maplewood St','Munich','sebastian.wright@example.com','Male','1234567812',8),(67,'Lily','Scott','Australia','1990-12-08','2121 Linden St','Brisbane','lily.scott@example.com','Female','1234567813',1),(68,'Jackson','Torres','Brazil','1995-02-28','2222 Hickory St','Sao Paulo','jackson.torres@example.com','Male','1234567814',5),(69,'Grace','Nguyen','Vietnam','1988-07-15','2323 Redwood St','Hanoi','grace.nguyen@example.com','Female','1234567815',9),(70,'Benjamin','Hill','South Korea','1981-03-03','2424 Sycamore St','Seoul','benjamin.hill@example.com','Male','1234567816',4),(71,'Scarlett','Flores','Chile','1992-09-19','2525 Pinewood St','Santiago','scarlett.flores@example.com','Female','1234567817',6),(72,'Elijah','Green','USA','1984-10-29','2626 Olive St','Houston','elijah.green@example.com','Male','1234567818',7),(73,'Zoe','Baker','UK','1997-06-17','2727 Birchwood St','Edinburgh','zoe.baker@example.com','Female','1234567819',3),(74,'Matthew','Carter','Ireland','1991-11-09','2828 Sequoia St','Dublin','matthew.carter@example.com','Male','1234567820',2),(75,'Hannah','Reed','Sweden','1990-05-24','2929 Maplewood St','Stockholm','hannah.reed@example.com','Female','1234567821',6),(76,'Aiden','Perez','Spain','1983-12-02','3030 Hemlock St','Barcelona','aiden.perez@example.com','Male','1234567822',8),(77,'Chloe','Morgan','Canada','1995-03-11','3131 Cedarwood St','Montreal','chloe.morgan@example.com','Female','1234567823',1),(78,'Noah','Murphy','USA','1986-07-23','3232 Oakwood St','Miami','noah.murphy@example.com','Male','1234567824',9),(79,'Ella','Rivera','Mexico','1982-04-04','3333 Elmwood St','Guadalajara','ella.rivera@example.com','Female','1234567825',3),(80,'Jacob','Bailey','Australia','1989-08-21','3434 Redwood St','Perth','jacob.bailey@example.com','Male','1234567826',7),(81,'Grace','Jenkins','UK','1987-02-18','3535 Cypresswood St','Birmingham','grace.jenkins@example.com','Female','1234567827',4),(82,'Logan','Cox','USA','1992-06-26','3636 Hollywood St','Boston','logan.cox@example.com','Male','1234567828',5),(83,'Sophie','Diaz','Portugal','1994-01-06','3737 Pinewood St','Lisbon','sophie.diaz@example.com','Female','1234567829',1),(84,'Lucas','Cooper','New Zealand','1988-09-12','3838 Alderwood St','Wellington','lucas.cooper@example.com','Male','1234567830',6),(85,'Ava','Gray','Netherlands','1996-12-22','3939 Oakwood St','Rotterdam','ava.gray@example.com','Female','1234567831',2),(86,'Mason','Gonzalez','Chile','1985-11-01','4040 Elmwood St','Valparaiso','mason.gonzalez@example.com','Male','1234567832',9),(87,'Birunthaban','Rajendram','Sri-Lanka','2024-10-08','Colombo-06','Colombo','birunthu0@gmail.com','male','0741620029',0),(88,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthu@gmail.com','male','0741620029',0),(89,'Birunthaban','Rajendram','Sri-Lanka','2024-10-08','Colombo-06','Colombo','birunth@gmail.com','male','0741620029',0),(90,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunt@gmail.com','male','0741620029',0),(91,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthaban@outlook.com','male','0741620029',0),(92,'hello','sam','Sri-Lanka','2024-10-02','Colombo-06','Colombo','b@gmail.com','male','0741620029',0),(93,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthur@gmail.com','male','0741620029',0);
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planes`
--

DROP TABLE IF EXISTS `planes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `airlines` varchar(255) NOT NULL,
  `manufactureDate` date NOT NULL,
  `featured` tinyint(1) DEFAULT 0,
  `adminId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
/*!40000 ALTER TABLE `planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registered`
--

DROP TABLE IF EXISTS `registered`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registered` (
  `Username` varchar(30) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Passenger_ID` int(11) DEFAULT NULL,
  `Reward_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Username`),
  KEY `Passenger_ID` (`Passenger_ID`),
  KEY `Reward_ID` (`Reward_ID`),
  CONSTRAINT `registered_ibfk_1` FOREIGN KEY (`Passenger_ID`) REFERENCES `passenger` (`Passenger_ID`),
  CONSTRAINT `registered_ibfk_2` FOREIGN KEY (`Reward_ID`) REFERENCES `reward` (`Reward_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registered`
--

LOCK TABLES `registered` WRITE;
/*!40000 ALTER TABLE `registered` DISABLE KEYS */;
INSERT INTO `registered` VALUES ('alexanderwhite','pass123',15,2),('amelia_clark','pass123',16,1),('avaanderson','pass123',12,1),('benjaminhill','pass123',27,3),('birunthaban','$2b$10$36PMq4K00/KpR2Np39VOAeWkcHgTUkqyclSbw0qCrMA39lXDsgsMu',NULL,NULL),('charlotteharris','pass123',14,2),('danielwilson','pass123',9,2),('davidmartinez','pass123',7,3),('elijahgreen','pass123',29,3),('emilydavis','pass123',4,1),('ethanwalker','pass123',19,1),('graceflores','pass123',38,2),('henryrodriguez','pass123',17,3),('isabellalopez','pass123',10,2),('jacksonroberts','pass123',25,2),('jacobbailey','pass123',37,3),('jamesmartin','pass123',13,3),('janesmith','pass123',2,1),('johndoe','pass123',1,1),('lilyclark','pass123',36,1),('logancox','pass123',39,3),('masonkelly','pass123',43,3),('miawalker','pass123',18,2),('michaeljohnson','pass123',3,2),('noahbrown','pass123',35,3),('oliviamartinez','pass123',6,1),('robertbrown','pass123',5,3),('scarlettflores','pass123',28,2),('sophiamiller','pass123',8,1),('victoriamartin','pass123',42,1),('williamtaylor','pass123',11,3),('zoebaker','pass123',30,1);
/*!40000 ALTER TABLE `registered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reward`
--

DROP TABLE IF EXISTS `reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reward` (
  `Reward_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Reward_class` varchar(30) DEFAULT NULL,
  `Discount` float DEFAULT NULL,
  PRIMARY KEY (`Reward_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reward`
--

LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;
INSERT INTO `reward` VALUES (1,'Regular',0),(2,'Frequent',0.05),(3,'Gold',0.09),(4,'Regular',0),(5,'Frequent',0.05),(6,'Gold',0.09);
/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `Route_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Departure_Airport_ID` int(11) DEFAULT NULL,
  `Arrival_Airport_ID` int(11) DEFAULT NULL,
  `Distance` float DEFAULT NULL,
  PRIMARY KEY (`Route_ID`),
  KEY `Departure_Airport_ID` (`Departure_Airport_ID`),
  KEY `Arrival_Airport_ID` (`Arrival_Airport_ID`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`Departure_Airport_ID`) REFERENCES `airport` (`Airport_ID`),
  CONSTRAINT `route_ibfk_2` FOREIGN KEY (`Arrival_Airport_ID`) REFERENCES `airport` (`Airport_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,1,2,1150),(2,2,1,1150),(3,1,3,3400),(4,2,3,3450),(5,3,4,240),(6,4,3,240),(7,5,6,1150),(8,6,5,1150),(9,7,5,1750),(10,6,7,1350),(11,3,5,2400),(12,3,6,2250),(13,8,9,25),(14,9,8,25),(15,8,1,2900),(16,9,2,2950),(17,8,3,3000),(18,9,4,3050),(19,10,1,885),(20,10,2,1670),(21,10,3,2750),(22,10,5,4150),(23,10,6,3900),(24,10,7,2950);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `Seat_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Aircraft_ID` int(11) DEFAULT NULL,
  `Class_ID` int(11) DEFAULT NULL,
  `Row_num` int(11) DEFAULT NULL,
  `Col_num` int(11) DEFAULT NULL,
  `Seat_Price` float DEFAULT NULL,
  `Status` enum('booked','available','in-progress') DEFAULT 'available',
  PRIMARY KEY (`Seat_ID`),
  KEY `Aircraft_ID` (`Aircraft_ID`),
  KEY `Class_ID` (`Class_ID`),
  CONSTRAINT `seat_ibfk_1` FOREIGN KEY (`Aircraft_ID`) REFERENCES `aircraft` (`Aircraft_ID`),
  CONSTRAINT `seat_ibfk_2` FOREIGN KEY (`Class_ID`) REFERENCES `class` (`Class_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,1,1,1,1,100,'available'),(2,1,1,1,2,100,'available'),(3,1,1,2,3,100,'available'),(4,1,1,2,4,100,'available'),(5,1,2,1,3,200,'available'),(6,1,2,1,4,200,'available'),(7,1,3,1,5,300,'available'),(8,2,1,1,1,120,'available'),(9,2,1,1,2,120,'available'),(10,2,1,2,1,120,'available'),(11,2,2,1,3,220,'available'),(12,2,3,1,4,320,'available');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seatprices`
--

DROP TABLE IF EXISTS `seatprices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seatprices` (
  `Flight_ID` varchar(7) NOT NULL,
  `Class_ID` int(11) NOT NULL,
  `Price` decimal(9,2) DEFAULT NULL,
  PRIMARY KEY (`Class_ID`,`Flight_ID`),
  KEY `Flight_ID` (`Flight_ID`),
  CONSTRAINT `seatprices_ibfk_1` FOREIGN KEY (`Class_ID`) REFERENCES `class` (`Class_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `seatprices_ibfk_2` FOREIGN KEY (`Flight_ID`) REFERENCES `flightschedule` (`Flight_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seatprices`
--

LOCK TABLES `seatprices` WRITE;
/*!40000 ALTER TABLE `seatprices` DISABLE KEYS */;
INSERT INTO `seatprices` VALUES ('FL001',1,50.00),('FL002',1,200.00),('FL003',1,50.00),('FL004',1,175.00),('FL005',1,150.00),('FL006',1,200.00),('FL007',1,125.00),('FL008',1,150.00),('FL001',2,100.00),('FL002',2,400.00),('FL003',2,100.00),('FL004',2,350.00),('FL005',2,300.00),('FL006',2,400.00),('FL007',2,250.00),('FL008',2,300.00),('FL001',3,150.00),('FL002',3,600.00),('FL003',3,150.00),('FL004',3,525.00),('FL005',3,450.00),('FL006',3,600.00),('FL007',3,375.00),('FL008',3,450.00);
/*!40000 ALTER TABLE `seatprices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `Ticket_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Passenger_ID` int(11) DEFAULT NULL,
  `Flight_ID` varchar(7) DEFAULT NULL,
  `Seat_ID` int(11) DEFAULT NULL,
  `Price` float DEFAULT NULL,
  PRIMARY KEY (`Ticket_ID`),
  KEY `Passenger_ID` (`Passenger_ID`),
  KEY `Flight_ID` (`Flight_ID`),
  KEY `Seat_ID` (`Seat_ID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`Passenger_ID`) REFERENCES `passenger` (`Passenger_ID`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`Flight_ID`) REFERENCES `flightschedule` (`Flight_ID`),
  CONSTRAINT `ticket_ibfk_3` FOREIGN KEY (`Seat_ID`) REFERENCES `seat` (`Seat_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,1,'FL001',1,100),(2,2,'FL002',8,120),(3,3,'FL003',12,320),(4,4,'FL004',5,200),(5,5,'FL005',2,100);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bairways'
--

--
-- Dumping routines for database 'bairways'
--
/*!50003 DROP PROCEDURE IF EXISTS `AddFlightRoute` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddFlightRoute`(
    IN dep_short_code VARCHAR(10),
    IN arr_short_code VARCHAR(10),
    IN route_distance INT
)
BEGIN
    DECLARE dep_airport_id INT;
    DECLARE arr_airport_id INT;

    -- Find Departure Airport_ID
    SELECT Airport_ID INTO dep_airport_id
    FROM Airport
    WHERE Short_code = dep_short_code;

    -- Find Arrival Airport_ID
    SELECT Airport_ID INTO arr_airport_id
    FROM Airport
    WHERE Short_code = arr_short_code;

    -- Check if both Airport_IDs were found
    IF dep_airport_id IS NOT NULL AND arr_airport_id IS NOT NULL THEN
        -- Insert into Route table
        INSERT INTO Route (Departure_Airport_ID, Arrival_Airport_ID, Distance)
        VALUES (dep_airport_id, arr_airport_id, route_distance);
    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid Departure or Arrival Airport Short Code';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `DeleteFLight` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DeleteFLight`(in ID varchar(20))
BEGIN
    DELETE FROM flightschedule WHERE Flight_ID = ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAdminByCredentials` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAdminByCredentials`(
    IN p_Admin_ID varchar(30),
    IN p_Password VARCHAR(255)
)
BEGIN
    SELECT * FROM Admin WHERE Admin_ID = p_Admin_ID AND Password = p_Password;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAircraftDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAircraftDetails`()
BEGIN
    SELECT 
        Aircraft.Aircraft_ID, 
        Aircraft_model.Model_name, 
        Aircraft_model.EconomyClassSeatCount,
        Aircraft_model.BusinessClassSeatCount,
        Aircraft_model.PlatinumClassSeatCount
    FROM 
        Aircraft 
    JOIN 
        Aircraft_model 
    ON 
        Aircraft.Model_ID = Aircraft_model.Model_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAirportShortCodes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAirportShortCodes`()
BEGIN
    SELECT short_code FROM airport;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllAircraftModels` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllAircraftModels`()
BEGIN
    SELECT * FROM Aircraft_model;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllAirports` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllAirports`()
BEGIN
    SELECT * FROM Airport;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllFlightDetails` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllFlightDetails`()
BEGIN
    SELECT 
        f.Flight_ID,
        am.Model_Name AS Aircraft,
        departure_ar.Name AS Departure_Airport,
        arrival_ar.Name AS Arrival_Airport,
        f.Departure_date_time,
        f.Expected_arrival_date_time,
        f.Flight_price,
        f.Created_BY,
        f.Created_time,
        f.Modified_BY,
        f.Modified_time
    FROM 
        FlightSchedule f
    JOIN 
        Aircraft a ON a.Aircraft_ID = f.Aircraft_ID
    JOIN 
        Aircraft_model am ON a.Model_ID = am.Model_ID
    JOIN 
        Route r ON r.Route_ID = f.Route_ID
    JOIN 
        Airport departure_ar ON departure_ar.Airport_ID = r.Departure_Airport_ID
    JOIN 
        Airport arrival_ar ON arrival_ar.Airport_ID = r.Arrival_Airport_ID
	WHERE 
        f.Departure_date_time >= DATE_ADD(NOW(), INTERVAL 2 HOUR);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllFlightDetailsById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllFlightDetailsById`(IN ID VARCHAR(20))
BEGIN
    SELECT 
        f.Flight_ID,
        am.Model_Name AS Aircraft,
        departure_ar.Name AS Departure_Airport,
        arrival_ar.Name AS Arrival_Airport,
        f.Departure_date_time,
        f.Expected_arrival_date_time,
        f.Flight_price,
        f.Created_BY,
        f.Created_time,
        f.Modified_BY,
        f.Modified_time
    FROM 
        FlightSchedule f
    JOIN 
        Aircraft a ON a.Aircraft_ID = f.Aircraft_ID
    JOIN 
        Aircraft_model am ON a.Model_ID = am.Model_ID
    JOIN 
        Route r ON r.Route_ID = f.Route_ID
    JOIN 
        Airport departure_ar ON departure_ar.Airport_ID = r.Departure_Airport_ID
    JOIN 
        Airport arrival_ar ON arrival_ar.Airport_ID = r.Arrival_Airport_ID
    WHERE
        f.Flight_ID = ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetAllRoutes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetAllRoutes`()
BEGIN
    SELECT 
        r.Route_ID,
        r.Departure_Airport_ID,
        dep.Name AS Departure_Airport_Name,
        r.Arrival_Airport_ID,
        arr.Name AS Arrival_Airport_Name,
        r.Distance
    FROM 
        Route r
    JOIN 
        Airport dep ON r.Departure_Airport_ID = dep.Airport_ID
    JOIN 
        Airport arr ON r.Arrival_Airport_ID = arr.Airport_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetBookingsByRewardClass` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetBookingsByRewardClass`(IN startDate DATE, IN endDate DATE)
BEGIN
    SELECT Reward.Reward_class, COUNT(Ticket.Ticket_ID) AS NumberOfBookings
    FROM Ticket
    JOIN Registered ON Ticket.Passenger_ID = Registered.Passenger_ID
    JOIN Reward ON Registered.Reward_ID = Reward.Reward_ID
    JOIN FlightSchedule ON Ticket.Flight_ID = FlightSchedule.Flight_ID
    WHERE FlightSchedule.Departure_date_time BETWEEN startDate AND endDate
    GROUP BY Reward.Reward_class;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFlightdetailsByairports` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFlightdetailsByairports`(
		in departure_code varchar(20),
        in arival_code varchar(20)
)
begin
      SELECT 
    FlightSchedule.Flight_ID, 
    a1.name AS DepartureAirport, 
    a2.name AS ArrivalAirport, 
    COUNT(Ticket.Ticket_ID) AS PassengerCount, 
    CASE 
        WHEN FlightSchedule.Departure_date_time > FlightSchedule.Expected_arrival_date_time 
        THEN 'Delayed'
        ELSE 'On-time'
    END AS FlightStatus
FROM 
    FlightSchedule
JOIN 
    Route ON FlightSchedule.Route_ID = Route.Route_ID
JOIN 
    Ticket ON FlightSchedule.Flight_ID = Ticket.Flight_ID
JOIN 
    Airport a1 ON a1.Airport_ID = Route.Departure_Airport_ID
JOIN 
    Airport a2 ON a2.Airport_ID = Route.Arrival_Airport_ID
WHERE 
    a1.short_code = departure_code 
    AND a2.short_code = arival_code
    AND FlightSchedule.Departure_date_time < NOW()
GROUP BY 
    FlightSchedule.Flight_ID, a1.name, a2.name;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetFlightScheduleById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetFlightScheduleById`(IN flightId VARCHAR(10))
BEGIN
    SELECT * FROM FlightSchedule WHERE Flight_ID = flightId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetPassengerAgeGroupByFlight` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPassengerAgeGroupByFlight`(IN flightID VARCHAR(7))
BEGIN
    SELECT Passenger.FirstName, Passenger.SecondName, 
        CASE 
            WHEN TIMESTAMPDIFF(YEAR, Passenger.DOB, CURDATE()) < 18 THEN 'Below 18'
            ELSE 'Above 18' 
        END AS AgeGroup
    FROM Passenger
    JOIN Ticket ON Passenger.Passenger_ID = Ticket.Passenger_ID
    WHERE Ticket.Flight_ID = flightID
    ORDER BY AgeGroup;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetPassengerCountByDestinationAndDateRange` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPassengerCountByDestinationAndDateRange`(
    IN short_code varchar(20),
    IN startDate DATE,
    IN endDate DATE
)
BEGIN
    SELECT airport.Name, COUNT(Ticket.Ticket_ID) AS PassengerCount
    FROM FlightSchedule
    JOIN Route ON FlightSchedule.Route_ID = Route.Route_ID
    JOIN Ticket ON FlightSchedule.Flight_ID = Ticket.Flight_ID
    Join airport ON Route.Arrival_Airport_ID = airport.Airport_ID
    WHERE airport.Short_code = short_code
    AND FlightSchedule.Departure_date_time BETWEEN startDate AND endDate
    GROUP BY airport.name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetRevanueBYAircraftModel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRevanueBYAircraftModel`(IN Model varchar(30))
BEGIN
	SELECT Model_name , TotalRevenue
    FROM FlightRevenueByAircraft
    WHERE Model_name = Model;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalAircraftCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalAircraftCount`()
BEGIN
    SELECT COUNT(*) AS total FROM Aircraft;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalAirportCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalAirportCount`()
BEGIN
    SELECT COUNT(*) AS total FROM Airport;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalFlightScheduleCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalFlightScheduleCount`()
BEGIN
    SELECT COUNT(*) AS total FROM FlightSchedule;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetTotalPassengerCount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTotalPassengerCount`()
BEGIN
    SELECT COUNT(*) AS total FROM Passenger;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertAirport` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertAirport`(
    IN p_Short_code VARCHAR(10),
    IN p_Name VARCHAR(100),
    IN p_Country VARCHAR(100),
    IN p_State VARCHAR(100),
    IN p_City VARCHAR(100)
)
BEGIN
    INSERT INTO airport (Short_code, Name, Country, State, City)
    VALUES (p_Short_code, p_Name, p_Country, p_State, p_City);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertFlight` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertFlight`(
    IN p_Route_ID INT,
    IN p_Aircraft_ID INT,
    IN p_Departure_date_time DATETIME,
    IN p_Expected_arrival_date_time DATETIME,
    IN p_Flight_price FLOAT,
    IN p_Created_By VARCHAR(20)
)
BEGIN
    DECLARE next_id INT;
    DECLARE new_flight_id VARCHAR(7);

    -- Find the maximum Flight_ID and extract the numeric part
    SELECT COALESCE(MAX(CAST(SUBSTRING(Flight_ID, 3) AS UNSIGNED)), 0) INTO next_id FROM FlightSchedule;

    -- Generate the new Flight_ID
    SET new_flight_id = CONCAT('FL', LPAD(next_id + 1, 3, '0'));

    -- Insert the new record
    INSERT INTO FlightSchedule (Flight_ID, Route_ID, Aircraft_ID, Departure_date_time, Expected_arrival_date_time, Flight_price, Created_By, Created_time)
    VALUES (new_flight_id, p_Route_ID, p_Aircraft_ID, p_Departure_date_time, p_Expected_arrival_date_time, p_Flight_price, p_Created_By, CURDATE());
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SearchFlights` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SearchFlights`(
    IN DepartureAirport VARCHAR(30),  -- Match Airport.Name length in schema
    IN ArrivalAirport VARCHAR(30),
    IN DepartureDate DATE
)
BEGIN
    SELECT 
        f.Flight_ID,
        am.Model_name AS Aircraft,
        departure_ar.Name AS Departure_Airport,
        arrival_ar.Name AS Arrival_Airport,
        f.Departure_date_time,
        f.Expected_arrival_date_time,
        f.Flight_price
    FROM 
        FlightSchedule f
    JOIN 
        Aircraft a ON a.Aircraft_ID = f.Aircraft_ID
    JOIN 
        Aircraft_model am ON a.Model_ID = am.Model_ID
    JOIN 
        Route r ON r.Route_ID = f.Route_ID
    JOIN 
        Airport departure_ar ON departure_ar.Airport_ID = r.Departure_Airport_ID
    JOIN 
        Airport arrival_ar ON arrival_ar.Airport_ID = r.Arrival_Airport_ID
    WHERE 
        departure_ar.Name = DepartureAirport 
        AND arrival_ar.Name = ArrivalAirport
        AND DATE(f.Departure_date_time) = DepartureDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `SelectAllFlightSchedules` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SelectAllFlightSchedules`(
        in Id varchar(20)
  )
BEGIN
    SELECT * FROM flightschedule where Flight_ID = Id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `TotalRevanueByEachAircraft` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `TotalRevanueByEachAircraft`()
Begin
	select * from FlightRevenueByAircraft;
  end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UpdateFlightSchedule` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateFlightSchedule`(
    IN p_Flight_ID VARCHAR(10),
    IN p_Route_ID INT,
    IN p_Aircraft_ID INT,
    IN p_Departure_date_time DATETIME,
    IN p_Expected_arrival_date_time DATETIME,
    IN p_Flight_price DECIMAL(10, 2),
    IN p_Modified_by VARCHAR(50),
    IN p_Modified_time DATETIME
)
BEGIN
    DECLARE conflict_count INT;

    -- Check for time conflict with other flights using the same aircraft
    SELECT COUNT(*) INTO conflict_count
    FROM flightschedule
    WHERE Aircraft_ID = p_Aircraft_ID
      AND Flight_ID != p_Flight_ID
      AND (
            (p_Departure_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
            OR 
            (p_Expected_arrival_date_time BETWEEN Departure_date_time AND Expected_arrival_date_time)
            OR 
            (Departure_date_time BETWEEN p_Departure_date_time AND p_Expected_arrival_date_time)
            OR 
            (Expected_arrival_date_time BETWEEN p_Departure_date_time AND p_Expected_arrival_date_time)
      );

    -- If a conflict exists, raise an error
    IF conflict_count > 0 THEN
        SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = 'Aircraft is already scheduled for another flight in the specified time period';
    ELSE
        -- If no conflict, update the flight schedule
        UPDATE flightschedule
        SET 
            Route_ID = p_Route_ID,
            Aircraft_ID = p_Aircraft_ID,
            Departure_date_time = p_Departure_date_time,
            Expected_arrival_date_time = p_Expected_arrival_date_time,
            Flight_price = p_Flight_price,
            Modified_by = p_Modified_by,
            Modified_time = p_Modified_time
        WHERE Flight_ID = p_Flight_ID;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `aircraftflightschedule`
--

/*!50001 DROP VIEW IF EXISTS `aircraftflightschedule`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `aircraftflightschedule` AS select `fs`.`Flight_ID` AS `Flight_ID`,`fs`.`Route_ID` AS `Route_ID`,`fs`.`Departure_date_time` AS `Departure_date_time`,`fs`.`Expected_arrival_date_time` AS `Expected_arrival_date_time`,`fs`.`Flight_price` AS `Flight_price`,`fs`.`Created_By` AS `Created_By`,`fs`.`Created_time` AS `Created_time`,`fs`.`Modified_by` AS `Modified_by`,`fs`.`Modified_time` AS `Modified_time`,`am`.`Model_name` AS `Model_name`,`am`.`EconomyClassSeatCount` AS `EconomyClassSeatCount`,`am`.`BusinessClassSeatCount` AS `BusinessClassSeatCount`,`am`.`PlatinumClassSeatCount` AS `PlatinumClassSeatCount` from ((`flightschedule` `fs` join `aircraft` `a` on(`fs`.`Aircraft_ID` = `a`.`Aircraft_ID`)) join `aircraft_model` `am` on(`a`.`Model_ID` = `am`.`Model_ID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `flightdiscountedprices`
--

/*!50001 DROP VIEW IF EXISTS `flightdiscountedprices`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `flightdiscountedprices` AS select `fs`.`Flight_ID` AS `Flight_ID`,`r`.`Reward_class` AS `Reward_class`,round(`fs`.`Flight_price` * (1 - `r`.`Discount`),2) AS `Discounted_Price` from (`flightschedule` `fs` join `reward` `r` on(`r`.`Reward_ID` is not null)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `flightrevenuebyaircraft`
--

/*!50001 DROP VIEW IF EXISTS `flightrevenuebyaircraft`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `flightrevenuebyaircraft` AS select `am`.`Model_name` AS `Model_name`,sum(`t`.`Price`) AS `TotalRevenue` from (((`aircraft_model` `am` join `aircraft` `a` on(`a`.`Model_ID` = `am`.`Model_ID`)) join `flightschedule` `fs` on(`fs`.`Aircraft_ID` = `a`.`Aircraft_ID`)) join `ticket` `t` on(`t`.`Flight_ID` = `fs`.`Flight_ID`)) group by `am`.`Model_name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 16:49:14
