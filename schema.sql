-- Drops cars table
DROP TABLE IF EXISTS cars;

-- Creates cars table
CREATE TABLE IF NOT EXISTS cars (
    id varchar(50) NOT NULL PRIMARY KEY
    , Make varchar(50) NOT NULL
    , Model varchar(50) NOT NULL
    , Package varchar(50) NOT NULL
    , Color varchar(50) NOT NULL
    , Year smallint NOT NULL
    , Category varchar(50) NOT NULL
    , Mileage int NOT NULL 
    , Price int NOT NULL
);

INSERT INTO cars VALUES ('JHk290Xj', 'Ford', 'F10', 'Base', 'Silver', 2010, 'Truck', 120123, 1999900);
INSERT INTO cars VALUES ('fWl37la', 'Toyota', 'Camry', 'SE', 'White', 2019, 'Sedan', 3999, 2899000);
INSERT INTO cars VALUES ('1i3xjRllc', 'Toyota', 'Rav4', 'XSE', 'Red', 2018, 'SUV', 24001, 2275000);
INSERT INTO cars VALUES ('dku43920s', 'Ford', 'Bronco', 'Badlands', 'Burnt Orange', 2022, 'SUV', 1, 4499000);