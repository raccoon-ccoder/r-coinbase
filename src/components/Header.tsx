import styled, { ThemeContext } from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import SyncAltIcon from "@material-ui/icons/SyncAltOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import { useContext } from "react";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: ${props => props.theme.mainColor};
    padding: 10px 0px;
    @media ${props => props.theme.desktop} {
        padding: 10px 40px;
    }
`;

const HeaderBox = styled.section`
    width: 100%;
    max-width: 420px;
    height: 100%;
    color: white;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 25px;
    margin-top: 8px;
    display: none;
    @media ${props => props.theme.desktop} {
        display: block;
    }
`;

const Nav = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const NavList = styled.ul`
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    @media ${props => props.theme.desktop} {
        width: 70%;
    }
`;

const NavItem = styled.li`
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    @media ${props => props.theme.desktop} {
        &:hover {
            color: ${props => props.theme.headerAccentColor};
        }
    }
`;

const NavIcon = styled.div``;

const NavName = styled.span`
    font-size: 11px;
`;

const Btn = styled.button``;

function Header({isDarkMode, toggleDarkMode}) {
    
    return (
    <HeaderContainer>
        <HeaderBox>
            <Title>RBit</Title>
            <Nav>
                <NavList>
                    <NavItem>
                        <NavIcon>
                            <SearchIcon />
                        </NavIcon>
                        <NavName>
                            <Link to="/">거래소</Link>
                        </NavName>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <HomeIcon />
                        </NavIcon>
                        <NavName>
                            입출금
                        </NavName>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <SyncAltIcon />
                        </NavIcon>
                        <NavName>
                            투자내역
                        </NavName>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <SettingsIcon onClick={toggleDarkMode} />
                        </NavIcon>
                        <NavName>
                            {isDarkMode ? "Light" : "Dark"}
                        </NavName>
                    </NavItem>
                </NavList>
            </Nav>
        </HeaderBox>
    </HeaderContainer>
    );
}

export default Header;