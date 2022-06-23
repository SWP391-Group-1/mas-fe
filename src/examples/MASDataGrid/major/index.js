import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { majorApi } from 'apis/majorApis'
import { Alert, Button, Dialog, DialogTitle, IconButton } from '@mui/material'
import EditMajorModal from 'components/EditMajorModal'
import SuiInput from 'components/SuiInput/index.js'
import SuiBox from 'components/SuiBox/index.js'
import SearchIcon from '@mui/icons-material/Search'
import SuiButton from 'components/SuiButton'
import ConfirmDeleteDialog from 'components/ConfirmDeleteDialog'
import { SnackbarProvider, useSnackbar } from 'notistack'

const MajorDataGrid = () => {
    const [majors, setMajors] = useState([])
    const [search, setSearch] = useState([])
    const [editingMajor, setEditingMajor] = useState(null)
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const { enqueueSnackbar, } = useSnackbar()

    const handleUpdateMajorClick = (major) => {
        setEditingMajor(major)
        setIsOpenEditModal(true)
    }
    const handleCreateMajorClick = (major) => {
        setEditingMajor(null)
        setIsOpenEditModal(true)
    }

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    const handleSubmitMajor = () => {
        setIsOpenEditModal(false)
        fetchData(search)
    }

    const handleCancelUpdateMajor = (major) => {
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

    const handleDelete = () => {
        console.log(editingMajor)
        majorApi
            .deleteMajor(editingMajor.id)
            .then((res) => {
                setIsOpenConfirm(false)
                handleClickVariant("Delete major successfully!", "success")
                fetchData(search)
            })
            .catch((err) => {
                console.log(err)
                //alert(err)
                handleClickVariant(err, "error")
            })
    }

    const handleCancelConfirmDialog = () => {
        setIsOpenConfirm(false)
    }

    useEffect(() => {
        fetchData(search)
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
                        setEditingMajor(major)
                        setIsOpenConfirm(true)
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
                        color="dark"
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
            <SnackbarProvider>
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
                        // onCellClick={(params) => {
                        //     handleOnCellClick(params)
                        // }}
                    />
                    <EditMajorModal
                        major={editingMajor}
                        isOpen={isOpenEditModal}
                        onSubmit={handleSubmitMajor}
                        onCancel={handleCancelUpdateMajor}
                    />
                    <ConfirmDeleteDialog
                        title="Are you sure you want to delete this major?"
                        isOpen={isOpenConfirm}
                        onCancel={handleCancelConfirmDialog}
                        onDelete={handleDelete}
                    />
                </div>
            </SnackbarProvider>
        </>
    )
}

export default MajorDataGrid
