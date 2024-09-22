import Image from "next/image";
import styles from "../page.module.scss";
import logo from "../assets/logo.png";

function Header() {
  return (
    <>
      <div className={styles.header}>
        <Image className={styles.logo} alt="logo" src={logo} width={150} height={36} />
        <p className={styles.pWelcome}>Bem-vindo de volta, Marcus</p>
        <p className={styles.pDate}>Segunda, 01 de dezembro de 2025</p>
      </div>
    </>
  );
}

export default Header;
