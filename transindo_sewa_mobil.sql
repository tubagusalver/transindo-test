-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2024 at 11:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `transindo_sewa_mobil`
--

-- --------------------------------------------------------

--
-- Table structure for table `dataref`
--

CREATE TABLE `dataref` (
  `ref_id` int(11) NOT NULL,
  `ref_merk` varchar(50) NOT NULL,
  `ref_model` varchar(50) NOT NULL,
  `ref_price` bigint(20) NOT NULL,
  `ref_plat` varchar(20) NOT NULL,
  `ref_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dataref`
--

INSERT INTO `dataref` (`ref_id`, `ref_merk`, `ref_model`, `ref_price`, `ref_plat`, `ref_status`) VALUES
(2, 'Toyota', 'Avanza', 400000, 'B 1111 CSS', 'Tersedia'),
(3, 'Toyota', 'Veloz', 420000, 'B 1111 JS', 'Tersedia'),
(4, 'Mitsubishi', 'Xpander', 500000, 'B 2222 AJX', 'Tersedia');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(11) NOT NULL,
  `history_rent_id` int(50) NOT NULL,
  `history_ref_id` int(50) NOT NULL,
  `history_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `history_rent_id`, `history_ref_id`, `history_date`) VALUES
(23, 1, 3, '2024-01-03'),
(24, 1, 3, '2024-01-04'),
(25, 1, 3, '2024-01-05'),
(26, 1, 3, '2024-01-06'),
(27, 1, 3, '2024-01-07'),
(28, 1, 3, '2024-01-08'),
(29, 1, 3, '2024-01-09'),
(30, 1, 3, '2024-01-10'),
(31, 1, 3, '2024-01-11'),
(32, 1, 3, '2024-01-12'),
(33, 1, 3, '2024-01-13'),
(34, 1, 3, '2024-01-14'),
(35, 1, 3, '2024-01-15'),
(36, 1, 3, '2024-01-16'),
(41, 6, 2, '2024-01-28'),
(42, 6, 2, '2024-01-29'),
(43, 6, 2, '2024-01-30'),
(44, 6, 2, '2024-01-31'),
(45, 7, 4, '2024-01-01'),
(46, 7, 4, '2024-01-02'),
(47, 7, 4, '2024-01-03'),
(48, 7, 4, '2024-01-04');

-- --------------------------------------------------------

--
-- Table structure for table `rent_request`
--

CREATE TABLE `rent_request` (
  `rent_id` int(11) NOT NULL,
  `rent_vehicle_id` int(50) NOT NULL,
  `rent_start_date` date NOT NULL,
  `rent_end_date` date NOT NULL,
  `rent_created_id` int(50) NOT NULL,
  `rent_created_name` varchar(100) NOT NULL,
  `rent_created_date` datetime NOT NULL,
  `rent_status` varchar(50) DEFAULT NULL,
  `rent_take_date` datetime DEFAULT NULL,
  `rent_return_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rent_request`
--

INSERT INTO `rent_request` (`rent_id`, `rent_vehicle_id`, `rent_start_date`, `rent_end_date`, `rent_created_id`, `rent_created_name`, `rent_created_date`, `rent_status`, `rent_take_date`, `rent_return_date`) VALUES
(1, 3, '2024-01-03', '2024-01-04', 1, 'Tubagus Alver', '2024-01-31 00:00:00', 'Sewa selesai', '2024-01-03 00:00:00', '2024-01-04 22:31:00'),
(6, 2, '2024-01-28', '2024-01-31', 1, 'Tubagus Alver', '2024-01-31 09:49:27', 'Sedang disewa', '2024-01-28 17:50:00', NULL),
(7, 4, '2024-01-01', '2024-01-04', 1, 'Tubagus Alver', '2024-01-31 09:57:12', 'Sudah dipesan', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username_user` varchar(100) NOT NULL,
  `password_user` varchar(100) NOT NULL,
  `nama_user` varchar(150) NOT NULL,
  `alamat_user` varchar(200) NOT NULL,
  `nomor_telepon_user` varchar(13) NOT NULL,
  `nomor_sim_user` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username_user`, `password_user`, `nama_user`, `alamat_user`, `nomor_telepon_user`, `nomor_sim_user`) VALUES
(1, 'tubagusalver@gmail.com', 'alver', 'Tubagus Alver', 'Kota Depok', '08180797025', '123456789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dataref`
--
ALTER TABLE `dataref`
  ADD PRIMARY KEY (`ref_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `rent_request`
--
ALTER TABLE `rent_request`
  ADD PRIMARY KEY (`rent_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dataref`
--
ALTER TABLE `dataref`
  MODIFY `ref_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `rent_request`
--
ALTER TABLE `rent_request`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
