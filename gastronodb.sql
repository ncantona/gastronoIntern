-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 03:51 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gastronodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `position` int(11) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `restaurant_restaurant_id` bigint(20) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`position`, `id`, `restaurant_restaurant_id`, `name`) VALUES
(1, 1, 1, 'Getränke');

-- --------------------------------------------------------

--
-- Table structure for table `customer_user`
--

CREATE TABLE `customer_user` (
  `created_at` datetime(6) DEFAULT NULL,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_user`
--

INSERT INTO `customer_user` (`created_at`, `first_name`, `last_name`, `email`, `id`, `login_id`, `password`, `roles`) VALUES
('2026-01-06 16:13:33.000000', 'John', 'Doe', 'mail@example.com', '14cac95d-0263-4914-b46c-b889cd742217', NULL, '$2a$10$8WAyDrT4wLPy5TW8MlNLt.v2nfz1rKYPk0KAxIjvEblMkKrSris.a', 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `host_user`
--

CREATE TABLE `host_user` (
  `created_at` datetime(6) DEFAULT NULL,
  `fk_restaurant_id` bigint(20) DEFAULT NULL,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `host_user`
--

INSERT INTO `host_user` (`created_at`, `fk_restaurant_id`, `first_name`, `last_name`, `email`, `id`, `login_id`, `password`, `roles`) VALUES
('2026-01-06 16:13:33.000000', 1, NULL, NULL, NULL, '3daf2088-c34f-41be-99c4-d464f554df00', 'ID-Bar', '$2a$10$KmXSjam3j1qw.AxGBxnYX.2R9u8PJRwLJHLL9rd0pM01Ap2aq9npm', 'ROLE_BAR'),
('2026-01-06 16:13:33.000000', 1, 'Sue', 'Doe', NULL, '59c76622-2404-4730-8e75-4600530803ba', 'ID-Host', '$2a$10$6aEp23CxjDHLtMMBNHTC1.lePnS.ecC7WErCfQeY2Rdb2pJSJVfP6', 'ROLE_HOST'),
('2026-01-06 16:13:33.000000', NULL, 'Steve', 'Doe', NULL, '7c332c51-b075-4d87-be50-9ebd8ca5b120', 'ID-Admin', '$2a$10$QIFXxSUW6D8joE2HNjagruF2tE.gFrevFT2EGS6FAmOXHU1/S56wu', 'ROLE_ADMIN'),
('2026-01-06 16:13:33.000000', 1, NULL, NULL, NULL, 'd69c2bbe-5091-496d-b004-22cb3b7407e0', 'ID-Kitchen', '$2a$10$cKqgBrH/f8K7QSokklv7JecOuQaeE/upuDvnGJpLRcSAQzEuhxqwG', 'ROLE_KITCHEN');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `total_amount` decimal(10,2) NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `is_available` bit(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `fk_restaurant_id` bigint(20) NOT NULL,
  `id` bigint(20) NOT NULL,
  `code` varchar(30) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('BEVERAGE','MEAL') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`is_available`, `position`, `price`, `category_id`, `fk_restaurant_id`, `id`, `code`, `description`, `name`, `type`) VALUES
(b'1', 1, 3.99, 1, 1, 2, 'BEV001', 'Erfrischungsgetränk', 'Coca Cola', 'BEVERAGE'),
(b'1', 2, 3.99, 1, 1, 3, 'BEV002', 'Erfrischungsgetränk', 'Coca Cola Zero', 'BEVERAGE'),
(b'1', 3, 3.49, 1, 1, 4, 'BEV003', 'Orangenlimonade', 'Fanta', 'BEVERAGE'),
(b'1', 4, 3.49, 1, 1, 5, 'BEV004', 'Zitronenlimonade', 'Sprite', 'BEVERAGE'),
(b'1', 5, 2.99, 1, 1, 6, 'BEV005', 'Mineralwasser still', 'Stilles Wasser', 'BEVERAGE'),
(b'1', 6, 2.99, 1, 1, 7, 'BEV006', 'Mineralwasser sprudel', 'Sprudelwasser', 'BEVERAGE'),
(b'1', 7, 3.99, 1, 1, 8, 'BEV007', 'Eistee Pfirsich', 'Eistee Pfirsich', 'BEVERAGE'),
(b'1', 8, 3.99, 1, 1, 9, 'BEV008', 'Eistee Zitrone', 'Eistee Zitrone', 'BEVERAGE'),
(b'1', 9, 4.49, 1, 1, 10, 'BEV009', 'Energy Drink', 'Red Bull', 'BEVERAGE'),
(b'1', 10, 3.49, 1, 1, 11, 'BEV010', 'Apfelsaft', 'Apfelsaft', 'BEVERAGE');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_amount` decimal(10,2) DEFAULT NULL,
  `fk_invoice_id` bigint(20) DEFAULT NULL,
  `fk_payment_method_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `payment_date` datetime(6) DEFAULT NULL,
  `fk_user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` bigint(20) NOT NULL,
  `definition` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prep_time`
--

CREATE TABLE `prep_time` (
  `end_time` datetime(6) DEFAULT NULL,
  `fk_order_id` bigint(20) DEFAULT NULL,
  `fk_order_item_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `start_time` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating_item`
--

CREATE TABLE `rating_item` (
  `stars` int(11) NOT NULL,
  `fk_order_item_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `fk_user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rating_restaurant`
--

CREATE TABLE `rating_restaurant` (
  `stars` int(11) NOT NULL,
  `fk_restaurant_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `fk_user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `created_at` datetime(6) NOT NULL,
  `expiry_date` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`created_at`, `expiry_date`, `token`, `user_id`) VALUES
('2026-01-07 14:48:58.000000', '2026-01-14 14:48:58.000000', 'd5610aa3-c719-49e1-ad90-c93dbca528b3', 'd69c2bbe-5091-496d-b004-22cb3b7407e0');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `is_active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `fk_zipcode_id` bigint(20) NOT NULL,
  `restaurant_id` bigint(20) NOT NULL,
  `address_addition` varchar(255) DEFAULT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`is_active`, `created_at`, `fk_zipcode_id`, `restaurant_id`, `address_addition`, `restaurant_name`, `street`) VALUES
(b'1', '2026-01-06 16:13:33.000000', 1, 1, '2. Stock', 'McDonalds', 'Kärtnerstraße 1'),
(b'0', '2026-01-06 16:13:33.000000', 1, 2, NULL, 'BurgerKing', 'Kärtnerstraße 3');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_table`
--

CREATE TABLE `restaurant_table` (
  `capacity` int(11) NOT NULL,
  `fk_section_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `fk_restaurant_id` bigint(20) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `section_waiter`
--

CREATE TABLE `section_waiter` (
  `section_id` bigint(20) NOT NULL,
  `waiters_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_order`
--

CREATE TABLE `user_order` (
  `orders_id` bigint(20) NOT NULL,
  `users_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `waiter`
--

CREATE TABLE `waiter` (
  `created_at` datetime(6) DEFAULT NULL,
  `fk_restaurant_id` bigint(20) DEFAULT NULL,
  `first_name` varchar(200) DEFAULT NULL,
  `last_name` varchar(200) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `roles` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `waiter`
--

INSERT INTO `waiter` (`created_at`, `fk_restaurant_id`, `first_name`, `last_name`, `email`, `id`, `login_id`, `password`, `roles`) VALUES
('2026-01-06 16:13:33.000000', 1, 'Wheezy', 'Waiter', NULL, '7eb7d617-9384-481f-b832-8e0575cbb0a9', 'ID-Waiter', '$2a$10$M9hVBwTYF1cKpY0wK5NeIOqCv0dLqwQkI0bAwSB.fTfcKcEo6Xm.e', 'ROLE_WAITER');

-- --------------------------------------------------------

--
-- Table structure for table `zipcode`
--

CREATE TABLE `zipcode` (
  `id` bigint(20) NOT NULL,
  `zipcode` varchar(50) NOT NULL,
  `definition` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `zipcode`
--

INSERT INTO `zipcode` (`id`, `zipcode`, `definition`) VALUES
(1, '1010', 'Wien');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKl4te6xp6ke0bsojloic5d1a93` (`restaurant_restaurant_id`);

--
-- Indexes for table `customer_user`
--
ALTER TABLE `customer_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UK6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`);

--
-- Indexes for table `host_user`
--
ALTER TABLE `host_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UK6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`),
  ADD KEY `FK8jwx0ottinndk7senapmlcnw1` (`fk_restaurant_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK2n9w8d0dp4bsfra9dcg0046l4` (`category_id`),
  ADD KEY `FKk36qi5mf6dkoru36bx5sr9f9p` (`fk_restaurant_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKmn2iyyisw759xywk23rie8hks` (`fk_payment_method_id`),
  ADD UNIQUE KEY `UKid601jfj624vwqficea6ytlqx` (`fk_user_id`),
  ADD KEY `FKj06warrpsv6vokxm6u1ru0h9i` (`fk_invoice_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prep_time`
--
ALTER TABLE `prep_time`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK2l0divk8l5kckdik0ut3omqjk` (`fk_order_item_id`);

--
-- Indexes for table `rating_item`
--
ALTER TABLE `rating_item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKf97kfkekqw1lg2wilalmn66nj` (`fk_order_item_id`),
  ADD KEY `FKar6g0g0ewd2j91kinm5jcq67c` (`fk_user_id`);

--
-- Indexes for table `rating_restaurant`
--
ALTER TABLE `rating_restaurant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3o3dntkt7h60yjufy8rsy63jk` (`fk_user_id`),
  ADD KEY `FKqvt2sp5fyi4mnbrou5s7eshwx` (`fk_restaurant_id`);

--
-- Indexes for table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD KEY `FK6wpue6ck5onkqqepmm8u8q8kh` (`fk_zipcode_id`);

--
-- Indexes for table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfklliwcisb6sjw72v3dkf05lf` (`fk_section_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9ppd6pr037o5ivgijy1sjeswl` (`fk_restaurant_id`);

--
-- Indexes for table `section_waiter`
--
ALTER TABLE `section_waiter`
  ADD KEY `FKtn2p5gotn20bgfbaonbiixmne` (`waiters_id`),
  ADD KEY `FK4wimw1x0hrcqbx3wda226hnmi` (`section_id`);

--
-- Indexes for table `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`orders_id`,`users_id`),
  ADD KEY `FKiuxr5jtlllbkcjapv83bmew8a` (`users_id`);

--
-- Indexes for table `waiter`
--
ALTER TABLE `waiter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UK6ntlp6n5ltjg6hhxl66jj5u0l` (`login_id`),
  ADD KEY `FK80tftstf9y9sch6vf6am6y63` (`fk_restaurant_id`);

--
-- Indexes for table `zipcode`
--
ALTER TABLE `zipcode`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prep_time`
--
ALTER TABLE `prep_time`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating_item`
--
ALTER TABLE `rating_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `rating_restaurant`
--
ALTER TABLE `rating_restaurant`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `restaurant_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zipcode`
--
ALTER TABLE `zipcode`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FKl4te6xp6ke0bsojloic5d1a93` FOREIGN KEY (`restaurant_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `host_user`
--
ALTER TABLE `host_user`
  ADD CONSTRAINT `FK8jwx0ottinndk7senapmlcnw1` FOREIGN KEY (`fk_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `FK2n9w8d0dp4bsfra9dcg0046l4` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `FKk36qi5mf6dkoru36bx5sr9f9p` FOREIGN KEY (`fk_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `FKj06warrpsv6vokxm6u1ru0h9i` FOREIGN KEY (`fk_invoice_id`) REFERENCES `invoice` (`id`),
  ADD CONSTRAINT `FKpo3jhfnwkcv5d2jj5hdlimjm0` FOREIGN KEY (`fk_payment_method_id`) REFERENCES `payment_method` (`id`),
  ADD CONSTRAINT `FKq93lmofyubpmyio4nvsl8gwqy` FOREIGN KEY (`fk_user_id`) REFERENCES `customer_user` (`id`);

--
-- Constraints for table `rating_item`
--
ALTER TABLE `rating_item`
  ADD CONSTRAINT `FKar6g0g0ewd2j91kinm5jcq67c` FOREIGN KEY (`fk_user_id`) REFERENCES `customer_user` (`id`);

--
-- Constraints for table `rating_restaurant`
--
ALTER TABLE `rating_restaurant`
  ADD CONSTRAINT `FK3o3dntkt7h60yjufy8rsy63jk` FOREIGN KEY (`fk_user_id`) REFERENCES `customer_user` (`id`),
  ADD CONSTRAINT `FKqvt2sp5fyi4mnbrou5s7eshwx` FOREIGN KEY (`fk_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `FK6wpue6ck5onkqqepmm8u8q8kh` FOREIGN KEY (`fk_zipcode_id`) REFERENCES `zipcode` (`id`);

--
-- Constraints for table `restaurant_table`
--
ALTER TABLE `restaurant_table`
  ADD CONSTRAINT `FKfklliwcisb6sjw72v3dkf05lf` FOREIGN KEY (`fk_section_id`) REFERENCES `section` (`id`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `FK9ppd6pr037o5ivgijy1sjeswl` FOREIGN KEY (`fk_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `section_waiter`
--
ALTER TABLE `section_waiter`
  ADD CONSTRAINT `FK4wimw1x0hrcqbx3wda226hnmi` FOREIGN KEY (`section_id`) REFERENCES `section` (`id`),
  ADD CONSTRAINT `FKtn2p5gotn20bgfbaonbiixmne` FOREIGN KEY (`waiters_id`) REFERENCES `waiter` (`id`);

--
-- Constraints for table `user_order`
--
ALTER TABLE `user_order`
  ADD CONSTRAINT `FKiuxr5jtlllbkcjapv83bmew8a` FOREIGN KEY (`users_id`) REFERENCES `customer_user` (`id`);

--
-- Constraints for table `waiter`
--
ALTER TABLE `waiter`
  ADD CONSTRAINT `FK80tftstf9y9sch6vf6am6y63` FOREIGN KEY (`fk_restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
