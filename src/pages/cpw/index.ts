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

	public render(): DOMServices['removeContainer'] {
		const rendered = Mustache.render(template, {});

		this.createContainer().show(rendered);

		this.onClick('submit', this.handleSubmit.bind(this));

		return this.removeContainer.bind(this);
	}

	private handleSubmit(e: Event) {
		this.router.renderComponent(Login.called);
	}
}
