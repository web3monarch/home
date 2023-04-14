import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "../../../firebaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { address } = req.body;

    // read data fro firestore by address
    const querySnapshot = await firestore.collection("tier1").where('address', '==', address).get();

    if (querySnapshot.empty) {
        return res.status(404).json({ error: "No matching documents." });
    }

    const data = querySnapshot.docs[0].data();
    return res.status(200).json(data);

    // if (req.method !== "POST") {
    //     return res.status(405).json({ error: "Method does not supported." });
    // }



    // try {
    //     await firestore.collection("tier1").add({
    //         address: address,
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         phoneNumber: phoneNumber,
    //     }).catch(e => console.log(e));

    //     console.log('success');
    //     return res.status(200).json({ message: "Success." });
    // } catch (error) {
    //     console.log('error:', error);
    //     return res.status(500).json({ error: "Error." });
    // }
}
