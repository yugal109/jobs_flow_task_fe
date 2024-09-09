"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import { useCreateUserMutation } from "@/api/user.api";
import { useState } from "react";
import { setUser } from "@/slices/auth.slice";
import { useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { PATH_AFTER_SIGN_IN } from "@/config-global";

const schema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    firstName: z.string().min(1, { message: "This field has to be filled." }),
    lastName: z.string().min(1, { message: "This field has to be filled." }),
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"], // Error will be thrown at passwordConfirmation
    message: "Passwords must match",
  });

export type SignInUserSchema = z.infer<typeof schema>;

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signInUserMutation] = useCreateUserMutation({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInUserSchema>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: SignInUserSchema) => {
    setIsLoading(true);
    signInUserMutation({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordConfirmation: data.passwordConfirmation,
    })
      .unwrap()
      .then((response) => {
        dispatch(setUser(response));
        router.push(PATH_AFTER_SIGN_IN);
      })
      .catch((err) => {
        if (err.originalStatus === 409) {
          setErrorMessage(err.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
        // other errors can be handled here //
      })
      .finally(() => {
        setIsLoading(false);
        reset();
      });
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            placeholder="Enter First Name"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName.message}</p>
          )}

          <TextField
            placeholder="Enter Last Name"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p style={{ color: "red" }}>{errors.lastName.message}</p>
          )}

          <TextField
            placeholder="Enter email"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <TextField
            placeholder="Enter password"
            fullWidth
            required
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <TextField
            style={{ marginTop: 15 }}
            placeholder="Enter confirm password"
            fullWidth
            type="password"
            required
            {...register("passwordConfirmation")}
          />
          {errors.passwordConfirmation && (
            <p style={{ color: "red" }}>
              {errors.passwordConfirmation.message}
            </p>
          )}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {isLoading ? (
            <Button variant="contained" fullWidth sx={{ mt: 1 }}>
              Loading....
            </Button>
          ) : (
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign Up
            </Button>
          )}
        </form>
        <Stack direction="row" justifyContent="flex-end" mt={1}>
          <Link href="/sign-in">Sign In</Link>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
