const { default: axios } = require('axios')
// const Koa = require('koa')
class Koa {
	constructor() {
		this.middleware = []
	}
	use(fn) {
		this.middleware.push(fn)
	}
	listen(...args) {
		// this.compose(this.middleware)
		this.compose0(this.middleware)
	}
	compose(middleware) {
		function dispatch(i) {
			if (i >= middleware.length) return Promise.resolve()
			const mid = middleware[i]
			// console.log('打印***middleware', middleware[i])
			return Promise.resolve(mid('ctx', () => dispatch(i + 1)))
		}
		return dispatch(0)
	}

	 compose0(middleware) {
		function dispatch(i) {
			if (i >= middleware.length) return
			const callback = middleware[i]
			return callback('ctx', () => dispatch(i + 1))
		}
		return dispatch(0)
	}
}
const app = new Koa()
// 1 res 2 res 
app.use(async (ctx, next) => {
	console.log(1)
	const res = await axios.get('http://localhost:3000/user')
	console.log('打印***res', res.data)
	await next()
	//  next()
	console.log(11)
})
app.use(async (ctx, next) => {
	console.log(2)
	const res = await axios.get('http://localhost:3000/user')
	console.log('打印***res', res.data)
	// await next()
	 next()
	console.log(22)
})
app.use(async (ctx, next) => {
	console.log(3)
	const res = await axios.get('http://localhost:3000/user')
	console.log('打印***res', res.data)
	next()
	console.log(33)
})

app.listen(1000, err => {
	console.log('启动了')
})



// function compose0(middleware) {
// 	function dispatch(i) {
// 		if (i >= middleware.length) return
// 		const callback = middleware[i]
// 		return callback('ctx', () => dispatch(i + 1))
// 	}
// 	return dispatch(0)
// }

// function compose(middleware) {
// 	function dispatch(i) {
// 		if (i >= middleware.length) return Promise.resolve()
// 		const mid = middleware[i]
// 		console.log('打印***middleware', middleware[i])
// 		return Promise.resolve(mid('ctx', () => dispatch(i + 1)))
// 	}
// 	return dispatch(0)
// }

// const app = new Application()

// app.use(async (ctx, next) => {
// 	console.log(1)
// 	console.log('打印***ctx', ctx)
// await	next()
// 	console.log(2)
// })

// app.use(async (ctx, next) => {
// 	console.log(3)
// 	console.log('打印***ctx', ctx)
// 	const p = new Promise((resolve, reject) => {
// 		setTimeout(() => {
// 			console.log('sync')
// 			resolve('promise')
// 		}, 110)
// 	})
// 	await p
// 	await next()
// 	console.log(4)
// })
// console.log('打印***app.middleware', app.middleware)

// // compose(app.middleware)

// compose0(app.middleware)








