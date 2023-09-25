import { useEffect, useState } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';
import { markDoneATask } from '../services/Services';
import { FaRegCheckCircle, FaRegMinusSquare } from 'react-icons/fa';

interface IProp {
  task: TaskInterface;
  onClick: () => void;
}

export default function TaskRow({ task, onClick }: IProp) {
  const [isLoading, setIsLoading] = useState<boolean | null>(null);

  const markDone = async () => {
    setIsLoading(true);
    const res = await markDoneATask(task.id);
    console.log('>>> check res: ', res);
    if (res) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading === false) {
      onClick();
    }
  }, [isLoading]);

  return (
    <>
      <div className="container task-row">
        <div className="row">
          <div className="col-sm-3 col-md-2">
            {task.completed ? (
              <FaRegCheckCircle color="green" />
            ) : (
              <FaRegMinusSquare color="gold" />
            )}
          </div>
          <div className="col-sm-7 col-md-8">{task.title}</div>
          <div className="col-sm-2 col-md-2">
            {!task.completed ? (
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  markDone();
                }}
              >
                {isLoading ? 'Loading...' : 'Mark done'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
