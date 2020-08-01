const fs = require('fs')
const Excel = require('exceljs');

//输入 src dst：json目录下存放目标文件 excel2json.xlsx -> excel2json.json
// src：读取的excel文件目录
// dst：导出的json文件目录
 const excel2json = async function(src,dst){
    const result=[];
    let keys=[];
    const workbook = new Excel.Workbook();
    // 读取excel
    await workbook.xlsx.readFile(src);
    const worksheet = workbook.getWorksheet(1); //获取第一个worksheet
    worksheet.eachRow((row, rowNumber)=> {
        let obj={};
        // cell.type单元格类型：6-公式 ;2-数值；3-字符串
        row.eachCell((cell, colNumber)=>{
            const value=cell.value;
            if(rowNumber===1) keys.push(value);
            else obj[keys[colNumber-1]]=value;
        });
        if(rowNumber>1) result.push(obj)
    });
    console.log(result)
    // 写入流
    await fs.writeFileSync(dst,JSON.stringify(result));

}

excel2json('./excel/excel2json.xlsx','./json/excel2json.json');