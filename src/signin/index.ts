import * as Mustache from 'mustache';
import template from './template.mustache';
import { IComponent, IRouter } from '../types';
import { Signup } from '../signup';
import { DOMServices } from '../services';
import { ForgotPassword } from '../fpw';

export class Signin extends DOMServices implements IComponent {
	public static called = 'signin';
	called = Signin.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): Signin['cleanup'] {
		const rendered = Mustache.render(template, {});

		const div = document.createElement('div');
		div.className = 'signin-container';
		div.innerHTML = rendered;

		if (!document.body.querySelector('.signin-container')) {
			window.document.body.appendChild(div);
		}

		this.handleClickById('submit', this.handleSubmit.bind(this));
		this.handleClickById('register', this.handleRegister.bind(this));
		this.handleClickById('fgpw', this.handleForgotPassword.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const signinContainer = document.querySelector('.signin-container');

		if (signinContainer) {
			this.removeHandlers();

			signinContainer.remove();
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
