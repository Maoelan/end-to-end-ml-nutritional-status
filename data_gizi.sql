-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 15, 2023 at 08:35 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data_gizi`
--

-- --------------------------------------------------------

--
-- Table structure for table `alembic_version`
--

CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_anak`
--

CREATE TABLE `data_anak` (
  `id` int(11) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `jenis_kelamin` varchar(10) NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `berat_lahir` float(5,2) NOT NULL,
  `tinggi_lahir` float(5,2) NOT NULL,
  `id_orangtua` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_gizi`
--

CREATE TABLE `data_gizi` (
  `id` int(11) NOT NULL,
  `id_anak` int(11) NOT NULL,
  `usia_diukur` int(11) NOT NULL,
  `tanggal_pengukuran` date NOT NULL,
  `berat` float(5,2) NOT NULL,
  `tinggi` float(5,2) NOT NULL,
  `lingkar_lengan_atas` float(5,2) NOT NULL,
  `zs_bb_umur` float(5,2) NOT NULL,
  `zs_bb_tb` float(5,2) NOT NULL,
  `bb_umur` float(5,2) NOT NULL,
  `bb_tb` float(5,2) NOT NULL,
  `naik_berat_badan` varchar(10) NOT NULL,
  `jumlah_vitamin_a` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_login`
--

CREATE TABLE `data_login` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `data_orang_tua`
--

CREATE TABLE `data_orang_tua` (
  `id` int(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `kabupaten` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `desa` varchar(100) NOT NULL,
  `posyandu` varchar(100) NOT NULL,
  `rt` varchar(10) NOT NULL,
  `rw` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alembic_version`
--
ALTER TABLE `alembic_version`
  ADD PRIMARY KEY (`version_num`);

--
-- Indexes for table `data_anak`
--
ALTER TABLE `data_anak`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_orangtua` (`id_orangtua`);

--
-- Indexes for table `data_gizi`
--
ALTER TABLE `data_gizi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_anak` (`id_anak`);

--
-- Indexes for table `data_login`
--
ALTER TABLE `data_login`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_orang_tua`
--
ALTER TABLE `data_orang_tua`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_anak`
--
ALTER TABLE `data_anak`
  ADD CONSTRAINT `data_anak_ibfk_1` FOREIGN KEY (`id_orangtua`) REFERENCES `data_orang_tua` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_gizi`
--
ALTER TABLE `data_gizi`
  ADD CONSTRAINT `data_gizi_ibfk_1` FOREIGN KEY (`id_anak`) REFERENCES `data_anak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
