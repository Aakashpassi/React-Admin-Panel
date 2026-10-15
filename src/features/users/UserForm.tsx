import { useForm } from "react-hook-form";
import type { User } from "../../store/slices/authSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface UserFormData {
    name: string;
    email: string;
    password: string;
    role: string;
}

interface UserFormProps {
    initialUser?: User | null;
    onSubmit: (data: UserFormData) => void;
    isLoading?: boolean;
    onCancel: () => void;
}


const UserForm: React.FC<UserFormProps> = ({ initialUser, onSubmit, isLoading, onCancel }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        defaultValues: {
            name: initialUser?.name || '',
            email: initialUser?.email || '',
            password: '',
            role: initialUser?.role || 'employee',
        }
    })



    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input   {...register("name", {
                    required:
                        "Name is required",

                    minLength: {
                        value: 3,
                        message:
                            "Minimum 3 characters",
                    },
                })}
                />

                {errors.name && (
                    <p>
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <Label>Email</Label>

                <Input
                    type="email"
                    {...register("email", {
                        required:
                            "Email is required",

                        pattern: {
                            value:
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                            message:
                                "Invalid email",
                        },
                    })}
                />

                {errors.email && (
                    <p>
                        {errors.email.message}
                    </p>
                )}
            </div>

            {!initialUser && (
                <div>
                    <Label>Password</Label>

                    <Input
                        type="password"
                        {...register("password", {
                            required:
                                "Password is required",

                            minLength: {
                                value: 6,
                                message:
                                    "Minimum 6 characters",
                            },
                        })}
                    />

                    {errors.password && (
                        <p>
                            {errors.password.message}
                        </p>
                    )}
                </div>
            )}

            <div>
                <Label>Role</Label>

                <Select  {...register("role", {
                        required:
                            "Role is required",
                    })}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            
                                <SelectItem value="admin">
                                    Admin
                                </SelectItem>
                                <SelectItem value="manager">
                                    Manager
                                </SelectItem>
                                <SelectItem value="employee">
                                    Employee
                                </SelectItem>
                       
                        </SelectGroup>
                    </SelectContent>
                </Select>

            
            </div>

            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading
                    ? "Saving..."
                    : initialUser
                        ? "Update User"
                        : "Create User"}
            </Button>

            <Button
                type="button"
                variant="outline"
                onClick={onCancel}
            >
                Cancel
            </Button>


        </form>
    )

}

export default UserForm;