const express = require('express')


const app = express()


app.get('/admin', (req, res) => {
	console.log('打印***9999',9999)
	res.json({
		code: 200,
		msg:'第二台服务器'
	})
})

app.listen(9999, () => {
	console.log('第二台服务器', 'http://localhost:9999');
})