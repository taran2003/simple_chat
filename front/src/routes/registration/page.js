import AuthForm from '../../components/AuthForm';
import { AuthFormInput } from '../../components/AuthForm/input';

export function RegistrationPage() {
    return <AuthForm submitText="Register">
        <AuthFormInput name="Login" type="text"/>
        <AuthFormInput name="Password" type="password"/>
    </AuthForm>
}
