-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Czas generowania: 15 Gru 2016, 23:59
-- Wersja serwera: 10.1.19-MariaDB
-- Wersja PHP: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Baza danych: `polls`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `answers`
--

CREATE TABLE `answers` (
  `id` int(11) UNSIGNED NOT NULL,
  `question` int(11) UNSIGNED NOT NULL,
  `allowcustomvalue` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `options`
--

CREATE TABLE `options` (
  `id` int(11) UNSIGNED NOT NULL,
  `answer` int(11) UNSIGNED NOT NULL,
  `text` varchar(250) COLLATE utf8_bin NOT NULL,
  `value` varchar(250) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `polls`
--

CREATE TABLE `polls` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8_bin NOT NULL,
  `user` int(11) UNSIGNED NOT NULL,
  `status` tinyint(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `polls`
--

INSERT INTO `polls` (`id`, `name`, `user`, `status`) VALUES
(5, 'Example 02', 1, 1),
(6, 'Testowa', 1, 1),
(7, 'Testowa 2', 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `questions`
--

CREATE TABLE `questions` (
  `id` int(11) UNSIGNED NOT NULL,
  `question` text COLLATE utf8_bin NOT NULL,
  `required` tinyint(1) NOT NULL,
  `type` tinyint(1) UNSIGNED NOT NULL,
  `poll` int(11) UNSIGNED NOT NULL,
  `min` varchar(50) COLLATE utf8_bin NOT NULL,
  `max` varchar(50) COLLATE utf8_bin NOT NULL,
  `step` varchar(50) COLLATE utf8_bin NOT NULL,
  `inputtype` varchar(20) COLLATE utf8_bin NOT NULL,
  `multiple` tinyint(1) NOT NULL,
  `allowcustomvalue` tinyint(1) NOT NULL,
  `pattern` varchar(250) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id`, `name`) VALUES
(1, 'Krystian');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question` (`question`);

--
-- Indexes for table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer` (`answer`);

--
-- Indexes for table `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author` (`user`),
  ADD KEY `author_2` (`user`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poll` (`poll`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT dla tabeli `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question`) REFERENCES `questions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_ibfk_1` FOREIGN KEY (`answer`) REFERENCES `answers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `polls`
--
ALTER TABLE `polls`
  ADD CONSTRAINT `polls_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`poll`) REFERENCES `polls` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
