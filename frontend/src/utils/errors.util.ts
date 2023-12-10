import { AxiosError } from "axios"

export interface APIErrorDetail {
    loc?: string[],
    msg: string,
    type: string
}

export interface APIErrorResponse {
    detail: APIErrorDetail[]
}

export const handleAPIError = (error: AxiosError<APIErrorResponse>) => {
    if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail[0].msg
        return errorMessage.charAt(0).toUpperCase() + error.response.data.detail[0].msg.slice(1)
    } else {
        return "Something went wrong"
    }
}
