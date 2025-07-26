export type LoginResponse = {
  IsAuthSuccessful: boolean;
  ErrorMessage: string;
  Id?: number;
  Email?: string;
  Roles?: string[];
  AccessToken?: string;
  RefreshToken?: string;
};

export type MetaData = {
  TotalCount: number;
  PageNumber: number;
  PageSize: number;
  TotalPages: number;
};

export type DepartmentDTO = {
  DepartmentID: number;
  DepartmentName: string;
  Status: string;
  Description: string;
};

export type PositionDTO = {
  PositionID: number;
  PositionName: string;
};

export type UserDTO = {
  Id: number;
  SalaryID: number;
  FirstName: string;
  LastName: string;
  DateOfBirth: string;
  Email: string;
  Status: string;
  DepartmentName: string;
  EmployeeLevelName: string;
  ContractTypeName: string;
  PositionName: string;
};

export type AttendanceDTO = {
  UserID: number;
  CheckInTime: Date;
  CheckOutTime: Date;
  Location: string;
  WorkHours: number;
  OvertimeHours: number;
  AttendanceDate: Date;
};

export type LeaveRequestDTO = {
  LeaveRequestID: number;
  StartDate: Date;
  EndDate: Date;
  LeaveType: string;
  Reason: string;
  Status: string;
  UserID: number;
  ApproverNote: string;
  UserName: string;
};

export type SalaryDTO = {
  SalaryID: number;
  UserID: number;
  UserName: string;
  BaseSalary: number;
  Allowances: number;
  Bonus: number;
  Deduction: number;
  Tax: number;
  NetSalary: number;
  SalaryPeriod: Date;
};

export type PayslipDTO = {
  PayslipID: number;
  UserName: string;
  SalaryID: number;
  IssueDate: Date;
  FilePath: string;
  Status: string;
};

export type RemainDayDTO = {
  Used: number;
  Remaining: number;
};
