using { com.pokemon as my } from '../db/schema';

service PokemonService {
    entity Trainers as projection on my.Trainers{
        *,
        //Because it is on this service and not in the schema.cds it doesn't stores in the bbdd
        FirstName || ' ' || LastName as Name : String(121)
    }
    entity Teams as projection on my.Teams;
    entity Captures as projection on my.Captures;
}