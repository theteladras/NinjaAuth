import { IComponent, IRouter } from './types';

export class Router implements IRouter {
	private cleanupCall: () => void;
	private components: Record<string, IComponent> = {};

	public setComponents(components: IComponent[], defaultComponent: string) {
		components.forEach((c) => (this.components[c.called] = c));

		this.renderComponent(defaultComponent);
	}

	public renderComponent = (
		called: string,
		props: Record<string, any> = {}
	) => {
		this.cleanupCall?.();
		this.cleanupCall = this.components[called].render(props);
	};
}
