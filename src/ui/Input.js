import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    background-color: #fff;
    color: #2DB34A;
    border: #2DB34A solid 2px;
    padding: 10px;
    border-radius: 15px;
    ${props => props.style};
`;

const StyledInputError = styled.input`
    background-color: #fff;
    color: red;
    border: red solid 2px;
    padding: 10px;
    border-radius: 15px;
    ${props => props.style};
`;

export const Input = (props) => {
    const inputRef = useRef(null);

    const InputComponent = props.formValid ? StyledInput : StyledInputError;

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [InputComponent]);

    return (
        <InputComponent
            ref={inputRef}
            style={props.styles}
            type={props.type ? props.type : 'text'}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.onChange}
        />
    );
}

const StyledTextarea = styled.textarea`
    color: #2DB34A;
    border: #2DB34A solid 2px;
    padding: 10px;
    border-radius: 15px;
    resize: vertical;
    ${props => props.style};
`

export const Textarea = (props) => {
    return <StyledTextarea style={props.styles} name={props.name} onChange={props.onChange} value={props.value} placeholder={props.placeholder} />
}  