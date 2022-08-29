import { signInWithPopup, GoogleAuthProvider, getIdToken } from "firebase/auth";
import { auth } from "/lib/firebase";
const provider = new GoogleAuthProvider();

export default function Auth() {
  function handleClick() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        getIdToken(user).then((token) => {
          console.log(token);
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="auth_container">
      <button onClick={handleClick}>Login With Google</button>
    </div>
  );
}
