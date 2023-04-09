// class Greeter {

// 	private greeting: string

// 	constructor(message: string) {
// 		this.greeting = message
// 	}

// 	public greet() {
// 		return 'Hello ' + this.greeting
// 	}
// }


// const greeter = new Greeter('haha')
// console.log(greeter.greet());


// class App {
// 	constructor(private greeter: Greeter) {
		
// 	}
// 	run() {
// 		console.log(this.greeter.greet());
// 	}
// }

// const greeter = new Greeter('li si')

// const app = new App(greeter)
// app.run()
/**
在上面的例子中，我们使用了控制反转和依赖注入来解耦Greeter和App之间的依赖关系。
Greeter类不再需要知道它的使用者是谁，而是从外部注入到App类中。这种方式可以让代码更加灵活、可扩展和可维护，降低代码的耦合性，利于测试和重构。
同时，这也是符合依赖倒置原则的设计方式。

总结：使用IOC/DI可以帮助我们更好地设计和组织代码，降低代码的耦合度和复杂度，提高代码的可读性和可维护性。
不使用IOC/DI则容易导致代码难以扩展和维护，不利于代码的重构和测试。
 */
/** ==============    =================== */

// class A{
// 	name: string
// 	constructor(name: string) {
// 		this.name = name
// 	}
// }


// class B {
// 	entry: A
// 	constructor() {
// 		this.entry = new A('哈哈哈 强耦合')
// 	}
// }

// const b = new B()
// console.log(b.entry.name)




class A{
	 name: string
	constructor(name: string) {
		this.name = name
	}
}


//中间件用于解耦
class Container{
	modules:any
	constructor() {
		this.modules = {}
	}
	provide(key: string, module: any) {
		this.modules[key]=module
	}

	get(key:string) {
		return this.modules[key]
	}

}


const container = new Container()
// 依赖注入
container.provide('a', new A('jack'))

// 定义B的使用类
class B {
	a: any
	constructor(container: Container) {
		this.a = container.get('a')
	}
}

const b = new B(container) 
console.log(b.a.name)


