
using { cuid, managed, User } from '@sap/cds/common';

aspect primary : managed, cuid {}

type Name : String(80);

entity Trainers : primary{
    Name : Name;
    Email : String(110);
    Birthdate: Date;
}