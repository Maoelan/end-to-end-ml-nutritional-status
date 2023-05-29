-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 05:46 PM
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

--
-- Dumping data for table `alembic_version`
--

INSERT INTO `alembic_version` (`version_num`) VALUES
('977fab88fce5');

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
  `berat_lahir` float NOT NULL,
  `tinggi_lahir` float NOT NULL,
  `id_orang_tua` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_anak`
--

INSERT INTO `data_anak` (`id`, `nik`, `nama`, `jenis_kelamin`, `tanggal_lahir`, `berat_lahir`, `tinggi_lahir`, `id_orang_tua`) VALUES
(11, '123456789', 'nadela', 'perempuan', '2022-05-17', 3.2, 40, 5),
(12, '01290129', 'Natasha', 'Perempuan', '2022-05-17', 3.2, 40, 6),
(13, '000129921', 'Ajik', 'Laki-laki', '2023-05-19', 12, 12, 16);

-- --------------------------------------------------------

--
-- Table structure for table `data_gizi`
--

CREATE TABLE `data_gizi` (
  `id` int(11) NOT NULL,
  `id_anak` int(11) NOT NULL,
  `usia_diukur` int(11) NOT NULL,
  `tanggal_pengukuran` date NOT NULL,
  `berat` float NOT NULL,
  `tinggi` float NOT NULL,
  `lingkar_lengan_atas` float NOT NULL,
  `zs_bb_umur` float NOT NULL,
  `zs_tb_umur` float NOT NULL,
  `bb_umur` varchar(50) NOT NULL,
  `tb_umur` varchar(50) NOT NULL,
  `naik_berat_badan` varchar(10) NOT NULL,
  `jumlah_vitamin_a` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_gizi`
--

INSERT INTO `data_gizi` (`id`, `id_anak`, `usia_diukur`, `tanggal_pengukuran`, `berat`, `tinggi`, `lingkar_lengan_atas`, `zs_bb_umur`, `zs_tb_umur`, `bb_umur`, `tb_umur`, `naik_berat_badan`, `jumlah_vitamin_a`) VALUES
(3, 11, 1, '2023-05-17', 5.6, 64, 14, -2.63, -0.5, 'Berat Badan Normal', 'Gizi Lebih', 'Tidak', 1);

-- --------------------------------------------------------

--
-- Table structure for table `data_orang_tua`
--

CREATE TABLE `data_orang_tua` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `provinsi` varchar(100) NOT NULL,
  `kabupaten` varchar(100) NOT NULL,
  `kecamatan` varchar(100) NOT NULL,
  `desa` varchar(100) NOT NULL,
  `posyandu` varchar(100) NOT NULL,
  `rt` varchar(10) NOT NULL,
  `rw` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_orang_tua`
--

INSERT INTO `data_orang_tua` (`id`, `nama`, `alamat`, `provinsi`, `kabupaten`, `kecamatan`, `desa`, `posyandu`, `rt`, `rw`) VALUES
(5, 'Maulana Muhammad', 'Sintung Timur', 'Nusa Tenggara Barat', 'Lombok Tengah', 'Pringgarata', 'Sintung', 'Posyandu Mekar Indah', '00', '00'),
(6, 'Baiq Nata Ananda', 'Sintung Timur', 'Nusa Tenggara Barat', 'Lombok Tengah', 'Pringgarata', 'Sintung', 'Posyandu Mekar Indah', '01', '00'),
(16, 'Nana', 'Bonjeruk, Sintung Timur', 'Nusa Tenggara Barat', 'Lombok Tengah', 'Pringggarata', 'Dasan', 'Bonjeruk Indah', '05', '08');

-- --------------------------------------------------------

--
-- Table structure for table `data_user`
--

CREATE TABLE `data_user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `data_user`
--

INSERT INTO `data_user` (`id`, `username`, `email`, `password`, `role`) VALUES
(6, 'Maoelana', 'maulanamuhammad2000@gmail.com', 'Nadela123', 'User'),
(7, 'admin', 'admin@gmail.com', 'admin', 'user');

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
  ADD UNIQUE KEY `id_orangtua` (`id_orang_tua`);

--
-- Indexes for table `data_gizi`
--
ALTER TABLE `data_gizi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_anak` (`id_anak`);

--
-- Indexes for table `data_orang_tua`
--
ALTER TABLE `data_orang_tua`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_user`
--
ALTER TABLE `data_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_anak`
--
ALTER TABLE `data_anak`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `data_gizi`
--
ALTER TABLE `data_gizi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `data_orang_tua`
--
ALTER TABLE `data_orang_tua`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `data_user`
--
ALTER TABLE `data_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `data_anak`
--
ALTER TABLE `data_anak`
  ADD CONSTRAINT `data_anak_ibfk_1` FOREIGN KEY (`id_orang_tua`) REFERENCES `data_orang_tua` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `data_gizi`
--
ALTER TABLE `data_gizi`
  ADD CONSTRAINT `data_gizi_ibfk_1` FOREIGN KEY (`id_anak`) REFERENCES `data_anak` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
