import { useState } from "react"
import Auth, { InputField } from "./auth"
import axios from "axios"
import { toast } from "react-toastify"
import { useGlobalContext } from "../../contexts/global.context"
import { useNavigate } from "react-router"

export interface SignUpForm {
    username: string,
    email: string,
    password: string,
}

export default function SignUp() {

    const { handleLogIn } = useGlobalContext()
    const navigate = useNavigate()

    const [form, setForm] = useState<SignUpForm>({
        username: "",
        email: "",
        password: ""
    })

    const handleFormSubmit = async () => {

        for (const field in form) {
            if (form[field as keyof SignUpForm] === "") {
                toast.error("Please fill all the fields!")
                return
            }
        }
        
        axios.post(import.meta.env.VITE_BASE_API + '/user/sign-up', form)
        .then((res) => {
            const response = res.data
            handleLogIn!(response.data.token, response.data.username)
            navigate('/')
            toast.success("Account Created Successfully!")
        })
        .catch(() => {
            toast.error("Something went wrong!")
        })

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const inputFields: InputField[] = [
        {
            name: "username",
            value: form.username,
            label: "Username",
            type: "text",
            placeholder: "example",
        },
        {
            name: "email",
            value: form.email,
            label: "E-mail",
            type: "text",
            placeholder: "example@example.com",
        },
        {
            name: "password",
            value: form.password,
            label: "Password",
            type: "password",
            placeholder: "********"
        }
    ]

    return (
        <Auth
            inputFields={inputFields}
            authFormat="Up"
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
        />
    )

}