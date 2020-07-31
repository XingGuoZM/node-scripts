const fs = require('fs')
const Excel = require('exceljs');

//输入 src dst：json目录下存放目标文件 json2excel.json
// src：读取的json文件目录
// dst：导出的excel文件目录
 const json2excel = async function(src,dst){
  const fileStream = await fs.readFileSync(src);
  const arr=JSON.parse(fileStream)
  const keys=Object.keys(arr[0]).map(item=> ({ header: item, key: item }));

  const workbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: dst
  });
  const worksheet = workbook.addWorksheet('Sheet');
  worksheet.columns=keys
  for(let item of arr) {
    worksheet.addRow(item).commit();
  }
  workbook.commit();
}

json2excel('./json/json2excel.json','./excel/json2excel.xlsx');