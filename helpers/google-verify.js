const { OAuth2Client } = require('google-auth-library');
//viene de los env.( GOOGLE_SECRET )
const client = new OAuth2Client(process.env.GOOGLE_SECRET);


async function googleVerify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        //viene de los env.( GOOGLE_ID )
        audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    //console.log(payload);
    return payload;
}
//googleVerify().catch(console.error);//no poner esto

module.exports = {
    googleVerify
}