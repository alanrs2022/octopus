import { Candidate } from "./candidate";
import { Job } from "./job";
import { user } from "./user.model";

export class Event {
    id?:number;
    start!:Date;
    end!:Date;
    created!:Date|any;
    modified!:Date|any;
    type!:string;
    organizer_id!:number;
    job!:Job;
    team_members!:user[];
    candidate!:Candidate[];
    // getType():string{
    //     return this.type;
    // }
}
