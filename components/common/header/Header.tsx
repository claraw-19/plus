import styled from "styled-components";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../buttons/LogoButton";
import { IconButton } from "@mui/material";
import { useUserData } from "../../../context/userData";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Menu from "@mui/icons-material/Menu";
import { Close } from "@mui/icons-material";

export default function Header() {
  const { userData } = useUserData();
  const [, , removeCookie] = useCookies(["SLV_User"]);
  const [firstPath, setFirstPath] = useState("");
  const [secondPath, setSecondPath] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const logout = () => {
    removeCookie("SLV_User", { path: "/" });
  };

  useEffect(() => {
    if (window && window != null) {
      setFirstPath(
        (window.location.host.includes("localhost") ? "http://" : "https://") +
          window.location.host,
      );
      setSecondPath(window.location.pathname.replace("/", ""));
    }
  });

  return (
    <>
      <Styled.MobileNav>
        <Styled.MobileList $isOpen={isMobileNavOpen}>
          <Styled.Close onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} />
          <Styled.MobileHeaderLink $selected={secondPath === "schulen"}>
            {firstPath.includes("sales") ? (
              <Link href={"/schulen"}>
                <Styled.MobileNavItem $selected={secondPath == "schulen"}>
                  Schulen
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("sales")
                    ? "/schulen"
                    : firstPath.replace("kpi", "sales") + "/schulen"
                }
                $selected={firstPath === "schulen"}
              >
                Schulen
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
          <Styled.MobileHeaderLink $selected={secondPath === "lehrer*innen"}>
            {firstPath.includes("sales") ? (
              <Link href={"/lehrer*innen"}>
                <Styled.MobileNavItem $selected={secondPath == "lehrer*innen"}>
                  Lehrer*innen
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("sales")
                    ? "/lehrer*innen"
                    : firstPath.replace("kpi", "sales") + "/lehrer*innen"
                }
                $selected={firstPath === "lehrer*innen"}
              >
                Lehrer*innen
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
          <Styled.MobileHeaderLink $selected={secondPath === "anmeldungen"}>
            {firstPath.includes("sales") ? (
              <Link href={"/anmeldungen"}>
                <Styled.MobileNavItem $selected={secondPath == "anmeldungen"}>
                  Anmeldungen
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("sales")
                    ? "/anmeldungen"
                    : firstPath.replace("kpi", "sales") + "/anmeldungen"
                }
                $selected={firstPath === "anmeldungen"}
              >
                Anmeldungen
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
          <Styled.MobileHeaderLink
            $selected={secondPath === "digitale-anmeldungen"}
          >
            {firstPath.includes("sales") ? (
              <Link href={"/digitale-anmeldungen"}>
                <Styled.MobileNavItem
                  $selected={secondPath === "digitale-anmeldungen"}
                >
                  Digitale Anmeldungen
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("sales")
                    ? "/digitale-anmeldungen"
                    : firstPath.replace("kpi", "sales") +
                      "/digitale-anmeldungen"
                }
                $selected={firstPath === "digitale-anmeldungen"}
              >
                Digitale Anmeldungen
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
          <Styled.MobileHeaderLink $selected={secondPath === "leads"}>
            {firstPath.includes("sales") ? (
              <Link href={"/leads"}>
                <Styled.MobileNavItem $selected={secondPath === "leads"}>
                  Leads
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("sales")
                    ? "/leads"
                    : firstPath.replace("kpi", "sales") + "/leads"
                }
                $selected={secondPath === "leads"}
              >
                Leads
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
          <Styled.MobileHeaderLink $selected={firstPath.includes("kpi")}>
            {firstPath.includes("kpi") ? (
              <Link href={"/"}>
                <Styled.MobileNavItem $selected={firstPath.includes("kpi")}>
                  KPI
                </Styled.MobileNavItem>
              </Link>
            ) : (
              <Styled.MobileNavItem
                href={
                  firstPath.includes("kpi")
                    ? "/"
                    : firstPath.replace("sales", "kpi")
                }
                $selected={firstPath.includes("kpi")}
              >
                KPI
              </Styled.MobileNavItem>
            )}
          </Styled.MobileHeaderLink>
        </Styled.MobileList>
      </Styled.MobileNav>
      <Grid item xs={12}>
        <Styled.HeaderContainer>
          <Styled.Header>
            <Styled.LeftHeader>
              <Logo />
              <Styled.Nav>
                <Styled.List>
                  <Styled.HeaderLink $selected={secondPath === "schulen"}>
                    {firstPath.includes("sales") ? (
                      <Link href={"/schulen"}>
                        <Styled.NavItem $selected={secondPath === "schulen"}>
                          Schulen
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("sales")
                            ? "/schulen"
                            : firstPath.replace("kpi", "sales") + "/schulen"
                        }
                        $selected={firstPath === "schulen"}
                      >
                        Schulen
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                  <Styled.HeaderLink $selected={secondPath === "lehrer*innen"}>
                    {firstPath.includes("sales") ? (
                      <Link href={"/lehrer*innen"}>
                        <Styled.NavItem
                          $selected={secondPath === "lehrer*innen"}
                        >
                          Lehrer*innen
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("sales")
                            ? "/schulen"
                            : firstPath.replace("kpi", "sales") +
                              "/lehrer*innen"
                        }
                        $selected={firstPath === "lehrer*innen"}
                      >
                        Lehrer*innen
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                  <Styled.HeaderLink $selected={secondPath === "anmeldungen"}>
                    {firstPath.includes("sales") ? (
                      <Link href={"/anmeldungen"}>
                        <Styled.NavItem
                          $selected={secondPath === "anmeldungen"}
                        >
                          Anmeldungen
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("sales")
                            ? "/schulen"
                            : firstPath.replace("kpi", "sales") + "/anmeldungen"
                        }
                        $selected={firstPath === "anmeldungen"}
                      >
                        Anmeldungen
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                  <Styled.HeaderLink
                    $selected={secondPath === "digitale-anmeldungen"}
                  >
                    {firstPath.includes("sales") ? (
                      <Link href={"/digitale-anmeldungen"}>
                        <Styled.NavItem
                          $selected={secondPath === "digitale-anmeldungen"}
                        >
                          Digitale Anmeldungen
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("sales")
                            ? "/digitale-anmeldungen"
                            : firstPath.replace("kpi", "sales") +
                              "/digitale-anmeldungen"
                        }
                        $selected={firstPath === "digitale-anmeldungen"}
                      >
                        Digitale Anmeldungen
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                  <Styled.HeaderLink $selected={secondPath === "leads"}>
                    {firstPath.includes("sales") ? (
                      <Link href={"/leads"}>
                        <Styled.NavItem $selected={secondPath === "leads"}>
                          Leads
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("sales")
                            ? "/leads"
                            : firstPath.replace("kpi", "sales") + "/leads"
                        }
                        $selected={secondPath === "leads"}
                      >
                        Leads
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                  <Styled.HeaderLink $selected={firstPath.includes("kpi")}>
                    {firstPath.includes("kpi") ? (
                      <Link href={"/"}>
                        <Styled.NavItem $selected={firstPath.includes("kpi")}>
                          KPI
                        </Styled.NavItem>
                      </Link>
                    ) : (
                      <Styled.NavItem
                        href={
                          firstPath.includes("kpi")
                            ? "/"
                            : firstPath.replace("sales", "kpi")
                        }
                        $selected={firstPath.includes("kpi")}
                      >
                        KPI
                      </Styled.NavItem>
                    )}
                  </Styled.HeaderLink>
                </Styled.List>
              </Styled.Nav>
            </Styled.LeftHeader>
            {userData && userData.isAdmin === "admin" && (
              <Styled.RightHeader>
                <Styled.MenuIcon
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                >
                  <Styled.Menu />
                </Styled.MenuIcon>
                <Styled.IconButton onClick={logout}>
                  <LogoutIcon />
                </Styled.IconButton>
              </Styled.RightHeader>
            )}
          </Styled.Header>
        </Styled.HeaderContainer>
      </Grid>
    </>
  );
}

type selectedProp = {
  $selected: boolean;
};

type isOpenProp = {
  $isOpen: boolean;
};

const Styled = {
  Header: styled.header`
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey7};
    background-color: white;
    padding: 0 ${({ theme }) => theme.spacing.xs};
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 4rem;
    ${({ theme }) => theme.breakpoints.l.mediaQuery} {
      margin: 0;
    }
  `,

  HeaderContainer: styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey7};
    background-color: white;
  `,

  IconButton: styled(IconButton)`
    color: ${({ theme }) => theme.colors.grey2} !important;
    display: flex;
    flex-direction: column;
    font-size: 0.85rem !important;
  `,

  LeftHeader: styled.div`
    display: flex;
    align-items: center;
    ${({ theme }) => theme.breakpoints.s.mediaQuery} {
      padding-top: ${({ theme }) => theme.spacing.xxxs};
    }
  `,

  Nav: styled.nav`
    display: block;
    ${({ theme }) => theme.breakpoints.s.mediaQuery} {
      display: none;
    }
  `,

  List: styled.ul`
    display: flex;
    margin: 0;
    a {
      color: ${({ theme }) => theme.colors.grey2};
    }
    > li {
      padding: 1.5rem 1rem;
    }
    padding: 0;
  `,

  NavItem: styled.a<selectedProp>`
    cursor: pointer;
    color: ${({ $selected, theme }) =>
      $selected && theme.colors.tintColor + `!important`};
  `,

  HeaderLink: styled.li<selectedProp>`
    ${({ $selected, theme }) =>
      $selected && `border-bottom: 3px solid ` + theme.colors.tintColor};
    padding-bottom: ${({ $selected }) =>
      $selected && `calc(1rem - 1px) !important`};
  `,

  MobileNav: styled.nav`
    display: none;
    ${({ theme }) => theme.breakpoints.s.mediaQuery} {
      display: block;
    }
  `,

  MobileList: styled.ul<isOpenProp>`
    background-color: ${({ theme }) => theme.colors.grey7};
    margin-top: 0;
    padding-top: ${({ theme }) => theme.spacing.s};
    box-sizing: border-box;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    a {
      color: ${({ theme }) => theme.colors.grey2};
    }
    > li {
      padding: ${({ theme }) => theme.spacing.xxs};
    }
  `,

  MenuIcon: styled(IconButton)`
    display: none;
    ${({ theme }) => theme.breakpoints.s.mediaQuery} {
      display: block;
    }
  `,

  RightHeader: styled.div`
    display: flex;
    align-items: center;
    width: 70px;
  `,

  Menu: styled(Menu)`
    color: ${({ theme }) => theme.colors.grey2};
    display: none !important;
    ${({ theme }) => theme.breakpoints.s.mediaQuery} {
      display: block !important;
    }
  `,

  MobileHeaderLink: styled.li<selectedProp>`
    ${({ $selected, theme }) =>
      $selected && `color: ` + theme.colors.tintColor + ` !important`};
  `,

  MobileNavItem: styled.a<selectedProp>`
    cursor: pointer;
    ${({ $selected, theme }) =>
      $selected && `color: ` + theme.colors.tintColor + ` !important`};
  `,

  Close: styled(Close)`
    color: ${({ theme }) => theme.colors.grey2};
    position: absolute;
    top: 0;
    right: 0;
    margin: ${({ theme }) => theme.spacing.xs};
    cursor: pointer;
  `,
};
