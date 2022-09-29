import { FirebaseError } from '@firebase/util';
import { getIdToken, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from 'lib/firebase';
import { MouseEvent } from 'react';

const provider = new GoogleAuthProvider();

export default function Auth() {
  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      let result = await signInWithPopup(auth, provider);
      const user = result.user;
      let token = await getIdToken(user);
      console.log(token);
    } catch (error) {
      console.error(error);
      // Handle Errors here.
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData!.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      }
    }
  };

  return (
    <div className="auth_container">
      <button onClick={handleClick}>Login With Google</button>
    </div>
  );
}
