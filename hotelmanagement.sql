-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 23, 2024 at 10:48 AM
-- Server version: 8.0.22
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotelmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int NOT NULL,
  `reservation_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` datetime NOT NULL,
  `payment_status` enum('pending','successful','failed') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `room_id` int NOT NULL,
  `check_in_date` date NOT NULL,
  `check_out_date` date NOT NULL,
  `status` enum('pending','confirmed','checked_in','checked_out') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int NOT NULL,
  `room_number` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT '1',
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `room_number`, `type`, `price_per_night`, `availability`, `image`) VALUES
(2, '303', 'luxe', '500.00', 1, 'https://media.istockphoto.com/id/1318363878/fr/photo/int%C3%A9rieur-moderne-de-chambre-%C3%A0-coucher-de-luxe-la-nuit.jpg?s=612x612&w=0&k=20&c=mn-RlIIhInownoFv5c-6Q_Sct0c0ImLYwJacOZuW9T0='),
(3, '103', 'single', '100.00', 0, 'https://media.istockphoto.com/id/1436893547/fr/photo/jeune-voyageuse-asiatique-avec-bagages-et-chapeau-de-paille-dans-la-chambre-dh%C3%B4tel-apr%C3%A8s.webp?b=1&s=612x612&w=0&k=20&c=PBtxTc1WZfkiY7v75gS4tTfp_EunawUWaV4EvU5a7ek='),
(4, '135', 'luxe', '500.00', 1, 'https://media.istockphoto.com/id/1318363878/fr/photo/int%C3%A9rieur-moderne-de-chambre-%C3%A0-coucher-de-luxe-la-nuit.jpg?s=612x612&w=0&k=20&c=mn-RlIIhInownoFv5c-6Q_Sct0c0ImLYwJacOZuW9T0='),
(7, '101', 'standard', '100.00', 1, 'https://plus.unsplash.com/premium_photo-1689609950057-8d01c2542fd1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhbWJyZXxlbnwwfHwwfHx8MA%3D%3D'),
(9, '115', 'luxe', '88.00', 1, 'https://images.unsplash.com/photo-1633948393301-d43e3ec0e5cd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhbWJyZXxlbnwwfHwwfHx8MA%3D%3D'),
(11, '111', 'double', '200.00', 1, 'https://media.istockphoto.com/id/512883194/fr/photo/un-service-d%C3%A9tage.jpg?s=612x612&w=0&k=20&c=oXlZvyqnEu-tuyAhgtlPtzX-SoBFWe9-vL8USw-SPsQ='),
(12, '115', 'standard', '300.00', 1, 'https://media.istockphoto.com/id/512883194/fr/photo/un-service-d%C3%A9tage.jpg?s=612x612&w=0&k=20&c=oXlZvyqnEu-tuyAhgtlPtzX-SoBFWe9-vL8USw-SPsQ='),
(13, '201', 'suite', '230.00', 1, 'https://media.istockphoto.com/id/512883194/fr/photo/un-service-d%C3%A9tage.jpg?s=612x612&w=0&k=20&c=oXlZvyqnEu-tuyAhgtlPtzX-SoBFWe9-vL8USw-SPsQ='),
(17, '505', 'lux', '700.00', 1, 'https://images.unsplash.com/photo-1633948393301-d43e3ec0e5cd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhbWJyZXxlbnwwfHwwfHx8MA%3D%3D');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('admin','guest') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`) VALUES
(1, 'admin@example.com', '$2b$10$JG75NzLtlJ9u38PiHrMIM.F6Aspeiud0Dpj2nrZvOCwxMExb.wlMC', 'user@example.com', 'admin'),
(2, 'admin@example.com', '$2b$10$wjRLBpiw776HZ4RzWjEDA.kYExV2a4h/oXBZgdL4xytFN0fX7x/fK', 'kaka@example.com', 'admin'),
(3, 'nathan', '$2b$10$vSPA4llHQ4ZriaZEKblyxOkrNuOCJ5MiYDJGbgbLU3ZR7RQpZIv.e', 'nathan@example.com', 'guest'),
(4, 'nathan', '$2b$10$74EWIDXwXzLgzKdhr4PAdOfXOosDNBFxNbm5ntRTgJGLwKYaytJtW', 'nathan@example.com', 'guest'),
(5, 'newuser', '$2b$10$0x4oi2vIPrsMAsYwZ92N9O/pQfk.616vWRkoIau0aUv/ZYflmhUsu', 'newuser@example.com', 'guest'),
(6, 'newuser', '$2b$10$/IVzcpszQKnT52XUpL6ssOJJKhYpOHyWh2oBfnleO.h7IT4d64RSm', 'newuser@example.com', 'guest'),
(7, 'newuser', '$2b$10$aLOxqtvSHSLsDzr0aT8M6./.4EXJQc39P9k.A4PjN5zXwIXAGyK9C', 'newuser@example.com', 'guest'),
(8, 'new_user', '$2b$10$CtlDEdXcxzqMMOStBC5hl.4CQ2lAUHMV3fu981Wt1h4aIIAgCUCnO', 'new_user@example.com', 'guest'),
(9, 'dannyuser', '$2b$10$e0aePToBmIgfoAOs9I6jYOkv01D2dWVCt7v8oPsFfLBLsFPwurNaW', 'newuser@example.com', 'guest'),
(10, 'guest', '$2b$10$DLG/VYTCenqrUjHepXYLKO58t.4GLT8zY.IT80Qh3Ug99qGm5x13.', 'guest@example.com', 'guest'),
(11, 'arthur', '$2b$10$w7KQwGVOLcL00MM9vgs4g.dx0nV8RnCAeSk5syx/Iou.Wdhxgxb6q', 'arthur@example.com', 'admin'),
(12, 'arthur22', '$2b$10$fzQg452hZxy75eAg10cbyexR9sK7cDF40xBq9zs1xLLZSltSU35pC', 'arthur22@example.com', 'admin'),
(13, 'jessy', '$2b$10$Bufo3aX/cYd/b7aepXg2nu.myHBMCL8xhXrf.erSvV.1b64Ym3lmS', 'jessy@example.com', 'admin'),
(14, 'jessy28', '$2b$10$LoxdkZTIIf8F1LErJfF5Ve2LnguV2LoYtEJb.FKgCGznYoDKNUTHG', 'jessy28@example.com', 'guest'),
(15, 'julie', '$2b$10$dHWksgkHr1yovipn3Jkq/.vYjkzihjHmhY3a5X5p2Z24N1OFil5MS', 'julie@example.com', 'admin'),
(16, 'blanco', '$2b$10$sC9hViYfAO/94vLtfKfljOVPGKKD7ItFzRIYP9IiPejYVf01UII7u', 'admin@example.com', 'admin'),
(17, 'Marc', '$2b$10$qU0nq3.VyXWGtpOD9Ju2fOFECp6gZ5TsQ5V2hFnZo5Bu/6UrLL8ry', 'marc@example.com', 'guest'),
(20, 'wahab', '$2b$10$4OpSaumKvp3K5O6Fmssoa.MqN8j78T3ITOmpd.9aeeTOWc.vV/0u2', 'wahab@example.com', 'admin'),
(22, 'Carlos', '$2b$10$Mch/5OErJPA4SlcVPVsMxujTc8yEDfwcgXvsyNZ61c6twzJch5i1i', 'carlos@example.com', 'guest'),
(23, 'Carlos1', '$2b$10$atE7vVNUZ6YvV3J3te.ys.rVpLd11A1kkN/4.KeongTrMZQBdV7hy', 'carlos1@example.com', 'guest'),
(24, 'new_user', '$2b$10$TG7V1UyTpq3lNhiSOuMvM.TZ/tP/tL.mGAnYm.sXHXOirhAMlyNN.', 'new_useryann@example.com', 'guest'),
(25, 'serge', '$2b$10$N8aYDpx.uukuktboy5./P.3xWl9LLqm0.LNzG1xQwK54Tyv8H582u', 'serge@gmail.com', 'guest'),
(26, 'serge', '$2b$10$wkRINqkQmXdMmkX0U.a/oelbT76ZQp8bch/Q.8vbspmxikitMCYpe', 'serge@gmail.com', 'guest'),
(27, 'christian', '$2b$10$MIBjsDvX.VRuFG573mRGzeRyfW78PQ.LqgNfYKr14sohbjQTYMh8G', 'chris@gmail.com', 'guest'),
(28, 'jeanclaude', '$2b$10$j2OiZeFNVrXW4qYZDzdmoOOvUaYHEaMBEsOcesAmdHOSBHIo1EhgC', 'jc@gmail.com', 'admin'),
(30, 'charlie', '$2b$10$CmTJb3.xuVeis.D1zUgwleFYOl5kDfHnVdxWK/rTesS7lP9U3/pym', 'charlie@gmail.com', 'guest');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservation_id` (`reservation_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
