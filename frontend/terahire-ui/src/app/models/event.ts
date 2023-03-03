import { Candidate } from "./candidate";
import { Job } from "./job";
import { user } from "./user.model";

export class Event {
    id?:number;
    startDate!:Date;
    endDate!:Date;
    createdDate!:Date;
    modifiedDate!:Date;
    type!:string;
    organizerId!:number;
    job!:Job;
    teamMembers!:user[];
    candidates!:Candidate[];
}
