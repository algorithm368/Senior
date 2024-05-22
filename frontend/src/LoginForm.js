import React, { useState } from 'react';
import './style.css'; // Import CSS file if needed

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement login logic
    };

    return (
        <div className="screen-1">
            <svg className="logo" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="300" height="300" viewBox="0 0 640 480" xmlSpace="preserve">
                {/* SVG content */}
            </svg>
            <div className="email">
                <label htmlFor="email">Email Address</label>
                <div className="sec-2">
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" name="email" placeholder="Username@gmail.com" value={email} onChange={handleEmailChange} />
                </div>
            </div>
            <div className="password">
                <label htmlFor="password">Password</label>
                <div className="sec-2">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input className="pas" type={showPassword ? 'text' : 'password'} name="password" placeholder="············" value={password} onChange={handlePasswordChange} />
                    <ion-icon className="show-hide" name={showPassword ? 'eye-off-outline' : 'eye-outline'} onClick={togglePasswordVisibility}></ion-icon>
                </div>
            </div>
            <button className="login" onClick={handleSubmit}>Login</button>
            <div className="footer">
                <span>Signup</span>
                <span>Forgot Password?</span>
            </div>
        </div>
    );
};

export default LoginForm;
