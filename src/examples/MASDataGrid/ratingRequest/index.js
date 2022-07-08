import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { ratingApi } from 'apis/ratingApis'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RatingRequestDataGrid() {
    const [ratingRequests, setRatingRequests] = useState([])
    const [request, setRequest] = useState()
    let navigate = useNavigate()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        ratingApi.getAllUnapprovedRating().then((res) => {
            setRatingRequests(res.data.content)
        })
    }

    const renderViewButton = (params) => {
        const rating = params.row
        return (
            <strong>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => {
                        navigate('/ratingrequest/ratingrequestdetail', {
                            state: { requestId: rating.id },
                        })
                    }}
                >
                    View Detail
                </Button>
            </strong>
        )
    }

    const columns = [
        { field: 'creatorName', headerName: 'Creator Name', width: 200 },
        { field: 'creatorMail', headerName: 'Creator Email', width: 400 },
        { field: 'vote', headerName: 'Vote', width: 100 },
        {
            field: 'view',
            headerName: 'View Detail',
            width: 200,
            renderCell: renderViewButton,
            disableClickEventBubbling: true,
        },
    ]

    return (
        <div style={{ height: 750, width: '100%' }}>
            <DataGrid
                rowHeight={60}
                rows={ratingRequests}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                rowsPerPageOptions={[10]}
            />
        </div>
    )
}
