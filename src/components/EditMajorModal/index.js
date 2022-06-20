import { Button } from '@mui/material'
import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { usePatch } from '../../hooks/usePatch.js'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SuiTypography from 'components/SuiTypography/index.js'
import { Box } from '@mui/system'

export default function EditMajorModal({ major, isOpen, onSubmit, onCancel }) {
    const [newMajor, setNewMajor, patchMajor] = usePatch()
    const isCreateMode = React.useMemo(() => !major, [major])

    React.useEffect(() => {
        if (isOpen) setNewMajor(major)
    }, [major, isOpen])

    const handleUpdateClick = () => {
        onSubmit?.(newMajor, isCreateMode)
    }

    const handleCancelClick = () => {
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
                    {isCreateMode && (
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
                        </>
                    )}
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
