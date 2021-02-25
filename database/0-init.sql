CREATE TABLE enveloppe (
   ID INT NOT NULL AUTO_INCREMENT,
   name  NVARCHAR(255) NOT NULL,
   PRIMARY KEY (ID)
)

;

CREATE TABLE category (
   ID INT NOT NULL AUTO_INCREMENT,
   ID_enveloppe INT NOT NULL,
   name NVARCHAR(255) NOT NULL,
   PRIMARY KEY (ID),
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
   PRIMARY KEY (ID),
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
   description NVARCHAR(255) NOT NULL,
   PRIMARY KEY (ID),
   CONSTRAINT FK_operation_details_operation FOREIGN KEY
      (ID_operation)
   REFERENCES operation(ID)
   ON DELETE CASCADE
)

;

CREATE INDEX IDX_operation_detail
ON operation_details (ID_operation, ID);

;