import { AuthContent, AuthForm, AuthFormField, AuthFormFields, AuthFormInput, AuthFormLabel, AuthHeader, AuthLogo, AuthMain, AuthSpec, AuthSubmit, AuthSwitch, AuthTrademark, AuthVersion, AuthWrapper } from "./auth.styles";

import logo_large from '../../assets/logo/rhythmb.svg';
import logo_small from '../../assets/logo/rb.svg';
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../contexts/global.context";


interface AuthProps {
    inputFields: InputField[],
    authFormat: "In" | "Up",
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleFormSubmit: () => void
}

export interface InputField {
    name: string,
    value: string,
    label: string,
    type: "text" | "password",
    placeholder: string
}


export default function Auth({ inputFields, authFormat, handleInputChange, handleFormSubmit }: AuthProps) {

    const navigate = useNavigate()

    const { isLoggedIn, isLoading } = useGlobalContext()
    const [loading, setLoading] = useState<boolean>(false)

    const handleAuthSubmit = async () => {
        if (loading) {
            return
        }
        setLoading(true)
        await handleFormSubmit()
        setLoading(false)
    }

    useEffect(() => {
        if (isLoggedIn && !isLoading) {
            navigate('/')
        }
    }, [isLoading, isLoggedIn])

    return (
        <AuthWrapper>
            <AuthContent>
                <AuthHeader
                    src={logo_large}
                    alt="RhythmB"
                />
                <AuthMain>
                    <AuthForm>
                    <AuthSpec>Sign <span>{authFormat}</span></AuthSpec>
                    <AuthFormFields>
                    {
                        inputFields.map((inputField) => (
                            <AuthFormField key={inputField.label}>
                                <AuthFormLabel>{inputField.label}</AuthFormLabel>
                                <AuthFormInput
                                    name={inputField.name}
                                    value={inputField.value}
                                    onChange={handleInputChange}
                                    type={inputField.type}
                                    placeholder={inputField.placeholder}
                                />
                            </AuthFormField>
                        ))
                    }
                    </AuthFormFields>
                    <AuthSubmit
                        onClick={handleAuthSubmit}
                        $loading={loading}
                    >
                        <h2>Vibe!</h2>
                    </AuthSubmit>
                    </AuthForm>
                    <AuthTrademark>
                        {
                            authFormat === "In" ? (
                                <AuthSwitch>Don't have an account? <span onClick={() => navigate('/sign-up')}>Sign Up</span></AuthSwitch>
                            ) : (
                                <AuthSwitch>Already have an account? <span onClick={() => navigate('/sign-in')}>Sign In</span></AuthSwitch>
                            )
                        }
                        <AuthLogo
                            src={logo_small}
                            alt="RhythmB Logo"
                        />
                        <AuthVersion>v0.0.1</AuthVersion>
                    </AuthTrademark>
                </AuthMain>
            </AuthContent>
        </AuthWrapper>
    )
}
