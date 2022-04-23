import express from 'express';
import path from 'path';
import xlsx from 'xlsx';
import dotenv from 'dotenv';

dotenv.config();

import fileUpload from './upload';

const app = express();

const port = 4000;
const rootDir = process.env.ROOT_DIRECTOR;

app.set('view engine', 'ejs');
app.set('views', path.join(rootDir, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('statics'));

app.get('/', function (req, res) {
    return res.render('index');
});

app.post('/upload', fileUpload.any(), function (req, res) {
    const excelFile = xlsx.readFile(req.files[0].path);
    const sheetName = excelFile.SheetNames[0];
    const firstSheet = excelFile.Sheets[sheetName];

    const firstSheetData = xlsx.utils.sheet_to_json(firstSheet, { defval: '' });

    const result = { winning: [], waiting: [] };
    for (let data of firstSheetData) {
        if (data.winning) result.winning.push(data.winning);
        if (data.waiting) result.waiting.push(data.waiting);
    }

    return res.status(200).send({ data: result, path: req.files[0].path });
});

app.post('/pick', function (req, res, next) {
    const member = JSON.parse(req.body.member);
    const winning = member.winning;
    const waiting = member.waiting;

    const winnerIndex = waiting.indexOf(req.body.winner);
    if (winnerIndex > -1) {
        waiting.splice(winnerIndex, 1);
    }

    winning.push(req.body.winner);

    const max = winning.length > waiting.length ? winning.length : waiting.length;

    const arr = [];
    for (let i = 0; i < max; i++) {
        const data = { winning: winning[i] ? winning[i] : '', waiting: waiting[i] ? waiting[i] : '' };

        arr.push(data);
    }

    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(arr, { defval: '' });

    xlsx.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    xlsx.writeFile(workBook, req.body.path, { bookType: 'xlsx' });

    return res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});
