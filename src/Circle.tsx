import { useState } from "react";
import styled from "styled-components"

interface ContainerProps {
    bgColor: string;
    borderColor: string;
}

const Container = styled.div<ContainerProps>`
    width: 100px;
    height: 100px;
    background-color: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor || "blue"};
    border-radius: 50%;
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
    const [counter, setCounter] = useState();
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
}

export default Circle;
