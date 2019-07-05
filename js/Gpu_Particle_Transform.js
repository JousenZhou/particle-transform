//GPU粒子转化

function GPUtransform(model,space,time,delay,sportdy)//模型数组  空间 时间 延迟  运动轨迹
{
    this.Partice_size=0.5;
    this.speedsd=Math.PI/1800;   //1800旋转速度
                                //初始化
    this.scenc=space;
    this.time=(typeof time === 'undefined')?2000:time;
    this.delay=(typeof delay === 'undefined')?1000:delay;
    this.sportdy=(typeof sportdy === 'undefined')?TWEEN.Easing.Quadratic.InOut:sportdy;

    this.Position32FloatArray = new Array();
    for(var s=0;s<model.length;s++)
    {
        this.Position32FloatArray.push(model_exchance_Float32Array(model[s]))
    }
    this.Position_After=model_Quantity_unification(this.Position32FloatArray);//存储目标


    this.sizes = new Float32Array(this.Position_After[0].length);//浮点数组
    for (var i = 0; i <  this.Position_After[0].length; i++) //
    {
        this.sizes[i] = 1.0;
    }

    this.Geometry =new THREE.BufferGeometry().fromGeometry(new THREE.Geometry());
    this.Geometry.addAttribute('position',  new THREE.BufferAttribute(this.Position_After[0], 3));
    this.Geometry.addAttribute('position2', new THREE.BufferAttribute(this.Position_After[1], 3));
    this.Geometry.addAttribute('size', new THREE.BufferAttribute( this.sizes, 1));
    this.particleSystem;    //mesh
    this.Partice( this.Geometry,this.scenc);

}
var model_exchance_Float32Array=function(e)//模型抽离顶点数组且转Float32Array
{
    var Model_Float32Array = new Float32Array( e.vertices.length * 3);
    var num=0;
    for(var k=0 ; k< e.vertices.length*3 ; k++)
    {
        Model_Float32Array[k]  = e.vertices[num].x;
        Model_Float32Array[k+1]= e.vertices[num].y;
        Model_Float32Array[k+2]= e.vertices[num].z;
        num++;
        k=k+2;
    }
    var BufferGeometry = new THREE.BufferGeometry().fromGeometry(e);
    BufferGeometry.attributes.position.array= Model_Float32Array;
    BufferGeometry.attributes.position.array.needsUpdate=true;
    var Len =  BufferGeometry.attributes.position.array.length;
    var position = new Float32Array(Len);
    position.set(BufferGeometry.attributes.position.array);
    return position;
}
var model_Quantity_unification=function(e) //模型顶点统一
{
    //寻找顶点数组最大的数组。
    var max=0;
    var max_model;
    var sz=new Array();
    for(var s=0;s<e.length;s++)
    {
        if(e[s].length>max)
        {
            max=e[s].length;
            max_model=e[s];
        }
    }
    //所有数组统一size
    for(var s=0;s<e.length;s++)
    {
        var position_copy = new Float32Array(max);
        position_copy.set(e[s])
        for(var i =  e[s].length, j = 0; i < max;  i++, j++)
        {
            j %=  e[s].length;//j=j%lessLen;
            position_copy[i]   =  position_copy[j];
            position_copy[i+1] =  position_copy[j+1];
            position_copy[i+2] =  position_copy[j+2];
        }
        sz.push(position_copy);
    }
    return sz;
}
GPUtransform.prototype.Partice=function (Geometry,scene)
{

    this.uniforms =
        {
            color:{value: new THREE.Color(0xffffff)},
            val: {value: 0.0},
            ccs:{value:0.0},
            pixelRatio:{type:"f",value:innerHeight}
        };
    this.shaderMaterial = new THREE.ShaderMaterial({
        uniforms:       this.uniforms,
        vertexShader:  document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending:       THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true,
    });

    this.particleSystem = new THREE.Points( this.Geometry,  this.shaderMaterial);
    this.particleSystem.position.y = -15;
    this.particleSystem.position.z=28
    this.particleSystem.position.x=20
    this.particleSystem.scale.set(3,3,3)
   // console.log(this.particleSystem)
    scene.add( this.particleSystem);
}

