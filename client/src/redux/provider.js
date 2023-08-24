'use client'
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from './store'

export function Providers({children}) {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
            </SessionProvider>
        </Provider>
    )
}