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
  title: yup.string().required('Please enter a title'),
})

export const domainSchema = yup.object().shape({
  title: yup.string().required('Please enter a title'),
  example: yup.string(),
})
