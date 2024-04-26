import * as Mustache from 'mustache';
import template from './login.template.mustache';
import { IComponent, IRouter } from '../../types';
import { Signup } from '../signup';
import { DOMServices } from '../../services';
import { ForgotPassword } from '../fpw';
import { Verify } from '../verify';

export class Login extends DOMServices implements IComponent {
	public static called = 'login';
	called = Login.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): DOMServices['removeContainer'] {
		const rendered = Mustache.render(template, {});

		this.createContainer().show(rendered);

		this.onClick('submit', this.handleSubmit.bind(this));
		this.onClick('register', this.handleRegister.bind(this));
		this.onClick('fgpw', this.handleForgotPassword.bind(this));

		return this.removeContainer.bind(this);
	}

	private handleSubmit(e: Event) {
		this.router.renderComponent(Verify.called, {
			version: "ACTIVATE_ACCOUNT"
		});
	}

	private handleRegister(e: Event) {
		this.router.renderComponent(Signup.called);
	}

	private handleForgotPassword(e: Event) {
		this.router.renderComponent(ForgotPassword.called);
	}
}
