import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 사용
import { tryLogin, tryRegister } from '../../util/Auth'; // 로그인/회원가입 함수
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    Button,
    colors,
} from '@mui/material';
import './SignIn.css';

// 전환 모드 Enum
const ScreenMode = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP',
};

function SignIn({ setApiKey }) {
    const [currMode, setCurrMode] = useState(ScreenMode.SIGN_IN); // 로그인 또는 회원가입 모드
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // 사용자 메시지
    const [transitionState, setTransitionState] = useState(false); // 전환 애니메이션
    const navigate = useNavigate(); // 리다이렉트 처리

    const handleLogin = () => {
        console.log('로그인 시도:', email);
        try {
            const user = tryLogin(email, password); // tryLogin 함수 호출
            if (user) {
                const apiKey = password; // 비밀번호를 API Key로 사용 (예시)
                setApiKey(apiKey); // 부모 컴포넌트에 API Key 전달
                setMessage('로그인 성공!');
                setTimeout(() => navigate('/'), 1000); // 1초 후 홈 화면으로 이동
            } else {
                setMessage('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 오류:', error);
            setMessage('로그인 실패: 오류가 발생했습니다.');
        }
    };

    const handleRegister = () => {
        console.log('회원가입 시도:', email);
        try {
            const success = tryRegister(email, password); // tryRegister 함수 호출
            if (success) {
                setMessage('회원가입 성공! 로그인 화면으로 이동합니다.');
                setTimeout(() => setCurrMode(ScreenMode.SIGN_IN), 1000); // 1초 후 로그인 화면으로 전환
            } else {
                setMessage('회원가입 실패: 이미 존재하는 이메일입니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            setMessage('회원가입 실패: 오류가 발생했습니다.');
        }
    };

    const handleSwitchMode = (mode) => {
        setTransitionState(true); // 전환 애니메이션 활성화
        setTimeout(() => {
            setCurrMode(mode);
            setTransitionState(false); // 전환 후 애니메이션 비활성화
        }, 500);
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
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Stack>
                        {message && (
                            <Typography color="error" sx={{ textAlign: 'center' }}>
                                {message}
                            </Typography>
                        )}
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
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Stack>
                        {message && (
                            <Typography color="error" sx={{ textAlign: 'center' }}>
                                {message}
                            </Typography>
                        )}
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
        </Grid>
    );
}

export default SignIn;
