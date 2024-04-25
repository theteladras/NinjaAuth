import * as Mustache from 'mustache';
import template from './fpw.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';
import { Verify } from '../verify';

export class ForgotPassword extends DOMServices implements IComponent {
	public static called = 'forgot-password';
	called = ForgotPassword.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): DOMServices['removeContainer'] {
		const rendered = Mustache.render(template, {});

		this.createContainer().show(rendered);

		this.onClick('login', this.handleLogin.bind(this));
		this.onClick('submit', this.handleSubmit.bind(this));

		return this.removeContainer.bind(this);
	}

	private handleLogin(e: Event) {
		this.router.renderComponent(Login.called);
	}

	private handleSubmit(e: Event) {
		this.router.renderComponent(Verify.called);
	}
}
