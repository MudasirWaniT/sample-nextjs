const errors = {
    'firstName.required': 'First Name is required.',
    'firstName.invalid': 'First Name is invalid.',
    'lastName.required': 'Last Name is required.',
    'lastName.invalid': 'Last Name is invalid.',
    'email.required': 'Email is required.',
    'email.invalid': 'Email is invalid.',
    'password.required': 'Password is required.',
    'currentPassword.required': 'Current Password is required.',
    'newPassword.required': 'New Password is required.',
    'confirmPassword.required': 'Confirm password is required.',
    'password.matched': 'Password should be match.',
    'password.invalid': 'Enter atleast 6 characters with one small, one capital letter, one digit and one special character @#$!.',
    'newPassword.invalid': 'Enter atleast 6 characters with one small letter, one capital letter, one digit and one special character @#$!.',
    'confirmPassword.invalid': 'Enter atleast 6 characters with one small letter, one capital letter, one digit and one special character @#$!.',
    'companyName.required': "Company Name is required.",
    'companyName.invalid': "Company Name is invalid.",
    'companyRegistrationId.required': "Company registration id is required.",
    'companyRegistrationId.invalid': "Company registration id is invalid.",
    'address.required': "Address is required.",
    'address.invalid': "Address is invalid.",
    'signatoryName.required': "Signatory Name is required.",
    'signatoryName.invalid': "Signatory Name is invalid."
};

export const responseMessage = (value: string) => {
    if (errors.hasOwnProperty(value)) {
        return (errors as any)[value];
    }
    return value;
};