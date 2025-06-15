const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// 정적 파일(HTML, CSS, JS) 제공
app.use(express.static('public'));
app.use(express.json());

// 테스트용 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const menuList = [
    { id: 1, name: '팥빙수 小', price: 10000 },
    { id: 2, name: '팥빙수 大', price: 15000 },
    { id: 3, name: '물냉면', price: 10000 },
    { id: 4, name: '매콤닭발', price: 20000 },
    { id: 5, name: '하이네켄 생맥주 300', price: 5000 },
    { id: 6, name: '테라 생맥주 500', price: 4000 },
    { id: 7, name: '고기만두', price: 6000 },
    { id: 8, name: '김치만두', price: 6000 },
    { id: 9, name: '반반만두', price: 6000 },
    { id: 10, name: '아메리카노', price: 3000 },
    { id: 11, name: '얼음 바틀', price: 3000 }
];

// 메뉴 목록 API
app.get('/api/menu', (req, res) => {
    res.json(menuList);
});

let orders = []; // 주문 목록 저장

// 주문 생성 API
app.post('/api/order', (req, res) => {
    const { table, room, items } = req.body;
    const order = {
        id: orders.length + 1,
        table,
        room,
        items,
        time: new Date(),
        status: '대기'
    };
    orders.push(order);
    res.json({ success: true, order });
});

app.get('/order', (req, res) => {
    res.sendFile(__dirname + '/public/order.html');
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// 주문 상태 변경 API
app.post('/api/order/:id/status', (req, res) => {
    const orderId = Number(req.params.id);
    const { status } = req.body;
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = status;
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '주문을 찾을 수 없습니다.' });
    }
});

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/admin.html');
});

app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다`);
});

// 주문 삭제(취소) API
app.delete('/api/order/:id', (req, res) => {
    const orderId = Number(req.params.id);
    const idx = orders.findIndex(o => o.id === orderId);
    if (idx !== -1) {
        orders.splice(idx, 1);
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '주문을 찾을 수 없습니다.' });
    }
});