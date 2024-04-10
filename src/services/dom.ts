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
}
