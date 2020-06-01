var functionURL = 'https://us-central1-gcdeveloper.cloudfunctions.net/mytestfunction';

const {GoogleAuth} = require('google-auth-library');

async function main() {
    // Define your URL, here with Cloud Run but the security is exactly the same with Cloud Functions (same underlying infrastructure)
    const url = functionURL;
    // Here I use the default credential, not an explicit key like you
    const auth = new GoogleAuth();
    //Example with the key file, not recommended on GCP environment.
    //const auth = new GoogleAuth({keyFilename:"/path/to/key.json"})

    //Create your client with an Identity token.
    const client = await auth.getIdTokenClient(url);
    var message = JSON.stringify({name: 'Kamal'});
    const res = await client.request({url: url, params:{message: message}});
    console.log(res.data);
}

main().catch(console.error);