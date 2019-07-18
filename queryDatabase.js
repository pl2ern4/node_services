const constant = require('./config');
var MongoClient = require('mongodb').MongoClient;

module.exports.getData = (param, query, done)=>{
    
    MongoClient.connect(constant.DBURL,  { useNewUrlParser: true }, function(err, db) { 
        if (err) throw err;
        const dbo = db.db("mydb");
        const collection = dbo.collection("contactDetails");
        const {name, phone} = query;
        let newPhone=[];
        if(phone){
            newPhone = query.phone.split(',');
        }
        if('update' === param){
            collection.updateOne( {name},{ $set: { phone:newPhone } } ,function(err, result) {
                if (err) throw err;
                db.close();
                done(result.result);
            }); 
        }
        else if('insert' === param){
            collection.insertOne({name, phone:newPhone } ,function(err, result) {
                if (err) throw err;
                db.close();
                done(result.result);
            }); 
        }
        else if('delete' === param){
            collection.deleteOne( {name} ,function(err, result) {
                if (err) throw err;
                db.close();
                done(result.result);
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