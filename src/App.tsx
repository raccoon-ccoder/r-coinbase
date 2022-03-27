import Router from "./Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { ReactQueryDevtools } from "react-query/devtools";
// ReactQueryDevtools : render할 수 있는 컴포넌트인데 캐시에 있는 query를 보여줌

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400&display=swap');
    ${reset}
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.textColor};
    }
`;

function App() {
    return (
    <>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
    </>
    );
}

export default App;

// createGlobalStyle : styled-components에 있으며 컴포넌트를 만들 수 있다
// 렌더링 될 때 전역 스코프에 스타일들을 올려줌 (default style 지정 가능)
// 하지만 하나의 컴포넌트만 반환해야 하기에 Router + GlobalStyle을 같이 반환할 수 없음
// 이럴 때 React Fragment 사용 : 유령 컴포넌트 같은 건데 부모 없이 컴포넌트들이 서로 붙어 있게끔 반환 가능