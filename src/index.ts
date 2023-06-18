import app from './app'
import "./database"

function main(){
    app.listen(app.get('port'),()=>{
        console.log(`Runing the server at ${app.get('port')}`);
    })
}

main();