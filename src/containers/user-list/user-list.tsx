import React, { useState, useEffect } from 'react';
import { IUserSevice } from '../../services/iuser-service';
import { useService } from '../../ioc.react';
import { TYPES } from '../../models/types';
import { User } from '../../models/user';
import { UserPost } from '../../models/user-post';
import { UserPosts } from '../../models/user-posts';
import { Post } from '../../models/post';
import { IPostService } from '../../services/ipost-service';

// TODO: refactor. break-down to smaller containers and components
const UserList: React.FC = () => {
  const userService: IUserSevice = useService<IUserSevice>(TYPES.IUserService);
  const postService: IPostService = useService<IPostService>(TYPES.IPostService);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserPosts | null>(null);
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);

  // TODO: should be singleton service
  const handleError = (error: any) => {
    alert('Failed to fetch users');
    console.error('Failed to fetch users', error);
  }

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      handleError(error);
    }
  }

  const showUserPosts = (user: User) => async () => {
    try {
      setSelectedPost(null);
      const data = await userService.getUser(user.id);
      setSelectedUser(data);
    } catch (error) {
      handleError(error);
    }
  }

  const showUserPost = (post: Post) => async () => {
    try {
      const data = await postService.getPost(post.id);
      setSelectedPost(data);
    } catch (error) {
      handleError(error);
    }
  }

  const renderUserItem = (user: User) => {
    return (
      <li onClick={showUserPosts(user)}>
        {user.name}
        <small>({user.username})</small>
      </li>
    )
  }

  const renderUsers = () => {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          { users.map(renderUserItem) }
        </ul>
      </div>
    )
  }

  const renderPostItem = (post: Post) => {
    return (
      <li onClick={showUserPost(post)}>{post.title}</li>
    );
  }

  const renderUserPosts = () => {
    return (
      <div className='user-posts'>
        <div>
          <h2>{selectedUser?.name}</h2>
          <div>email: {selectedUser?.email}</div>
        </div>
        <ul>
          {selectedUser?.posts.map(renderPostItem)}
        </ul>
      </div>
    )
  }

  const renderPost = () => {
    return (
      <div className='post'>
        <div>
          <h2>{selectedPost?.title}</h2>
          <div>author: {selectedPost?.user.name}</div>
        </div>
        <p>{selectedPost?.body}</p>
      </div>
    )
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="user-list">
      <div>
        { renderUsers() }
      </div>
      <div>
        {selectedUser && !selectedPost && renderUserPosts()}
        {selectedPost && renderPost()}
      </div>
    </div>
  )
}

export default UserList;
