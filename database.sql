CREATE TABLE KoalasNew (
	id SERIAL PRIMARY KEY,
	"NAME"  varchar (10),
	"AGE"  integer ,
	"GENDER" varchar (1),
	"READY FOR TRANSFER" boolean,
	"NOTES" varchar
);

INSERT INTO KoalasNew 
("NAME", "AGE", "GENDER", "READY FOR TRANSFER", "NOTES")
VALUES
('Scotty', 4, 'M', 'true', 'born in guatemala'),
('Jean', 5, 'f', 'true', 'allergic to lots of lava'),
('Ororo', 7, 'f', 'false', 'loves listening to Paula'),
('Logan', 15, 'm', 'false', 'Love the sauna'),
('Charlie', 9, 'm', 'true', 'favorite band is Nirvana'),
('Betsy', 4, 'f', 'true', 'has a pet iguana') 