import { IDOMServices } from '../types';

export abstract class DOMServices implements IDOMServices {
	public abstract called: string;

	private eventsForIds: Record<string, (e: Event) => any> = {};

	constructor() {}

	onClick<T = void>(id: string, cb: (e: Event) => T | Promise<T>): void {
		const element = document.querySelector(`#${id}`);

		if (!element) throw new Error(`Element with id [#${id}] not found.`);

		this.eventsForIds[id] = cb;

		element.addEventListener('click', (e) => {
			e.preventDefault();
			return cb(e);
		});
	}

	removeHandlers() {
		Object.keys(this.eventsForIds).forEach((id) => {
			const element = document.querySelector(`#${id}`);

			if (element) {
				element.removeEventListener('click', this.eventsForIds[id]);
			}
		});
	}

	createContainer(): { show: (t: string) => void } {
		const div = document.createElement('div');

		div.className = `${this.called}-container vw-100 vh-100 d-flex justify-content-center align-items-center`;

		return {
			show: (template: string) => {
				div.innerHTML = template;

				if (!document.body.querySelector(`.${this.called}-container`)) {
					window.document.body.appendChild(div);
				}
			},
		};
	}

	removeContainer(): void {
		const container = document.querySelector(`.${this.called}-container`);

		if (container) {
			this.removeHandlers();

			container.remove();
		}
	}
}
