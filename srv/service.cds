using { com.pokemon as my } from '../db/schema';

service PokemonService {
    entity Trainers as projection on my.Trainers;
    entity Teams as projection on my.Teams;
    entity Captures as projection on my.Captures;
}