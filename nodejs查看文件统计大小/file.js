 var fs = require('fs')


//�����ļ��У���ȡ�����ļ���������ļ���Ϣ
/*
 * @param path ·��
 *
 */

function geFileList(path)
{
   var filesList = [];
   readFile(path,filesList);
   return filesList;
}

//������ȡ�ļ�
function readFile(path,filesList)
{
   files = fs.readdirSync(path);//��Ҫ�õ�ͬ����ȡ
   files.forEach(walk);
   function walk(file)
   {  
        states = fs.statSync(path+'/'+file);         
        if(states.isDirectory())
        {
            readFile(path+'/'+file,filesList);
        }
        else
        {   
            //����һ�����󱣴���Ϣ
            var obj = new Object();
            obj.size = states.size;//�ļ���С�����ֽ�Ϊ��λ
            obj.name = file;//�ļ���
            obj.path = path+'/'+file; //�ļ�����·��
            filesList.push(obj);
        }     
    }
}

//д���ļ�utf-8��ʽ
function writeFile(fileName,data)
{  
  fs.writeFile(fileName,data,'utf-8',complete);
  function complete()
  {
     console.log("�ļ����ɳɹ�");
  } 
}


var filesList = geFileList("G:/nodejs");
filesList.sort(sortHandler);
function sortHandler(a,b)
{
  if(a.size > b.size)
   return -1;
  else if(a.size < b.size) return 1
   return 0;
}
var str='';
for(var i=0;i<filesList.length;i++)
{
   var item = filesList[i];
   var desc ="�ļ���:"+item.name + "  "
        +"��С:"+(item.size/1024).toFixed(2) +"/kb"+"  "
        +"·��:"+item.path;
   str+=desc +"\n"
}


writeFile("test.txt",str);