import * as Mustache from 'mustache';
import template from './template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Signin } from '../signin';

export class ForgotPassword extends DOMServices implements IComponent {
	public static called = 'forgot-password';
	called = ForgotPassword.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): ForgotPassword['cleanup'] {
		const rendered = Mustache.render(template, {});

		const div = document.createElement('div');
		div.className = 'forgot-password-container';
		div.innerHTML = rendered;

		if (!document.body.querySelector('.forgot-password-container')) {
			window.document.body.appendChild(div);
		}

		this.handleClickById('login', this.handleLogin.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const signinContainer = document.querySelector(
			'.forgot-password-container'
		);

		if (signinContainer) {
			this.removeHandlers();

			signinContainer.remove();
		}
	}

	private handleLogin(e) {
		e.preventDefault();
		this.router.renderComponent(Signin.called);
	}
}
