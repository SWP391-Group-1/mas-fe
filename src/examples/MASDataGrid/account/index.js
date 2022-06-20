/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { UserApi } from 'apis/userApis'
import { Button, IconButton } from '@mui/material'
import SuiBox from 'components/SuiBox'
import SuiInput from 'components/SuiInput'
import SearchIcon from '@mui/icons-material/Search'
import ViewAccountDetail from 'components/DetailUserModal'

const AccountDataGrid = () => {
    const [accounts, setAccounts] = useState([])
    const [isChange, setIsChange] = useState(null)
    const [search, setSearch] = useState([])
    const [isOpenDetail, setIsOpenDetail] = useState(false)
    const [editingAccount, setEditingAccount] = useState(null)

    const renderViewDetailButton = (params) => {
        const account = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleUpdateAccountClick(account)}
                >
                    View Detail
                </Button>
            </strong>
        )
    }

    const handleUpdateAccountClick = (account) => {
        console.log('Open cho tao')
        setEditingAccount(account)
        setIsOpenDetail(true)
    }

    const handleOnCellClick = (params) => {
        const account = params.row
        setEditingAccount(account)
        setIsOpenDetail(true)
    }

    const handleCancelUpdateAccount = () => {
        setIsOpenDetail(false)
    }

    const fetchData = () => {
        UserApi.getAllUser(search).then((res) => {
            setAccounts(res.data.content)
        })
    }

    // const deleteAccount = () => {
    //     setIsChange()
    // }

    useEffect(() => {
        fetchData()
    }, [isChange])

    const columns = [
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'isActive',
            headerName: 'Active',
            width: 200,
        },
        {
            field: 'rate',
            headerName: 'Rate',
            width: 150,
        },
        {
            field: 'isMentor',
            headerName: 'Mentor Status',
            width: 200,
            valueGetter: (params) =>
                params.row.isMentor == null ? 'Normal User' : 'Mentor',
        },
        {
            field: 'detail',
            headerName: 'Details',
            width: 200,
            renderCell: renderViewDetailButton,
            disableClickEventBubbling: true,
        },
    ]

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
                    onClick={() => fetchData(search)}
                >
                    <SearchIcon />
                </IconButton>
            </SuiBox>

            <div style={{ height: 450, width: '100%' }}>
                <DataGrid
                    rowHeight={80}
                    rows={accounts}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    rowsPerPageOptions={[10]}
                    onCellClick={(params) => {
                        handleOnCellClick(params)
                    }}
                />

                <ViewAccountDetail
                    account={editingAccount}
                    isOpen={isOpenDetail}
                    onSubmit={handleUpdateAccountClick}
                    onCancel={handleCancelUpdateAccount}
                />
            </div>
        </>
    )
}

export default AccountDataGrid
