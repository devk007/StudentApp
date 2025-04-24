const http=require('http');
const fs=require('fs').promises;
const PORT=3002;
const server=http.createServer((req,res)=>{

    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-method','GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
//preflight
    if(req.method=="OPTIONS"){
        res.statusCode=200;
        return res.end();
    }

   

if(req.url=="/register" && req.method=="POST"){
    let body='';
    let arr=[];
    req.on('data',chunk=>{
        body+=chunk;
    })

    req.on('end',async ()=>{
        const {name,email,password}=JSON.parse(body);
        console.log(name+email+password);
        const fdata=await fs.readFile('student.json',{encoding:'utf-8'});
                arr=JSON.parse(fdata);
                console.log(arr);
                  const result=arr.find(ele=>ele.email==email);
                  if(result){
                    res.setHeader('Content-Type','application/json');
                    return res.end(JSON.stringify({"message":"This email is already registerd with us, pls try different email"}))
                  }
               else{
                arr.push({name,email,password});

                await fs.writeFile('student.json',JSON.stringify(arr,null,2));
                res.end(JSON.stringify({"message":"Registration successfully!!"}));
               }
               
        
        //console.log(body);
    })
    //res.end(JSON.stringify({"message":"/register api hit successfully!!"}));
}

if(req.url=='/login' && req.method=="POST"){
    let body='';
    let arr=[];
    req.on('data',chunk=>{
        body+=chunk;
    })

    req.on('end',async()=>{
        const {email,password}=JSON.parse(body);
        const fdata=await fs.readFile('student.json',{encoding:'utf-8'});
                arr=JSON.parse(fdata);
                console.log(arr);
                const result=arr.find(ele=>ele.email==email && ele.password==password);
                if(result){
                       res.setHeader('Content-Type','application/json');
                       res.end(JSON.stringify({"message":"Login Success!!"}));
                }else{
                    res.setHeader('Content-Type','application/json');
                    res.end(JSON.stringify({"message":"email or password is incorrect!!"}));
                }

    })
}
//res.end("Welocme to Node Server");


})
server.listen(PORT,()=>{
    console.log("Server is running on:"+PORT)
})