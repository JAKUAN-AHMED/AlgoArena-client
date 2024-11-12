import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useRole from "../../../Hooks/useRole";
import useUsers from "../../../Hooks/useUsers";

const ManageUsers = () => {
  const [Users, refetch] = useUsers();
  const { User } = useAuth();
  const currentUser = Users.find((user) => user.email === User?.email);
  const currentUserID = currentUser?._id;
  const axiosPublic = useAxiosPublic();
  const [isAdmin]=useRole();
  // Handle role change
  const handleRole = async (id, role) => {
    const res = await axiosPublic.patch(`/Users/${id}/role`, {
      role,
      currentUserID,
    });
    if (res.data) {
      alert("User role set up successfully");
      refetch();
    }
  };

  // Toggle block/unblock
  const handleToggleBlock = async (id, blocked) => {
    const res = await axiosPublic.patch(`/Users/${id}/toggle-block`, {
      currentUserID,
      blocked: !blocked, 
    });
    if (res.data) {
      alert(
        blocked ? "User unblocked successfully" : "User blocked successfully"
      );
      refetch();
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const res = await axiosPublic.delete(`/Users/${id}`, {
      data: { currentUserID },
    });
    if (res.data) {
      alert("User deleted successfully");
      refetch();
    }
  };

  return (
    <div className="pt-2 overflow-auto font-jost">
      <h2 className="text-center text-xs md:text-2xl lg:text-3xl">
        User Management
      </h2>
      <hr />
      <div className="p-4">
        <table className="table-auto w-full text-[10px] md:text-sm lg:text-base">
          <thead>
            <tr>
              <th className="py-2 text-left">Name</th>
              <th className="px-1 py-2 text-left">Email</th>
              <th className="py-2 text-left">Role</th>
              <th className="py-2 text-left">Action</th>
              <th className="py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {Users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="px-1 py-2">{user.name}</td>
                <td className="px-1 py-2">{user.email}</td>
                <td className="px-1 py-2">
                  <select
                    value={user.role || "User"}
                    onChange={(e) => handleRole(user._id, e.target.value)}
                    disabled={user.blocked} // Disable role change if blocked
                    className="text-xs md:text-sm lg:text-base"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Creator">Creator</option>
                  </select>
                </td>
                <td className="px-1 py-2 flex flex-col sm:flex-row sm:space-x-2">
                  {user.role!="Admin"?<button
                    onClick={() => handleToggleBlock(user._id, user.blocked)}
                    className="px-2 py-1 border rounded-md text-xs sm:text-sm lg:text-base"
                  >
                    {user.blocked ? "Unblock" : "Block"
                    }
                  </button>: <button>Disabled</button>
                  }
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="mt-2 sm:mt-0 sm:ml-2 px-2 py-1 border rounded-md text-xs sm:text-sm lg:text-base"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-1 py-2">
                  {user.blocked ? "Blocked" : "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;

