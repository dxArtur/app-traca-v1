import React from 'react';
import AppNavigator from '@/app/navigation/StackNavigator';
import { AuthProviderContext } from './app/context/AuthProvider';
import { PublicationsProviderContext } from './app/context/PublicationsProvider';

export default function App () {

return(
    <AuthProviderContext >
        <PublicationsProviderContext>
            <AppNavigator />
        </PublicationsProviderContext>
    </AuthProviderContext>
)
}