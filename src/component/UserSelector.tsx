import { useEffect, useState } from 'react';
import { UserInterface } from '../interfaces/UserInterface';
import { fetchAllUser } from '../services/Services';
interface IProp {
  handleClickUser: (user: UserInterface) => void;
}

export default function UserSelector({ handleClickUser }: IProp) {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<UserInterface[]>([]);
  const [selectedUserName, setSelectedUserName] = useState<string>('');

  useEffect(() => {
    const getUsers = async () => {
      const users: UserInterface[] = await fetchAllUser();
      console.log('>>> check new users: ', users);
      if (users) {
        setListUsers(users);
      }
    };
    // Call API here
    getUsers();
  }, []);

  return (
    <div className="m-4">
      <h4> User</h4>
      <input
        type="text"
        placeholder={selectedUserName || 'Select user'}
        onFocus={() => setInputFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            setInputFocused(false);
          }, 100);
        }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <div className="list-users">
        {inputFocused
          ? listUsers
              .filter((v) =>
                v.name.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((user) => (
                <button
                  onClick={() => {
                    handleClickUser(user);
                    setSelectedUserName(user.name);
                    setInputValue('');
                  }}
                  key={user.name}
                >
                  {user.name}
                </button>
              ))
          : null}
      </div>
    </div>
  );
}
