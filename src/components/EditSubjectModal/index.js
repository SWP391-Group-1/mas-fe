import { Button } from '@mui/material'
import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Autocomplete from '@mui/material/Autocomplete'
import { usePatch } from '../../hooks/usePatch.js'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SuiTypography from 'components/SuiTypography/index.js'
import { Box } from '@mui/system'
import { majorApi } from 'apis/majorApis.js'
import { subjectApi } from 'apis/subjectApis.js'
import { useSnackbar } from 'notistack'
import SuiButton from 'components/SuiButton/index.js'

export default function EditSubjectModal({
    subject,
    isOpen,
    onSubmit,
    onCancel,
}) {
    const [newSubject, setNewSubject, patchSubject] = usePatch()
    const [isError, setIsError] = useState(false)
    const [duplicateError, setDuplicateError] = useState(null)
    const isCreateMode = React.useMemo(() => !subject, [subject])
    const [majors, setMajors] = useState([])
    const [major, setMajor] = useState(null)
    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    React.useEffect(() => {
        if (isOpen) {
            setNewSubject(subject)
            fetchData()
        }
    }, [subject, isOpen])

    const handleUpdateClick = () => {
        if (
            newSubject?.code == null ||
            newSubject?.code == '' ||
            newSubject?.title == null ||
            newSubject?.title == '' ||
            newSubject?.description == null ||
            newSubject?.description == ''
        ) {
            setIsError(true)
        } else {
            setIsError(false)
            if (isCreateMode) {
                subjectApi
                    .createSubject(newSubject)
                    ?.then((res) => {
                        handleClickVariant("Create subject successfully!", "success")
                        onSubmit?.() // TODO
                    })
                    .catch((error) => {
                        setDuplicateError(error)
                    })
            } else {
                subjectApi
                    .updateSubject(newSubject.id, newSubject)
                    ?.then((res) => {
                        handleClickVariant("Update subject successfully!", "success")
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

    const fetchData = () => {
        majorApi.getAllMajor().then((res) => {
            setMajors(res.data.content)
            console.log(res.data.content)
            if (res.data.content != null) {
                setMajor(res.data.content[0])
            }
        })

        if (subject != null) {
            subjectApi.getSubjectById(subject.id).then((res) => {
                setMajor(res.data.content.major)
                patchSubject({
                    majorId: res.data.content.major.id ?? '',
                })
            })
        }
    }

    return (
        <Dialog open={isOpen} maxWidth="xl">
            <Box width="600px">
                {isCreateMode ? (
                    <DialogTitle>Add New Subject</DialogTitle>
                ) : (
                    <DialogTitle>Edit Subject</DialogTitle>
                )}
                <DialogContent>
                    {isCreateMode && (
                        <>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="caption"
                                    fontWeight="bold"
                                    isRequired
                                >
                                    Code
                                </SuiTypography>
                            </SuiBox>
                            <SuiInput
                                autoFocus
                                id="codeTextField"
                                type="text"
                                inputProps={{ maxLength: 100 }}
                                value={newSubject?.code}
                                onChange={(e) =>
                                    patchSubject({
                                        code: e?.target?.value ?? '',
                                    })
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
                                    (newSubject?.code == '' ||
                                        newSubject?.code == null)
                                        ? 'Code is required!'
                                        : null}
                                </SuiTypography>
                            </SuiBox>
                        </>
                    )}
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Title
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        id="titleTextField"
                        type="text"
                        value={newSubject?.title}
                        inputProps={{ maxLength: 100 }}
                        onChange={(e) =>
                            patchSubject({ title: e?.target?.value ?? '' })
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
                            (newSubject?.title == '' ||
                                newSubject?.title == null)
                                ? 'Title is required!'
                                : null}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Description
                        </SuiTypography>
<<<<<<< HEAD
                    </SuiBox>
                    
=======
                    </SuiBox>                   
>>>>>>> 8efd21121785739b34fd0cd5a06f53f9e5cc05c7
                    <SuiInput
                        id="descriptionTextField"
                        type="text"
                        rows={5}
                        multiline
                        onChange={(e) =>
                            patchSubject({
                                description: e?.target?.value ?? '',
                            })
                        }
                        name="description"
                        //value={loan.description}
                        value={newSubject?.description}
                    />
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {isError == true &&
                            (newSubject?.description == '' ||
                                newSubject?.description == null)
                                ? 'Description is required!'
                                : null}
                        </SuiTypography>
                    </SuiBox>
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Major Code
                        </SuiTypography>
                    </SuiBox>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        isOptionEqualToValue={(option, value) =>
                            option.id == value.id
                        }
                        options={majors}
                        sx={{ width: 550 }}
                        renderInput={(params) => <TextField {...params} />}
                        onChange={(e, value) => {
                            setMajor(value)
                            patchSubject({
                                majorId: value.id ?? '',
                            })
                        }}
                        value={major}
                        getOptionLabel={(option) => option.code}
                        renderOption={(props, option) => (
                            <Box component="li" {...props} key={option.id}>
                                {option.code} {option.title}
                            </Box>
                        )}
                    /> 
                    <SuiBox>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {duplicateError != null
                                ? 'This subject code or title already existed in the application'
                                : null}
                        </SuiTypography>
                    </SuiBox>
                </DialogContent>
                <DialogActions>
                    {isCreateMode ? (
                        <SuiButton color="success" onClick={handleUpdateClick}>Create</SuiButton>
                    ) : (
                        <SuiButton color="success" onClick={handleUpdateClick}>Update</SuiButton>
                    )}
                    <SuiButton color="info" onClick={handleCancelClick}>Cancel</SuiButton>
                </DialogActions>
            </Box>
        </Dialog>
    )
}
