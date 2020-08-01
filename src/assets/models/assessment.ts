export interface Assessment {
  id: number;
  student: number;
  score: number;
  startDate: string;
  submittedDate: string;
  verified: boolean;
  excluded: boolean;
}
