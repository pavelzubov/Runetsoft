export class Task {
  id: number;
  company: string;
  date: string | Date;
  importance: string;
  type: string;
  description: string;
  status: string;
}

export class ServerResponse {
  response: {
    tasks: Task[]
  };
}
