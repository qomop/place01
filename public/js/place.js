

$(document).ready(() => {
    var socket = io()
    
    var canvas1 = $("#place1")[0]
    var canvas = $("#place")[0]
    
    var ctxF = canvas1.getContext("2d")
    var ctx = canvas.getContext("2d")
    ctx.globalAlpha = 1;
    
    
    
    
    
    document.getElementById("outputXY").innerHTML="x    y "  ;

    

    var trackX;
    var trackY;

    var fillX
    var fillY

    socket.on("canvas", canvasData => {
      canvasData.forEach((row, rowIndex) => {
        // console.log(row)
        row.forEach((col, colIndex) => {
          // console.log(colIndex, rowIndex)
          ctx.fillStyle = col
          ctx.fillRect(colIndex * 10, rowIndex * 10, 10, 10)
        })
      })
    })
  
    $("#submit").click(() => {
      socket.emit("color", {
        col: parseInt($("#x-coord").val()),
        row: parseInt($("#y-coord").val()),
        color: $("#color").val()
      })
    })

 

 


    function track(e) {
        var pos = getMousePos(canvas, e);
        posx = pos.x;
        posy = pos.y;

      
        trackX= Math.floor(posx/10 +1 );
        trackY= Math.floor(posy/10 +1 );

       
        
        if (posx > 0 && posx < 500 && posy > 0 && posy < 500) {
          document.getElementById("outputXY").innerHTML="x:" + trackX +"       " + "  y:" + trackY;
          
          
        } else{
          document.getElementById("outputXY").innerHTML="x    y "  ;
        }
        
         /* 
        if (posy > 0 && posy < 500 ) {
          document.getElementById("outputY").innerHTML=trackY;
        } else{
          document.getElementById("outputY").innerHTML="-"
        }

      /*
        var trackY= Math.floor(posy);
        document.getElementById("outputY").innerHTML=trackY;
        /*
        console.log(posx);
        console.log(posy);
        
       /* 
        
        */
    }
    window.addEventListener('mousemove', track, false); 
    
    document.addEventListener("click", mouseClick);
    

    function mouseClick(e) {
      /*check if user clicked inside canvas*/
      if (posx > 0 && posx < 500 && posy > 0 && posy < 500) {
        
        var mouseClickX = trackX;
        var mouseClickY = trackY;
        document.getElementById("x-coord").value = trackX;
        document.getElementById("y-coord").value = trackY;
        /*
        document.getElementById("x-coord").disabled = true;
        document.getElementById("y-coord").disabled = true;
        */
        drawOnMouseClick();
        
      }    
    }  



  function drawOnMouseClick(){
    /*
    ctxF.clearRect(0, 0, ctxF.width, ctxF.height);
    
    ctxF.fillStyle = "#000000";
    */
    ctxF.clearRect(fillX-2, fillY-2, 15, 15)
    
   
    
     fillX = (trackX * 10) -10
     fillY = (trackY * 10) -10

    /*
    ctxF.fillStyle = "#000000";
    */
   

    ctxF.strokeRect(fillX, fillY, 10, 10);
    
   

  }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
            y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
        };
    }




  })