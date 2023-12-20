import { useState } from "react"
import Auth, { InputField } from "./auth"
import axios from "axios"
import { toast } from "react-toastify"
import { useGlobalContext } from "../../contexts/global.context"
import { useNavigate } from "react-router"
import { handleAPIError } from "../../utils/errors.util"

export interface SignInForm {
    creds: string,
    password: string
}

export default function SignIn() {

    const { handleLogIn } = useGlobalContext()
    const navigate = useNavigate()

    const [form, setForm] = useState<SignInForm>({
        creds: "",
        password: ""
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const inputFields: InputField[] = [
        {
            name: "creds",
            value: form.creds,
            label: "Username or E-mail",
            type: "text",
            placeholder: "example@mail.com",
        },
        {
            name: "password",
            value: form.password,
            label: "Password",
            type: "password",
            placeholder: "********"
        }
    ]

    const handleFormSubmit = async () => {

        for (const field in form) {
            if (form[field as keyof SignInForm] === "") {
                toast.error("Please fill all the fields!")
                return
            }
        }

        try {

            const res = await axios.post(import.meta.env.VITE_BASE_API + '/user/sign-in', form)
            const response = res.data

            handleLogIn!(response.data.token, response.data.username, response.data.user_id)
            toast.success("Logged In!")
            navigate('/')

        } catch(e) {

            if (axios.isAxiosError(e)) {
                toast.error(handleAPIError(e))
            } else {
                toast.error("Something went wrong!")
            }

        }

    }

    return (
        <Auth
            inputFields={inputFields}
            authFormat="In"
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
        />
    )
}
