import * as Mustache from 'mustache';
import template from './login.template.mustache';
import { IComponent, IRouter } from '../../types';
import { Signup } from '../signup';
import { DOMServices } from '../../services';
import { ForgotPassword } from '../fpw';

export class Login extends DOMServices implements IComponent {
	public static called = 'login';
	called = Login.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): Login['cleanup'] {
		const rendered = Mustache.render(template, {});

		this.createContainer('login').show(rendered);

		this.handleClickById('submit', this.handleSubmit.bind(this));
		this.handleClickById('register', this.handleRegister.bind(this));
		this.handleClickById('fgpw', this.handleForgotPassword.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const loginContainer = document.querySelector('.login-container');

		if (loginContainer) {
			this.removeHandlers();

			loginContainer.remove();
		}
	}

	private handleSubmit(e) {
		e.preventDefault();
	}

	private handleRegister(e) {
		e.preventDefault();
		this.router.renderComponent(Signup.called);
	}

	private handleForgotPassword(e) {
		e.preventDefault();
		this.router.renderComponent(ForgotPassword.called);
	}
}
