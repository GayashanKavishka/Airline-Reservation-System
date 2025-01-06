CREATE DATABASE  IF NOT EXISTS `bairways` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bairways`;
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
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','123','BAir','2024-10-24 15:33:21');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aircraft`
--

LOCK TABLES `aircraft` WRITE;
/*!40000 ALTER TABLE `aircraft` DISABLE KEYS */;
INSERT INTO `aircraft` VALUES (1,1),(2,1),(3,1),(4,2),(5,2),(6,2),(7,2),(8,3);
/*!40000 ALTER TABLE `aircraft` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `aircraft_model`
--

LOCK TABLES `aircraft_model` WRITE;
/*!40000 ALTER TABLE `aircraft_model` DISABLE KEYS */;
INSERT INTO `aircraft_model` VALUES (1,'B737',150,20,10),(2,'B757',180,25,15),(3,'A380',400,50,20);
/*!40000 ALTER TABLE `aircraft_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `airport`
--

LOCK TABLES `airport` WRITE;
/*!40000 ALTER TABLE `airport` DISABLE KEYS */;
INSERT INTO `airport` VALUES (1,'CGK','Soekarno-Hatta Intl','Indonesia','Jakarta','Jakarta'),(2,'DPS','Ngurah Rai Intl','Indonesia','Bali','Denpasar'),(3,'BIA','Bandaranaike Intl','Sri Lanka','Western Province','Colombo'),(4,'HRI','Mattala Rajapaksa Intl','Sri Lanka','Southern Province','Hambantota'),(5,'DEL','Indira Gandhi Intl','India','Delhi','New Delhi'),(6,'BOM','Chhatrapati  Maharaj','India','Maharashtra','Mumbai'),(7,'MAA','Chennai Intl','India','Tamil Nadu','Chennai'),(8,'BKK','Suvarnabhumi Airport','Thailand','Bangkok','Bangkok'),(9,'DMK','Don Mueang Intl','Thailand','Bangkok','Bangkok'),(10,'SIN','Singapore Changi Airport','Singapore','Singapore','Singapore'),(11,'JIA','Jaffna Int','Sri Lanka','North province','Jaffna');
/*!40000 ALTER TABLE `airport` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'Economy'),(2,'Business'),(3,'Platinum');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES ('India','Delhi','New Delhi'),('India','Maharashtra','Mumbai'),('India','Tamil Nadu','Chennai'),('Indonesia','Bali','Denpasar'),('Indonesia','Jakarta','Jakarta'),('Singapore','Central Singapore','Singapore'),('Sri Lanka','North Province','Jaffna'),('Sri Lanka','Southern Province','Mattala'),('Sri Lanka','Western Province','Colombo'),('Thailand','Bangkok Metropolitan','Don Mueang'),('Thailand','Bangkok state','Bangkok');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `flightschedule`
--

LOCK TABLES `flightschedule` WRITE;
/*!40000 ALTER TABLE `flightschedule` DISABLE KEYS */;
INSERT INTO `flightschedule` VALUES ('FL001',1,1,'2024-10-25 08:00:00','2024-10-25 10:00:00',150,'admin','2024-10-24',NULL,NULL),('FL002',2,2,'2024-10-26 09:00:00','2024-10-26 11:30:00',180,'admin','2024-10-24',NULL,NULL),('FL003',3,3,'2024-10-27 07:45:00','2024-10-27 11:45:00',300,'admin','2024-10-24',NULL,NULL),('FL004',4,4,'2024-10-28 06:30:00','2024-10-28 12:30:00',400,'admin','2024-10-24',NULL,NULL),('FL005',5,5,'2024-10-29 14:00:00','2024-10-29 16:00:00',220,'admin','2024-10-24',NULL,NULL),('FL006',6,6,'2024-10-30 15:00:00','2024-10-30 18:00:00',320,'admin','2024-10-24',NULL,NULL),('FL007',7,7,'2024-10-31 12:30:00','2024-10-31 17:30:00',500,'admin','2024-10-24',NULL,NULL),('FL008',1,1,'2024-10-28 08:00:00','2024-10-29 10:00:00',150,'admin','2024-10-24',NULL,NULL);
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
-- Dumping data for table `passenger`
--

