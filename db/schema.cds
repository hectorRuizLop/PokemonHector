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
    trainerMedals : Composition of many TrainerMedals on trainerMedals.trainer = $self;
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

entity Medals : primary {
    Name : Name;
    trainerMedals : Composition of many TrainerMedals on trainerMedals.medal = $self;
    
}


// Intermediate table for the relation many to many
entity TrainerMedals {
    key trainer : Association to Trainers;
    key medal   : Association to Medals;
}