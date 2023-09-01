'use client'
import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from './store'

export function Providers({children,session}) {
    return (
        <Provider store={store}>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </Provider>
    )
}
