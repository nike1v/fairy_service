INSERT INTO services (title) VALUES ("Масаж"), ("Манікюр"), ("Косметологія"), ("Волосся");

INSERT INTO staff (firstName, serviceId) VALUES ("Олена", 1), ("Катерина", 4), ("Марія", 2), ("Анна", 4), ("Саша", 3), ("Віолетта", 2);

INSERT INTO clients (firstName, lastName, email, phone, password, isActive, admin) VALUES ("Микита", "Власов", "dgygurdenok@gmail.com", "0954569973", "$2a$12$40i1ctNJ.9oXfcuCohft/OxMTkQFs5lTGB2I5Iyv99DR5IfF39xeK", "1", true);

INSERT INTO orders (serviceId, staffId, clientId) VALUES (1, 1, 1);