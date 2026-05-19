export interface Ticket {
  id: string;
  title: string;
  status: 'Done' | 'In Progress' | 'Blocked';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  userStory: string;
  acceptanceCriteria: string[];
  solution: string;
}

export interface MetricData {
  name: string;
  before: number;
  after: number;
}
