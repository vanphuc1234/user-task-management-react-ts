import axios from 'axios';
import { TaskInterface } from '../interfaces/TaskInterface';
import { UserInterface } from '../interfaces/UserInterface';

const fetchAllUser = async (): Promise<UserInterface[]> => {
  const request: RequestInfo = new Request(
    'https://jsonplaceholder.typicode.com/users',
    {
      method: 'GET',
    }
  );
  const res = await fetch(request);
  const res_1 = await res.json();
  return res_1 as UserInterface[];
};

const getUserTasks = async (userId: number): Promise<TaskInterface[]> => {
  const request: RequestInfo = new Request(
    `https://jsonplaceholder.typicode.com/users/${userId}/todos`,
    {
      method: 'GET',
    }
  );
  const res = await fetch(request);
  const res_1 = await res.json();
  return res_1 as TaskInterface[];
};

const markDoneATask = async (taskId: number): Promise<TaskInterface> => {
  const body = { completed: true };
  // const request: RequestInfo = new Request(
  //   `https://jsonplaceholder.typicode.com/todos/${taskId}`,
  //   {
  //     method: 'GET',
  //     body: JSON.stringify(body),
  //   }
  // );
  // const res = await fetch(request);
  // const res_1 = await res.json();
  // return res_1;
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${taskId}`,
    {
      data: body,
    }
  );
  console.log(res);
  return res.data;
};

export { fetchAllUser, getUserTasks, markDoneATask };
