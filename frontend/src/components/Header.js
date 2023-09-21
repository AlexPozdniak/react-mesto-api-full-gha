import logo from "../images/logo.svg";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Header({
    isLoggedIn,
    email,
    handleSignOut,
    path
}) {
    const [linkText, setLinkText] = useState('');
    
    useEffect(() => {
        if (isLoggedIn) {
            setLinkText('Выйти')
        } else {
            setLinkText((path === '/signin') ? 'Регистрация' : 'Войти');
        }
    }, [isLoggedIn, path])

    return(
        <header className="header">
            <img className="header__logo" alt="Логотип" src={logo} />
            <div className="header__info">
                {isLoggedIn && <p className={`header__email`}>{email}</p>}
                <Link
                    to={(path === '/signin') ? '/signup' : '/signin' }
                    className="header__link"
                    onClick={isLoggedIn ? handleSignOut : () => {}}
                >
                    {linkText}
                </Link>
            </div>
        </header>
    );
}

export default Header;