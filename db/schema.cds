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
    //To see if the trainer is the boss or not
    gymBoss : Association to one Gyms on gymBoss.Boss = $self;
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
    gym : Association to Gyms on gym.medal = $self;
}


// Intermediate table for the relation many to many
entity TrainerMedals {
    key trainer : Association to Trainers;
    key medal : Association to Medals;
}


entity Locations : cuid, managed {
    Latitude : Decimal(10,10);
    Longitude : Decimal(10,10);
    City : String(20);
}

entity Gyms : primary { 
    Name : Name;
    //A trainer can only be a boss of a gym
    @unique Boss : Association to Trainers;    
    Type: String(20);    
    medal : Association to Medals; 
    location : Association to Locations;
}