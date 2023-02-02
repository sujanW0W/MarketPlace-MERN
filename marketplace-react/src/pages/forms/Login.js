import React, { useState } from "react";
import Button from "../../components/Button";
import "../../assets/styles/forms/login.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();

    //Check if the user logged in. if logged In, redirect to Homepage
    setTimeout(() => {
        localStorage.getItem("accessToken") && navigate("/");
    }, 1000);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //This state is used to show Loading... when the API call is being made.
    const [isLoading, setIsLoading] = useState(false);

    const url = "http://localhost:5000/api/v1/users/login";

    const handleSubmit = async () => {
        try {
            const reqBody = {
                email,
                password,
            };

            setIsLoading(true);

            const response = await axios.post(url, reqBody);
            const { token } = response.data;

            localStorage.setItem("accessToken", token);

            setEmail("");
            setPassword("");
            setIsLoading(false);

            navigate("/");
        } catch (error) {
            console.log(error);
            //Make this error to be visible in the site.
        }
    };

    const handleNotRegistered = () => {
        navigate("/user/register");
    };

    return (
        <div className="loginElements">
            <div className="loginIcon">
                <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="loginInputSection">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="loginSubmitDiv">
                <Button
                    nameOfClass="loginButton"
                    buttonText={"Login"}
                    onClickFunction={handleSubmit}
                />

                {isLoading && <p style={{ margin: "0px" }}>Loading...</p>}

                <a href="https://google.com" target="_blank" rel="noreferrer">
                    Forgot Password?
                </a>
            </div>

            <div className="notRegistered">
                <p>Not Registered? </p>
                <Button
                    buttonText={"Register"}
                    onClickFunction={handleNotRegistered}
                />
            </div>
        </div>
    );
};

export default Login;
