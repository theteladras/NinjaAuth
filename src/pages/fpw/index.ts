import * as Mustache from 'mustache';
import template from './template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Signin } from '../signin';
import { Verify } from '../verify';

export class ForgotPassword extends DOMServices implements IComponent {
	public static called = 'forgot-password';
	called = ForgotPassword.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): ForgotPassword['cleanup'] {
		const rendered = Mustache.render(template, {});

		this.createContainer(ForgotPassword.called).show(rendered);

		this.handleClickById('login', this.handleLogin.bind(this));
		this.handleClickById('submit', this.handleSubmit.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const signinContainer = document.querySelector(
			`.${ForgotPassword.called}-container`
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

	private handleSubmit(e) {
		e.preventDefault();
		this.router.renderComponent(Verify.called);
	}
}
