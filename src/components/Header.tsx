import Nav from "./Nav";
import { NavBar } from "@/lib/fluid";
import { AppConfig } from "@/lib/config";
import Links from "@/data/links_header.json";

const Header = () => {
  return (
    <header style={{ display: "unset" }}>
      <NavBar
        brand={AppConfig.shortName}
        brandSrc={`${process.env.NEXT_PUBLIC_BASE_URL}logo-sm.png`}
        links={Links}
        linkStyles="lg:!text-light no-underline"
        navStyles="bg-gradient-to-b from-primary-dark from-30% to-primary to-90% text-light p-2 md:p-4 shadow-lg z-20 font-semibold"
        btnBackground="dark"
        btnColor="light"
        btnSize="lg"
        placement="top"
      >
        <Nav />
      </NavBar>
    </header>
  );
};

export default Header;
