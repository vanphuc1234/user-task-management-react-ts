import { useMemo, useState } from 'react';
import './App.css';
import TasksTable from './component/TasksTable';
import UserSelector from './component/UserSelector';
import { UserInterface } from './interfaces/UserInterface';

function App() {
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);

  const user = useMemo(() => selectedUser, [selectedUser]);

  return (
    <div className="app-container">
      <UserSelector
        handleClickUser={(user) => {
          console.log('>>> check onClick ', user.name);
          setSelectedUser(user);
        }}
      ></UserSelector>
      <TasksTable selectedUser={user}></TasksTable>
    </div>
  );
}

export default App;
