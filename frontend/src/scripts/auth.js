import GoogleLogin, { useGoogleLogin } from "react-google-login";

const clientID = "176915472690-fd1ks98ttrnl59a3rdnss0btptobr463.apps.googleusercontent.com";

function login(){

    const onSuccess = (res) => {
        console.log("Login success current user : ", res.profileObj);
    }

    const onFailure = (res) => {
        console.log("Login failed res: ", res );
    }

    return(
        <div id ="signInBuntton">
            <GoogleLogin
            clientId={clientID}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}>

            </GoogleLogin>
        </div>
    )
}

export default login