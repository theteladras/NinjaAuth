export function hasUpperAndLower(str: string): boolean {
	var regex = /(?=.*[a-z])(?=.*[A-Z])/;

	return regex.test(str);
}

export function hasNumberOrSpecialChar(str: string): boolean {
	var regex = /(?=.*\d)|(?=.*\W)/;

	return regex.test(str);
}
