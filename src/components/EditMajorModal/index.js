import { Button } from '@mui/material'
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
import { majorApi } from 'apis/majorApis.js'
import { useSnackbar } from 'notistack'

export default function EditMajorModal({ major, isOpen, onSubmit, onCancel }) {
    const [newMajor, setNewMajor, patchMajor] = usePatch()
    const [isError, setIsError] = useState(false)
    const [duplicateError, setDuplicateError] = useState(null)
    const isCreateMode = React.useMemo(() => !major, [major])
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    React.useEffect(() => {
        if (isOpen) setNewMajor(major)
    }, [major, isOpen])

    const handleUpdateClick = () => {
        if (
            newMajor?.code == null ||
            newMajor?.code == '' ||
            newMajor?.title == null ||
            newMajor?.title == '' ||
            newMajor?.description == null ||
            newMajor?.description == ''
        ) {
            setIsError(true)
        } else {
            setIsError(false)
            if (isCreateMode) {
                majorApi
                    .createMajor(newMajor)
                    ?.then((res) => {
                        handleClickVariant("Create major successfully!", "success")
                        onSubmit?.() // TODO
                    })
                    .catch((error) => {
                        setDuplicateError(error)
                    })
            } else {
                majorApi
                    .updateMajor(newMajor.id, newMajor)
                    ?.then((res) => {
                        //alert('The major has been updated!')
                        handleClickVariant("Update major successfully!", "success")
                        onSubmit?.() // TODO
                    })
                    .catch((error) => {
                        setDuplicateError(error)
                    })
            }
        }
    }

    const handleCancelClick = () => {
        setIsError(false)
        setDuplicateError(null)
        onCancel?.()
    }

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <Box width="600px">
                {isCreateMode ? (
                    <DialogTitle>Add New Major</DialogTitle>
                ) : (
                    <DialogTitle>Edit Major</DialogTitle>
                )}

                <DialogContent>
                    {
                        <>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                >
                                    Code
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput
                                autoFocus
                                id="codeTextField"
                                type="text"
                                required={true}
                                value={newMajor?.code}
                                inputProps={{ maxLength: 5 }}
                                onChange={(e) =>
                                    patchMajor({ code: e?.target?.value ?? '' })
                                }
                            />
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                    color="error"
                                >
                                    {isError == true &&
                                    (newMajor?.code == '' ||
                                        newMajor?.code == null)
                                        ? 'Code is required!'
                                        : null}
                                </SuiTypography>
                            </SuiBox>
                        </>
                    }
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Title
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="titleTextField"
                        label="Title"
                        type="text"
                        value={newMajor?.title}
                        required={true}
                        inputProps={{ maxLength: 100 }}
                        onChange={(e) =>
                            patchMajor({ title: e?.target?.value ?? '' })
                        }
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {isError == true &&
                            (newMajor?.title == '' || newMajor?.title == null)
                                ? 'Title is required!'
                                : null}
                        </SuiTypography>
                    </SuiBox>

                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                        >
                            Description
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="descriptionTextField"
                        type="text"
                        value={newMajor?.description}
                        inputProps={{ maxLength: 100 }}
                        required={true}
                        onChange={(e) =>
                            patchMajor({ description: e?.target?.value ?? '' })
                        }
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {isError == true &&
                            (newMajor?.description == '' ||
                                newMajor?.description == null)
                                ? 'Description is required!'
                                : null}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {duplicateError != null
                                ? 'This major code or title already existed in the application'
                                : null}
                        </SuiTypography>
                    </SuiBox>
                </DialogContent>
                <DialogActions>
                    {isCreateMode ? (
                        <Button onClick={handleUpdateClick}>Create</Button>
                    ) : (
                        <Button onClick={handleUpdateClick}>Update</Button>
                    )}
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
