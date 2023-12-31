import * as yup from 'yup'

const userValidationScehma = yup.object().shape({
    userName: yup.string().required('Username is required').matches(/^[a-zA-Z0-9]+$/, 'Username must not contain symbols')

})

const userPasswordValidationSchema = yup.object().shape({
    userPassword: yup.string().required('Password is required').min(6, 'Password must have min length of 6 characters').matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter').matches(/^(?=.*[A-Z])/, 'must contain at least one uppercase letter').matches(/^(?=.*[!@#$%^&()_+-])/, 'must have at least one special character')
})

const postTitleSchema = yup.object().shape({
    postTitle: yup.string().required('Please enter a title')
})


export {userValidationScehma, userPasswordValidationSchema, postTitleSchema}