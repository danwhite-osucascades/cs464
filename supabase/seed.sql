DO $$
DECLARE
  list_id uuid;
BEGIN
-- Generated Seed Data

INSERT INTO lists (title, description) 
VALUES ('Brawlhalla Legends', 'Put the legends in order by chronological order they were added to the Game') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bodvar', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Cassidy', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Orion', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lord Vraxx', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Gnash', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Queen Nai', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Hattori', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sir Roland', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Scarlet', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Thatch', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ada', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sentinel', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lucien', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Teros', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brynn', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Asuri', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Barraza', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ember', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Azoth', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Koji', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ulgrim', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Diana', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jhala', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kor', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Wu Shang', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Val', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ragnir', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Cross', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mirage', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nix', 30);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mordex', 31);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Yumiko', 32);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Artemis', 33);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Caspian', 34);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sidra', 35);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xull', 36);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kaya', 37);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Isaiah', 38);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jiro', 39);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lin Fei', 40);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zariel', 41);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rayman', 42);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dusk', 43);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Fait', 44);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Thor', 45);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Petra', 46);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Vector', 47);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Volkov', 48);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Onyx', 49);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jaeyun', 50);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mako', 51);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magyar', 52);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Reno', 53);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Munin', 54);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Arcadia', 55);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ezio', 56);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tezca', 57);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Thea', 58);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Red Raptor', 59);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Loki', 60);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Seven', 61);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Vivi', 62);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Imugi', 63);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'King Zuva', 64);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Priya', 65);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ransom', 66);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lady Vera', 67);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rupture', 68);

-- End of Brawlhalla Legends

INSERT INTO lists (title, description) 
VALUES ('Bird Populations', 'Put the birds in order by population (most common first).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'House Sparrow', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'European Starling', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rock Pigeon', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Barn Swallow', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Red-billed Quelea', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Common Grackle', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'American Robin', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Red-winged Blackbird', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Yellow-rumped Warbler', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Common Blackbird', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'White Wagtail', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Song Sparrow', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brown-headed Cowbird', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Canada Goose', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mallard', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Great-tailed Grackle', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'House Finch', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Northern Cardinal', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'American Crow', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Black-capped Chickadee', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'European Goldfinch', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Cliff Swallow', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tree Sparrow', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zebra Finch', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Common Waxbill', 25);

-- End of Bird Populations

INSERT INTO lists (title, description) 
VALUES ('Game Consoles', 'Put the game consoles in order by release year (earliest first).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 100', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 200', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 300', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 400', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 500', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 2000', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 3000', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey 4000', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari Pong (Home Pong)', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Coleco Telstar', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Fairchild Channel F', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari 2600', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Magnavox Odyssey²', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Intellivision', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'ColecoVision', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari 5200', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nintendo Entertainment System (NES)', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega Master System', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari 7800', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'TurboGrafx-16 (PC Engine)', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega Genesis (Mega Drive)', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega CD', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Philips CD-i', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Neo Geo AES', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Super Nintendo Entertainment System (SNES)', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, '3DO Interactive Multiplayer', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari Jaguar', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Amiga CD32', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega 32X', 30);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega Saturn', 31);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation', 32);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nintendo 64', 33);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nuon', 34);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dreamcast', 35);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 2', 36);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'GameCube', 37);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox', 38);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Gizmondo', 39);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox 360', 40);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 3', 41);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Wii', 42);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Wii U', 43);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'OUYA', 44);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 4', 45);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox One', 46);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox One S', 47);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 4 Pro', 48);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox One X', 49);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Valve Steam Machine (Platform)', 50);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'NES Classic Edition (NES Mini)', 51);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'SNES Classic Edition', 52);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation Classic', 53);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega Genesis Mini', 54);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'TurboGrafx-16 Mini', 55);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sega Genesis Mini 2', 56);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Atari VCS (2021)', 57);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nintendo Switch', 58);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 5', 59);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PlayStation 5 Pro', 60);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Xbox Series X/S', 61);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, '(NEW) Steam Machine', 62);

-- End of Game Consoles

INSERT INTO lists (title, description) 
VALUES ('20 Largest Countries by Land Area', 'Put these countries in order by total land area (largest first).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Russia', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Canada', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'United States', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'China', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brazil', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Australia', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'India', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Argentina', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kazakhstan', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Algeria', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'DR Congo', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Saudi Arabia', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mexico', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Indonesia', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sudan', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Libya', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Iran', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mongolia', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Peru', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chad', 20);

-- End of 20 Largest Countries by Land Area

INSERT INTO lists (title, description) 
VALUES ('Dragon Quest Series', 'Put the games in order by in-world chronology, not release date.') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 11', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 3', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 2', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 6', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 4', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 5', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 7', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 8', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 9', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dragon Quest 10', 11);

-- End of Dragon Quest Series

