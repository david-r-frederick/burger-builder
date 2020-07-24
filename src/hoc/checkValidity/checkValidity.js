function checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = rules.minLength <= value.length && isValid;
    }
    if (rules.length) {
        isValid = value.length === rules.length && isValid;
    }
    switch (rules.type) {
        case 'password':
            isValid =
                value.match(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
                ) && isValid;
            break;
        case 'email':
            isValid =
                value.match(
                    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
                ) && isValid;
            break;
        case 'text':
            isValid = value.match(/^[a-z\s]+$/i) && isValid;
            break;
        case 'number':
            let isNum = !!value.match(/^\d+$/);
            isValid = isNum && isValid;
            break;
        case 'alphanumeric':
            isValid = value.match(/^[0-9a-z\s]+$/i) && isValid;
            break;
        default:
            isValid = true && isValid;
    }
    return isValid;
}

export default checkValidity;
