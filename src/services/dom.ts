import { IDOMServices } from '../types';

export abstract class DOMServices implements IDOMServices {
	public abstract called: string;

	private eventsForIds: Record<string, (...args: any) => any> = {};

	constructor() {}

	$id<T = Element>(id: string): T {
		const element = document.querySelector(`#${id}`);

		if (!element) throw new Error(`Element with id [#${id}] not found.`);

		return element as T;
	}

	$cls<T = Element>(cls: string): T {
		const element = document.querySelector(`.${cls}`);

		return element as T;
	}

	onClick<T = void>(id: string, cb: (e: Event) => T | Promise<T>): void {
		const element = this.$id(id);

		this.eventsForIds[id] = cb;

		element.addEventListener('click', (e) => {
			e.preventDefault();
			return cb(e);
		});
	}

	onChange(
		id: string,
		cb: (e: InputEvent, inputId: string) => void | Promise<void>
	): void {
		const element = this.$id(id);

		this.eventsForIds[id] = cb;

		element.addEventListener('input', (e) => {
			e.preventDefault();
			return cb(e as InputEvent, id);
		});
	}

	removeHandlers() {
		Object.keys(this.eventsForIds).forEach((id) => {
			const element = this.$id(id);

			if (element) element.removeEventListener('click', this.eventsForIds[id]);
		});
	}

	createContainer(): { show: (t: string) => void } {
		const div = document.createElement('div');

		div.className = `${this.called}-container vw-100 vh-100 d-flex justify-content-center align-items-center`;

		return {
			show: (template: string) => {
				div.innerHTML = template;

				if (!this.$cls(`${this.called}-container`)) {
					window.document.body.appendChild(div);
				}
			},
		};
	}

	removeContainer(): void {
		const container = this.$cls(`${this.called}-container`);

		if (container) {
			this.removeHandlers();

			container.remove();
		}
	}
}
