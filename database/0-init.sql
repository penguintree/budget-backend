CREATE TABLE enveloppe (
   ID INT NOT NULL AUTO_INCREMENT,
   name  NVARCHAR(255) NOT NULL,
   PRIMARY KEY (ID),
   UNIQUE (name)
)

;

CREATE TABLE category (
   ID INT NOT NULL AUTO_INCREMENT,
   ID_enveloppe INT NOT NULL,
   name NVARCHAR(255) NOT NULL,
   PRIMARY KEY (ID),
   UNIQUE (name),
   CONSTRAINT FK_category_enveloppe FOREIGN KEY
      (ID_enveloppe)
   REFERENCES enveloppe(ID)
   ON DELETE CASCADE
)

;

CREATE INDEX IDX_category_enveloppe 
ON category (ID_enveloppe, ID)

;

CREATE TABLE operation (
   ID INT NOT NULL AUTO_INCREMENT,
   ID_enveloppe INT NOT NULL,
   name NVARCHAR(255) NOT NULL,
   date DATE NOT NULL,
   PRIMARY KEY (ID),
   UNIQUE (ID_enveloppe, name, date),
   CONSTRAINT FK_operation_enveloppe FOREIGN KEY
      (ID_enveloppe)
   REFERENCES enveloppe(ID)
   ON DELETE NO ACTION
)

;

CREATE INDEX IDX_operation_enveloppe
ON operation (ID_enveloppe, ID)

;

CREATE TABLE operation_details (
   ID INT NOT NULL AUTO_INCREMENT,
   ID_operation INT NOT NULL,
   ID_category INT NOT NULL,
   description NVARCHAR(255) NOT NULL,
   amount DECIMAL(15,2) NOT NULL,
   PRIMARY KEY (ID),
   CONSTRAINT FK_operation_details_operation FOREIGN KEY
      (ID_operation)
   REFERENCES operation(ID)
   ON DELETE CASCADE,
   CONSTRAINT FK_operation_detail_category FOREIGN KEY
      (ID_category)
   REFERENCES category(ID)
   ON DELETE NO ACTION
)

;

CREATE INDEX IDX_operation_detail
ON operation_details (ID_operation, ID)

;