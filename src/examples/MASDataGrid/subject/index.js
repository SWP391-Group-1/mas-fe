/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button, IconButton, Menu } from '@mui/material'
import { subjectApi } from 'apis/subjectApis'
import EditSubjectModal from 'components/EditSubjectModal'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import { majorApi } from 'apis/majorApis'
import SuiButton from 'components/SuiButton'

const SubjectDataGrid = () => {
    const [subjects, setSubjects] = useState([])
    const [search, setSearch] = useState([])
    const [editingSubject, setEditingSubject] = useState(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [majors, setMajors] = useState([])
    const [major, setMajor] = useState({ code: 'Select Major' })
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleSubmitSubject = (subject, isCreateMode) => {
        // TODO: Validate data
        if (isCreateMode) {
            subjectApi.createSubject(subject)?.then((res) => {
                fetchData(search, major.id)
                alert('The subject has been created!') // TODO
            })
        } else {
            subjectApi.updateSubject(subject.id, subject)?.then((res) => {
                fetchData(search, major.id)
                alert('The subject has been updated!') // TODO
            })
        }
        setIsOpenEditModal(false)
    }
    const handleUpdateSubjectClick = (subject) => {
        setEditingSubject(subject)
        setIsOpenEditModal(true)
    }
    const handleCreateSubjectClick = (subject) => {
        setEditingSubject(null)
        setIsOpenEditModal(true)
    }

    const handleOnCellClick = (params) => {
        const major = params.row
        setEditingSubject(major)
        setIsOpenEditModal(true)
    }

    const handleDelete = (id) => {
        subjectApi.deleteSubject(id).then((res) => {
            fetchData(search, major.id)
        })
    }

    const fetchData = (data, dataId) => {
        subjectApi.getAllSubject(data, dataId).then((res) => {
            setSubjects(res.data.content)
        })
        getMajorCombobox()
    }

    const getMajorCombobox = () => {
        majorApi.getAllMajor('').then((res) => {
            setMajors(res.data.content)
        })
    }

    useEffect(() => {
        fetchData(search, major.id)
    }, [])

    const renderEditButton = (params) => {
        const subject = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateSubjectClick(subject)}
                >
                    Edit
                </Button>
            </strong>
        )
    }

    const renderDeleteButton = (params) => {
        const major = params.row

        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        handleDelete(major?.id)
                    }}
                >
                    Delete
                </Button>
            </strong>
        )
    }

    const GridToolbar = () => {
        return (
            <SuiBox sx={{ float: 'right' }} mr={1} mt={1}>
                <SuiButton
                    variant="contained"
                    color="dark"
                    size="small"
                    onClick={handleCreateSubjectClick}
                >
                    Add
                </SuiButton>
            </SuiBox>
        )
    }

    const columns = [
        { field: 'code', headerName: 'Subject Code', width: 200 },
        { field: 'title', headerName: 'Title', width: 350 },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 200,
            renderCell: renderEditButton,
            disableClickEventBubbling: true,
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 200,
            renderCell: renderDeleteButton,
            disableClickEventBubbling: true,
        },
    ]

    const handleCancelUpdateSubject = (subject) => {
        setIsOpenEditModal(false)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const onChoose = (item) => {
        setMajor(item)
        setAnchorEl(null)
        if (item != null) {
            fetchData(search, item.id)
        }
    }

    return (
        <>
            <SuiBox mb={2} sx={{ display: 'flex', width: '30%' }}>
                <SuiInput
                    id="searchTextField"
                    type="text"
                    value={search}
                    inputProps={{ maxLength: 100 }}
                    placeholder="Search here..."
                    sx={{ width: '150px' }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <IconButton
                    color="dark"
                    component="span"
                    onClick={() => fetchData(search, major.id)}
                >
                    <SearchIcon />
                </IconButton>
            </SuiBox>

            <SuiBox
                mb={2}
                sx={{
                    display: 'flex',
                    width: '20%',
                }}
            >
                <SuiInput
                    disable
                    placeholder="Major"
                    icon={{
                        component: 'arrow_drop_down',
                        direction: 'right',
                    }}
                    value={major.code}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                />

                <IconButton
                    color="dark"
                    component="span"
                    onClick={() => {
                        setMajor({ code: 'Select Major' })
                        fetchData(search)
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 50 * 4.5,
                            width: '12%',
                        },
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {majors?.map((item) => {
                        return (
                            <MenuItem
                                value={10}
                                key={item.id}
                                onClick={() => onChoose(item)}
                            >
                                {item.code} - {item.title}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </SuiBox>

            <div style={{ height: 750, width: '100%' }}>
                <DataGrid
                    rowHeight={80}
                    rows={subjects}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    rowsPerPageOptions={[10]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onCellClick={(params) => {
                        handleOnCellClick(params)
                    }}
                />
                <EditSubjectModal
                    subject={editingSubject}
                    isOpen={isOpenEditModal}
                    onSubmit={handleSubmitSubject}
                    onCancel={handleCancelUpdateSubject}
                />
            </div>
        </>
    )
}

export default SubjectDataGrid
