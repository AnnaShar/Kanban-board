import express from 'express'
import bodyParser from "body-parser";
import boardController from './board-controller.js';

const port = 8080;

const app = new express();
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

const handleResponse = (req, res, handler) => {
    try {
        let data = handler();
        res.status(200).send(data);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
};

app.get('/api/board/tasks', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getAllTasks();
    });
});


app.get('/api/board/columns', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getColumns();
    });
});

app.get('/api/board/columns/:uid', (req, res)=>{
    let id = req.params.uid;
    handleResponse(req, res, ()=>{
        return boardController.getTasksByColumn(id);
    });
});

app.get('/api/board', (req, res)=>{
    handleResponse(req, res, ()=>{
        return boardController.getBoardInfo();
    });
});

app.patch('/api/board/tasks/move/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.moveTaskToDifferentColumn(id, req.body);
    });
});

app.post('/api/board/tasks/add/:uid', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let id = req.params.uid;
    handleResponse(req, res, () => {
        return boardController.addTask(id, req.body);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});