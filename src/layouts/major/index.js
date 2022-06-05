// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'

// Soft UI Dashboard React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import Footer from 'examples/Footer'
import MASDataGrid from 'examples/MASDataGrid'

function Major() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SuiBox py={3}>
                <SuiBox mb={3}>
                    <SuiBox
                        sx={{
                            '& .MuiTableRow-root:not(:last-child)': {
                                '& td': {
                                    borderBottom: ({
                                        borders: { borderWidth, borderColor },
                                    }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                        <MASDataGrid />
                    </SuiBox>
                </SuiBox>
            </SuiBox>
            <Footer />
        </DashboardLayout>
    )
}

export default Major
