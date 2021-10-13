document.querySelector("#download").addEventListener("click", async function(){
    let url = document.querySelector("#url").value;

    if (url.length == 0) {
        return;
    }

    try {
        let res = await fetch("/convertSource?youtubeURL="+url);
        let data = await res.json();

        //console.log(data);

        let audios = data.formats.filter(function(obj){
            return obj.mimeType.includes("audio/webm");
        });

        console.log(audios);
        //console.log(data.videoDetails.title);
        //let filename = data.videoDetails.title.replace(/\s{1,}/, "") + ".mp3";
        let filename = data.videoDetails.title + ".mp3";
        console.log(filename);

        let itag = audios[0].itag;

        //notify(`"${filename}" will be downloaded auto`);

        document.querySelector("#download-frame").src = `/download?videoURL=${url}&itag=${itag}&filename=${filename}`;


    } catch (error) {
        alert("OHNO SOMETHING GET MUCH WORNG sjhflsajhfolçiaduch");
    }
});