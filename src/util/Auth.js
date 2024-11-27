export const getCurrentUser = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isLoggedInUser = JSON.parse(localStorage.getItem('isLoggedInUser')); // 로그인된 사용자 이메일 저장
    if (!isLoggedInUser) return null; // 로그인된 사용자가 없을 경우 null 반환
    return users.find((user) => user.email === isLoggedInUser) || null;
};

export const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key, defaultValue = null) => {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Invalid JSON format in localStorage:', key, data);
        return defaultValue; // JSON 형식이 아닐 경우 기본값 반환
    }
};


// 로그인 시 사용자 이메일 저장
export const tryLogin = (email, password) => {
    const users = getFromLocalStorage('users', []);
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        saveToLocalStorage('isLoggedInUser', user.email); // 현재 사용자 이메일 저장
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


export const logout = () => {
    localStorage.removeItem("isLoggedInUser"); // 현재 로그인된 사용자 정보 제거
    window.location.href = "/signin"; // 로그아웃 후 /signin으로 리디렉션
};
