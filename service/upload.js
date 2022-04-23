import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const xlsxFilter = (req, file, cb) => {
    //파일의 허용 범위 체크
    let ext = '';

    try {
        ext = file.originalname.split('.')[1];
    } catch (err) {}

    if (ext !== 'xlsx') {
        cb(new Error('Only xlsx are allowed'));
    }

    cb(null, true);
};

const fileUpload = multer({
    storage: storage,
    fileFilter: xlsxFilter
});

export default fileUpload;
