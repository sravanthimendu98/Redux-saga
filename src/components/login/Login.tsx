import React from 'react';
import axiosInstance from '../../interceptors';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { LoginFormValues } from './Login.type';

const Login: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Enter Email'),
        password: Yup.string().required('Enter Password')
    });

    const handleSubmit = async (
        values: LoginFormValues,
        { setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>
    ) => {
        try {
            const response = await axiosInstance.get('/users');
            console.log(response, 'response');
            const userData = response.data;

            const user = userData.find((user: { email: string; password: string }) => user.email === values.email);
            console.log(user, 'user');

            if (user && user.password === values.password) {
                navigate('/userdetails');
            } else {
                setFieldError('email', 'Invalid credentials');
                setSubmitting(false);
            }
        } catch (error: any) {
            if (error.response) {
                setFieldError('email', 'Invalid credentials');
            } else {
                setFieldError('email', 'An error occurred');
            }
            setSubmitting(false);
        }
    };

    return (
        <Stack sx={{
            display: "flex",
            justifyContent: "center",
            width: '30%',
            margin: "auto",
            padding: "60px",
            border: '1px solid #d7dbe3',
            borderRadius: "5px"
        }}>
            <Typography variant='h5' mt={2} sx={{ textAlign: "center" }}>Login</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Stack mt={2}>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                variant="outlined"
                                size='small'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                variant="outlined"
                                size='small'
                                type="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <Button variant="contained" type="submit" disabled={isSubmitting}>Login</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

export default Login;
