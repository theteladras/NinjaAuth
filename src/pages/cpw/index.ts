import * as Mustache from 'mustache';
import template from './cpw.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';

export class ChangePassword extends DOMServices implements IComponent {
	public static called = 'cpw';
	called = ChangePassword.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): ChangePassword['cleanup'] {
		const rendered = Mustache.render(template, {});

		this.createContainer(this.called).show(rendered);

		this.handleClickById('submit', this.handleSubmit.bind(this));

		return this.cleanup.bind(this);
	}

	private cleanup(): void {
		const signinContainer = document.querySelector(
			`.${ChangePassword.called}-container`
		);

		if (signinContainer) {
			this.removeHandlers();

			signinContainer.remove();
		}
	}

	private handleSubmit(e) {
		e.preventDefault();
		this.router.renderComponent(Login.called);
	}
}
