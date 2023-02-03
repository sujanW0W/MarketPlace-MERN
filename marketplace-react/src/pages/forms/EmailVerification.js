import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";

import { useLocation } from "react-router-dom";

const EmailVerification = () => {
    //useLocation hook can be used to read the URI. The hook will return an object in which the pathName stores URL and search stores the queryString along with '?'.
    //Now, the URLSearchParams() constructor can be used to create and object which will ignore the '?' and stores all the name-value string pairs. It will store all the pairs.
    //Finally, the value can be extracted using the get() of the object by passing the corresponding name as parameter.

    const { search } = useLocation();
    const urlObject = new URLSearchParams(search);
    const queryEmail = urlObject.get("email");

    const [email, setEmail] = useState(queryEmail || "");
    const [verifyCode, setVerifyCode] = useState("");

    const handleSubmit = () => {
        console.log(email, verifyCode);
    };

    return (
        <div className="loginElements">
            <div className="loginIcon">
                <FontAwesomeIcon icon={faAt} />
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
                    type="number"
                    name="verifyCode"
                    placeholder="Verification Code"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                />
            </div>

            <div className="loginSubmitDiv">
                <Button buttonText={"Verify"} onClickFunction={handleSubmit} />
            </div>
        </div>
    );
};

export default EmailVerification;
