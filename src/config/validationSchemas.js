import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
})

export const userAdminSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  role: yup.string().required('Please select a role'),
})
