import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // console.log('FIREBASE_PROJECT_ID', process.env.FIREBASE_PROJECT_ID);
    // console.log('firestore:');
    // console.log(firestore);

    // if (req.method !== "POST") {
    //     return res.status(405).json({ error: "Method does not supported." });
    // }

    // const { name, email } = req.body;

    // try {
    //     await firestore.collection("users").add({
    //         name: name,
    //         email: email,
    //     });

    //     return res.status(200).json({ message: "Submitted to Firestore: success." });
    // } catch (error) {
    //     return res.status(500).json({ error: "Error submitting data to Firestore." });
    // }

    await firestore.collection("users").add({
        name: `Hello ${Date.now()}`,
        email: 'test@example.com',
    });

    res.status(200).json({ message: "Submitted to Firestore: success." });
}

