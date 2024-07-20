import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #2DB34A;
    color: #fff;
    padding: 10px;
    border-radius: 15px;
    ${props => props.style};
`;

export const Button = (props) => {
    return <StyledButton style={props.styles} onClick={props.onClick}>{props.text}</StyledButton >
}