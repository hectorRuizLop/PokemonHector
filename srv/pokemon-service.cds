using { com.pokemon as my } from '../db/schema';

//Everyone has to be logued
@requires: 'authenticated-user'
service PokemonService {
    //Admin can do anything and viewer trainer can only read
    
    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: 'Viewer'  },
        { grant: 'READ', to: 'User',   where: 'Email = $user' }
    ]
    
    entity Trainers as projection on my.Trainers{
        *,
        //Because it is on this service and not in the schema.cds it doesn't stores in the bbdd
        FirstName || ' ' || LastName as Name : String(121)
    }


    //Users only their teams
    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: 'Viewer'  },
        { grant: ['READ','CREATE'], to: 'User', where: 'trainer.Email = $user' }
    ]
    //Delete the fisical deletion of the team
    @Capabilities : { DeleteRestrictions : { Deletable : false } }
    entity Teams as projection on my.Teams actions {
        action setTeamStatus(Active: Boolean) returns Teams;
        function getRandomPokemon() returns Captures;
    };

    //Only the manager and user can import pokemon
    @restrict: [
        { grant: '*', to: ['Manager', 'User'] }
    ]
    function importPokemon() returns {
        id     : Integer;
        name   : String;
        height : Integer;
        weight : Integer;
    };

    //User only their captures
    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: 'Viewer'  },
        { grant: ['READ','CREATE'], to: 'User', where: 'team.trainer.Email = $user' }
    ]
    //This tag is for the new entity PokemonSizes no tell cap what is the official
    @cds.redirection.target : true
    entity Captures as projection on my.Captures actions {
        action capturePokemon(teamId: UUID) returns Captures;
    };

    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: ['Viewer', 'User'] }
    ]
    entity Medals as projection on my.Medals;
    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: ['Viewer', 'User'] }
    ]
    @cds.redirection.target :true
    entity TrainerMedals as projection on my.TrainerMedals;
    
    @restrict: [
        { grant: '*',    to: 'Manager' },
        { grant: 'READ', to: ['Viewer', 'User'] }
    ]
    entity Gyms as projection on my.Gyms;
    //Because this entities are read only no one can write
    @readonly
    entity PokemonSizes as select from my.Captures {
        key ID,
        PokemonName,
        Weight,
        case
            when Weight <= 20 then 'Little'
            when Weight > 20 and Weight <= 35 then 'Medium'
            else 'Big'
        end as SizeLabel : String(10)
    } order by Weight asc; 

    @readonly
    entity TrainerMedalReport as select from my.TrainerMedals{
        key trainer.ID as TrainerID,      
        trainer.FirstName as TrainerFirstName,
        trainer.LastName  as TrainerLastName,
        
        count(*) as TotalMedals: Integer 
    }
    group by
        trainer.ID,
        trainer.FirstName,
        trainer.LastName
    order by 
        TotalMedals desc;


    @readonly
    entity TrainerMedalDetails as select from my.TrainerMedals{
        key trainer.ID as TrainerID,
        key medal.ID as MedalID,
        medal.Name as MedalName,
        medal.gym.Name as GymName,
        medal.gym.Type as GymType,
        medal.gym.location.City as GymCity
    }

    function getUserConfig() returns {
        roleName   : String;
        canCreate  : Boolean;
        canRead    : Boolean;
        canUpdate  : Boolean;
        canDelete  : Boolean;
        canCapture : Boolean;
        canSeeAll  : Boolean;
    };
    

    type PokemonData {
        id     : Integer;
        name   : String;
        height : Integer;
        weight : Integer;
    }

    function getPokemonInformation(pokemonName: String) returns PokemonData;
}