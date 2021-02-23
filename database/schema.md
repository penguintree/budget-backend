## TABLE enveloppe
- ID PK
- name

## TABLE category
- ID PK
- ID_enveloppe PK
- description

Clustered index ID_enveloppe, ID

## TABLE operation
- ID PK
- ID_enveloppe
- name

Clusetered Index ID_enveloppe, ID

## TABLE operation_details
- ID PK
- ID_operation
- description
- amount
- ID_category

Clustered Index ID