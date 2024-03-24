import { PrivyProvider } from '@privy-io/react-auth'
import { usePrivy } from '@privy-io/react-auth';

const IdentityProvider = (props: {children: React.ReactNode}) => {
  return (
    <PrivyProvider
      appId={`${import.meta.env.PUBLIC_PRIVY_APP_ID}`}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {props.children}
    </PrivyProvider>
  )
}


const ButtonAuthentication = () => {
  const {ready, authenticated, login, logout, user} = usePrivy();
  const disableInteractions= !ready 
  return (
    <button className="aria-[disabled=true]:opacity-75 bg-violet-600 hover:bg-violet-500 focus:bg-violet-700 w-fit py-[0.25em] px-[1em] font-bold rounded-full text-neutral-50" aria-disabled={disableInteractions} onClick={!authenticated ? login : logout}>
      {!authenticated || !user ? <>Login to unlock more features</> : <>
        {user?.farcaster?.username ?? user?.email?.address ?? user?.wallet?.address }
      </>}
    </button>
  );
}

export const Wallet = () => {
    return <IdentityProvider>
        <ButtonAuthentication />
    </IdentityProvider>
}
