export function addressChange(actualName) {
	history.replaceState('state', 'title', actualName !== 'index' ? `/${actualName}` : '/');
}
