//Server
const express = require('express');
const port = 9000;

const app = express();

//YT
const ytdl = require('ytdl-core');

app.use(express.json());
app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

app.get("/convertSource", async function(req, res){
    let youtubeURL = req.query.youtubeURL;

    if (youtubeURL.includes('playlist?list')) {
        //É lista, converter multiplas musicas
        console.log("playlist");
    }
    else if (youtubeURL.includes('watch?v')) {
        //Converter musica unica
        console.log("Mp3 single");
        let info = await ytdl.getInfo(youtubeURL);

        res.status(200).json(info);
    }
    else {
        res.status(200).json(null);
    }    
});

app.get("/download", async function(req, res){
    let url = req.query.videoURL;
    let itag = req.query.itag;
    let filename = req.query.filename;

    res.setHeader("Content-Disposition", 'attachment;\ filename="'+filename+'"');

    ytdl(url, {
        filter: format => format.itag == itag
    }).pipe(res);
    //res.status(200);
});

(async () => {
    /*let info = await ytdl.getInfo("https://www.youtube.com/watch?v=eLIuMysZLeg");
    console.log(info);  */  
})();
  