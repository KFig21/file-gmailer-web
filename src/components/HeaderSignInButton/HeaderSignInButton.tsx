import './styles.scss';

type Props = {
  login: () => void;
  accessToken: string | null;
};

export default function HeaderSignInButton({ login, accessToken }: Props) {
  return (
    <div className={`sign-in-button-container`}>
      <button className={`sign-in-button ${accessToken && 'has-token'}`} onClick={() => login()}>
        {accessToken ? 'Switch account' : 'Sign in with Google'}
      </button>
    </div>
  );
}
