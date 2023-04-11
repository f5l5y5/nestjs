class Application {
	constructor() {
		this.middleware = []
	}
	use(fn) {
		this.middleware.push(fn)
	}
}

function compose(middleware) {
	function dispatch(i) {
		if (i >= middleware.length) return Promise.resolve()
		const mid = middleware[i]
		console.log('打印***middleware', middleware[i])
		return Promise.resolve(mid('ctx', () => dispatch(i + 1)))
	}
	return dispatch(0)
}

const app = new Application()

app.use((ctx, next) => {
	console.log(1)
	console.log('打印***ctx', ctx)
	next()
	console.log(2)
})

app.use((ctx, next) => {
	console.log(3)
	console.log('打印***ctx', ctx)
	next()
	console.log(4)
})
console.log('打印***app.middleware', app.middleware)

compose(app.middleware)
