import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

//check image link
// function imageExists(image_url: string): any{

//   var http = new XMLHttpRequest();

//   http.open('HEAD', image_url, false);
//   http.send();

//   return http.status != 404;

// }

async function showImage(res:any, newPath : any) : Promise<boolean>{
  res.sendFile(newPath);
  return true
}
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    // res.send("try GET /filteredimage?image_url={{}}")
    const imgUrl : string = req.query.image_url;
    

    if(typeof imgUrl != 'undefined' && imgUrl.trim() != ""){
      // res.send(`Your url: ${imgUrl}`);
      const newPath = await filterImageFromURL(imgUrl);
      console.log(`Image Filtered ${newPath}`);
      const urlArray : Array<string> = [];
      urlArray.push(newPath);
      console.log("Array Created");
      // res.send(newPath);
      console.log("Returning Image");
      const fileNameArray = newPath.split("tmp");
      const fileName = fileNameArray[fileNameArray.length - 1]
      // res.send(fileName);
      let bol = false
      bol = await showImage(res,newPath)
      // await res.sendFile(newPath);
      // fs.createReadStream('./image/demo.jpg').pipe(res);
      console.log("Displayed Image");
      
      setTimeout(function(){ deleteLocalFiles(urlArray); }, 5000);
      
      console.log("Files Deleted");
      




    }else{
      res.send("try GET /filteredimage?image_url={{}}")
    }
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();