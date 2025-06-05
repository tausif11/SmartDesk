namespace SmartDesk.db;

entity TimeTracking {
    key ID: UUID @readonly; 
    date: Date;
    startDate: DateTime;
    endDate: DateTime;
    task: String(100);
    description: String(500);
}


entity Workflow {
  key ID             : UUID @readonly;
  WorkflowName       : String(100);
  Status             : String(30);
  startDate          : Date;
  endDate            : Date; 
  Technology         : String(100);
  AssignedTo         : String(50);
  Client             : String(100);
  Priority           : String(10);
  CreatedBy          : String(50);
  LastUpdated        : Date;
  ProcessType        : String(30);
  ApprovalStatus     : String(30);
  Deadline           : Date;
  Description        : String(500);

  steps              : Association to many Step on steps.workflow_ID = $self.ID;
}

entity Step {
  key ID         : UUID;
  Step           : String;
  Status         : String;
  AssignedTo     : String;

  workflow_ID    : UUID;
  workflow       : Association to Workflow on workflow.ID = $self.workflow_ID;

  documents      : Association to many Document on documents.step_ID = $self.ID;
}

entity Document {
  key ID         : UUID;
  Name           : String;
  Type           : String;
  UploadedBy     : String;
  Date           : Date;

  step_ID        : UUID; // Foreign key
  stepID         : Association to Step on stepID.ID = $self.step_ID;
}

entity PaySlip {
  key ID               : UUID;
  Month                : String(10);        
  EmployeeName         : String(50);
  EmployeeID           : String(20);
  Department           : String(30);
  Position             : String(30);
  PayDate              : String(20);     
  BasicSalary          : String(30);
  Bonus                : String(30);
  Allowances           : String(30);
  TaxDeduction         : String(30);
  ProvidentFund        : String(30);
  OtherDeductions      : String(30);
  TotalEarnings        : String(30);
  TotalDeductions      : String(30);
  NetPay               : String(30);
}

entity Profile {
    key employeeID     : String(10);
    fullName           : String(100);
    department         : String(50);
    position           : String(50);
    joiningDate        : Date;
    email              : String(100);
    phone              : String(20);
    dob                : Date;

    projects           : Association to many Project on projects.profileID = $self;
}

entity Project {
    key ID             : UUID;
    profileID          : Association to Profile;
    projectName        : String(100);
    role               : String(50);
    duration           : String(20);
}

entity Course {
    key ID        : UUID;
    title         : String(100);
    category      : String(50);
    duration      : Integer;   
    progress      : Integer; 
}


entity Organisation {
    key ID          : UUID;
    companyName     : String(100);
    foundedYear     : String(4);
    headquarters    : String(100);
    employeeCount   : String(10);

    departments    : Association to many Department on departments.org = $self;
    employees      : Association to many Employee   on employees.org   = $self;
}

entity Department {
    key ID          : UUID;
    name            : String(50);
    description     : String(200);

    org             : Association to Organisation;
}

entity Employee {
    key ID          : UUID;
    name            : String(100);
    designation     : String(100);

    org             : Association to Organisation;
}

entity Leave {
    key ID           : UUID;
    employeeId       : String;
    casualLeave      : Integer;
    sickLeave        : Integer;
    paidLeave        : Integer;
    leaveType        : String;
    startDate        : Date;
    endDate          : Date;
    numberOfDays     : Integer;
    status           : String;
    createdAt        : Timestamp;
}
