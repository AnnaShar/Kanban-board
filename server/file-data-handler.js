import fs from 'fs';

export const updateFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), error => {
        if(error) throw new Error(error.message);
    });
};

export const getDataFromFile = (fileName) =>{
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
};

