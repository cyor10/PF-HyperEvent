'use client'
import { Provider } from "react-redux"
import { store } from './store'
import { sessionProvider } from "next-auth/react";
export function Providers({children}) {
    return (
        <sessionProvider session={session}>
            <Provider store={store}>
                {children}
            </Provider>
        </sessionProvider>
    )
}
