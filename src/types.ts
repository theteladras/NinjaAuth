export interface IComponent {
	called: string;
	render: (props?: Record<string, any>) => () => void;
}

export interface IRouter {
	renderComponent: (called: string, props?: Record<string, any>) => void;
}

export interface IDOMServices {
	onClick<T = void>(id: string, cb: (e: Event) => T | Promise<T>): void;
	removeHandlers(): void;
	createContainer(): void;
	removeContainer(): void;
}

export interface AuthNinjaOptions {
	defaultPage?: string | IComponent;
}
