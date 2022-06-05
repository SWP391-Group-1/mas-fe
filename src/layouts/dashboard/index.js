// @mui material components
import Grid from '@mui/material/Grid'
import Icon from '@mui/material/Icon'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import MiniStatisticsCard from 'examples/Cards/StatisticsCards/MiniStatisticsCard'
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart'
import GradientLineChart from 'examples/Charts/LineCharts/GradientLineChart'

// Soft UI Dashboard React base styles
import typography from 'assets/theme/base/typography'

// Data
import reportsBarChartData from 'layouts/dashboard/data/reportsBarChartData'
import gradientLineChartData from 'layouts/dashboard/data/gradientLineChartData'

function Dashboard() {
    const { size } = typography
    const { chart, items } = reportsBarChartData

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <SuiBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} xl={3}>
                            <MiniStatisticsCard
                                title={{ text: "today's money" }}
                                count="$53,000"
                                percentage={{ color: 'success', text: '+55%' }}
                                icon={{ color: 'info', component: 'paid' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} xl={3}>
                            <MiniStatisticsCard
                                title={{ text: "today's users" }}
                                count="2,300"
                                percentage={{ color: 'success', text: '+3%' }}
                                icon={{ color: 'info', component: 'public' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} xl={3}>
                            <MiniStatisticsCard
                                title={{ text: 'new clients' }}
                                count="+3,462"
                                percentage={{ color: 'error', text: '-2%' }}
                                icon={{
                                    color: 'info',
                                    component: 'emoji_events',
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} xl={3}>
                            <MiniStatisticsCard
                                title={{ text: 'sales' }}
                                count="$103,430"
                                percentage={{ color: 'success', text: '+5%' }}
                                icon={{
                                    color: 'info',
                                    component: 'shopping_cart',
                                }}
                            />
                        </Grid>
                    </Grid>
                </SuiBox>
                <SuiBox mb={3}>
                    
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Dashboard
