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
}