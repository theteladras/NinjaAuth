export interface IComponent {
	called: string;
	render: () => () => void;
}

export interface IRouter {
	renderComponent: (called: string) => void;
}

export interface IDOMServices {
	handleClickById<T = void>(id: string, cb: () => T | Promise<T>): void;
	removeHandlers(): void;
}
