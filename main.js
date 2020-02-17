const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Create Connection

const db = mysql.createConnection({
    host: 'easel2.fulgentcorp.com',
    user: 'pbh089',
    password: 'xV9w6veVDuVUtQ7j',
    database: 'pbh089'


});
//Connect sql
db.connect(function(err) {
    if(err){
        console.log("ERROR!!!!");
    }
    console.log("MYsql connected");

});



//hello

app.get('/hello', (req,res) => {
    //createTable()
    res.json([{"message":"hello yourself"}]);
});




app.listen('4000',() => {
    console.log('Server Started on port 4000');

});

//create table. Had to do this because I did not have direct access to the database
function createTable(){

    var mes = "create table properties (id int not null auto_increment, address varchar(200) not null, city varchar(50) not null, state varchar (2) not null, zip varchar(10) not null, primary key (id));"

    db.query(mes, function(err, dRes, field)
    {
        if(err)
        {
            console.log("ERROR")
        }
        else
        {
            console.log("Table created")
        }
    });
}
//insert into properties table
app.post('/properties', (req,res) => {
    console.log(req.body);
    address = req.body.address;
    city = req.body.city;
    state = req.body.state;
    zip = req.body.zip;
    err = false;

    if(address.length < 1 || address.length > 200){
        err = true;
        res.status(404).send({ err: "address is not between 1 and 200 characters" });
        }

        if(city.length < 1 || city.length > 50){
            err = true;
            res.status(404).send({err: "City is not between 1 and 50 characters" });
        }

        if(state.length !=2){
            err = true;
            res.status(404).send({err: "State is not 2 characters"});

        }

        if(zip.length < 5 || zip.length > 10){
            err = true;
            res.status(404).send({err: "Zip code is not between 5 and 10 digits" });
        }
        
        
        
        if(err)
        {
            console.log("ERROR");
        }
        else
        {
            var sqlmessage = "insert into properties (id,address,city,state,zip) values (";
            sqlmessage += "NULL, '" + address + "', '" + city + "', '" + state + "','" + zip + "')";
            console.log("Successful");
            res.json([{"message": "added"}]);
        }


    

    
    
    db.query(sqlmessage,function(err,dREs,fields){
       
    
    });

});

//get
app.get('/properties', (req,res) => {
    //createTable()
    db.query("select * from properties", function(err,rows,fields)
    {
        if(err)
        {
            console.log("ERROR")
        }
        else
        {
            console.log("getting tables")
            res.json(rows);
        }

    });
   
});

//delete
app.delete('/properties/:id',(req,res) =>{
    db.query('DELETE FROM properties WHERE id = ?',[req.params.id],(err,rows,fields)=>{

    if(!err){
        res.send(rows);
    }else{
        console.log(err);
    }
    
});
    

});

//get specific
app.get('/properties/:id',(req,res) =>{
    db.query('SELECT * FROM properties WHERE id = ?',[req.params.id],(err,rows,fields)=>{

    if(!err){
        res.send(rows);
    }else{
        console.log(err);
    }
    
});
    

});

