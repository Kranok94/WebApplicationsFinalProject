CREATE TABLE Users (
    username 			VARCHAR(50) NOT NULL PRIMARY KEY,
    password 			VARCHAR(50) NOT NULL,
    originalPassword 	VARCHAR(50) NOT NULL,
    passwordLength 		VARCHAR(50) NOT NULL,
	userType 			VARCHAR(50) NOT NULL
    
);

INSERT INTO Users(username, password, originalPassword, passwordLength, userType)
VALUES  ('administrator', "3svE3ATiWJXxRfbOhW69qQc2+uakRYO4LKUW8Y/XJQU=",'saisd', 5,'Administrator'),
		('staff'        , "/6FgkdUzz+/M2wyMym7/9CPLT8N7jQrVp4P6q38nwLM=",'gadget', 6, 'Staff Member');