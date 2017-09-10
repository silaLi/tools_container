export function verificationPhone(phoneNumber: string) {
	return /^1[3578]\d{9}$/.test(phoneNumber)
}