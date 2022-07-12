import { Button, Grid, IconButton } from '@mui/material'
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
import Switch from '@mui/material/Switch'
import SuiButton from 'components/SuiButton/index.js'
import { UserApi } from 'apis/userApis.js'
import { bool } from 'prop-types'
import { AccountApi } from 'apis/accountApis.js'
import { useSnackbar } from 'notistack'

export default function ViewAccountDetail({
    account,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newAccount, setNewAccount, patchAccount] = usePatch()
    const [mentorStatus, setMentorStatus] = useState(false)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [reason, setReason] = useState()
    const [reasonError, setReasonError] = useState()
    var updateStatus = false
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    React.useEffect(() => {
        if (isOpen) {
            fetchData()
        }
    }, [account, isOpen])

    const fetchData = () => {
        setNewAccount(account)
        if (account?.isMentor == true) {
            setMentorStatus(true)
        } else {
            setMentorStatus(false)
        }
    }

    const handleUpdateClick = (e) => {
        e.preventDefault()
        onSubmit?.(newAccount)
    }

    const handleCancelClick = () => {
        setIsOpenConfirm(false)
        setReason(null)
        setReasonError(null)
        onCancel?.()
    }

    const handleSaveStatus = () => {
        if (reason == null || reason == '') {
            setReasonError('Reason/Note is required')
        } else {
            UserApi.updateStatusById(newAccount, {
                isActive: !newAccount.isActive,
                note: reason,
            })
            setIsOpenConfirm(false)
            setReason(null)
            setReasonError(null)
            onSubmit(true)
        }
    }

    const changeMentorStatus = () => {
        console.log(mentorStatus)
        AccountApi.processMentorStatus(account.id, {
            isMentor: mentorStatus,
        }).then((res) => {
            setIsOpenConfirm(false)
            setReason(null)
            setReasonError(null)
            onSubmit(true)
            //fetchData()
            if (mentorStatus == true) {
                handleClickVariant('Accept mentor request successfully', 'success')
            } else {
                handleClickVariant(
                    'You have turned the mentor status back to Student',
                    'info'
                )
            }
        }).catch((err) => {
            //console.log(err.response.data.error.message)
            handleClickVariant(err.response.data.error.message, 'error')
        })
    }

    return (
        <>
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
                        {/* <SuiInput
                            disabled
                            id="introduceTextField"
                            type="text"
                            value={newAccount?.introduce}
                            inputProps={{ maxLength: 1000 }}
                        /> */}
                        <SuiInput
                            disabled
                            id="descriptionTextField"
                            type="text"
                            rows={5}
                            multiline
                            //value={loan.description}
                            value={newAccount?.introduce}
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
                        <Grid container>
                            <Grid item xs={6}>
                                <SuiBox>
                                    <SuiTypography
                                        component="label"
                                        variant="caption"
                                        fontWeight="bold"
                                    >
                                        Mentor Status
                                    </SuiTypography>
                                </SuiBox>

                                <Switch
                                    disabled={false}
                                    checked={Boolean(mentorStatus)}
                                    onChange={(e) => {
                                        
                                        setMentorStatus(
                                            Boolean(e.target?.checked)
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SuiBox>
                                    <SuiTypography
                                        component="label"
                                        variant="caption"
                                        fontWeight="bold"
                                    >
                                        Status
                                    </SuiTypography>
                                </SuiBox>
                                {newAccount?.isActive ? (
                                    <SuiBox>
                                        <SuiTypography
                                            component="label"
                                            variant="caption"
                                            fontWeight="bold"
                                            color="success"
                                        >
                                            Active
                                        </SuiTypography>
                                    </SuiBox>
                                ) : (
                                    <SuiBox>
                                        <SuiTypography
                                            component="label"
                                            variant="caption"
                                            fontWeight="bold"
                                            color="error"
                                        >
                                            Inactive
                                        </SuiTypography>
                                    </SuiBox>
                                )}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <SuiButton
                            color="info"
                            onClick={() => changeMentorStatus()}
                        >
                            Save
                        </SuiButton>
                        {newAccount?.isActive ? (
                            <SuiButton
                                color="error"
                                onClick={() => setIsOpenConfirm(true)}
                            >
                                Ban
                            </SuiButton>
                        ) : (
                            <SuiButton
                                color="success"
                                onClick={() => setIsOpenConfirm(true)}
                            >
                                Unban
                            </SuiButton>
                        )}
                    </DialogActions>
                </Box>
            </Dialog>
            <Dialog open={isOpenConfirm} maxWidth="l">
                <SuiBox p={3}>
                    <SuiBox>
                        <DialogTitle>
                            {newAccount?.isActive
                                ? 'Are your sure you want to permanently disable this user?'
                                : 'Are your sure you want to permanently active this user?'}
                        </DialogTitle>
                    </SuiBox>
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Reason/Note
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="reasonTextField"
                        type="text"
                        value={reason}
                        inputProps={{ maxLength: 1000 }}
                        onChange={(e) => {
                            setReason(e.target.value)
                        }}
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {reasonError}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox mt={2} display="flex" justifyContent="flex-end">
                        <SuiButton
                            sx={{ marginRight: 5 }}
                            color="info"
                            onClick={() => handleSaveStatus()}
                        >
                            Save
                        </SuiButton>
                        <SuiButton onClick={() => setIsOpenConfirm(false)}>
                            Cancel
                        </SuiButton>
                    </SuiBox>
                </SuiBox>
            </Dialog>
        </>
    )
}
