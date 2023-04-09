import { useState, FormEvent } from "react";
import { firestore } from "../../../firebaseClient";

const Form = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(firestore);

        try {
            await firestore.collection("users").add({
                name: name,
                email: email,
            }).catch(e => console.log(e));
            setName("");
            setEmail("");
            console.log("Success!");
            alert("Success!");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
