import {useState} from "react";
import {Link} from "react-router-dom";

function Register({
    onSubmit,
    title,
    buttonText
}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData.password, formData.email)
    }

    return (
        <section className="authorization">
            <h2 className="authorization__header">{title}</h2>
            <form className="authorization__form" name="authorization" onSubmit={handleSubmit}>
                <input
                    type="email"
                    className="authorization__input authorization__input_email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                    value={formData.email}
                />
                <input
                    type="password"
                    className="authorization__input authorization__input_password"
                    name="password"
                    placeholder="Пароль"
                    minLength="2"
                    maxLength="20"
                    required
                    onChange={handleChange}
                    value={formData.password}
                />
                <button className="authorization__submit-button" type="submit">
                    {buttonText}
                </button>
                <Link to="/signin" className="authorization__link">Уже зарегистрированы? Войти</Link>
            </form>
        </section>
    );
}

export default Register;