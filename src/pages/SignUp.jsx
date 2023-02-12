import Registration from "../components/SignUp/Registration";
import Agree from "../components/SignUp/Agree";
import { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
    const [show, setShow] = useState(false);

    return (
        <StDiv>
            {show === true ? <Registration /> : <Agree setShow={setShow} />}
        </StDiv>
    );
};
const StDiv = styled.div`
    width: 100%;
`;
export default SignUp;
