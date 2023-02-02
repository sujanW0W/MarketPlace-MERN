import React, { useState } from "react";
import Button from "../../components/Button";
import "../../assets/styles/forms/register.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");

    //This state is used to show Loading... when the API call is being made.
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    //Check if the user logged in. if logged In, redirect to Homepage
    setTimeout(() => {
        localStorage.getItem("accessToken") && navigate("/");
    }, 1000);

    const url = "http://localhost:5000/api/v1/users/register";
    const handleRegister = async () => {
        try {
            const reqBody = {
                name,
                email,
                password,
            };

            setIsLoading(true);
            const response = await axios.post(url, reqBody);

            const { token } = response.data;
            localStorage.setItem("accessToken", token);

            setName("");
            setEmail("");
            setPassword("");

            setIsLoading(false);

            navigate("/");
        } catch (error) {
            console.log(error);
            //Make this error visible in the site.
        }
    };

    const alreadyRegistered = () => {
        navigate("/user/login");
    };

    return (
        <div className="loginElements">
            <div className="loginIcon">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="loginInputSection">
                <input
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* <input
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                /> */}
                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <Button buttonText={"Register"} onClickFunction={handleRegister} />

            {isLoading && <p style={{ margin: "0px" }}>Loading...</p>}

            <div className="alreadyRegisteredDiv">
                <p>Already a User?</p>
                <Button
                    buttonText={"Login"}
                    onClickFunction={alreadyRegistered}
                />
            </div>
        </div>
    );
};

export default Register;
