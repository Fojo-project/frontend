import * as yup from 'yup';

export const RegisterFormSchema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'The password field must be at least 8 characters.')
    .matches(
      /[a-z]/,
      'The password field must contain at least one lowercase letter.'
    )
    .matches(
      /[A-Z]/,
      'The password field must contain at least one uppercase letter.'
    )
    .matches(/[0-9]/, 'The password field must contain at least one number.')
    .matches(
      /[^a-zA-Z0-9]/,
      'The password field must contain at least one symbol.'
    ),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Confirm password is required'),
});
export const ForgetPassordFormSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});
