import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { User } from "../../store/slices/authSlice";
import { Button } from "@/components/ui/button";

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    deletingId?: string;
}


const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, deletingId }) => {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead >Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell >{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                            <Button onClick={() => onEdit(user)}>Edit</Button>
                            <Button onClick={() => onDelete(user)} disabled={user.id === deletingId}>
                                {deletingId === user.id
                                    ? "Deleting..."
                                    : "Delete"}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default UserTable;