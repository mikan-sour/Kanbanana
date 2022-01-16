import React from "react";
import { HeaderWrapper, LogoText, LogoImageWrapper } from "./styled";
import KanabanaLogo from '../../atoms/logo';
export default function Header() {
    return (
        <HeaderWrapper>
            <LogoText>Kanbanana</LogoText>
            <LogoImageWrapper>
                <KanabanaLogo/>
            </LogoImageWrapper>
        </HeaderWrapper>
    )
  }