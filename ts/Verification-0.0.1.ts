export function verificationPhone(phoneNumber: string = '') {
	return /^1[34578]\d{9}$/.test(phoneNumber)
}
export function verificationEmail(email: string = ''){
	return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email);
}