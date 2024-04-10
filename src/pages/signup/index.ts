import * as Mustache from 'mustache';
import template from './signup.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';

export class Signup extends DOMServices implements IComponent {
	public static called = 'signup';
	called = Signup.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): Signup['cleanup'] {
		const rendered = Mustache.render(template, {});

		this.createContainer('signup').show(rendered);

		this.handleClickById('submit', this.handleSubmit.bind(this));
		this.handleClickById('login', this.handleLogin.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const signupContainer = document.querySelector('.signup-container');

		if (signupContainer) {
			this.removeHandlers();

			signupContainer.remove();
		}
	}

	private handleSubmit(e) {
		e.preventDefault();
	}

	private handleLogin(e) {
		e.preventDefault();
		this.router.renderComponent(Login.called);
	}
}
