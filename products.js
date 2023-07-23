
export const saveDataFunc = function (data) {
    const dbData = JSON.parse(fs.readFileSync('db.json', (err, data) => (data)))
    fs.writeFileSync('data.json', JSON.stringify([...dbData, ...data]));
}

const loadDataFunc = function () {
    const text = fs.readFileSync('db.json', 'utf8');
    console.log(JSON.parse(text));
}

