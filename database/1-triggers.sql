DELIMITER $$

CREATE TRIGGER I_operation_details
BEFORE INSERT on operation_details
FOR EACH ROW
BEGIN
   IF ((SELECT EXISTS (
       SELECT 1
         FROM operation o
         JOIN category c
            ON o.ID_enveloppe = c.ID_enveloppe
         WHERE c.ID = NEW.ID_category
         AND o.ID = NEW.ID_operation
   )) = 0) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'INTEGRITY ERROR';
   END IF;
END

$$

CREATE TRIGGER U_operation_details
BEFORE UPDATE on operation_details
FOR EACH ROW
BEGIN
   IF ((SELECT EXISTS (
       SELECT 1
         FROM operation o
         JOIN category c
            ON o.ID_enveloppe = c.ID_enveloppe
         WHERE c.ID = NEW.ID_category
         AND o.ID = NEW.ID_operation
   )) = 0) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'INTEGRITY ERROR';
   END IF;
END

$$

DELIMITER ;