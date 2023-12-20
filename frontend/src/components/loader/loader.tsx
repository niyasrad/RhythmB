import { LoaderWrapper, Loading } from "./loader.styles";
import rb_logo from '../../assets/logo/rb.svg'

export default function Loader({ home }: { home?: boolean }) {
    return (
        <LoaderWrapper
            $home={home ? home : false}
        >
            <Loading
                src={rb_logo}
                alt="logo"
            />
        </LoaderWrapper>
    )
}
