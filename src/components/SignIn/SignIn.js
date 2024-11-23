import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, TextField, Button, colors } from '@mui/material';

// 전환 모드 Enum
const ScreenMode = {
    SIGN_IN: "SIGN_IN",
    SIGN_UP: "SIGN_UP"
};

const SigninPage = () => {
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);
    const [transitionState, setTransitionState] = useState(false);

    const handleSwitchMode = (mode) => {
        setTransitionState(true); // 전환 애니메이션 활성화

        setTimeout(() => {
            setCurrMode(mode);
            setTransitionState(false); // 전환 후 애니메이션 비활성화
        }, 1000);
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* 왼쪽 로그인/회원가입 창 */}
            <Grid
                item
                xs={4}
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    backgroundColor: colors.grey[100],
                }}
            >
                {currMode === ScreenMode.SIGN_IN ? (
                    <SigninForm onSwitchMode={handleSwitchMode} transitionState={transitionState} />
                ) : (
                    <SignupForm onSwitchMode={handleSwitchMode} transitionState={transitionState} />
                )}
                {/* 전환 애니메이션 */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: transitionState ? '100%' : '0%',
                        height: '100%',
                        bgcolor: colors.grey[800],
                        zIndex: 1,
                        transition: 'width 1s ease-in-out',
                    }}
                />
            </Grid>

            {/* 오른쪽 이미지 영역 */}
            <Grid
                item
                xs={8}
                sx={{
                    backgroundImage: `url(${
                        currMode === ScreenMode.SIGN_IN
                            ? 'https://via.placeholder.com/800x600?text=Sign+In+Background'
                            : 'https://via.placeholder.com/800x600?text=Sign+Up+Background'
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: transitionState ? '100%' : '0%',
                        height: '100%',
                        bgcolor: colors.common.white,
                        transition: 'width 1s ease-in-out',
                    }}
                />
            </Grid>
        </Grid>
    );
};

// 로그인 폼 컴포넌트
const SigninForm = ({ onSwitchMode }) => {
    return (
        <Stack spacing={4} sx={{ zIndex: 2 }}>
            <Typography variant="h4" fontWeight="bold" color={colors.grey[800]}>
                Welcome Back
            </Typography>
            <Typography color={colors.grey[600]}>Sign in to continue</Typography>
            <Stack spacing={2}>
                <TextField label="Email" fullWidth />
                <TextField label="Password" type="password" fullWidth />
            </Stack>
            <Button
                variant="contained"
                size="large"
                sx={{
                    bgcolor: colors.grey[800],
                    '&:hover': {
                        bgcolor: colors.grey[600],
                    },
                }}
            >
                Sign In
            </Button>
            <Typography
                onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}
                sx={{
                    color: colors.grey[800],
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
            >
                Don't have an account? Sign up now!
            </Typography>
        </Stack>
    );
};

// 회원가입 폼 컴포넌트
const SignupForm = ({ onSwitchMode }) => {
    return (
        <Stack spacing={4} sx={{ zIndex: 2 }}>
            <Typography variant="h4" fontWeight="bold" color={colors.grey[800]}>
                Create an Account
            </Typography>
            <Typography color={colors.grey[600]}>Join us today</Typography>
            <Stack spacing={2}>
                <TextField label="Email" fullWidth />
                <TextField label="Password" type="password" fullWidth />
            </Stack>
            <Button
                variant="contained"
                size="large"
                sx={{
                    bgcolor: colors.grey[800],
                    '&:hover': {
                        bgcolor: colors.grey[600],
                    },
                }}
            >
                Sign Up
            </Button>
            <Typography
                onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}
                sx={{
                    color: colors.grey[800],
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'center',
                }}
            >
                Already have an account? Sign in!
            </Typography>
        </Stack>
    );
};

export default SigninPage;
