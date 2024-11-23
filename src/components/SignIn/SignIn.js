import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router의 useNavigate 사용
import { tryLogin, tryRegister } from '../../util/Auth'; // 로그인/회원가입 함수
import './SignIn.css';

function SignIn({ setApiKey }) {
    const [isLogin, setIsLogin] = useState(true); // 로그인 화면인지 회원가입 화면인지 상태 관리
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // 사용자 메시지
    const navigate = useNavigate(); // 리다이렉트 처리

    // 로그인 핸들러
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

    // 회원가입 핸들러
    const handleRegister = () => {
        console.log('회원가입 시도:', email);
        try {
            const success = tryRegister(email, password); // tryRegister 함수 호출
            if (success) {
                setMessage('회원가입 성공! 로그인 화면으로 이동합니다.');
                setTimeout(() => setIsLogin(true), 1000); // 1초 후 로그인 화면으로 전환
            } else {
                setMessage('회원가입 실패: 이미 존재하는 이메일입니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            setMessage('회원가입 실패: 오류가 발생했습니다.');
        }
    };

    // 로그인/회원가입 화면 전환
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(''); // 메시지 초기화
    };

    return (
        <div className="signin-container">
            <div className={`signin-card ${isLogin ? 'show-login' : 'show-register'}`}>
                <div className="signin-content">
                    {isLogin ? (
                        <>
                            <h2>로그인</h2>
                            <input
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleLogin}>로그인</button>
                            <p onClick={toggleForm}>계정 만들기</p>
                        </>
                    ) : (
                        <>
                            <h2>회원가입</h2>
                            <input
                                type="email"
                                placeholder="이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleRegister}>회원가입</button>
                            <p onClick={toggleForm}>로그인 화면으로 돌아가기</p>
                        </>
                    )}
                </div>
            </div>
            <p className="message">{message}</p>
        </div>
    );
}

export default SignIn;
