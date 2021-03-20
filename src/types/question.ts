export interface IQuestion {
  company: string;
  type: string[];
  issueId: number;
  name: string;
  content: string;
  id: number;
}

export interface IType {
  type: { name: string }[];
  company: { name: string }[];
}
