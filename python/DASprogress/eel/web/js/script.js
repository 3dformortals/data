
async function read_db(){
    console.log("message from javascript file , before calling python function") //this printed
    eel.python_method()()// not working - print eel.python_method is not a function
    
}