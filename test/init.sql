CREATE DATABASE test1;
CREATE USER test1user@localhost;
SET PASSWORD FOR test1user@localhost= PASSWORD("test1password");
GRANT ALL PRIVILEGES ON test1.* TO test1user@localhost IDENTIFIED BY 'test1password';
FLUSH PRIVILEGES;