LOCK TABLES `passenger` WRITE;
/*!40000 ALTER TABLE `passenger` DISABLE KEYS */;
INSERT INTO `passenger` VALUES (1,'John','Doe','USA','1985-05-12','123 Elm St','New York','john.doe@example.com','Male','1234567890',5),(2,'Jane','Smith','Canada','1992-09-23','456 Oak St','Toronto','jane.smith@example.com','Female','1234567891',3),(3,'Michael','Johnson','Australia','1978-02-15','789 Pine St','Sydney','michael.johnson@example.com','Male','1234567892',8),(4,'Emily','Davis','UK','1995-07-07','101 Maple St','London','emily.davis@example.com','Female','1234567893',2),(5,'Robert','Brown','USA','1980-12-03','202 Cedar St','Los Angeles','robert.brown@example.com','Male','1234567894',10),(6,'Olivia','Garcia','Spain','1990-08-29','303 Birch St','Madrid','olivia.garcia@example.com','Female','1234567895',4),(7,'David','Martinez','Mexico','1982-11-15','404 Walnut St','Mexico City','david.martinez@example.com','Male','1234567896',7),(8,'Sophia','Miller','Germany','1988-03-11','505 Ash St','Berlin','sophia.miller@example.com','Female','1234567897',1),(9,'Daniel','Wilson','France','1993-06-22','606 Poplar St','Paris','daniel.wilson@example.com','Male','1234567898',5),(10,'Isabella','Lopez','Italy','1997-01-30','707 Spruce St','Rome','isabella.lopez@example.com','Female','1234567899',6),(11,'William','Taylor','Brazil','1986-10-05','808 Alder St','Rio de Janeiro','william.taylor@example.com','Male','1234567800',9),(12,'Ava','Anderson','South Africa','1991-04-14','909 Cypress St','Cape Town','ava.anderson@example.com','Female','1234567801',2),(13,'James','Thomas','USA','1984-08-09','1010 Magnolia St','Chicago','james.thomas@example.com','Male','1234567802',8),(14,'Charlotte','Harris','Australia','1989-11-01','1111 Juniper St','Melbourne','charlotte.harris@example.com','Female','1234567803',3),(15,'Alexander','White','UK','1981-05-19','1212 Larch St','Manchester','alexander.white@example.com','Male','1234567804',6),(16,'Amelia','Clark','New Zealand','1996-12-25','1313 Fir St','Auckland','amelia.clark@example.com','Female','1234567805',1),(17,'Henry','Rodriguez','Argentina','1983-03-17','1414 Holly St','Buenos Aires','henry.rodriguez@example.com','Male','1234567806',7),(18,'Mia','Lewis','Netherlands','1994-07-27','1515 Willow St','Amsterdam','mia.lewis@example.com','Female','1234567807',4),(19,'Ethan','Walker','Canada','1987-01-13','1616 Chestnut St','Vancouver','ethan.walker@example.com','Male','1234567808',9),(20,'Harper','Hall','USA','1998-06-02','1717 Redwood St','San Francisco','harper.hall@example.com','Female','1234567809',3),(21,'Lucas','Young','Mexico','1985-09-09','1818 Cypress St','Cancun','lucas.young@example.com','Male','1234567810',6),(22,'Ella','King','France','1993-10-11','1919 Dogwood St','Nice','ella.king@example.com','Female','1234567811',2),(23,'Sebastian','Wright','Germany','1982-11-22','2020 Maplewood St','Munich','sebastian.wright@example.com','Male','1234567812',8),(24,'Lily','Scott','Australia','1990-12-08','2121 Linden St','Brisbane','lily.scott@example.com','Female','1234567813',1),(25,'Jackson','Torres','Brazil','1995-02-28','2222 Hickory St','Sao Paulo','jackson.torres@example.com','Male','1234567814',5),(26,'Grace','Nguyen','Vietnam','1988-07-15','2323 Redwood St','Hanoi','grace.nguyen@example.com','Female','1234567815',9),(27,'Benjamin','Hill','South Korea','1981-03-03','2424 Sycamore St','Seoul','benjamin.hill@example.com','Male','1234567816',4),(28,'Scarlett','Flores','Chile','1992-09-19','2525 Pinewood St','Santiago','scarlett.flores@example.com','Female','1234567817',6),(29,'Elijah','Green','USA','1984-10-29','2626 Olive St','Houston','elijah.green@example.com','Male','1234567818',7),(30,'Zoe','Baker','UK','1997-06-17','2727 Birchwood St','Edinburgh','zoe.baker@example.com','Female','1234567819',3),(31,'Matthew','Carter','Ireland','1991-11-09','2828 Sequoia St','Dublin','matthew.carter@example.com','Male','1234567820',2),(32,'Hannah','Reed','Sweden','1990-05-24','2929 Maplewood St','Stockholm','hannah.reed@example.com','Female','1234567821',6),(33,'Aiden','Perez','Spain','1983-12-02','3030 Hemlock St','Barcelona','aiden.perez@example.com','Male','1234567822',8),(34,'Chloe','Morgan','Canada','1995-03-11','3131 Cedarwood St','Montreal','chloe.morgan@example.com','Female','1234567823',1),(35,'Noah','Murphy','USA','1986-07-23','3232 Oakwood St','Miami','noah.murphy@example.com','Male','1234567824',9),(36,'Ella','Rivera','Mexico','1982-04-04','3333 Elmwood St','Guadalajara','ella.rivera@example.com','Female','1234567825',3),(37,'Jacob','Bailey','Australia','1989-08-21','3434 Redwood St','Perth','jacob.bailey@example.com','Male','1234567826',7),(38,'Grace','Jenkins','UK','1987-02-18','3535 Cypresswood St','Birmingham','grace.jenkins@example.com','Female','1234567827',4),(39,'Logan','Cox','USA','1992-06-26','3636 Hollywood St','Boston','logan.cox@example.com','Male','1234567828',5),(40,'Sophie','Diaz','Portugal','1994-01-06','3737 Pinewood St','Lisbon','sophie.diaz@example.com','Female','1234567829',1),(41,'Lucas','Cooper','New Zealand','1988-09-12','3838 Alderwood St','Wellington','lucas.cooper@example.com','Male','1234567830',6),(42,'Ava','Gray','Netherlands','1996-12-22','3939 Oakwood St','Rotterdam','ava.gray@example.com','Female','1234567831',2),(43,'Mason','Gonzalez','Chile','1985-11-01','4040 Elmwood St','Valparaiso','mason.gonzalez@example.com','Male','1234567832',9),(44,'John','Doe','USA','1985-05-12','123 Elm St','New York','john.doe@example.com','Male','1234567890',5),(45,'Jane','Smith','Canada','1992-09-23','456 Oak St','Toronto','jane.smith@example.com','Female','1234567891',3),(46,'Michael','Johnson','Australia','1978-02-15','789 Pine St','Sydney','michael.johnson@example.com','Male','1234567892',8),(47,'Emily','Davis','UK','1995-07-07','101 Maple St','London','emily.davis@example.com','Female','1234567893',2),(48,'Robert','Brown','USA','1980-12-03','202 Cedar St','Los Angeles','robert.brown@example.com','Male','1234567894',10),(49,'Olivia','Garcia','Spain','1990-08-29','303 Birch St','Madrid','olivia.garcia@example.com','Female','1234567895',4),(50,'David','Martinez','Mexico','1982-11-15','404 Walnut St','Mexico City','david.martinez@example.com','Male','1234567896',7),(51,'Sophia','Miller','Germany','1988-03-11','505 Ash St','Berlin','sophia.miller@example.com','Female','1234567897',1),(52,'Daniel','Wilson','France','1993-06-22','606 Poplar St','Paris','daniel.wilson@example.com','Male','1234567898',5),(53,'Isabella','Lopez','Italy','1997-01-30','707 Spruce St','Rome','isabella.lopez@example.com','Female','1234567899',6),(54,'William','Taylor','Brazil','1986-10-05','808 Alder St','Rio de Janeiro','william.taylor@example.com','Male','1234567800',9),(55,'Ava','Anderson','South Africa','1991-04-14','909 Cypress St','Cape Town','ava.anderson@example.com','Female','1234567801',2),(56,'James','Thomas','USA','1984-08-09','1010 Magnolia St','Chicago','james.thomas@example.com','Male','1234567802',8),(57,'Charlotte','Harris','Australia','1989-11-01','1111 Juniper St','Melbourne','charlotte.harris@example.com','Female','1234567803',3),(58,'Alexander','White','UK','1981-05-19','1212 Larch St','Manchester','alexander.white@example.com','Male','1234567804',6),(59,'Amelia','Clark','New Zealand','1996-12-25','1313 Fir St','Auckland','amelia.clark@example.com','Female','1234567805',1),(60,'Henry','Rodriguez','Argentina','1983-03-17','1414 Holly St','Buenos Aires','henry.rodriguez@example.com','Male','1234567806',7),(61,'Mia','Lewis','Netherlands','1994-07-27','1515 Willow St','Amsterdam','mia.lewis@example.com','Female','1234567807',4),(62,'Ethan','Walker','Canada','1987-01-13','1616 Chestnut St','Vancouver','ethan.walker@example.com','Male','1234567808',9),(63,'Harper','Hall','USA','1998-06-02','1717 Redwood St','San Francisco','harper.hall@example.com','Female','1234567809',3),(64,'Lucas','Young','Mexico','1985-09-09','1818 Cypress St','Cancun','lucas.young@example.com','Male','1234567810',6),(65,'Ella','King','France','1993-10-11','1919 Dogwood St','Nice','ella.king@example.com','Female','1234567811',2),(66,'Sebastian','Wright','Germany','1982-11-22','2020 Maplewood St','Munich','sebastian.wright@example.com','Male','1234567812',8),(67,'Lily','Scott','Australia','1990-12-08','2121 Linden St','Brisbane','lily.scott@example.com','Female','1234567813',1),(68,'Jackson','Torres','Brazil','1995-02-28','2222 Hickory St','Sao Paulo','jackson.torres@example.com','Male','1234567814',5),(69,'Grace','Nguyen','Vietnam','1988-07-15','2323 Redwood St','Hanoi','grace.nguyen@example.com','Female','1234567815',9),(70,'Benjamin','Hill','South Korea','1981-03-03','2424 Sycamore St','Seoul','benjamin.hill@example.com','Male','1234567816',4),(71,'Scarlett','Flores','Chile','1992-09-19','2525 Pinewood St','Santiago','scarlett.flores@example.com','Female','1234567817',6),(72,'Elijah','Green','USA','1984-10-29','2626 Olive St','Houston','elijah.green@example.com','Male','1234567818',7),(73,'Zoe','Baker','UK','1997-06-17','2727 Birchwood St','Edinburgh','zoe.baker@example.com','Female','1234567819',3),(74,'Matthew','Carter','Ireland','1991-11-09','2828 Sequoia St','Dublin','matthew.carter@example.com','Male','1234567820',2),(75,'Hannah','Reed','Sweden','1990-05-24','2929 Maplewood St','Stockholm','hannah.reed@example.com','Female','1234567821',6),(76,'Aiden','Perez','Spain','1983-12-02','3030 Hemlock St','Barcelona','aiden.perez@example.com','Male','1234567822',8),(77,'Chloe','Morgan','Canada','1995-03-11','3131 Cedarwood St','Montreal','chloe.morgan@example.com','Female','1234567823',1),(78,'Noah','Murphy','USA','1986-07-23','3232 Oakwood St','Miami','noah.murphy@example.com','Male','1234567824',9),(79,'Ella','Rivera','Mexico','1982-04-04','3333 Elmwood St','Guadalajara','ella.rivera@example.com','Female','1234567825',3),(80,'Jacob','Bailey','Australia','1989-08-21','3434 Redwood St','Perth','jacob.bailey@example.com','Male','1234567826',7),(81,'Grace','Jenkins','UK','1987-02-18','3535 Cypresswood St','Birmingham','grace.jenkins@example.com','Female','1234567827',4),(82,'Logan','Cox','USA','1992-06-26','3636 Hollywood St','Boston','logan.cox@example.com','Male','1234567828',5),(83,'Sophie','Diaz','Portugal','1994-01-06','3737 Pinewood St','Lisbon','sophie.diaz@example.com','Female','1234567829',1),(84,'Lucas','Cooper','New Zealand','1988-09-12','3838 Alderwood St','Wellington','lucas.cooper@example.com','Male','1234567830',6),(85,'Ava','Gray','Netherlands','1996-12-22','3939 Oakwood St','Rotterdam','ava.gray@example.com','Female','1234567831',2),(86,'Mason','Gonzalez','Chile','1985-11-01','4040 Elmwood St','Valparaiso','mason.gonzalez@example.com','Male','1234567832',9),(87,'Birunthaban','Rajendram','Sri-Lanka','2024-10-08','Colombo-06','Colombo','birunthu0@gmail.com','male','0741620029',0),(88,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthu@gmail.com','male','0741620029',0),(89,'Birunthaban','Rajendram','Sri-Lanka','2024-10-08','Colombo-06','Colombo','birunth@gmail.com','male','0741620029',0),(90,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunt@gmail.com','male','0741620029',0),(91,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthaban@outlook.com','male','0741620029',0),(92,'hello','sam','Sri-Lanka','2024-10-02','Colombo-06','Colombo','b@gmail.com','male','0741620029',0),(93,'Birunthaban','Rajendram','Sri-Lanka','2024-10-01','Colombo-06','Colombo','birunthur@gmail.com','male','0741620029',0);
/*!40000 ALTER TABLE `passenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `planes`
--

LOCK TABLES `planes` WRITE;
/*!40000 ALTER TABLE `planes` DISABLE KEYS */;
/*!40000 ALTER TABLE `planes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `registered`
--

LOCK TABLES `registered` WRITE;
/*!40000 ALTER TABLE `registered` DISABLE KEYS */;
INSERT INTO `registered` VALUES ('alexanderwhite','pass123',15,2),('amelia_clark','pass123',16,1),('avaanderson','pass123',12,1),('benjaminhill','pass123',27,3),('birunthaban','$2b$10$36PMq4K00/KpR2Np39VOAeWkcHgTUkqyclSbw0qCrMA39lXDsgsMu',NULL,NULL),('charlotteharris','pass123',14,2),('danielwilson','pass123',9,2),('davidmartinez','pass123',7,3),('elijahgreen','pass123',29,3),('emilydavis','pass123',4,1),('ethanwalker','pass123',19,1),('graceflores','pass123',38,2),('henryrodriguez','pass123',17,3),('isabellalopez','pass123',10,2),('jacksonroberts','pass123',25,2),('jacobbailey','pass123',37,3),('jamesmartin','pass123',13,3),('janesmith','pass123',2,1),('johndoe','pass123',1,1),('lilyclark','pass123',36,1),('logancox','pass123',39,3),('masonkelly','pass123',43,3),('miawalker','pass123',18,2),('michaeljohnson','pass123',3,2),('noahbrown','pass123',35,3),('oliviamartinez','pass123',6,1),('robertbrown','pass123',5,3),('scarlettflores','pass123',28,2),('sophiamiller','pass123',8,1),('victoriamartin','pass123',42,1),('williamtaylor','pass123',11,3),('zoebaker','pass123',30,1);
/*!40000 ALTER TABLE `registered` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `reward`
--

LOCK TABLES `reward` WRITE;
/*!40000 ALTER TABLE `reward` DISABLE KEYS */;
INSERT INTO `reward` VALUES (1,'Regular',0),(2,'Frequent',0.05),(3,'Gold',0.09),(4,'Regular',0),(5,'Frequent',0.05),(6,'Gold',0.09);
/*!40000 ALTER TABLE `reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,1,2,1150),(2,2,1,1150),(3,1,3,3400),(4,2,3,3450),(5,3,4,240),(6,4,3,240),(7,5,6,1150),(8,6,5,1150),(9,7,5,1750),(10,6,7,1350),(11,3,5,2400),(12,3,6,2250),(13,8,9,25),(14,9,8,25),(15,8,1,2900),(16,9,2,2950),(17,8,3,3000),(18,9,4,3050),(19,10,1,885),(20,10,2,1670),(21,10,3,2750),(22,10,5,4150),(23,10,6,3900),(24,10,7,2950);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,1,1,1,1,100,'available'),(2,1,1,1,2,100,'available'),(3,1,1,2,3,100,'available'),(4,1,1,2,4,100,'available'),(5,1,2,1,3,200,'available'),(6,1,2,1,4,200,'available'),(7,1,3,1,5,300,'available'),(8,2,1,1,1,120,'available'),(9,2,1,1,2,120,'available'),(10,2,1,2,1,120,'available'),(11,2,2,1,3,220,'available'),(12,2,3,1,4,320,'available');
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seatprices`
--

LOCK TABLES `seatprices` WRITE;
/*!40000 ALTER TABLE `seatprices` DISABLE KEYS */;
INSERT INTO `seatprices` VALUES ('FL001',1,50.00),('FL002',1,200.00),('FL003',1,50.00),('FL004',1,175.00),('FL005',1,150.00),('FL006',1,200.00),('FL007',1,125.00),('FL008',1,150.00),('FL001',2,100.00),('FL002',2,400.00),('FL003',2,100.00),('FL004',2,350.00),('FL005',2,300.00),('FL006',2,400.00),('FL007',2,250.00),('FL008',2,300.00),('FL001',3,150.00),('FL002',3,600.00),('FL003',3,150.00),('FL004',3,525.00),('FL005',3,450.00),('FL006',3,600.00),('FL007',3,375.00),('FL008',3,450.00);
/*!40000 ALTER TABLE `seatprices` ENABLE KEYS */;
UNLOCK TABLES;

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

/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-28 22:53:41
