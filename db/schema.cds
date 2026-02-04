namespace com.pokemon;
using { cuid, managed } from '@sap/cds/common';

aspect primary : managed, cuid {}

type Name : String(60);

entity Trainers : primary{
    FirstName: String(60);
    LastName : String(60);
    @unique Email : String(110);
    Birthdate: Date;
    teams : Composition of many Teams on teams.trainer=$self;
}

entity Teams : primary {
    Name : Name;
    Description : String(255);
    Active : Boolean default true;
    trainer : Association to Trainers;
    captures : Composition of many Captures on captures.team=$self;
}

entity Captures : primary{
    PokemonName : String;
    Weight : Integer;
    Height : Integer;
    team : Association to Teams;
}