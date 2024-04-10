import { IDOMServices } from '../types';

export class DOMServices implements IDOMServices {
	private eventsForIds: Record<string, () => any> = {};

	constructor() {}

	public handleClickById<T = void>(id: string, cb: () => T | Promise<T>): void {
		const element = document.querySelector(`#${id}`);

		if (!element) throw new Error(`Element with id [#${id}] not found.`);

		this.eventsForIds[id] = cb;

		element.addEventListener('click', cb);
	}

	removeHandlers() {
		Object.keys(this.eventsForIds).forEach((id) => {
			const element = document.querySelector(`#${id}`);

			if (element) {
				element.removeEventListener('click', this.eventsForIds[id]);
			}
		});
	}

	createContainer(name: string): { show: (t: string) => void } {
		const div = document.createElement('div');

		div.className = `${name}-container vw-100 vh-100 d-flex justify-content-center align-items-center`;

		return {
			show: (template: string) => {
				div.innerHTML = template;

				if (!document.body.querySelector(`.${name}-container`)) {
					window.document.body.appendChild(div);
				}
			},
		};
	}
}
