CREATE TABLE enveloppe (
   ID INT NOT NULL AUTO_INCREMENT,
   name  NVARCHAR(255) NOT NULL
   PRIMARY KEY (ID)
)

GO

CREATE TABLE category (
   ID INT NOT NULL AUTO_INCREMENT,
   ID_eveloppe INT NOT NULL,
   name NVARCHAR(255) NOT NULL,
   date DATE NOT NULL,
   PRIMARY KEY(ID_eveloppe, ID),
   CONSTRAINT FK_category_enveloppe FOREIGN KEY
      (ID_enveloppe)
   REFERENCES enveloppe(ID)
   ON DELETE CASCADE
)

GO
