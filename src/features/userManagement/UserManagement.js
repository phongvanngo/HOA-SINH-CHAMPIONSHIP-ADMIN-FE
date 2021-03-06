import React from 'react'
import MainContainer from './Views/MainContainer';
import UserFormDialog from './Views/UserFormDialog';

export default function UserManagement() {
    return (
        <div>
            <UserFormDialog />
            <MainContainer />
        </div>
    )
}
