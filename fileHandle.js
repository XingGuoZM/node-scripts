
/**
 * 文件处理，以处理package.json文件为例
 */
const fs=require('fs');
const path=require('path');
/**
 *  修改版本号
 *  @params   
 *   key: 依赖包，例如 "axios"
 *   value: 依赖包版本，例如 "^0.18.0"
 *   filepath: package.json文件路径
 *   type: dependencies(不传默认)或者devDependencies
 */ 
const editDependencies=function({key,value,filepath,type}){
    // 读取文件
    const currFile=fs.readFileSync(filepath);
    console.log('读取成功！')
    const currFileObj=JSON.parse(currFile);
    
    const currType=type || 'dependencies';
    if(currFileObj[currType]) currFileObj[currType][key]=value;
    else currFileObj[currType]={}
    // 写入文件
    fs.writeFileSync(filepath,JSON.stringify(currFileObj));
    console.log('写入成功！')
}
/**
 * 遍历指定目录下的所有文件
 * @param {*} dir 
 */
const getAllFile=function(dir){
    let res=[]
    function traverse(dir){
        fs.readdirSync(dir).forEach((file)=>{
            const pathname=path.join(dir,file)
            if(fs.statSync(pathname).isDirectory()){
                traverse(pathname)
            }else{
                res.push(pathname)
            }
        })
    }
    traverse(dir)
    return res;
}

// editDependencies({key:"axios",value:"^0.18.0",filepath:'./package.json'})
const res=getAllFile('src')
