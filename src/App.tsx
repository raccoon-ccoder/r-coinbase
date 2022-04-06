import Router from "./Router";
import { createGlobalStyle, ThemeContext } from "styled-components";
import reset from "styled-reset";
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { ReactQueryDevtools } from "react-query/devtools";
import { useContext, useState } from "react";
// ReactQueryDevtools : render할 수 있는 컴포넌트인데 캐시에 있는 query를 보여줌

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700&display=swap');
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html {
        height: 100%;
    }
    body {
        font-family: "Roboto","Noto Sans KR","Dotum","돋움","sans-serif",Arial,Helvetica;
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.textColor};
        height: 100%;
    }
    input {
        border: none;
    }
    #root {
        height: 100%;
    }
`;

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
    <>
       <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme }>
            <GlobalStyle />
            <Router isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
    </>
    );
}

export default App;

// createGlobalStyle : styled-components에 있으며 컴포넌트를 만들 수 있다
// 렌더링 될 때 전역 스코프에 스타일들을 올려줌 (default style 지정 가능)
// 하지만 하나의 컴포넌트만 반환해야 하기에 Router + GlobalStyle을 같이 반환할 수 없음
// 이럴 때 React Fragment 사용 : 유령 컴포넌트 같은 건데 부모 없이 컴포넌트들이 서로 붙어 있게끔 반환 가능