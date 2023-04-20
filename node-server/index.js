const express = require('express')


const app = express()


app.get('/admin', (req, res) => {
	console.log('打印***8888',8888)
	res.json({
		code: 200,
		msg:'第一台服务器'
	})
})

app.listen(8888, () => {
	console.log('第一台服务器', 'http://localhost:8888');
})