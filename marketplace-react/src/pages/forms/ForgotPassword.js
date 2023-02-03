import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = () => {
        console.log(email);
    };

    return (
        <div className="loginElements">
            <div className="loginIcon">
                <FontAwesomeIcon icon={faKey} />
            </div>
            <div className="loginInputSection">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="loginSubmitDiv">
                <Button
                    buttonText={"Reset Password"}
                    onClickFunction={handleSubmit}
                />
            </div>
        </div>
    );
};

export default ForgotPassword;
