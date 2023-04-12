import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method does not supported." });
    }

    const { address, firstName, lastName, email, phoneNumber } = req.body;

    try {
        await firestore.collection("t1").add({
            address: address,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
        }).catch(e => console.log(e));

        console.log('success');
        return res.status(200).json({ message: "Success." });
    } catch (error) {
        console.log('error:', error);
        return res.status(500).json({ error: "Error." });
    }
}
