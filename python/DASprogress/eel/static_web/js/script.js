var tabname = 0;
var db;

async function read_db(){
    console.log("message from javascript file , before calling python function") //this printed
    let db = await eel.db_reader()(); //this fail string
    console.log("trying to display db taken from python side")
    console.log(db);
    return db;
}