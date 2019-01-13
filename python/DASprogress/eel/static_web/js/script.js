var tabname = 0;
var db;

async function read_db(){
    console.log("message from javascript file , before calling python function")
    let db = await eel.db_reader()();
    console.log("trying to display db taken from python side")
    console.log(db);
    return db;
}