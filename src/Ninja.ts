import { Router } from './router';
import { Login, Signup, ForgotPassword, Verify, ChangePassword } from './pages';
import { NinjaAuthOptions, IComponent } from './types';

export class Ninja {
	private readonly router = new Router();
	private components: IComponent[];

	constructor(readonly options?: NinjaAuthOptions) {
		this.initBootstrap();
		this.initComponents();
	}

	private initComponents() {
		this.components = [
			new Login(this.router),
			new Signup(this.router),
			new ForgotPassword(this.router),
			new Verify(this.router),
			new ChangePassword(this.router),
		];
	}

	private initBootstrap() {
		const href =
			'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';

		if (!document.querySelector(`link[href="${href}"]`)) {
			const linkElement = document.createElement('link');
			linkElement.rel = 'stylesheet';
			linkElement.href = href;

			document.head.appendChild(linkElement);
		}
	}

	public auth() {
		const _defaultPage = this.options?.defaultPage;
		const defaultPage =
			_defaultPage && typeof _defaultPage === 'string'
				? _defaultPage
				: (<IComponent>_defaultPage)?.called;

		this.router.setComponents(this.components, defaultPage ?? Login.called);
	}
}
