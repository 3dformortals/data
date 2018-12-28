var tabname = 0;
var db;

async function read_db(){
    let db = await eel.db_reader()();
    console.log(db);
    return db;
}