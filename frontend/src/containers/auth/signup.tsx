import { useState } from "react"
import Auth, { InputField } from "./auth"
import axios from "axios"
import { toast } from "react-toastify"
import { useGlobalContext } from "../../contexts/global.context"
import { useNavigate } from "react-router"
import { handleAPIError } from "../../utils/errors.util"
import Genres from "./genres"
import Artists from "./artists"

export interface SignUpForm {
    username: string,
    email: string,
    password: string,
    role: string,
    interests: string[]
}

export default function SignUp() {

    const { handleLogIn } = useGlobalContext()
    const navigate = useNavigate()

    const [detailsEntered, setDetailsEntered] = useState<boolean>(false)
    const [genres, setGenres] = useState<string[]>([])
    const [genresEntered, setGenresEntered] = useState<boolean>(false)

    const [form, setForm] = useState<SignUpForm>({
        username: "",
        email: "",
        password: "",
        role: "common",
        interests: [],
    })

    const handleFormSubmit = async () => {

        for (const field in form) {
            if (field === "genres") continue

            if (form[field as keyof SignUpForm] === "") {
                toast.error("Please fill all the fields!")
                return
            }
        }

        if (!detailsEntered) {
            setDetailsEntered(true)
            return
        }

        if (!genresEntered && genres.length == 2) {
            setGenresEntered(true)
            return
        }

        try {

            const res = await axios.post('/api/user/sign-up', form)
            const response = res.data

            handleLogIn!(response.data.token, response.data.username, response.data.user_id)
            navigate('/')
            toast.success("Account Created Successfully!")

        }
        catch(e) {

            setDetailsEntered(false)

            if (axios.isAxiosError(e)) {
                toast.error(handleAPIError(e))
            } else {
                toast.error("Something went wrong!")
            }

        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleGenresChange = (genres: string[]) => {
        setGenres(genres)
    }

    const handleArtistsChange = (interests: string[]) => {
        setForm({
            ...form,
            interests: interests
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

    if (detailsEntered && genresEntered) {
        return (
            <Artists
                handleArtistsChange={handleArtistsChange}
                genres={genres}
                handleFormSubmit={handleFormSubmit}
            />
        )
    }

    if (detailsEntered) {
        return (
            <Genres
                handleGenresChange={handleGenresChange}
                handleFormSubmit={handleFormSubmit}
            />
        )
    }

    return (
        <Auth
            inputFields={inputFields}
            authFormat="Up"
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
        />
    )

}
