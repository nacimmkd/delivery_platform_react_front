import Icon from "@/shared/components/icon/Icon";
import Text from "@/shared/components/text/Text";
import useAuth from "@/features/auth/hooks/useAuth";
import styles from "./Header.module.css"
import { Link } from "react-router-dom";
import { paths } from "@/app/routes/paths";
import { Bell, Car, ChevronDown, ChevronUp, LogOut, MessageCircle, Package, User } from "lucide-react";
import { useState } from "react";
import Menu from "@/shared/components/menu/Menu";
import MenuItem from "@/shared/components/menu/MenuItem";
import Divider from "@/shared/components/divider/Divider";
import Button from "@/shared/components/button/Button";

export default function Header() {

    const { logout , isAuthenticated, isLoading} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const avatarUrl = "/avatar.png"; // to be corrected later

    function handleMenuOpen() {
        setIsMenuOpen((v) => !v);
    }

    return (
        <div className={styles.container}>
            <div className={styles.left_container}>
                <Link to={paths.home} className={styles.logo_container}>
                    <Icon src="/logo.png" size={40} />
                    <Text className={styles.logo_text} tag="h3" weight="bold" color="white">ecolis</Text>
                </Link>
            </div>

            {!isAuthenticated && ( 
                <div className={styles.right_container}>
                    <div className={styles.login_container}>
                        <Link to={paths.login} className={styles.login_button}>
                            Log In
                        </Link>
                        <Link to={paths.signup} className={styles.signin_button}>Sign Up</Link>
                    </div>
                </div> 
            )}


            {isAuthenticated && (
                <div className={styles.right_container}>
                    <div className={styles.notifications_container}>
                        <Bell size={24} color="white"/>
                    </div>
                    <div className={styles.messages_container}>
                        <MessageCircle size={24} color="white"/>
                    </div>
                    <div onClick={handleMenuOpen} className={styles.profile_container}>
                        <img src={avatarUrl} alt="avatar" />
                        {!isMenuOpen && <ChevronDown size={20} color="white"/> }
                        {isMenuOpen && <ChevronUp size={20} color="white"/> }
                        <Menu isOpen={isMenuOpen}>
                            <MenuItem label="My Parcels" to={paths.parcels_list} icon={<Package size={20} />} />
                            <MenuItem label="My Trips" to={paths.trips} icon={<Car size={20} />} />
                            <MenuItem label="Profile" to={paths.profile} icon={<User size={20} />} />
                            <Divider/>
                            <Button label={"Log Out"} variant="danger" onClick={logout} loading={isLoading} icon={<LogOut size={20} />}/>
                        </Menu>
                    </div>
                </div>
            )}
            
        </div>
    );
}