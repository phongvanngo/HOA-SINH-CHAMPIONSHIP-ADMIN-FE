import React from 'react';
import ListUniversity from './View/UniversityList';
import UniversityFormDialog from './View/UniversityFormDialog';

export default function UniversityManagement() {
    return (
        <div>
            <UniversityFormDialog />
            <ListUniversity />
        </div>
    )
}
