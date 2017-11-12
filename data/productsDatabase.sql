CREATE TABLE Products (
    productName 		VARCHAR(50) NOT NULL,
    ownerName			VARCHAR(50) NOT NULL,
    ownerEmail			VARCHAR(50) NOT NULL,
    ownerPhoneNumber	VARCHAR(50) NOT NULL,
	productPrice		VARCHAR(50) NOT NULL,
	sold				VARCHAR(50) NOT NULL,				/*0 = Not Sold, 1 = Sold*/
	codes				VARCHAR(50) NOT NULL PRIMARY KEY	/*Codes are CODE1, CODE2, CODE3*/
);

INSERT INTO Products(productName, ownerName, ownerEmail, ownerPhoneNumber, productPrice, sold, codes)
 			VALUES	('Wii Controller', 'Kevin B. Kwan', 'kb.kwanloo@gmail.com', '81-1631-8481', '1000', '1', 'CODE1'),
					('iPod Video 32GB', 'Alexander Kwan', 'kwan.alexander@gmail.com', '81-1632-9421', '300', '0', 'CODE10'),
					('Gameboy Advance', 'Diana Gonzalez', 'diana.gzz@gmail.com', '8359-4388', '550', '0', 'CODE11'),
					('Gamecube', 'Kevin B. Kwan', 'kb.kwanloo@gmail.com', '81-1631-8481', '2000', '1', 'CODE2'),
					('iPhone 7 64GB', 'Alexander Kwan', 'kwan.alexander@gmail.com', '82-2536-9002', '2000', '0', 'CODE3'),
					('8 GB USB Memory', 'Brian Loo', 'kranok@gmail.com', '81-1631-8586', '500', '1', 'CODE4'),
					('iTouch 32GB', 'Brian Loo', 'kranok@gmail.com', '81-1631-8586', '1500', '0', 'CODE5'),
					('USB Wireless Mouse', 'Diana Gonzalez', 'diana.gzz@gmail.com', '82-1934-1040', '200', '0', 'CODE6'),
					('Smash Bro. Melee', 'Alexander Kwan', 'kwan.alexander@gmail.com', '82-2536-9002', '500', '0', 'CODE7'),
					('iTouch 16GB', 'Kevin B. Kwan', 'kb.kwanloo@gmail.com', '81-1631-8481', '700', '0', 'CODE8'),
					('Gamecube Control', 'Brian Loo', 'kranok@gmail.com', '81-1631-8003', '250', '1', 'CODE9');