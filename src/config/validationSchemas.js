import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userLoginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
})

export const userAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  role: yup.string().required('Please select a role'),
})

export const topicSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(50, 'Title cannot be longer than 50 characters')
    .required('Please enter a title'),
})

export const domainSchema = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(50, 'Title cannot be longer than 50 characters')
    .required('Please enter a title'),
  example: yup
    .string()
    .min(5, 'Example must be at least 5 characters long')
    .max(50, 'Example cannot be longer than 50 characters'),
})

export const updateProfileSchema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup
    .string()
    // .matches(passwordRules, 'Password is too weak')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
})

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    // .matches(passwordRules, 'Password is too weak')
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
})
