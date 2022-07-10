import { Card, Grid, Rating } from '@mui/material'
import { ratingApi } from 'apis/ratingApis'
import { UserApi } from 'apis/userApis'
import SuiBox from 'components/SuiBox'
import SuiButton from 'components/SuiButton'
import SuiInput from 'components/SuiInput'
import SuiTypography from 'components/SuiTypography'
import MentorInfoCard from 'examples/Cards/InfoCards/MentorInforCard'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
export default function RatingRequestDetail() {
    const location = useLocation()
    const requestId = location.state?.requestId || null
    const [requestDetail, setRequestDetail] = useState()
    const [creator, setCreator] = useState()
    const [mentor, setMentor] = useState()

    const { enqueueSnackbar } = useSnackbar()

    const handleClickVariant = (title, varientType) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(title, {
            variant: varientType,
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleApproveOrDenyRequest = (decision) => {
        ratingApi
            .processRating(requestId, {
                isApprove: decision,
            })
            .then((res) => {
                fetchData()
                if (decision == true) {
                    handleClickVariant('Accept rating successfully!', 'success')
                } else {
                    handleClickVariant(
                        'You have denied the rating request!',
                        'info'
                    )
                }
            })
            .catch((err) => {
                console.log(err.response.data.error.message)
                handleClickVariant(err.response.data.error.message, 'error')
            })
    }

    const renderStatus = () => {
        if (requestDetail?.isApprove == null) {
            return (
                <SuiTypography
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    color="info"
                >
                    Not approved yet
                </SuiTypography>
            )
        } else {
            if (requestDetail?.isApprove == true) {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="success"
                    >
                        Approved
                    </SuiTypography>
                )
            } else {
                return (
                    <SuiTypography
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        color="error"
                    >
                        Denied
                    </SuiTypography>
                )
            }
        }
    }

    const fetchData = () => {
        ratingApi.getRatingById(requestId).then((res) => {
            setRequestDetail(res.data.content)
            console.log(res.data.content.isApprove, 'abc')
            console.log(res.data.content.vote)
            UserApi.getAccountById(res.data.content.creatorId).then(
                (resCreator) => {
                    setCreator(resCreator.data.content)
                }
            )
            UserApi.getAccountById(res.data.content.mentorId).then(
                (resMentor) => {
                    setMentor(resMentor.data.content)
                }
            )
        })
    }
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox mt={7} mb={3}>
                
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                backdropFilter: `saturate(200%) blur(30px)`,
                                backgroundColor: ({
                                    functions: { rgba },
                                    palette: { white },
                                }) => rgba(white.main, 0.8),
                                boxShadow: ({
                                    boxShadows: { navbarBoxShadow },
                                }) => navbarBoxShadow,
                                position: 'relative',
                                mt: -8,
                                py: 2,
                                px: 2,
                            }}
                        >
                            <SuiBox>{renderStatus()}</SuiBox>
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Creator Profile
                                </SuiTypography>
                            </SuiBox>
                            <MentorInfoCard
                                title="profile information"
                                description={creator?.introduce}
                                info={{
                                    Name: creator?.name,
                                    Email: creator?.email,
                                }}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                backdropFilter: `saturate(200%) blur(30px)`,
                                backgroundColor: ({
                                    functions: { rgba },
                                    palette: { white },
                                }) => rgba(white.main, 0.8),
                                boxShadow: ({
                                    boxShadows: { navbarBoxShadow },
                                }) => navbarBoxShadow,
                                position: 'relative',
                                mt: -8,
                                py: 2,
                                px: 2,
                            }}
                        >
                            <SuiBox>
                                <SuiTypography
                                    component="label"
                                    variant="button"
                                    fontWeight="bold"
                                    alignItems="center"
                                >
                                    Mentor Profile
                                </SuiTypography>
                            </SuiBox>
                            <MentorInfoCard
                                title="profile information"
                                description={mentor?.introduce}
                                info={{
                                    Name: mentor?.name,
                                    Email: mentor?.email,
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>

                <Card
                    sx={{
                        backdropFilter: `saturate(200%) blur(30px)`,
                        backgroundColor: ({
                            functions: { rgba },
                            palette: { white },
                        }) => rgba(white.main, 0.8),
                        boxShadow: ({ boxShadows: { navbarBoxShadow } }) =>
                            navbarBoxShadow,
                        position: 'relative',
                        mt: 1,
                        py: 2,
                        px: 2,
                    }}
                >
                    <SuiBox>
                        <SuiTypography variant="button">
                            {creator?.name} ({creator?.email})
                        </SuiTypography>
                        <SuiBox>
                            <Rating
                                name="read-only"
                                value={requestDetail?.vote}
                                size="small"
                                readOnly
                            />
                        </SuiBox>

                        <SuiInput
                            mb={1}
                            sx={{ style: 'border:none', mb: 1 }}
                            disable
                            rows={2}
                            multiline
                            value={requestDetail?.comment}
                        />
                    </SuiBox>

                    {requestDetail?.isApprove == null && (
                        <SuiBox
                            mt={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <SuiButton
                                sx={{ mr: '10px' }}
                                color="success"
                                onClick={() => {
                                    handleApproveOrDenyRequest(true)
                                }}
                            >
                                Approve
                            </SuiButton>
                            <SuiButton
                                color="dark"
                                onClick={() => {
                                    handleApproveOrDenyRequest(false)
                                }}
                            >
                                Deny
                            </SuiButton>
                        </SuiBox>
                    )}
                </Card>
            </SuiBox>
        </DashboardLayout>
    )
}
