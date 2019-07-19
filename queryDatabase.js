const constant = require('./config');
var MongoClient = require('mongodb').MongoClient;

module.exports.getData = (param, query, done)=>{
    
    MongoClient.connect(constant.DBURL,  { useNewUrlParser: true }, function(err, db) { 
        if (err) throw err;
        const dbo = db.db("mydb");
        const collection = dbo.collection("contactDetails");
        const {name, contactDetail,id} = query;
        let newPhone=[];
        
        if('update' === param){
            collection.updateOne( {_id:id},{ $set: { phone:newPhone } } ,function(err, result) {
                if (err) throw err;
                db.close();
                done(result.result);
            }); 
        }
        else if('insert' === param){
            collection.insertOne({name, contactDetail: JSON.parse(contactDetail) } ,function(err, result) {
                if (err) throw err;
                db.close();
                done({ok:result.result.ok});
            }); 
        }
        else if('delete' === param){
            collection.deleteOne( {_id:id} ,function(err, result) {
                if (err) throw err;
                db.close();
                done(result);
            }); 
        }
        else{
            const newQuery = name && {name}||'';
            collection.find(newQuery).toArray(function(err,result){
                if(err) throw err;
                const array=[];
                db.close();
                if(newQuery){
                    done(result);
                }else{
                    result.map(obj=>{
                        array.push(obj.name);
                    });
                    done(array);
                }
               
            });
        }
    });
}