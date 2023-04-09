const classDec: ClassDecorator = (target: any) => {
	console.log('打印***target', target)
	target.prototype.age = 18
}
const propertyDec: PropertyDecorator = (target: Object, key: string | symbol) => {
	// {} name
	console.log(target, key)
}

const methodDec: MethodDecorator = (target: Object, key: string | symbol, descriptor: any) => {
	// {} 方法名称 描述符
	// {
	//   value: [Function: getName],
	//   writable: true,
	//   enumerable: false,
	//   configurable: true
	// }
	console.log(target, key, descriptor)
}

const parameterDec: ParameterDecorator = (target: Object, key: string | symbol, index: any) => {
	//{} getName 函数名称 0 index是参数所在位置
	console.log(target, key, index)
}

/** 如何传参数 不破环原有类 */
@classDec
class Desc {
	@propertyDec
	public name: string

	constructor() {
		this.name = '属性装饰器'
	}

	@methodDec
	getName(@parameterDec age: number) {
		return this.name
	}
}

const desc: any = new Desc()

console.log(desc.name)