GPUtransform.prototype.Firstchance=function(particleSystem,galaxy,camera,orbit,css3dscene)
{
    this.pos = {val: 0,x:camera.position.x, y:camera.position.y,z:camera.position.z};
    var s=false;//判断
    tween = new TWEEN.Tween( this.pos).to({val: 1,x: 79.63134991266979, y: -7.8602600992425335, z: 28.079841182794244}, 2000).easing(TWEEN.Easing.Quadratic.InOut).delay(3000).onUpdate(function ()
    {
        particleSystem.material.uniforms.val.value = this.val;
        camera.position.set(this.x,this.y,this.z);
        if(this.val>0.98)
        {
            if(!s)
            {
                document.getElementById("memu").style.display="block";
                //orbit.switchoff(0);
                //orbit.switchoff(1);
                var Main=new Main_interface();
                Main.object.scale.set(0.1,0.1,0.1);
                Main.object.rotateY(Math.PI/180*30)
                Main.object.translateZ(-10)
                css3dscene.add(Main.object)
                s=true;
            }

        }
    });
    tween.start();

    this.po={speeds:  galaxy.speedsd}
    var tween_2 = new TWEEN.Tween( this.po).to({speeds:-Math.PI/1800}, 3000).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function ()
    {
        galaxy.speedsd=this.speeds;
    });
    var tween_2back = new TWEEN.Tween( this.po).to({speeds:Math.PI/1800}, 500).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function ()
    {
        galaxy.speedsd=this.speeds;
    });
    tween_2.chain(tween_2back)
    tween_2.start();



}

GPUtransform.prototype.chance=function(particleSystem,n,size,galaxy,function_)
{

     galaxy.Partice_size=size;
     if(particleSystem.material.uniforms.val.value==0)  //Position2
     {
         var s=false
         this.Geometry.addAttribute('position', new THREE.BufferAttribute(this.Position_After[n], 3));
         tween = new TWEEN.Tween( {val: 0}).to({val: 1}, 1000).easing(TWEEN.Easing.Quadratic.InOut).delay(100).onUpdate(function ()
         {
             particleSystem.material.uniforms.val.value = this.val;
             if(this.val>0.95)
             {
                 if(!s)
                 {
                     if(function_)
                     {
                         function_();
                     }
                     galaxy.Geometry.addAttribute('position2', new THREE.BufferAttribute(galaxy.Position_After[n], 3));
                     particleSystem.material.uniforms.val.value = 0.0;
                     s=true;
                 }
             }
         });
         tween.start();

     }
     else if(particleSystem.material.uniforms.val.value==1)//Position1
     {
         var s=false
         this.Geometry.addAttribute('position2', new THREE.BufferAttribute(this.Position_After[n], 3));
         tween = new TWEEN.Tween( {val: 1}).to({val: 0}, 1000).easing(TWEEN.Easing.Quadratic.InOut).delay(100).onUpdate(function ()
         {
             particleSystem.material.uniforms.val.value = this.val;
             if(this.val<0.05)
             {
                 if(!s)
                 {

                     if(function_)
                     {
                      function_();
                     }
                     galaxy.Geometry.addAttribute('position', new THREE.BufferAttribute(galaxy.Position_After[n], 3));
                     particleSystem.material.uniforms.val.value = 1.0;
                     s=true;
                 }

             }
         });
         tween.start();
     }


}
GPUtransform.prototype.update=function ()
{
    this.time = Date.now() * 0.005;
    if(this.particleSystem)
    {
        this.bufferObj = this.particleSystem.geometry;
       this.particleSystem.rotateY(this.speedsd);
        this.sizes = this.bufferObj.attributes.size.array;
        this.len = this.sizes.length;

        for ( var i = 0; i < this.len; i++ )
        {
            this.sizes[ i ] = 1.5 * ( 2.0 + Math.sin( 0.02 * i + this.time ) )-this.Partice_size;
        }
        this.bufferObj.attributes.size.needsUpdate = true;
    }
  //  console.log(this.Partice_size)
    window.requestAnimationFrame(this.update.bind(this));
}