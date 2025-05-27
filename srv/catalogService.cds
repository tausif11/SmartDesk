using { SmartDesk.db as db } from '../db/schema';

service SmartDeskService {
  
  entity Leave         as projection on db.Leave;
  entity TimeTracking  as projection on db.TimeTracking;
  entity Workflow      as projection on db.Workflow;
  entity Step          as projection on db.Step;
  entity Document      as projection on db.Document;
  entity PaySlip       as projection on db.PaySlip;
  entity Course        as projection on db.Course;
  entity Organisation  as projection on db.Organisation;
  entity Department    as projection on db.Department;
  entity Employee      as projection on db.Employee;
  entity Profile       as projection on db.Profile;
  entity Project       as projection on db.Project;
}
