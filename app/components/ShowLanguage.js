import { useState } from "react";

function ShowLanguage() {
    const [language, setLanguage] = useState("fr-FR");
    return (
        <>
            <div></div>
            <section>
                <h1>Your language is {language}!</h1>
                <button onClick={() => setLanguage(navigator.language)}>Detect language</button>
                <button onClick={() => setLanguage(language)}>Je préfère le Français</button>{/* Non compliant: This button does nothing */}
            </section>
        </>
    );
};

export default ShowLanguage;