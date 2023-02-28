export function validateField(type: string, inputText: string) {
    switch (type) {
        case 'string': {
            if (inputText) {
                const strings = /^[A-Za-z0-9'\-,(,),@,:,#./\s]+$/i;
                if (inputText && inputText.match(strings)) {
                    return true;
                } else {
                    return false;
                }
            }
            return 'empty';
        }

        case 'alphabetics':
            if (inputText) {
                const alphabetics = /^[a-zA-Z\s]+$/i;
                return alphabetics.test(inputText);
            }
            return 'empty';

        case 'Alphanumeric':
            if (inputText) {
                const Alphanumeric = /^[0-9a-zA-Z ]+$/i;
                return Alphanumeric.test(inputText);
            }
            return 'empty';

        case 'number': {
            if (inputText) {
                const numbers = /^[0-9]+$/i;
                return numbers.test(inputText);
            }
            return 'empty';
        }

        case 'email':
            if (inputText) {
                const emails = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emails.test(inputText);
            }
            return 'empty';


        case 'password': {
            if (inputText) {
                return (/(?=.{8,})/).test(inputText) && (/[\@\#\$\%\^\&\*\(\)\_\+\!]/).test(inputText) && (/[a-z]/).test(inputText) && /[0-9]/.test(inputText) && /[A-Z]/.test(inputText);
            }
            return 'empty';
        }

        default:
    }
    return type;
}

export function validateEmail(email: string) {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

export function validatePassword(password: string) {
    const passwordRegex = /^(?=.*\d)(?=.*[@$.!%*#?&])(?=.*[a-zA-Z])[a-zA-Z\d@$.!%*#?&]{6,}$/;
    return passwordRegex.test(password);
}

export function Camelize(name: string) {
    if (typeof (name) === "string") {
        const names = name.split(" ");
        return (names.map((nameValue) => {
            return (" " + nameValue).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
                return chr.toUpperCase();
            });
        }).join(" "));
    }
    return "";
}

export function validateFileFormat(name: string, allowedExtensions: RegExp) {
    return allowedExtensions.exec(name);
}

export function validateFileSize(fileSize: number, maxFileSize: number) {
    const size: number = Math.round(fileSize / 1024);
    return size <= 1024 * maxFileSize;
}