INSERT INTO lists (title, description) 
VALUES ('Fish', 'Fish in Central Oregon ordered by average length.') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brook Stickleback', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Speckled Dace', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Fathead Minnow', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Longnose Dace', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pumpkinseed Sunfish', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bluegill', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Yellow Perch', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chiselmouth', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tui Chub', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Peamouth', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brown Bullhead', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Black Crappie', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'White Crappie', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brook Trout', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mountain Whitefish', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kokanee Salmon', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Redband Trout', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Smallmouth Bass', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rainbow Trout', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Largemouth Bass', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Walleye', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brown Trout', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Common Carp', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lake Whitefish', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Channel Catfish', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bull Trout', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Coho Salmon', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lake Trout', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Steelhead', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chinook Salmon', 30);

-- End of Fish

INSERT INTO lists (title, description) 
VALUES ('Moon Missions', 'Put the moon missions in order by oldest to the newest.') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer 0', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-1 No.1', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer 1', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-1 No.2', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer 2', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-1 No.3', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer 3', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 1', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer 4', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'E-1A No.1', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 2', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 3', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer P-3', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-3 No.1', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-3 No.2', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer P-30', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pioneer P-31', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 3', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 4', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 5', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6 No.2', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6 No.3', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 4', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 6', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6 No.6', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6 No.5', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 7', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 8', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kosmos 60', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ranger 9', 30);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6 No.8', 31);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 5', 32);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 6', 33);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zond 3', 34);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 7', 35);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 8', 36);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 9', 37);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kosmos 111', 38);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 10', 39);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 1', 40);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Explorer 33', 41);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Orbiter 1', 42);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 11', 43);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 2', 44);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 12', 45);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Orbiter 2', 46);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 13', 47);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Orbiter 3', 48);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 3', 49);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Orbiter 4', 50);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 4', 51);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Explorer 35', 52);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Orbiter 5', 53);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 5', 54);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1 No.4L', 55);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 6', 56);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1 No.5L', 57);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Surveyor 7', 58);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-6LS No.112', 59);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 14', 60);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1 No.7L', 61);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zond 5', 62);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zond 6', 63);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 8', 64);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1 No.13L', 65);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-8 No.201', 66);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1S No.3', 67);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 10', 68);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-8-5 No.402', 69);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-L1S No.5', 70);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 15', 71);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 11', 72);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zond 7', 73);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kosmos 300', 74);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Kosmos 305', 75);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 12', 76);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-8-5 No.405', 77);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 13', 78);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 16', 79);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zond 8', 80);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 17', 81);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 14', 82);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 15', 83);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PFS-1', 84);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 18', 85);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 19', 86);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 20', 87);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 16', 88);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PFS-2', 89);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Soyuz 7K-LOK No.1', 90);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apollo 17', 91);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 21', 92);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Explorer 49', 93);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mariner 10', 94);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 22', 95);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 23', 96);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna E-8-5M No.412', 97);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 24', 98);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'ISEE-3', 99);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Hiten', 100);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Geotail', 101);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'WIND', 102);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Clementine', 103);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'HGS-1', 104);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Prospector', 105);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nozomi', 106);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'WMAP', 107);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'SMART-1', 108);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'STEREO', 109);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'ARTEMIS', 110);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'SELENE', 111);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 1', 112);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chandrayaan-1', 113);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'LRO & LCROSS', 114);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 2', 115);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'GRAIL', 116);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'LADEE', 117);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 3', 118);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 5-T1', 119);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'TESS', 120);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Queqiao', 121);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 4', 122);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Beresheet', 123);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chandrayaan-2', 124);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 5', 125);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'CAPSTONE', 126);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Danuri', 127);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Artemis I', 128);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Hakuto-R Mission 1', 129);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jupiter Icy Moons Explorer', 130);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chandrayaan-3', 131);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luna 25', 132);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'SLIM', 133);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Peregrine Mission One', 134);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'IM-1', 135);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'DRO A/B', 136);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Queqiao-2', 137);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chang''e 6', 138);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Blue Ghost M1', 139);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Hakuto-R Mission 2', 140);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lunar Trailblazer', 141);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Brokkr-2', 142);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chimera-1', 143);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'IM-2', 144);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Artemis II', 145);

-- End of Moon Missions

INSERT INTO lists (title, description) 
VALUES ('Magic: The Gathering Sets', 'Magic: The Gathering first 50 sets in order of release date (oldest first).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Limited Edition Alpha', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Limited Edition Beta', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Arabian Nights', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Antiquities', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Legends', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'The Dark', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Fallen Empires', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ice Age', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Homelands', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Alliances', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mirage', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Visions', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Weatherlight', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tempest', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Stronghold', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Exodus', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Urza''s Saga', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Urza''s Legacy', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Urza''s Destiny', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mercadian Masques', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Nemesis', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Prophecy', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Invasion', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Planeshift', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Apocalypse', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Odyssey', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Torment', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Judgment', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Onslaught', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Legions', 30);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Scourge', 31);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mirrodin', 32);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Darksteel', 33);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Fifth Dawn', 34);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Champions of Kamigawa', 35);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Betrayers of Kamigawa', 36);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Saviors of Kamigawa', 37);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ravnica: City of Guilds', 38);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Guildpact', 39);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dissension', 40);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Coldsnap', 41);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Time Spiral', 42);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Planar Chaos', 43);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Future Sight', 44);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lorwyn', 45);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Morningtide', 46);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Shadowmoor', 47);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Eventide', 48);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Shards of Alara', 49);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Conflux', 50);

