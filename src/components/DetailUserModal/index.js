import { Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SuiTypography from 'components/SuiTypography/index.js'
import { Box } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'

export default function ViewAccountDetail({
    account,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newAccount, setNewAccount, patchAccount] = usePatch()
    // const [isActiveStatus, setIsActiveStatus] = useState()
    //const isCreateMode = React.useMemo(() => !major, [major])

    React.useEffect(() => {
        if (isOpen) {
            setNewAccount(account)
        }
    }, [account, isOpen])

    const handleUpdateClick = (e) => {
        e.preventDefault()
        onSubmit?.(newAccount)
    }

    const handleCancelClick = () => {
        onCancel?.()
    }

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <Box width="600px">
                <SuiBox display="flex" justifyContent="flex-end">
                    <IconButton
                        color="dark"
                        component="span"
                        onClick={handleCancelClick}
                    >
                        <CloseIcon />
                    </IconButton>
                </SuiBox>
                <DialogTitle>Account Details</DialogTitle>
                <DialogContent>
                    {
                        <>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Name
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput
                                disabled
                                autoFocus
                                id="nameTextField"
                                type="text"
                                required={true}
                                value={newAccount?.name}
                                inputProps={{ maxLength: 100 }}
                            />
                        </>
                    }
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Email
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        disabled
                        id="emailTextField"
                        label="Email"
                        type="text"
                        value={newAccount?.email}
                        required={true}
                        inputProps={{ maxLength: 100 }}
                    />

                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Introduce
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        disabled
                        id="introduceTextField"
                        type="text"
                        value={newAccount?.introduce}
                        inputProps={{ maxLength: 1000 }}
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Rate
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        disabled
                        id="rateTextField"
                        type="number"
                        value={newAccount?.rate}
                        inputProps={{ maxLength: 4 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => handleUpdateClick}>Submit</Button>
                    {/* {account.isActive ? (
                        <Button onClick={()=> handleBan(!account.isActive)}>Ban</Button>
                    ) : (
                        <Button>Unban</Button>
                    )} */}

                    <Button >
                        {account.isActive ? 'Ban' : 'UnBan'}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
