/**
 * Application entry point
 */

// Load application styles
import "styles/index.scss";

// ================================
// START YOUR APP HERE
// ================================

import * as GyroNorm from "../node_modules/gyronorm/dist/gyronorm.complete";

document.addEventListener("DOMContentLoaded", () => {
    //CANVAS
    let elementWidth = 320,
        canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        imageObj = new Image(),
        height = 50,
        width = 150,
        x = 10,
        y = 10;

    imageObj.src = "./assets/images/egg.png";
    ctx.imageSmoothingEnabled = true;

    //ANIMATION
    let animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.width);
        ctx.drawImage(imageObj, x, y, width, height);
    };

    //GYROSCOPE
    const gn = new GyroNorm();

    imageObj.onload = () => {
        gn.init()
            .then(() => {
                gn.start(data => {
                    let currentX = data.dm.gx,
                        currentY = data.dm.gy;

                    x + currentX < 0 || x + currentX > elementWidth / 2
                        ? null
                        : (x = x + currentX);

                    y - currentY < 0 || y - currentY > 100
                        ? null
                        : (y = y - currentY);

                    document.getElementById("x").innerHTML = x.toString();
                    document.getElementById("y").innerHTML = y.toString();
                    animate();
                });
            })
            .catch(e => {
                // for devices without gyroscope
                console.log(e);
                ctx.drawImage(imageObj, 10, 10, width, height);
            });
    };
});
