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
        Airport arrival_ar ON arrival_ar.Airport_ID = r.Arrival_Airport_ID;
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

-- Dump completed on 2024-10-28 22:13:28
