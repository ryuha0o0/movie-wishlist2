import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 사용
import { tryLogin, tryRegister } from '../../util/Auth'; // 로그인/회원가입 함수
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    Button,
    Checkbox,
    colors,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

const ScreenMode = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
};

function SignIn({ setApiKey }) {
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [transitionState, setTransitionState] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberedEmail');
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const handleLogin = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('올바른 이메일 형식이 아닙니다.');
            return;
        }

        try {
            const user = tryLogin(email, password);
            if (user) {
                const apiKey = password; // 예시: 비밀번호를 API 키로 사용
                setApiKey(apiKey);
                toast.success('로그인 성공!');
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', email);
                } else {
                    localStorage.removeItem('rememberedEmail');
                }
                setTimeout(() => navigate('/'), 1000);
            } else {
                toast.error('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            toast.error('로그인 실패: 오류가 발생했습니다.');
        }
    };

    const handleRegister = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('올바른 이메일 형식이 아닙니다.');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!termsAccepted) {
            toast.error('약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        try {
            const success = tryRegister(email, password);
            if (success) {
                toast.success('회원가입 성공! 로그인 화면으로 이동합니다.');
                setTimeout(() => setCurrMode(ScreenMode.SIGN_IN), 1000);
            } else {
                toast.error('회원가입 실패: 이미 존재하는 이메일입니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            toast.error('회원가입 실패: 오류가 발생했습니다.');
        }
    };

    const handleSwitchMode = (mode) => {
        setTransitionState(true);
        setTimeout(() => {
            setCurrMode(mode);
            setTransitionState(false);
        }, 500);
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* 로그인/회원가입 폼 */}
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
                    <Stack spacing={4} sx={{ zIndex: 2 }}>
                        <Typography variant="h4" fontWeight="bold" color={colors.grey[800]}>
                            Welcome Back
                        </Typography>
                        <Typography color={colors.grey[600]}>Sign in to continue</Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== ''}
                                helperText={
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== ''
                                        ? '올바른 이메일 형식이 아닙니다.'
                                        : ''
                                }
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Checkbox
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <Typography>Remember Me</Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleLogin}
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
                            onClick={() => handleSwitchMode(ScreenMode.SIGN_UP)}
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
                ) : (
                    <Stack spacing={4} sx={{ zIndex: 2 }}>
                        <Typography variant="h4" fontWeight="bold" color={colors.grey[800]}>
                            Create an Account
                        </Typography>
                        <Typography color={colors.grey[600]}>Join us today</Typography>
                        <Stack spacing={2}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== ''}
                                helperText={
                                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== ''
                                        ? '올바른 이메일 형식이 아닙니다.'
                                        : ''
                                }
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={password !== confirmPassword && confirmPassword !== ''}
                                helperText={
                                    password !== confirmPassword && confirmPassword !== ''
                                        ? '비밀번호가 일치하지 않습니다.'
                                        : ''
                                }
                            />
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Checkbox
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <Typography>약관에 동의합니다.</Typography>
                        </Stack>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleRegister}
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
                            onClick={() => handleSwitchMode(ScreenMode.SIGN_IN)}
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
                        transition: 'width 0.5s ease-in-out',
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
                            ? 'https://images.unsplash.com/photo-1450460528890-4f75f19af897?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                            : 'https://images.unsplash.com/photo-1605744435823-b88e4e9bc044?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
                        transition: 'width 0.5s ease-in-out',
                    }}
                />
            </Grid>
            <ToastContainer />
        </Grid>
    );
}

export default SignIn;
