// src/util/Auth.js
export const tryLogin = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('isLoggedIn', 'true');
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
