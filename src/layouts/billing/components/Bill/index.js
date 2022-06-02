// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiButton from "components/SuiButton";

function Bill({ name, company, email, vat, noGutter }) {
  return (
    <SuiBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SuiBox width="100%" display="flex" flexDirection="column">
        <SuiBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SuiTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SuiTypography>

          <SuiBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <SuiBox mr={1}>
              <SuiButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SuiButton>
            </SuiBox>
            <SuiButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </SuiButton>
          </SuiBox>
        </SuiBox>
        <SuiBox mb={1} lineHeight={0}>
          <SuiTypography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <SuiTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
        <SuiBox mb={1} lineHeight={0}>
          <SuiTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <SuiTypography variant="caption" fontWeight="medium">
              {email}
            </SuiTypography>
          </SuiTypography>
        </SuiBox>
        <SuiTypography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <SuiTypography variant="caption" fontWeight="medium">
            {vat}
          </SuiTypography>
        </SuiTypography>
      </SuiBox>
    </SuiBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
