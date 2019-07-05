//曲线函数
//银河星系曲线
function newGalaxy (_n, _axis1, _axis2, _armsAngle, _bulbSize, _ellipticity)
{
    var n=(typeof _n === 'undefined')?10000:_n;
    var axis1=(typeof _axis1 === 'undefined')?(60+Math.random()*20):_axis1;
    var axis2=(typeof _axis2 === 'undefined')?(axis1+20+Math.random()*40):_axis2;

    var maja,mina;
    axis1>axis2?(maja=axis1,mina=axis2):
        axis1==axis2?(maja=axis1+1,mina=axis2):(maja=axis2,mina=axis1);
    var armsAngle=(typeof _armsAngle === 'undefined')?((Math.random()*2-1)>0?1:-1)*12+3:_armsAngle;
    var bulbSize=(typeof _bulbSize === 'undefined')?Math.random()*.6:_bulbSize>1?1:_bulbSize<0?0:_bulbSize;
    var ellipticity=(typeof _ellipticity === 'undefined')?.2+Math.random()*.2:_ellipticity>1?1:_ellipticity<0?0:_ellipticity;

    var stars=[];

    for(var i=0;i<n;i++){

        var dist=Math.random();
        var angle=(dist-bulbSize)*armsAngle;

        //ellipse parameters
        var a=maja*dist;
        var b=mina*dist;
        var e=Math.sqrt(a*a-b*b)/a;
        var phi=ellipticity*Math.PI/2*(1-dist)*(Math.random()*2-1);
        //create point on the ellipse with polar coordinates
        //1. random angle from the center
        var theta=Math.random()*Math.PI*2;
        //360°随机
        //2. deduce radius from theta in polar coordinates, from the CENTER of an ellipse, plus variations
        //半径
        var radius=Math.sqrt(b*b/(1-e*e*Math.pow(Math.cos(theta),2)))*(1+Math.random()*.1);
        //3. then shift theta with the angle offset to get arms, outside the bulb

        if(dist>bulbSize)theta+=angle;

        //convert to cartesian coordinates
        stars.push({
            x:Math.cos(phi)*Math.cos(theta)*radius,
            y:Math.cos(phi)*Math.sin(theta)*radius,
            z:0//Math.sin(phi)*radius
        });
    }

    return stars;

}
//费马螺线
//参数：a初始的臂距    n：螺线圈数
function drawFermatsSpiral(x0, y0, z0, a, n)
{
    var stars=[];
    for(var s=0;s<10;s++)
    {
        for (var θ = 0; θ < 180*n; ++θ)
        {
            var ρ = a*Math.sqrt(θ*Math.PI/180);
            var x = ρ*Math.cos (θ*Math.PI/180)*5;
            var z = ρ*Math.sin (θ*Math.PI/180)*5;
            stars.push
            ({
                x:x0+x,
                y:y0,
                z:z0+z
            });
            stars.push
            ({
                x:x0-x,
                y:y0,
                z:z0-z
            });

        }
    }
    return stars;
}

/*利萨如曲线*/
/*参数：a图形size，p,q参数，建议p奇q偶，差值+-1*/
function drawLissajous(x0, y0, z0, a, p, q)
{
    var stars=[];
    for (var θ = 0; θ < 360; ++θ) {
        var x = a*Math.sin(p*θ*Math.PI/180);
        var z = a*Math.sin(q*θ*Math.PI/180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
    }
    return stars;
}

/*心形线*/
/*参数 a=size*/
function drawCardioid(x0, y0, z0,a)
{
    var stars=[];
    for (var θ = 0; θ < 360; ++θ)
    {
        var ρ = a * (1 - Math.cos(θ * Math.PI / 180));
        var x = ρ * Math.cos(θ * Math.PI / 180);
        var z = ρ * Math.sin(θ * Math.PI / 180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
    }
    return stars;
}

/*玫瑰线一型*/
/*参数：a=size  n单数单叶，双数双叶   叶子数=2n*/
function drawRose1(x0, y0, z0, a, n)
{
    var stars=[];
    for (var θ = 0; θ < 360; ++θ) {
        var ρ = a*Math.sin(n*θ*Math.PI/180);
        var x = ρ*Math.cos(θ*Math.PI/180);
        var z = ρ*Math.sin(θ*Math.PI/180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
    }
    return stars;
}

/*玫瑰先二型*/
/*参数：a=sizes L=叶子数 W=叶子闭合周期=宽度 ； L与W有个偶数  叶子数=2L*/
function drawRose2(x0, y0, z0, a, L, W)
{
    var stars=[];
    for (var θ = 0; θ < 360; ++θ) {
        var ρ = a*Math.sin(L*θ/W*Math.PI/180);
        var x = ρ*Math.cos(θ*Math.PI/180);
        var z = ρ*Math.sin(θ*Math.PI/180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
    }
    return stars
}

/*伯努利卵形线之一双纽线*/
/*参数： a=sizes*/
function drawLemniscate(x0, y0, z0, a)
{
    var stars=[];
    for (var θ = 0; θ < 360; ++θ) {
        var ρ = a*Math.sqrt(Math.sin(θ*Math.PI/90));
        var x = ρ*Math.cos(θ*Math.PI/180);
        var z = ρ*Math.sin(θ*Math.PI/180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
        stars.push
        ({
            x:x0-x,
            y:y0,
            z:z0-z
        });
    }
    return stars;
}

/*克莱线*/
/*参数：  a=sizes  n不明*/
function drawCayleysSextic(x0, y0, z0, a, n)
{
    var stars=[];
    for (var θ = 0; θ < 360*n; ++θ) {
        var ρ = a*Math.pow(Math.cos(θ*Math.PI/720),3);
        var x = ρ*Math.cos(θ*Math.PI/180);
        var z = ρ*Math.sin(θ*Math.PI/180);
        stars.push
        ({
            x:x0+x,
            y:y0,
            z:z0+z
        });
    }
    return stars;
}
/*阿基米德螺旋线压轴*/
/*参数：a为臂距，n为螺线圈数*/
function drawArchimedeanSpiral(x0, y0, z0, a, n)
{
    var stars=[];
    //   for(var s=0;s<10;s++)
    {
        for (var θ = 0; θ < 360*n; ++θ) {
            var ρ = a*θ/360;
            var x = ρ*Math.cos(θ*Math.PI/180)*2;
            var z = ρ*Math.sin(θ*Math.PI/180)*2;
            stars.push
            ({
                x:x0+x,
                y:y0,
                z:z0+z
            });
        }

    }
    return stars
}
/*等角曲线*/
function IsAngle(x0,y0,z0,n,a,b)
{
    var stars=[];
    for(var s=0;s<4;s++)
    {
        for (var θ = 0; θ < 180*n; ++θ)
        {
            var ρ = Math.pow(b, (θ*Math.PI/180))
            var x = ρ*Math.cos(θ*Math.PI/180)
            var z = ρ*Math.sin(θ*Math.PI/180);
            stars.push
            ({
                x:x0+x,
                y:y0,
                z:z0+z
            });
            stars.push
            ({
                x:x0-x,
                y:y0,
                z:z0-z
            });
        }
    }
    return stars;

}
