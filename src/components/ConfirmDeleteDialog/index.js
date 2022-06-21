import { Dialog, DialogTitle } from '@mui/material'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import React from 'react'

export default function ConfirmDeleteDialog({
    title,
    isOpen,
    onCancel,
    onDelete,
}) {
    return (
        <Dialog open={isOpen} maxWidth="l">
            <SuiBox p={3}>
                <SuiBox>
                    <DialogTitle>{title}</DialogTitle>
                </SuiBox>
                <SuiBox mt={2} display="flex" justifyContent="flex-end">
                    <SuiButton
                        sx={{ marginRight: 5 }}
                        color="info"
                        onClick={() => onDelete?.()}
                    >
                        Delete
                    </SuiButton>
                    <SuiButton onClick={() => onCancel?.()}>
                        Cancel
                    </SuiButton>
                </SuiBox>
            </SuiBox>
        </Dialog>
    )
}
