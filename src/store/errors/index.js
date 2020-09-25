// A file to place all errors. Less relevant if the error requires variables
const errorMessages = {
    AUTH_SIGN_IN_EMAIL_NOT_FOUND : 'There is no account with that email and password.',
    AUTH_SIGN_IN_INVALID_PASSWORD : 'There is no account with that email and password.',
    AUTH_SIGN_IN_USER_DISABLED : 'The account is blocked',
    AUTH_SIGN_IN_DEFAULT : 'Failed to sign in',

    AUTH_SIGN_UP_EMAIL_EXISTS: 'Email address is already in use. If that\'s your email, please sign in.',
    AUTH_SIGN_UP_WEAK_PASSWORD: 'Password must be at least 6 characters',
    AUTH_SIGN_UP_DEFAULT: 'Failed to sign up. Please try again later.'
};

export default errorMessages;

