import ScrollBarLayout from "components/layout/ScrollBarLayout";
import NavItem from "./NavItem";

export default function NavContainer({ navlist }) {
  return (
    <>
      <ScrollBarLayout>
        {navlist.map((item, index) => (
          <NavItem key={index} navObj={item} />
        ))}
      </ScrollBarLayout>
    </>
  );
}
