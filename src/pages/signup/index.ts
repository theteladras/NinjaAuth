import * as Mustache from 'mustache';
import template from './template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Signin } from '../signin';

export class Signup extends DOMServices implements IComponent {
	public static called = 'signup';
	called = Signup.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): Signup['cleanup'] {
		const rendered = Mustache.render(template, {});

		const div = document.createElement('div');
		div.className = 'signup-container';
		div.innerHTML = rendered;

		if (!document.body.querySelector('.signup-container')) {
			window.document.body.appendChild(div);
		}

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
		this.router.renderComponent(Signin.called);
	}
}
