import "styles/index.scss";
import GyroNorm from "../node_modules/gyronorm/dist/gyronorm.complete";
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

    //GYROSCOPE
    const gn = new GyroNorm();

    imageObj.addEventListener("load", () => {
        gn.init()
            .then(() => {
                gn.start(data => {
                    let currentX = data.dm.gx,
                        currentY = data.dm.gy;

                    x + currentX < 0 || x + currentX > canvas.width / 2
                        ? null
                        : (x = x + currentX);

                    y - currentY < 0 || y - currentY > 315
                        ? null
                        : (y = y - currentY);

                    document.getElementById("x").innerHTML = x.toFixed(2);
                    document.getElementById("y").innerHTML = y.toFixed(2);
                    animate();
                });
            })
            .catch(e => {
                // for devices without gyroscope
                console.log(e);
                ctx.drawImage(imageObj, 10, 10, imageWidth, imageHeight);
            });
    });
});
