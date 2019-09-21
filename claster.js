function Claster(){
    this.idElement = "can";
    this.radius = 100;
    this.outCounterColor = "rgba(36,34,34,1)";
    this.innerCounterColor = "rgba(36,34,34,1)";
    this.outBackgroundColor = "rgba(100,100,100,0)";
    this.innerBackgroundColor = "rgba(88,86,86,1)";
    this.valueBackgroundColor = "rgba(98,96,96,1)";
    this.textColor = "rgba(100,0,83,1)";
    this.cricleColor = "rgba(100,0,0,1)";
    this.lineColor = "rgba(0,0,0,1)";
    this.cricleRadius = 2;
    this.maxValue = 100;
    this.types = [function (x,y,xB,yB,center,ctx) {
        ctx.moveTo(xB, yB);
        ctx.lineTo(x,y);
    }, function (x,y,xB,yB,center,ctx) {
        ctx.moveTo(center,center);
        ctx.lineTo(xB,yB);
    },function (x,y,xB,yB,center,ctx) {
       ctx.moveTo(center,center);
       ctx.lineTo(x,y);
    }];
    this.type = 0;

    this.generate = function (content,value) {
            var can = document.getElementById(this.idElement);

            var ctx = can.getContext('2d');

            var center = can.width /2;

            var tun = 360 / content.length;
            var secondSector = this.radius / this.maxValue;

            var x;
            var y ;

            var yA = [];
            var xA = [];
            var yB = [];
            var xB = [];

            ctx.fillStyle = this.outBackgroundColor;
            ctx.fillRect(0,0,can.width,can.height);
            ctx.beginPath();
            ctx.fillStyle = this.textColor;
            for(var i = 0; i < content.length; i+= 1) {

                y = center + (this.radius * Math.sin((i * tun * Math.PI) / 180));
                x = center + (this.radius * Math.cos((i * tun * Math.PI) / 180));

                if (x > center)
                    ctx.textAlign = "left";
                else
                    ctx.textAlign = "right";
                if(y > center)
                    ctx.fillText(" " + content[i] + " ", x, y + 10 );
                else
                    ctx.fillText(" " + content[i] + " ", x, y );

                yB.push(center + (secondSector * value[i] * Math.sin((i * tun * Math.PI) / 180)));
                xB.push(center + (secondSector * value[i] * Math.cos((i * tun * Math.PI) / 180)));

                yA.push(y);
                xA.push(x);


            }
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle = this.outCounterColor;
            ctx.fillStyle = this.innerBackgroundColor;

            ctx.moveTo(xA[0],yA[0]);
            for(i = 1; i<xA.length;i++){
                ctx.lineTo(xA[i],yA[i]);
            }
            ctx.lineTo(xA[0],yA[0]);

            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = this.innerCounterColor;
            ctx.fillStyle = this.valueBackgroundColor;

            ctx.moveTo(xB[0],yB[0]);
            for(i = 1; i<xB.length;i++){
                ctx.lineTo(xB[i],yB[i]);
            }
            ctx.lineTo(xB[0],yB[0]);

            ctx.stroke();
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = this.lineColor;
            for(i = 0;i < xA.length;i++){
                this.types[this.type](xA[i], yA[i], xB[i], yB[i], center, ctx);
            }
            ctx.stroke();

            ctx.fillStyle = this.cricleColor;
            for(i = 0;i<xB.length;i++){
                ctx.beginPath();
                ctx.arc(xB[i],yB[i],this.cricleRadius,0,Math.PI * 2);
                ctx.fill();
            }



        };
}
