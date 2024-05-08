import * as Mustache from 'mustache';
import template from './cpw.template.mustache';
import { IComponent, IRouter } from '../../types';
import { DOMServices } from '../../services';
import { Login } from '../login';
import { hasNumberOrSpecialChar, hasUpperAndLower } from '../../utils';

const imageUrl = require('../../statics/AuthNinja.png');

export class ChangePassword extends DOMServices implements IComponent {
	public static called = 'cpw';
	called = ChangePassword.called;

	private input = {};

	constructor(readonly router: IRouter) {
		super();
	}

	public render(): DOMServices['removeContainer'] {
		const rendered = Mustache.render(template, { imageUrl: imageUrl.default });

		this.createContainer().show(rendered);

		this.onClick('submit', this.handleSubmit.bind(this));

		this.onChange('newPassword', this.onInputChange.bind(this));
		this.onChange('confirmPassword', this.onInputChange.bind(this));

		return this.removeContainer.bind(this);
	}

	private arePasswordMatching(): boolean {
		const np = this.input['newPassword'];
		const cp = this.input['confirmPassword'];

		return !!cp && !!np && np !== cp;
	}

	private verifyPasswordMatching() {
		if (this.arePasswordMatching()) {
			this.$id('newPassword').classList.add('border-danger');
			this.$id('confirmPassword').classList.add('border-danger');
		} else {
			this.$id('newPassword').classList.remove('border-danger');
			this.$id('confirmPassword').classList.remove('border-danger');
		}
	}

	private verifyMixedCases() {
		const np = this.input['newPassword'];

		const isVerified = hasUpperAndLower(np);

		const element = this.$id('suggestion-letter-case-combination');

		if (!np) {
			element.classList.remove('text-danger');
			element.classList.remove('text-success');
		} else if (isVerified) {
			element.classList.remove('text-danger');
			element.classList.add('text-success');
		} else {
			element.classList.remove('text-success');
			element.classList.add('text-danger');
		}
	}

	private verifyNumbersAndSpecialCharacters() {
		const np = this.input['newPassword'];

		const isVerified = hasNumberOrSpecialChar(np);

		const element = this.$id('suggestion-numbers-and-special-characters');

		if (!np) {
			element.classList.remove('text-danger');
			element.classList.remove('text-success');
		} else if (isVerified) {
			element.classList.remove('text-danger');
			element.classList.add('text-success');
		} else {
			element.classList.remove('text-success');
			element.classList.add('text-danger');
		}
	}

	private verifyMinLength() {
		const np = this.input['newPassword'];

		const isVerified = np.length >= 8;

		const element = this.$id('suggestion-min-length');

		if (!np) {
			element.classList.remove('text-danger');
			element.classList.remove('text-success');
		} else if (isVerified) {
			element.classList.remove('text-danger');
			element.classList.add('text-success');
		} else {
			element.classList.remove('text-success');
			element.classList.add('text-danger');
		}
	}

	private onInputChange(e: InputEvent, id: string) {
		var value = (e.target as HTMLInputElement).value;
		this.input[id] = value;
		this.verifyPasswordMatching();
		this.verifyMixedCases();
		this.verifyNumbersAndSpecialCharacters();
		this.verifyMinLength();
	}

	private handleSubmit(e: Event) {
		this.router.renderComponent(Login.called);
		alert(Object.values(this.input));
	}
}
