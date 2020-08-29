import React from 'react';
import {Link} from "react-router-dom";

export default function Imprint() {
    return (
        <React.Fragment>
            <h3><Link to="/">Zurück</Link></h3>
            <p>
                1. Three must-haves: Copyright, Privacy Policy, and Terms of Use

                These three sections of content are essential for any website. They are necessary for legal protection.

                Copyright: The year and the copyright symbol will protect your website from plagiarism.

                Privacy Policy: Explains how you will use and protect your visitors’ personal data and other
                information.

                Terms of Use: Offers general rules and guidelines governing the use of the site and/or products.
            </p>
        </React.Fragment>
    );
}