import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../interceptors';
import { RegisterFormValues } from './Register.type';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const initialValues: RegisterFormValues = {
        name: '',
        email: '',
        password: '',
        phone: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Enter Name"),
        email: Yup.string().email('Invalid email address').required('Enter Email'),
        password: Yup.string().required('Enter Password'),
        phone: Yup.string().required('Enter Phone').matches(/^[0-9]+$/, "Phone number must be only digits"),
    });

    const handleSubmit = async (
        values: RegisterFormValues,
        { setSubmitting, setFieldError }: FormikHelpers<RegisterFormValues>
    ) => {
        try {
            const response = await axiosInstance.post('/users', values);
            console.log(response, 'response');
            navigate('/login');
        } catch (error: any) {
            console.error('Registration error:', error);
            if (error.response) {
                console.log('Email already exists');
                setFieldError('email', 'Email already exists');
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
            <Typography variant='h5' sx={{ textAlign: "center" }}>Register</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched, handleChange, handleBlur }) => (
                    <Form>
                        <Stack mt={2}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                size='small'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                            />
                        </Stack>
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
                            <TextField
                                id="phone"
                                name="phone"
                                label="Phone"
                                variant="outlined"
                                size='small'
                                type="tel"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.phone && !!errors.phone}
                                helperText={touched.phone && errors.phone}
                            />
                        </Stack>
                        <Stack mt={2}>
                            <Button variant="contained" type="submit" disabled={isSubmitting}>Register</Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Stack>
    );
};

export default Register;
