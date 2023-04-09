import axios from 'axios'

const Get = (url: string): MethodDecorator => {
	return function (target: object, key: string | symbol, descriptor: PropertyDescriptor) {
		//value: [Function: getList],
		console.log('打印***descriptor,url', descriptor, url)
		// 获取getList方法 将结果以回调的形式传递，方法可以直接得到结果
		const originGetList = descriptor.value
		axios
			.get(url)
			.then(res => {
				originGetList(res, { code: 1 })
			})
			.catch(e => {
				originGetList(e, { code: 0 })
			})
	}
}

class Controller {
	constructor() {}

	@Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
	getList(res: any, code: any) {
		console.log('打印***res,code', res.data, code.code)
		return res.data
	}
}
