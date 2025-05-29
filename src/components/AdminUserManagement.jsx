import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../MyAPI';

const roles = ['user', 'admin'];

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [usersLoading, setUsersLoading] = useState(true);
  const { currentUser } = useAuth();

  // Filter users by search term
  const filteredUsers = users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Promote to admin
  const promoteToAdmin = async (id) => {
    try {
      const res = await fetch(`${API}/users/${id}/promote`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!res.ok) throw new Error('Failed to promote user');
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, role: 'admin' } : user
        )
      );
    } catch (err) {
      alert('Failed to promote user');
    }
  };

  // Deactivate/Activate user
  const toggleStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API}/users/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 'active' ? 'inactive' : 'active' })
      });
      if (!res.ok) throw new Error('Failed to update status');
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, status: currentStatus === 'active' ? 'inactive' : 'active' } : user
        )
      );
    } catch (err) {
      alert('Failed to update user status');
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API}/users`);
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        setUsers([]);
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-white to-gray-100 min-h-screen text-gray-900 rounded-lg shadow-lg overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">User Management</h2>
      <input
        type="text"
        placeholder="Search users by name or email"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="mb-4 p-2 rounded w-full text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <div className="mt-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-full mx-auto border border-gray-200 overflow-x-auto">
          {usersLoading ? (
            <div className="text-center py-10 text-lg text-gray-500 animate-pulse">Loading users...</div>
          ) : currentUsers.length === 0 ? (
            <div className="text-center py-10 text-lg text-gray-500">No users found.</div>
          ) : (
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="border-b border-gray-300 text-center">
                  <th className="py-3 px-4 text-gray-700 font-semibold">Name</th>
                  <th className="py-3 px-4 text-gray-700 font-semibold">Email</th>
                  <th className="py-3 px-4 text-gray-700 font-semibold">Role</th>
                  <th className="py-3 px-4 text-gray-700 font-semibold">Status</th>
                  <th className="py-3 px-4 text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`
                      border-b border-gray-200 text-center
                      hover:bg-gray-50 transition
                      animate-fadeInUp
                    `}
                    style={{
                      animationDelay: `${idx * 80 + 200}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <td className="py-3 px-4 align-middle">{user.name}</td>
                    <td className="py-3 px-4 align-middle">{user.email}</td>
                    <td className="py-3 px-4 align-middle">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === 'admin'
                          ? 'bg-gradient-to-r from-red-500 to-red-700 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 align-middle space-x-2">
                      {user.role !== 'admin' && (
                        <button
                          className="bg-gradient-to-br from-red-500 to-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow hover:scale-105 transition"
                          onClick={() => promoteToAdmin(user.id)}
                        >
                          Promote to Admin
                        </button>
                      )}
                      <button
                        className="bg-gradient-to-br from-red-400 to-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow hover:scale-105 transition"
                        onClick={() => toggleStatus(user.id, user.status)}
                      >
                        {user.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center space-x-2 flex-wrap">
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
      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(.39,.575,.565,1) both;
        }
      `}</style>
    </div>
  );
};

export default AdminUserManagement;
