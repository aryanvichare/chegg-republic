import Modal from "@/components/Modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/icons";
import BlurImage from "../BlurImage";

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className='w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-background/30'>
        <div className='flex flex-col items-center justify-center space-y-3 border-b border-background/70 bg-background px-4 py-6 pt-8 text-center md:px-16'>
          <BlurImage
            src={`/images/chegg-logo.svg`}
            alt={`Chegg Republic Logo`}
            width={50}
            height={32}
            unoptimized
          />
          <h3 className='font-display text-2xl font-bold'>Sign In</h3>
          <p className='text-sm text-gray-500'>
            Log in to your Chegg Republic account. We will never share your
            personal information.
          </p>
        </div>

        <div className='flex flex-col space-y-4 bg-background/80 px-4 py-8 md:px-16'>
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed opacity-70"
                : "border border-gray-800 bg-background text-foreground hover:bg-background/90"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}>
            {signInClicked ? (
              <LoadingDots color='#808080' />
            ) : (
              <>
                <Google className='h-5 w-5' />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  );
}
