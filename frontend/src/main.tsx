import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = "pk_test_cHJvLW1hbW1vdGgtNzQuY2xlcmsuYWNjb3VudHMuZGV2JA"

if(!PUBLISHABLE_KEY){
  throw new Error("VITE_CLERK_PUBLISHABLE_KEY is not defined")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
    <App />
    </ClerkProvider>
  </StrictMode>,
)
