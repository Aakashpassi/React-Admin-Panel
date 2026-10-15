import { useState } from "react";
import { usePagination } from "../../hooks/usePagination";
import type { User } from "../../store/slices/authSlice";
import { useDebounce } from "../../hooks/useDebounce";
import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { useDeleteUser } from "./hooks/useDeleteUser";
import Pagination from "../../components/common/Pagination";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Users = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const debouncedSearch = useDebounce(search, 400);
  const { changePage, changeLimit, limit, page } = usePagination()


  const usersQuery = useUsers({
    page,
    limit,
    search: debouncedSearch,
  });

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useDeleteUser();

  function handleCreate() {
    setSelectedUser(null);
    setShowForm(true);
  }

  function handleEdit(user: User) {
    setSelectedUser(user);
    setShowForm(true);
  }

  function handleDelete(user: User) {
    const confirmed =
      window.confirm(
        `Delete ${user.name}?`
      );

    if (!confirmed) return;

    deleteMutation.mutate(user.id);
  }

  function handleFormSubmit(data: { name: string; email: string; password: string; role: string }) {
    if (selectedUser) {
      let {password,...newdata} = data
      updateMutation.mutate({ id: selectedUser.id, user: newdata });
      setShowForm(false);
      setSelectedUser(null);
      return;
    } else {
      const premission = data.role === "admin" ?
        [
          "view_dashboard",
          "view_users",
          "create_user",
          "edit_user",
          "delete_user",
          "view_reports",
          "view_settings",
        ] : data.role === "manager" ?
          [
            "view_dashboard",
            "view_users",
            "create_user",
            "edit_user",
            "view_reports",
          ] : ["view_dashboard"];
      createMutation.mutate({ ...data, permissions: premission }, {
        onSuccess: () => {
          setShowForm(false);
        }
      });
    }
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-4">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h1>Users</h1>
        <Button onClick={handleCreate}>
          + Create User
        </Button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(event) => {
            setSearch(
              event.target.value
            );

            changePage(1);
          }}
        />
      </div>

      {usersQuery.isLoading && (
        <p>Loading users...</p>
      )}

      {usersQuery.isError && (
        <p>
          Failed to load users.
        </p>
      )}

      {usersQuery.isFetching &&
        !usersQuery.isLoading && (
          <p>Updating...</p>
        )}

      {usersQuery.data && (
        <>
          <UserTable
            users={
              usersQuery.data.items
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingId={
              deleteMutation.isPending
                ? deleteMutation.variables
                : undefined
            }
          />

          <Pagination
            page={page}
            limit={limit}
            total={
              usersQuery.data.total
            }
            onPageChange={
              changePage
            }
            onLimitChange={
              changeLimit
            }
          />
        </>
      )}


      {showForm && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
          }}
        >
          <h2>
            {selectedUser
              ? "Edit User"
              : "Create User"}
          </h2>

          <UserForm
            initialUser={
              selectedUser
            }
            onSubmit={
              handleFormSubmit
            }
            isLoading={
              isSaving
            }
            onCancel={() => {
              setShowForm(false);
              setSelectedUser(null);
            }}
          />
        </div>
      )}

    </div>
  )
}

export default Users