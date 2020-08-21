import React, { useState, useEffect } from 'react';
import { TYPES } from '../../models/types';
import { IUserSevice } from '../../services/iuser-service';
import { useInjection } from '../../ioc.react';
import { User } from '../../models/user';
import { lazyInject } from '../../inversify.config';

// const UserList = () => {
//   const userService: IUserSevice = useInjection<IUserSevice>(TYPES.IHttpClient);

//   const [users, setUsers] = useState<User[]>([]);

//   // TODO: should be singleton service
//   const handleError = (error: any) => {
//     alert('Failed to fetch users');
//     console.error('Failed to fetch users', error);
//   }

//   const fetchUsers = async () => {
//     try {
//       const data = await userService.getUsers();
//       setUsers(data);
//     } catch (error) {
//       handleError(error);
//     }
//   }

//   const showUserPosts = (user: User) => () => {

//   }

//   const renderUserItem = (user: User) => {
//     return (
//       <li>
//         <a onClick={showUserPosts(user)}>{user.name}</a>
//       </li>
//     )
//   }

//   const renderUsers = () => {
//     return (
//       <ul>
//         { users.map(renderUserItem) }
//       </ul>
//     )
//   }

//   useEffect(() => {
//     fetchUsers();
//   }, [])

//   return (
//     <div>
//       { renderUsers() }
//     </div>
//   )
// }

class UserList extends React.Component {
  @lazyInject(TYPES.IHttpClient) private readonly userService: IUserSevice;

  componentDidMount() {
    this.userService.getUsers()
      .then((data) => {
        console.log('data', data);
      })
  }
}

export default UserList;
