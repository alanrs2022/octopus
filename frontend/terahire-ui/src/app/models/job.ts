export class Job {
    title!:string;
    owner!:string;
    stage!:number;
    status!:string;
    activeCandidates!:number;
    droppedCandidates!:number;
    summary!:string;
    teamID!:string;
    scoreCard!:number;
    createdDate:string|any;
    modifiedDate:string|any;
    id: number|any;
    vacancy?: number;
    notification?:Notification;
    // constructor(  title:string,    owner:string,    stage:number,    status:string,    activeCandidates:number,    droppedCandidates:number,    summary:string,    teamID:string,    scoreCard:number,    createdDate:string|any,    modifiedDate:string,    id: number|any, vacancy?: number){
    //     this.title=title;
    //     this.owner=owner;
    //     this.stage=stage;
    //     this.status=status;
    //     this.activeCandidates=activeCandidates;
    //     this.droppedCandidates=droppedCandidates;
    //     this.summary=summary;
    //     this.teamID=teamID;
    //     this.scoreCard=scoreCard;
    //     this.createdDate=createdDate;
    //     this.modifiedDate=modifiedDate;
    //     this.id=id;
    //     this.vacancy=vacancy;
    // }
    // getTotalAppliedCandidates():number{ return this.activeCandidates+this.droppedCandidates;}
}