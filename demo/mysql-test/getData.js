const {query} = require('./async-db');

const selectAllData = async () => {
    let sql = 'select * from my_table';
    let dataList = await query(sql);
    return dataList;
};

const getData = async () => {
    let dataList = await selectAllData();
    console.log(dataList);
};

getData();