-- End of Magic: The Gathering Sets

INSERT INTO lists (title, description) 
VALUES ('Oregon Cities by Population', 'The 20 most populated cities in oregon sorted from highest to lowest by population in 2026') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Portland', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Salem', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Eugene', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Hillsboro', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bend', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Gresham', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Beaverton', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Medford', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Corvallis', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Springfield', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tigard', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Albany', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Aloha', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lake Oswego', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Grants Pass', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Redmond', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Keizer', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Oregon City', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'McMinnville', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bethany', 20);

-- End of Oregon Cities by Population

INSERT INTO lists (title, description) 
VALUES ('Planets', 'Put the planets in order by distance from the sun (closest first).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mercury', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Venus', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Earth', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mars', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jupiter', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Saturn', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Uranus', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Neptune', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pluto', 9);

-- End of Planets

INSERT INTO lists (title, description) 
VALUES ('US Presidents', 'Put the presidents of the United States in order of their presidencies (first to most recent).') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'George Washington', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'John Adams', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Thomas Jefferson', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'James Madison', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'James Monroe', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'John Quincy Adams', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Andrew Jackson', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Martin Van Buren', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'William Henry Harrison', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'John Tyler', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'James K. Polk', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Zachary Taylor', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Millard Fillmore', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Franklin Pierce', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'James Buchanan', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Abraham Lincoln', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Andrew Johnson', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ulysses S. Grant', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rutherford B. Hayes', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'James A. Garfield', 20);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chester A. Arthur', 21);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Grover Cleveland', 22);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Benjamin Harrison', 23);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Grover Cleveland', 24);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'William McKinley', 25);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Theodore Roosevelt', 26);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'William Howard Taft', 27);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Woodrow Wilson', 28);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Warren G. Harding', 29);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Calvin Coolidge', 30);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Herbert Hoover', 31);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Franklin D. Roosevelt', 32);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Harry S. Truman', 33);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Dwight D. Eisenhower', 34);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'John F. Kennedy', 35);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lyndon B. Johnson', 36);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Richard Nixon', 37);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Gerald Ford', 38);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Jimmy Carter', 39);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Ronald Reagan', 40);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'George H. W. Bush', 41);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bill Clinton', 42);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'George W. Bush', 43);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Barack Obama', 44);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Donald Trump', 45);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Joe Biden', 46);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Donald Trump', 47);

-- End of US Presidents

INSERT INTO lists (title, description) 
VALUES ('Retro video game releases', 'Put retro video games in order from oldest to newest') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Space Invaders', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pac-Man', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tetris', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Super Mario Bros.', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Street Fighter II', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sonic the Hedgehog', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Doom', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mega Man X', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Super Metroid', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Donkey Kong Country', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Chrono Trigger', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Pokémon Red', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Final Fantasy VII', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Castlevania: Symphony of the Night', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'GoldenEye 007', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Star Fox 64', 16);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'The Legend of Zelda: Ocarina of Time', 17);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Metal Gear Solid', 18);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Resident Evil 2', 19);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Metroid Prime', 20);

-- End of Retro video game releases

INSERT INTO lists (title, description) 
VALUES ('Roundabout Cities', 'Top 10 cities sorted by the most roundabouts.') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Carmel IN', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Colorado Springs CO', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Columia MO', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Loveland CO', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Austin TX', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Frisco TX', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Charlotte NC', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Lincoln NE', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Bend OR', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Durham NC', 10);

-- End of Roundabout Cities

INSERT INTO lists (title, description) 
VALUES ('Highest Selling Games', 'Put the games in order by number of copies sold') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Minecraft', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Grand Theft Auto V', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Wii Sports', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Red Dead Redemption 2', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Mario Kart 8 / Deluxe', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'PUBG: Battlegrounds', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Terraria', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'The Witcher 3: Wild Hunt', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Super Mario Bros', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Human Fall Flat', 10);

-- End of Highest Selling Games

INSERT INTO lists (title, description) 
VALUES ('Stars', 'Put the stars in order of distance from the Sun') 
RETURNING id INTO list_id;

INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sol', 0);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Proxima Centauri', 1);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Rigil Kentaurus & Toliman', 2);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Barnard''s Star', 3);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Wolf 359', 4);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Sirius', 5);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luyten 726-8', 6);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Epsilon Eridani', 7);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, '61 Cygni A, B, & C', 8);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Procyon A & B', 9);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Epsilon Indi', 10);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Tau Ceti', 11);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'GJ 1061', 12);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'YZ Ceti', 13);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Luyten''s Star', 14);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, 'Teegarden''s Star', 15);
INSERT INTO items (list_id, name, display_order) 
VALUES (list_id, '82 G Eridani', 16);

-- End of Stars

END $$;