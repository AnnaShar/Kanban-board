import express from 'express'
import bodyParser from "body-parser";
import boardController from './board-controller.js';

const port = 8080;

const app = new express();
app.use(express.static('serdist'));
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

app.get('/api/board/:uid', (req, res)=>{
    let id = req.params.uid;
    handleResponse(req, res, ()=>{
        return boardController.getBoardInfo(id);
    });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});