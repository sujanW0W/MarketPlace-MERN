import React from "react";
import "../assets/styles/footer.css";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faTwitter,
    faInstagram,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer>
            <section className="footerContent">
                <div className="footerBanner">
                    <h1>MarketPlace</h1>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Unde, fugiat? Explicabo exercitationem et
                        repellendus optio est aspernatur molestias fugit?
                        Officia voluptatibus hic eos sint voluptates error.
                        Placeat saepe in nulla!
                    </p>
                </div>
                <div className="footerLinks">
                    <div>
                        <h3>Company</h3>
                        <p>About Us</p>

                        <p>Privacy Policy</p>
                    </div>
                    <div>
                        <h3>Customer Support</h3>
                        <p>Contact Us</p>
                        <p>My Account</p>
                        <p>Store Locator</p>
                    </div>
                    <div>
                        <h3>More To Explore</h3>
                        <p>Carrer</p>
                        <p>Offers</p>
                    </div>
                </div>
            </section>

            <section className="newsletterSection">
                <div className="emailDiv">
                    <input
                        type="email"
                        id="email"
                        placeholder="someone@abc.com"
                    />
                    <Button buttonText={"Subscribe"} />
                </div>
                <div className="socials">
                    <a
                        href="https://linkedin.com"
                        title="linkedin"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                        href="https://facebook.com"
                        title="facebook"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a
                        href="https://instagram.com"
                        title="instagram"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a
                        href="https://twitter.com"
                        title="twitter"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                </div>
            </section>

            <hr />

            <section className="copyrightSection">
                Copyright <span>&#169;</span> 2022. All Rights Reserved.
            </section>
        </footer>
    );
};

export default Footer;
