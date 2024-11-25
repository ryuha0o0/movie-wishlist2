export const getCurrentUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isLoggedInUser = JSON.parse(localStorage.getItem('isLoggedInUser')); // 로그인된 사용자 이메일 저장
    if (!isLoggedInUser) return null; // 로그인된 사용자가 없을 경우 null 반환
    return users.find((user) => user.email === isLoggedInUser) || null;
};


// 로그인 시 사용자 이메일 저장
export const tryLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isLoggedInUser', JSON.stringify(user.email)); // 현재 사용자 저장
        return user;
    }
    return null;
};

export const tryRegister = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === email)) {
        return false;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
};

export const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};


// 로그아웃 함수 추가
export const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser'); // currentUser 삭제
};
