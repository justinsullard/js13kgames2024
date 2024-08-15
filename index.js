import StaticServer from "static-server";
import watch from "recursive-watch";


let build = null;

const main = async () => {

    const server = new StaticServer({ rootPath: '.', port: 9080 });

    server.start(() => console.log(`Codetastrophy running at http://localhost:${server.port}/src/ and http://localhost:${server.port}/build/`, ));
    
    watch('./src', (filename) => {
        console.log('something changed with', filename);
    });

};

main().catch(console.error);
