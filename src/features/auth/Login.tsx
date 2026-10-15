

// import { useAuth } from "./AuthContext";
import { cn } from "cn"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useLogin } from './hooks/useLogin';
import { loginSuccess } from '../../store/slices/authSlice';
import { ROUTES } from '../../constants/routes';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const Login = ({
    className,
    ...props
}: React.ComponentProps<"div">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loginMutation = useLogin();


    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        loginMutation.mutate({ email, password }, {
            onSuccess: (data) => {
                dispatch(loginSuccess(data))
                navigate(ROUTES.HOME, { replace: true })
            }
        });

    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            placeholder="Enter your email"
                                            onChange={(event) =>
                                                setEmail(event.target.value)
                                            }
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                            <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </Field>
                                    <Field>

                                        <Button type="submit" disabled={loginMutation.isPending}>
                                            {loginMutation.isPending
                                                ? "Logging in..."
                                                : "Login"}
                                        </Button>

                                        <Button variant="outline" type="button">
                                            Login with Google
                                        </Button>
                                        <FieldDescription className="text-center">
                                            Don&apos;t have an account? <a href="#">Sign up</a>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login;