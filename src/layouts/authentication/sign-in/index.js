import { useState } from 'react'

// react-router-dom components
import { Link } from 'react-router-dom'

// @mui material components
import Switch from '@mui/material/Switch'

// Soft UI Dashboard React components
import SuiBox from 'components/SuiBox'
import SuiTypography from 'components/SuiTypography'
import SuiInput from 'components/SuiInput'
import SuiButton from 'components/SuiButton'

// Authentication layout components
import CoverLayout from 'layouts/authentication/components/CoverLayout'

// Images
import curved9 from 'assets/images/curved-images/curved-6.jpg'
import LoginWithGoogle from 'examples/LoginGoogleButton'

import { useNavigate } from 'react-router-dom'

import { authApis } from '../../../apis/authApis'

function SignIn() {
    const [username, setUsername] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)

    const [password, setPassword] = useState(null)
    const [rememberMe, setRememberMe] = useState(true)
    const navigate = useNavigate()

    const handleSetRememberMe = () => setRememberMe(!rememberMe)

    const handleSignInButtonClick = () => {
        authApis
            .loginAdmin(username, password)
            .then((res) => {
                const token = res?.data?.message
                localStorage.setItem('access-token', token)
                navigate('/dashboard')
            })
            .catch((err) => {
                setErrorMessage(err.response.data.errors[0])
                setErrorEmail(err.response.data.errors['Email'][0])
                setErrorPassword(err.response.data.errors['Password'][0])
                console.error('Sign in failed.', err.response.data.errors[0])
            })
        //   console.log("sign in meow", { username, password });
    }

    return (
        <CoverLayout
            title="FPT MAS"
<<<<<<< HEAD
            description="Admin edition"
=======
            description="Admin Edition"
>>>>>>> aba5513f53fdde020097fdd35f78c499be9c78c7
            image={curved9}
        >
            <SuiBox component="form" role="form">
                {errorMessage && (
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            color="error"
                        >
                            {errorMessage}
                        </SuiTypography>
                    </SuiBox>
                )}
                <SuiBox mb={2}>
                    {errorEmail && (
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {errorEmail}
                            </SuiTypography>
                        </SuiBox>
                    )}
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Email
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setUsername(e?.target?.value)}
                    />
                </SuiBox>
                <SuiBox mb={2}>
                    {errorPassword && (
                        <SuiBox mb={1} ml={0.5}>
                            <SuiTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                                color="error"
                            >
                                {errorPassword}
                            </SuiTypography>
                        </SuiBox>
                    )}
                    <SuiBox mb={1} ml={0.5}>
                        <SuiTypography
                            component="label"
                            variant="caption"
                            fontWeight="bold"
                            isRequired
                        >
                            Password
                        </SuiTypography>
                    </SuiBox>
                    <SuiInput
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e?.target?.value)}
                    />
                </SuiBox>
                {/* <SuiBox display="flex" alignItems="center">
                    <Switch
                        checked={rememberMe}
                        onChange={handleSetRememberMe}
                    />
                    <SuiTypography
                        variant="button"
                        fontWeight="regular"
                        onClick={handleSetRememberMe}
                        sx={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                        &nbsp;&nbsp;Remember me
                    </SuiTypography>
                </SuiBox> */}
                <SuiBox mt={4} mb={1}>
                    <SuiButton
                        variant="gradient"
                        color="info"
                        fullWidth
                        onClick={handleSignInButtonClick}
                    >
                        sign in
                    </SuiButton>
                </SuiBox>
            </SuiBox>
        </CoverLayout>
    )
}

export default SignIn
