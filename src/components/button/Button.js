import styled from "styled-components";

const Button = (props) => {
    const { children, onClick } = props;
    return <StButton onClick={onClick}>{children}</StButton>;
};

const StButton = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
`;

export default Button;
