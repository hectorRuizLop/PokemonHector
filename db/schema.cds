
using { cuid, managed } from '@sap/cds/common';

aspect primary : managed, cuid {}

type Name : String(60);

entity Trainers : primary{
    Name : Name;
    Email : String(110);
    Birthdate: Date;
    teams : Composition of many Teams;
}

entity Teams : primary {
    Name : Name;
    Description : String(255);
    Active : Boolean;
    trainer : Association to Trainers;
}

entity Captures : primary{
    PokemonName : String;
    Weight : Integer;
    Height : Integer;
    team : Association To Teams;
}