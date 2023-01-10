/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_comment` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`),
  UNIQUE KEY `comments_imageId_userId_unique` (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images` (`image_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `image_saves`;
CREATE TABLE `image_saves` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `created_save` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `images`;
CREATE TABLE `images` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `descrition` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `age` int DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`user_id`, `image_id`, `content`, `created_comment`) VALUES
(2, 1, 'ảnh đẹp quá', '2023-01-06 03:32:16');
INSERT INTO `comments` (`user_id`, `image_id`, `content`, `created_comment`) VALUES
(2, 2, 'ảnh đẹp', '2023-01-06 03:33:30');
INSERT INTO `comments` (`user_id`, `image_id`, `content`, `created_comment`) VALUES
(2, 3, 'ảnh rất đẹp', '2023-01-07 09:02:36');
INSERT INTO `comments` (`user_id`, `image_id`, `content`, `created_comment`) VALUES
(3, 1, 'ảnh đẹp', '2023-01-06 03:32:25'),
(3, 2, 'ảnh rất đẹp', '2023-01-06 03:46:54');

INSERT INTO `image_saves` (`user_id`, `image_id`, `created_save`) VALUES
(2, 1, '2023-01-07 13:15:39');
INSERT INTO `image_saves` (`user_id`, `image_id`, `created_save`) VALUES
(2, 2, '2023-01-06 03:32:38');
INSERT INTO `image_saves` (`user_id`, `image_id`, `created_save`) VALUES
(3, 1, '2023-01-06 03:32:52');
INSERT INTO `image_saves` (`user_id`, `image_id`, `created_save`) VALUES
(3, 2, '2023-01-06 03:32:42');

INSERT INTO `images` (`image_id`, `image_name`, `image_url`, `descrition`, `user_id`) VALUES
(1, 'Phố cổ Hội An', 'http://localhost:4000/static/1673076143626-469430886-hot girl.jpeg', 'abcde', 2);
INSERT INTO `images` (`image_id`, `image_name`, `image_url`, `descrition`, `user_id`) VALUES
(2, 'Dreamer', 'https://dimg04.c-ctrip.com/images/0M751120009e19z74BAA6_Q60.jpg_.webp', 'bcd', 3);
INSERT INTO `images` (`image_id`, `image_name`, `image_url`, `descrition`, `user_id`) VALUES
(3, 'Ruộng bậc thang', 'https://www.invert.vn/media/uploads/uploads/2022/12/03143748-12-hinh-anh-dep.jpeg', 'bcd', 4);

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `age`, `avatar`, `role`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$hAU9TdrV8ReXbMYmrfzVdO.TJKm043d0aeed9Abkg8reIwJi.Wh9a', 18, '', 'admin');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `age`, `avatar`, `role`) VALUES
(2, 'thu', 'thu@gmail.com', '$2b$10$T8NDe.59z3kOwB7VJlx11.B4O7RiPa2Z0LPABjR90ucp4xRPbDLM6', 21, '123', 'user');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `age`, `avatar`, `role`) VALUES
(3, 'thanh', 'thanh@gmail.com', '$2b$10$bD2/EaLdwe9112jdWZ4cn.4cBgdP6f20TL03SbFgfZnyP8f3KRaty', 19, '', 'user');
INSERT INTO `users` (`user_id`, `full_name`, `email`, `password`, `age`, `avatar`, `role`) VALUES
(4, 'thien', 'thien@gmail.com', '$2b$10$qqImQfdS8bJhzatDl9Q3juVGXUqzsXwpqU6ti1i8BUoqfeLOiao8W', 19, '', 'user'),
(5, 'hoa', 'hoa@gmail.com', '$2b$10$FMqQ8NS0MOSXGDxpP9J5aOgLtdDoptbGqPDtWcjUEcqpW8eo8w.Gu', 19, '', 'user'),
(6, 'hien', 'hien@gmail.com', '$2b$10$M0KlZqDZkp1FYtf75F.ys.pu5yjisIDgu/h0R1JLEjU0aBmOgKbvK', 19, '', 'user');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;