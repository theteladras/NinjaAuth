import * as Mustache from 'mustache';
import template from './signup.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';

const imageUrl = require('../../statics/AuthNinja.png');

export class Signup extends DOMServices implements IComponent {
	public static called = 'signup';
	called = Signup.called;

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): DOMServices['removeContainer'] {
		const rendered = Mustache.render(template, { imageUrl: imageUrl.default });

		this.createContainer().show(rendered);

		this.onClick('submit', this.handleSubmit.bind(this));
		this.onClick('login', this.handleLogin.bind(this));

		return this.removeContainer.bind(this);
	}

	private handleSubmit(e: Event) {}

	private handleLogin(e: Event) {
		this.router.renderComponent(Login.called);
	}
}
