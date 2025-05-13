import React, { useState, useEffect } from 'react';

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'admin', status: 'active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', status: 'inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'active' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'user', status: 'active' },
  { id: 6, name: 'Felicity Smoak', email: 'felicity@example.com', role: 'user', status: 'active' },
  { id: 7, name: 'Gordon Ramsay', email: 'gordon@example.com', role: 'user', status: 'active' },
  { id: 8, name: 'Helen Mirren', email: 'helen@example.com', role: 'user', status: 'active' },
  { id: 9, name: 'Ian Somerhalder', email: 'ian@example.com', role: 'user', status: 'active' },
  { id: 10, name: 'Julia Roberts', email: 'julia@example.com', role: 'user', status: 'active' },
  // Add more mock users as needed
];

const roles = ['user', 'admin'];

const AdminUserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleRoleChange = (id, newRole) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const toggleStatus = (id) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
      )
    );
  };

  return (
<div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">User Management</h2>
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 rounded w-full text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-red-500">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} className="border-b border-red-500 hover:bg-red-100">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.id, e.target.value)}
                  className="bg-white text-primary-600 p-1 rounded border border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4">{user.status}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => toggleStatus(user.id)}
                  className={`px-3 py-1 rounded ${
                    user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                  } text-white`}
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center space-x-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-red-500 text-white' : 'bg-red-300 text-primary-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminUserManagement;
