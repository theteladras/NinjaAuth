import { ForgotPassword } from './fpw';
import { Router } from './router';
import { Signin } from './signin';
import { Signup } from './signup';
import { IComponent } from './types';

export class AuthNinja {
	private readonly router = new Router();
	private components: IComponent[];

	constructor() {
		this.initBootstrap();
		this.initComponents();
	}

	private initComponents() {
		this.components = [
			new Signin(this.router),
			new Signup(this.router),
			new ForgotPassword(this.router),
		];
	}

	private initBootstrap() {
		const href =
			'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';

		if (!document.querySelector(`link[href="${href}"]`)) {
			const linkElement = document.createElement('link');
			linkElement.rel = 'stylesheet';
			linkElement.href = href;

			document.head.appendChild(linkElement);
		}
	}

	public render() {
		this.router.setComponents(this.components, Signin.called);
	}
}
