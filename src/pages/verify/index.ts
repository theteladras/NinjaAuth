import * as Mustache from 'mustache';
import template from './verify.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';
import { ChangePassword } from '../cpw';

export class Verify extends DOMServices implements IComponent {
	private digitInputClass = 'verification-digit';
	public static called = 'verify';
	called = Verify.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(props: Record<string, any>): DOMServices['removeContainer'] {
		const accountActivationVersion = props.version === 'ACTIVATE_ACCOUNT';
		const rendered = Mustache.render(template, {
			title: accountActivationVersion
				? 'Activate your account'
				: 'Verify Your Identity',
			digitInputClass: this.digitInputClass,
		});

		this.createContainer().show(rendered);

		this.onClick('login', this.handleLogin.bind(this));
		this.onClick('submit', this.handleSubmit.bind(this));

		this.handleDigitInput();

		return this.removeContainer.bind(this);
	}

	private handleDigitInput() {
		const inputs = document.querySelectorAll(
			`.${this.digitInputClass}`
		) as NodeListOf<HTMLInputElement>;

		inputs.forEach(function (input, index) {
			input.addEventListener('input', function () {
				const value = this.value;
				if (value.length === 1)
					if (index < inputs.length - 1) inputs[index + 1].focus();
			});

			input.addEventListener('keydown', function (event) {
				const key = event.key;
				if (key === 'Backspace' && this.value.length === 0)
					if (index > 0) inputs[index - 1].focus();
			});
		});
	}

	private handleLogin(e: Event) {
		this.router.renderComponent(Login.called);
	}

	private handleSubmit(e: Event) {
		this.router.renderComponent(ChangePassword.called);
	}
}
