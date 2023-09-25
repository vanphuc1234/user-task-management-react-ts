import { useEffect, useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import { UserInterface } from '../interfaces/UserInterface';
import { getUserTasks } from '../services/Services';
import TaskRow from './TaskRow';

interface IProp {
  selectedUser: UserInterface | null;
}

export default function TasksTable({ selectedUser }: IProp) {
  const [listTasks, setListTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const newTasks: TaskInterface[] = await getUserTasks(
        selectedUser?.id || 0
      );
      console.log('>>> check new tasks: ', newTasks);
      if (newTasks) {
        sortListTasks(newTasks);
      }
    };
    // Call API here
    fetchTasks();
  }, [selectedUser]);

  const sortListTasks = (newTasks: TaskInterface[]) => {
    let position = 0;
    newTasks.forEach((t) => {
      if (t.completed === false) {
        t.position = position;
        position++;
      } else {
        t.position = 888;
      }
    });
    newTasks.sort((t1, t2) => t1.position - t2.position);
    setListTasks(newTasks);
  };

  console.log('current user', selectedUser?.name);
  return (
    <>
      <div className="m-4">
        <h4> Tasks</h4>
        <div className="list-tasks">
          {listTasks.length > 0 ? (
            listTasks.map((t) => (
              <TaskRow
                task={t}
                key={`${t.id}-${t.title}`}
                onClick={() => {
                  t.completed = true;
                  sortListTasks([...listTasks]);
                }}
              ></TaskRow>
            ))
          ) : (
            <p>No data</p>
          )}
        </div>
        <p>
          Done {listTasks.filter((v, i) => v.completed === true).length}/
          {listTasks.length} tasks
        </p>
      </div>
    </>
  );
}
