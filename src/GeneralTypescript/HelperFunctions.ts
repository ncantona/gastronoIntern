export const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export const checkPassword = (password: string) => {
    if (password.length < 8)
        return 1;                                                   // zu kurz
    if (!/[a-z]/.test(password))
        return 2;                                                   // keine Kleinbuchstaben
    if (!/[A-Z]/.test(password))
        return 3;                                                   // keine Großbuchstaben
    if (!/\d/.test(password))
        return 4;                                                   // keine Zahl
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password))
        return 5;                                                   // kein Sonderzeichen

    return 0;
}