export interface Report {
  id: string;
  source: string;
  sourceIcon: string;
  date: string;
  time: string;
  readScore: number;
  tag: string;
  tagColor: "green" | "red" | "blue" | "orange";
  owner: string;
  type: "transaction" | "corridor" | "partner" | "compliance" | "revenue";
}
