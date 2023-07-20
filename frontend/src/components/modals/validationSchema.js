import * as yup from 'yup'

const userValidationScehma = yup.object().shape({
    userName: yup.string().required('Username is required').matches(/^[a-zA-Z0-9]+$/, 'userName must not contain symbols')

})

const userPasswordValidationSchema = yup.object().shape({
    userPassword: yup.string().required('Password is required').min(6, 'Password must have min length of 6 characters').matches(/^(?=.[A-Z])(?=.[!@#$%^&()-_=+{};:,<.>]).$/, 'Password must contain one uppercase letter and one symbol')
})

const userConfirmPwValidationSchema = yup.object().shape({
    confirmPassword: yup.string().required('Confirm password is required').oneOf([yup.ref('userPassword')], 'Passwords must match')
})


export {userValidationScehma, userPasswordValidationSchema, userConfirmPwValidationSchema}