import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Button, IconButton } from '@mui/material'
import EditMajorModal from 'components/EditMajorModal'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SearchIcon from '@mui/icons-material/Search'

const MajorDataGrid = () => {
    const [majors, setMajors] = useState([])
    const [search, setSearch] = useState([])
    const [editingMajor, setEditingMajor] = useState(null)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)

    const handleUpdateMajorClick = (major) => {
        setEditingMajor(major)
        setIsOpenEditModal(true)
    }
    const handleCreateMajorClick = (major) => {
        setEditingMajor(null)
        setIsOpenEditModal(true)
    }

    const handleOnCellClick = (params) => {
        const major = params.row
        setEditingMajor(major)
        setIsOpenEditModal(true)
    }

    const handleSubmitMajor = (major, isCreateMode) => {
        // TODO: Validate data
        if (isCreateMode) {
            majorApi.createMajor(major)?.then((res) => {
                fetchData()
                alert('The major has been created!') // TODO
            })
        } else {
            majorApi.updateMajor(major.id, major)?.then((res) => {
                fetchData()
                alert('The major has been updated!') // TODO
            })
        }
        setIsOpenEditModal(false)
    }

    const handleCancelUpdateMajor = (major) => {
        // TODO: Are you sure meow moew
        setIsOpenEditModal(false)
    }

    const fetchData = (data) => {
        if (data == null) {
            data = ''
        }
        majorApi.getAllMajor(data).then((res) => {
            setMajors(res.data.content)
        })
    }

    const handleDelete = (id) => {
        console.log(id)
        majorApi
            .deleteMajor(id)
            .then((res) => {
                fetchData()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderEditButton = (params) => {
        const major = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateMajorClick(major)}
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

    const columns = [
        { field: 'code', headerName: 'Code', width: 200 },
        { field: 'title', headerName: 'Major Title', width: 400 },
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

    const GridToolbar = () => {
        return (
            <>
                <SuiBox sx={{ float: 'right' }} mr={1} mt={1}>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleCreateMajorClick}
                    >
                        Add
                    </Button>
                </SuiBox>
            </>
        )
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
                    onClick={() => fetchData(search, 1)}
                >
                    <SearchIcon />
                </IconButton>
            </SuiBox>

            <div style={{ height: 750, width: '100%' }}>
                <DataGrid
                    rowHeight={60}
                    rows={majors}
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
                <EditMajorModal
                    major={editingMajor}
                    isOpen={isOpenEditModal}
                    onSubmit={handleSubmitMajor}
                    onCancel={handleCancelUpdateMajor}
                />
            </div>
        </>
    )
}

export default MajorDataGrid
