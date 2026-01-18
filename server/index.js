// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === '123456') {
    res.json({
      code: 0,
      message: '登陆成功',
      data: { token: 'fake-token-' + Date.now() }
    });
  } else {
    res.status(401).json({
      code: 1,
      message: '用户名或密码无效',
      data: null
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`后端成功运行在 http://localhost:${PORT}`);
});