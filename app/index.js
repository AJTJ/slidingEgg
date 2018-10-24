import "styles/index.scss";
// import GyroNorm from "../node_modules/gyronorm/dist/gyronorm.complete";
import eggPng from "../assets/images/egg.png";

document.addEventListener("DOMContentLoaded", () => {
    //CANVAS
    let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        imageObj = new Image(),
        imageHeight = 170,
        imageWidth = 170,
        x = 10,
        y = 10;

    imageObj.src = eggPng;

    //ANIMATION
    let animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imageObj, x, y, imageWidth, imageHeight);
    };

    //DEVICE MOTION
    imageObj.addEventListener("load", () => {
        window.addEventListener("devicemotion", deviceMotion);

        function deviceMotion(event) {
            let curX = event.accelerationIncludingGravity.x;
            let curY = event.accelerationIncludingGravity.y;

            x - curX < 0 || x - curX > canvas.width / 2 ? null : (x = x - curX);
            y + curY < 0 || y + curY > 315 ? null : (y = y + curY);

            animate();

            document.getElementById("x").innerHTML = x.toFixed(2);
            document.getElementById("y").innerHTML = y.toFixed(2);
        }
    });

    //GYROSCOPE
    // const gn = new GyroNorm();

    // imageObj.addEventListener("load", () => {
    //     gn.init()
    //         .then(() => {
    //             gn.start(data => {
    //                 // let curX = data.dm.gx,
    //                 //     curY = data.dm.gy;
    //                 // x + curX < 0 || x + curX > canvas.width / 2
    //                 //     ? null
    //                 //     : (x = x + curX);
    //                 // y - curY < 0 || y - curY > 315 ? null : (y = y - curY);
    //                 // animate();
    //                 // document.getElementById("curX").innerHTML = curX.toFixed(2);
    //                 // document.getElementById("curY").innerHTML = curY.toFixed(2);
    //                 // document.getElementById("x").innerHTML = x.toFixed(2);
    //                 // document.getElementById("y").innerHTML = y.toFixed(2);
    //             });
    //         })
    //         .catch(e => {
    //             // for devices without gyroscope
    //             console.log(e);
    //             ctx.drawImage(imageObj, 10, 10, imageWidth, imageHeight);
    //         });
    // });
});
