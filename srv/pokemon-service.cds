using { com.pokemon as my } from '../db/schema';

service PokemonService {
    entity Trainers as projection on my.Trainers{
        *,
        //Because it is on this service and not in the schema.cds it doesn't stores in the bbdd
        FirstName || ' ' || LastName as Name : String(121)
    }
    entity Teams as projection on my.Teams;

    //This tag is for the new entity PokemonSizes no tell cap what is the official
    @cds.redirection.target : true
    entity Captures as projection on my.Captures;
    entity Medals as projection on my.Medals;
    @cds.redirection.target :true
    entity TrainerMedals as projection on my.TrainerMedals;
 
    entity Gyms as projection on my.Gyms;

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
    entity TrainerMedalReport as select from my.TrainerMedals as TM {
        //alias to then compare it
        key TM.trainer.ID as TrainerID,      
        TM.trainer.FirstName as TrainerFirstName,
        TM.trainer.LastName  as TrainerLastName,
        
        TM.medal.Name as MedalName,  
        TM.medal.gym.Name as GymName,
        TM.medal.gym.Type as GymType,
        TM.medal.gym.location.City as GymCity,
        //first the trainers with more medals
        (
            select count(*) 
            from my.TrainerMedals 
            where trainer.ID = TM.trainer.ID
        ) as TotalMedals : Integer

    } order by TotalMedals desc;
}