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
import { useSignInMutation } from "@/api/auth.api";
import { useAppDispatch } from "@/store";
import { setUser } from "@/slices/auth.slice";
import { PATH_AFTER_SIGN_IN } from "@/config-global";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

const SignInPage = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signInUserMutation] = useSignInMutation();

  const onSubmit = (data: Schema) => {
    setIsLoading(true);
    signInUserMutation({
      email: data.email,
      password: data.password,
    })
      .unwrap()
      .then((response) => {
        dispatch(setUser(response));
        router.push(PATH_AFTER_SIGN_IN);
      })
      .catch((err) => {
        console.log(err.data.error);
        if (err.originalStatus === 404) {
          setErrorMessage(err.data);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      })
      .finally(() => {
        setIsLoading(false);
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
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {isLoading ? (
            <Button variant="contained" fullWidth sx={{ mt: 1 }}>
              Loading...
            </Button>
          ) : (
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
              Sign In
            </Button>
          )}
        </form>
        <Stack direction="row" justifyContent="flex-end" mt={1}>
          <Link href="/sign-up">Sign Up</Link>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SignInPage;
