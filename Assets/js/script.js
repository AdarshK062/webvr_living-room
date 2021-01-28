/* 2D Properties */

var selected_element;
var teleportation_flag=true;
var click_counter=0;
var selected_object;
var id;
var pre_position;
var pos;

function position(){
    hide('objectmenu');
    show('moving');
    hide('rotating');
    hide('scaling_options');
}

function scaling(){
    hide('objectmenu');
    show('scaling_options');
    hide('rotating');
    hide('moving');
}

function rotation(){
    hide('objectmenu');
    hide('rotating');
    show('moves');
    hide('moving');
    hide('scaling_options');
}

function change_rotation(direction, flag){
    var value;
    if (flag=='+'){
        value=-5;
    }
    else{
        value=5;
    }
    if(direction=='x'){
        pos=selected_element.getAttribute("rotation");
        pos.x=pos.x+value;
        selected_element.setAttribute("rotation", pos);
    }
    else if(direction=='y'){
        pos=selected_element.getAttribute("rotation");
        pos.y=pos.y+value;
        selected_element.setAttribute("rotation", pos);
    }
    else if(direction=='z'){
        pos=selected_element.getAttribute("rotation");
        pos.z=pos.z+value;
        selected_element.setAttribute("rotation", pos);
    }
}

function change_scale(flag){

    var value;
    if (flag=='+'){
        value=0.1;
    }
    else{
        value=-0.1;
    }
    pos=selected_element.getAttribute("scale");
    pos.x=pos.x+value;
    pos.y=pos.y+value;
    pos.z=pos.z+value;
    selected_element.setAttribute("scale", pos);
}

function change_position(direction, flag){
    var value;
    if (flag=='+'){
        value=-0.1;
    }
    else{
        value=0.1;
    }
    if(direction=='x'){
        pos=selected_element.getAttribute("position");
        pos.x=pos.x+value;
        selected_element.setAttribute("position", pos);
    }
    else if(direction=='y'){
        pos=selected_element.getAttribute("position");
        pos.y=pos.y+value;
        selected_element.setAttribute("position", pos);
    }
    else if(direction=='z'){
        pos=selected_element.getAttribute("position");
        pos.z=pos.z+value;
        selected_element.setAttribute("position", pos);
    }
}

function mouse(x){
    x.click();
}

function hide(x){
    document.getElementById(x).style.display="none";
}

function show(x){
    document.getElementById(x).style.display="block";
}

function brown() {
    if(selected_element!=undefined){
        selected_element.setAttribute("mtl", "");
        selected_element.setAttribute('material', 'color', '#7b3911');
    }
}

function red(){
    if(selected_element!=undefined){
        selected_element.setAttribute("mtl", "");
        selected_element.setAttribute('material', 'color', '#3f050e');
    }
}

function green(){
    if(selected_element!=undefined){
        selected_element.setAttribute("mtl", "");
        selected_element.setAttribute('material', 'color', '#23595d');
    }
}

function remove(){
    if(selected_element!=undefined){
        hide('objectmenu');
        selected_element.parentNode.removeChild(selected_element);
        click_counter=0;
    }
}

function objmtl(){
    if(selected_element!=undefined){
        id=selected_element.className+"mtl";
        selected_element.setAttribute("mtl",id);
    }
}

function photo(){
    selected_object="#album-";
}

function sofa(){
    selected_object="#sofa-";
}

function chair(){
    selected_object="#chair-";
}

function table(){
    selected_object="#table-";
}

function sofa1(){
    selected_object="#sofa1-";
}

function color(){
    show('colors');
    hide('objects');
    hide('objectmenu');
}

function moveFree(){
  if(selected_element!=undefined){
    selected_element.removeAttribute('dragnrotate1');
    selected_element.removeAttribute('dragnrotate2');
    selected_element.removeAttribute('dragnrotate3');
    selected_element.setAttribute('grabbable', '');
  }
  hide('colors');
  hide('objects');
  hide('objectmenu');
}

function rots(x){
  if(selected_element!=undefined){
      if(x=='x'){
        //selected_element.setAttribute("dynamic-body", {angularDamping: 1, linearDamping: 0.99});
        selected_element.setAttribute('dragnrotate2', '');
        selected_element.removeAttribute('dragnrotate1');
        selected_element.removeAttribute('dragnrotate3');
      }
      else if(x=='y'){
        //selected_element.setAttribute("dynamic-body", {angularDamping: 1, linearDamping: 0.99});
        selected_element.setAttribute('dragnrotate1', '');
        selected_element.removeAttribute('dragnrotate2');
        selected_element.removeAttribute('dragnrotate3');
      }
      else if(x=='z'){
        //selected_element.setAttribute("dynamic-body", {angularDamping: 1, linearDamping: 0.99});
        selected_element.setAttribute('dragnrotate3', '');
        selected_element.removeAttribute('dragnrotate2');
        selected_element.removeAttribute('dragnrotate1');
      }
    }
}

function movesOn(){
  hide('colors');
  hide('objects');
  hide('objectmenu');
  show('rotating');
  hide('moves');
}

/* 3D Properties */

let camerarotation, cameraposition;

let convert = (data) => {
    let result = {};
    result.x = 0;
    result.y = data.y * 57.2958;
    result.z = data.z * 57.2958;
    return result;
};

let convert_sofa = (data) => {
    let result = {};
    result.x = 0;
    result.y = data.y * 57.2958+180;
    result.z = data.z * 57.2958;
    return result;
};

let convert_pos = (data1,data2) => {
    let dis=Math.sqrt(Math.pow((data1.x-data2.x), 2)+Math.pow(data1.z-data2.z, 2))
    let t=3/dis;
    let result = {};
    result.x = ((1-t)*data1.x+t*data2.x);
    result.y = 1.6;
    result.z = ((1-t)*data1.z+t*data2.z);
    return result;
};

function teleportationON(){
    document.getElementById("toggle").checked = true;
    teleportation_flag=true;
    hide('objects');
    hide('objectmenu');
    hide('colors');
    document.getElementById('collapse').style.backgroundColor  = "deepskyblue";
    document.getElementById('collapse1').style.backgroundColor  = "deepskyblue";
    document.getElementById('collapse2').style.backgroundColor  = "deepskyblue";
    document.getElementById('collapse3').style.backgroundColor  = "deepskyblue";
    click_counter=0;
}

function teleportationOFF(){
    document.getElementById("toggle").checked = false;
    teleportation_flag=false;
    show('objects');
    hide('objectmenu');
    hide('colors');
    document.getElementById('collapse').style.backgroundColor  = "#ff427b";
    document.getElementById('collapse1').style.backgroundColor  = "#ff427b";
    document.getElementById('collapse2').style.backgroundColor  = "#ff427b";
    document.getElementById('collapse3').style.backgroundColor  = "#ff427b";
    click_counter=0;
}

AFRAME.registerComponent('rotation-reader', {
    tick: function () {
        camerarotation = this.el.object3D.rotation;
        cameraposition = this.el.object3D.position;
    }
});

AFRAME.registerComponent('log', {
    init: function() {

        $('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                teleportationON();
            }
            else if($(this).prop("checked") == false){
                teleportationOFF();
            }
        });

        document.getElementById("ground").addEventListener("click", (event) => {

            hide('objects');
            hide('objectmenu');
            hide('colors');
            hide('rotating');
            hide('moving');
            hide('scaling_options');

            if(teleportation_flag==false){
                if(selected_object==undefined) {teleportationON();}

                if(selected_object!=undefined){
                    
                    let position = {
                        x: event.detail.intersection.point.x,
                        y: 0.1,
                        z: event.detail.intersection.point.z
                    };

                    let scene = document.querySelector('a-scene');
                    let object = document.createElement('a-obj-model');

                    object.setAttribute("src", selected_object+"obj");
                    object.setAttribute("mtl", selected_object+"mtl");
                    object.setAttribute("class",selected_object);
                    object.setAttribute("position", position);
                    
                    if(selected_object=='#sofa-'){
                        object.setAttribute("rotation", convert_sofa(camerarotation));
                    }
                    else if(selected_object=='#album-'){
                        object.setAttribute("scale", '0.01 0.01 0.01');
                    }
                    else{
                        object.setAttribute("rotation", convert(camerarotation));
                    }
                    //object.setAttribute("dynamic-body", {angularDamping: 1, linearDamping: 0.99});
                    //object.setAttribute('dragnrotate2', '');
                    object.setAttribute('shadow', { cast: true });
                    object.setAttribute('shadow', { receive: true });
                    selected_element=undefined;
                    selected_object=undefined;

                    object.addEventListener("click", function () {
                        selected_element=object;
                        hide('objects');
                        show('objectmenu');
                        hide('colors');
                        hide('rotating');
                        hide('moving');
                        hide('scaling_options');
                        hide('moves');
                        selected_element.removeAttribute('grabbable');
                        // selected_element.removeAttribute('dragnrotate1');
                        // selected_element.removeAttribute('dragnrotate2');
                        // selected_element.removeAttribute('dragnrotate3');
                    });
 
                    scene.appendChild(object);
                    teleportationON();
                }
                click_counter=0;
            }

            // else{
            //     if(click_counter>=2){
                    
            //         let camposition = {
            //             x: event.detail.intersection.point.x,
            //             y: 1.6,
            //             z: event.detail.intersection.point.z
            //         };

            //         var cam = document.querySelector("#cameraPositions1");
            //         cam.setAttribute("position",camposition);
            //         click_counter=0;
            //     }
            //     else{
            //         click_counter+=1;
            //     }
            // }
        });

    }
});

AFRAME.registerComponent("foo", {
    init: function () {
      var view = document.getElementById("button");
      var plane1 = document.getElementById("curtain-plane1");
      var cylinder = document.getElementById("curtain-cylinder");
      var plane2 = document.getElementById("curtain-plane2");
      var cone1 = document.getElementById("curtain-cone1");
      var cone2 = document.getElementById("curtain-cone2");
      var cone3 = document.getElementById("curtain-cone3");
      var cone4 = document.getElementById("curtain-cone4");
      var light = document.getElementById("light");
      var discontinuousPlane1 = document.querySelector("#discontinuous-plane1");
      var discontinuousPlane2 = document.querySelector("#discontinuous-plane2");
      var discontinuousPlane3 = document.querySelector("#discontinuous-plane3");
      var discontinuousPlane4 = document.querySelector("#discontinuous-plane4");
      var discontinuousPlane5 = document.querySelector("#discontinuous-plane5");
      var discontinuousPlane6 = document.querySelector("#discontinuous-plane6");
      var discontinuousPlane7 = document.querySelector("#discontinuous-plane7");
      var discontinuousPlane8 = document.querySelector("#discontinuous-plane8");
      var discontinuousPlane9 = document.querySelector("#discontinuous-plane9");
      var discontinuousPlane10 = document.querySelector("#discontinuous-plane10");
      var discontinuousPlane11 = document.querySelector("#discontinuous-plane11");
      var discontinuousPlane12 = document.querySelector("#discontinuous-plane12");
      var discontinuousPlane13 = document.querySelector("#discontinuous-plane13");
      var discontinuousPlane14 = document.querySelector("#discontinuous-plane14");
      var discontinuousPlane15 = document.querySelector("#discontinuous-plane15");
      var discontinuousPlane16 = document.querySelector("#discontinuous-plane16");
      var discontinuousPlane17 = document.querySelector("#discontinuous-plane17");
      var discontinuousPlane18 = document.querySelector("#discontinuous-plane18");
      var discontinuousPlane19 = document.querySelector("#discontinuous-plane19");
      var discontinuousPlane20 = document.querySelector("#discontinuous-plane20");
      var discontinuousPlane21 = document.querySelector("#discontinuous-plane21");
      var discontinuousPlane22 = document.querySelector("#discontinuous-plane22");
      var discontinuousPlane23 = document.querySelector("#discontinuous-plane23");
      var discontinuousPlane24 = document.querySelector("#discontinuous-plane24");
      var discontinuousPlane25 = document.querySelector("#discontinuous-plane25");
      var discontinuousPlane26 = document.querySelector("#discontinuous-plane26");
      var flag = 0;
      view.addEventListener("click", function (evt) {
        if(flag === 0) {
          plane1.emit("startAnimation");
          plane2.emit("startAnimation");
          cone1.emit("startAnimation");
          cone2.emit("startAnimation");
          cone3.emit("startAnimation");
          cone4.emit("startAnimation");
          discontinuousPlane1.emit("startAnimation");
          discontinuousPlane2.emit("startAnimation");
          discontinuousPlane3.emit("startAnimation");
          discontinuousPlane4.emit("startAnimation");
          discontinuousPlane5.emit("startAnimation");
          discontinuousPlane6.emit("startAnimation");
          discontinuousPlane7.emit("startAnimation");
          discontinuousPlane8.emit("startAnimation");
          discontinuousPlane9.emit("startAnimation");
          discontinuousPlane10.emit("startAnimation");
          discontinuousPlane11.emit("startAnimation");
          discontinuousPlane12.emit("startAnimation");
          discontinuousPlane13.emit("startAnimation");
          discontinuousPlane14.emit("startAnimation");
          discontinuousPlane15.emit("startAnimation");
          discontinuousPlane16.emit("startAnimation");
          discontinuousPlane17.emit("startAnimation");
          discontinuousPlane18.emit("startAnimation");
          discontinuousPlane19.emit("startAnimation");
          discontinuousPlane20.emit("startAnimation");
          discontinuousPlane21.emit("startAnimation");
          discontinuousPlane22.emit("startAnimation");
          discontinuousPlane23.emit("startAnimation");
          discontinuousPlane24.emit("startAnimation");
          discontinuousPlane25.emit("startAnimation");
          discontinuousPlane26.emit("startAnimation");
          
          setTimeout(function(){ 
              light.setAttribute('light','type: directional; color: #FFF; intensity: 0.1" position="-0.5 1 1"');
          }, 2400);
          flag = 1
        }
        else {
          plane1.emit("endAnimation");
          plane2.emit("endAnimation");
          cone1.emit("endAnimation");
          cone2.emit("endAnimation");
          cone3.emit("endAnimation");
          cone4.emit("endAnimation");
          discontinuousPlane1.emit("endAnimation");
          discontinuousPlane2.emit("endAnimation");
          discontinuousPlane3.emit("endAnimation");
          discontinuousPlane4.emit("endAnimation");
          discontinuousPlane5.emit("endAnimation");
          discontinuousPlane6.emit("endAnimation");
          discontinuousPlane7.emit("endAnimation");
          discontinuousPlane8.emit("endAnimation");
          discontinuousPlane9.emit("endAnimation");
          discontinuousPlane10.emit("endAnimation");
          discontinuousPlane11.emit("endAnimation");
          discontinuousPlane12.emit("endAnimation");
          discontinuousPlane13.emit("endAnimation");
          discontinuousPlane14.emit("endAnimation");
          discontinuousPlane15.emit("endAnimation");
          discontinuousPlane16.emit("endAnimation");
          discontinuousPlane17.emit("endAnimation");
          discontinuousPlane18.emit("endAnimation");
          discontinuousPlane19.emit("endAnimation");
          discontinuousPlane20.emit("endAnimation");
          discontinuousPlane21.emit("endAnimation");
          discontinuousPlane22.emit("endAnimation");
          discontinuousPlane23.emit("endAnimation");
          discontinuousPlane24.emit("endAnimation");
          discontinuousPlane25.emit("endAnimation");
          discontinuousPlane26.emit("endAnimation");
          
          setTimeout(function(){ 
              light.setAttribute('light','type: directional; color: #FFF; intensity: 0.6" position="-0.5 1 1"');
          }, 3000);
          flag = 0;
        }
        console.log('clicked');
      });
    },
  });

  if (window.AFRAME == null) {
    console.error("aframe not found, please import it before this component.");
  }
  
  AFRAME.registerSystem("track-cursor", {
    init: function () {
      this.el.setAttribute("cursor", { rayOrigin: "mouse" });
      this.el.setAttribute("cursor", { color: "black" });
    },
  });
  
  var prev_pos = { x: 0, y: 0, z: 0 };
  
  AFRAME.registerComponent("track-cursor", {
    init: function () {
      this.el.addEventListener("mousedown", (e) => {
        if (this.el.is("cursor-hovered")) {
          this.el.sceneEl.camera.el.setAttribute("look-controls", {
            enabled: false,
          });
  
          this.el.addState("dragging");
        }
      });
  
      this.el.addEventListener("click", (e) => {
        if (this.el.is("dragging")) {
          this.el.sceneEl.camera.el.setAttribute("look-controls", {
            enabled: true,
          });
  
          this.el.removeState("dragging");
        }
      });
    },
  });
  
  AFRAME.registerComponent("dragndrop", {
    dependencies: ["track-cursor"],
  
    init: function () {
      this.range = 0;
  
      this.dist = 0;
  
      this.el.addEventListener("stateadded", (e) => {
        if (e.detail == "dragging") {
          this.range = 0;
  
          this.dist = this.el.object3D.position
  
            .clone()
  
            .sub(this.el.sceneEl.camera.el.object3D.position)
  
            .length();
        }
      });
  
      this.direction = new AFRAME.THREE.Vector3();
  
      this.target = new AFRAME.THREE.Vector3();
  
      document.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) {
          this.range += 0.1;
        } else {
          this.range -= 0.1;
        }
      });
    },
  
    updateDirection: function () {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
    },
  
    updateTarget: function () {
      let camera = this.el.sceneEl.camera.el;
  
      this.target.copy(
        camera.object3D.position
  
          .clone()
  
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    },
  
    tick: function () {
      if (this.el.is("dragging")) {
        this.updateDirection();
  
        this.updateTarget();
  
        this.el.object3D.position.copy(this.target);
      }
    },
  });
  
  AFRAME.registerComponent("dragnrotate1", {
    dependencies: ["track-cursor"],
    init: function () {
      this.range = 0;
  
      this.dist = 0;
  
      this.el.addEventListener("stateadded", (e) => {
        if (e.detail == "dragging") {
          this.range = 0;
  
          this.dist = this.el.object3D.position
  
            .clone()
  
            .sub(this.el.sceneEl.camera.el.object3D.position)
  
            .length();
        }
      });
  
      this.direction = new AFRAME.THREE.Vector3();
  
      this.target = new AFRAME.THREE.Vector3();
  
      document.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) {
          this.range += 0.1;
        } else {
          this.range -= 0.1;
        }
      });
    },
  
    updateDirection: function () {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
      let point = this.direction.multiplyScalar(this.dist); //what is dist here? maybe this.dist
  
      let x = point["x"] - prev_pos["x"];
      let y = point["y"] - prev_pos["y"];
      let z = point["z"] - prev_pos["z"];
      //console.log("x", x, "y", y, "z", z);
  
      if (x > 0) this.el.object3D.rotateY((-y * 1) / 1000);
      else this.el.object3D.rotateY((y * 1) / 1000);
      prev_pos["x"] = this.direction.multiplyScalar(this.dist)["x"];
      prev_pos["y"] = this.direction.multiplyScalar(this.dist)["y"];
      prev_pos["z"] = this.direction.multiplyScalar(this.dist)["z"];
    },
  
    updateTarget: function () {
      let camera = this.el.sceneEl.camera.el;
  
      this.target.copy(
        camera.object3D.position
  
          .clone()
  
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    },
  
    tick: function () {
      if (this.el.is("dragging")) {
        this.updateDirection();
      }
    },
  });
  
  AFRAME.registerComponent("dragnrotate2", {
    dependencies: ["track-cursor"],
    init: function () {
      this.range = 0;
  
      this.dist = 0;
  
      this.el.addEventListener("stateadded", (e) => {
        if (e.detail == "dragging") {
          this.range = 0;
  
          this.dist = this.el.object3D.position
  
            .clone()
  
            .sub(this.el.sceneEl.camera.el.object3D.position)
  
            .length();
        }
      });
  
      this.direction = new AFRAME.THREE.Vector3();
  
      this.target = new AFRAME.THREE.Vector3();
  
      document.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) {
          this.range += 0.1;
        } else {
          this.range -= 0.1;
        }
      });
    },
  
    updateDirection: function () {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
      let point = this.direction.multiplyScalar(this.dist);
  
      let x = point["x"] - prev_pos["x"];
      let y = point["y"] - prev_pos["y"];
      let z = point["z"] - prev_pos["z"];
      //console.log("x", x, "y", y, "z", z);
  
      if (y > 0) this.el.object3D.rotateX((-x * 1) / 50);
      else this.el.object3D.rotateX((x * 1) / 50);
      prev_pos["x"] = this.direction.multiplyScalar(this.dist)["x"];
      prev_pos["y"] = this.direction.multiplyScalar(this.dist)["y"];
      prev_pos["z"] = this.direction.multiplyScalar(this.dist)["z"];
    },
  
    updateTarget: function () {
      let camera = this.el.sceneEl.camera.el;
  
      this.target.copy(
        camera.object3D.position
  
          .clone()
  
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    },
  
    tick: function () {
      if (this.el.is("dragging")) {
        this.updateDirection();
      }
    },
  });
  
  AFRAME.registerComponent("dragnrotate3", {
    dependencies: ["track-cursor"],
  
    init: function () {
      this.range = 0;
  
      this.dist = 0;
      this.el.addEventListener("stateadded", (e) => {
        if (e.detail == "dragging") {
          this.range = 0;
  
          this.dist = this.el.object3D.position
  
            .clone()
  
            .sub(this.el.sceneEl.camera.el.object3D.position)
  
            .length();
        }
      });
  
      this.direction = new AFRAME.THREE.Vector3();
  
      this.target = new AFRAME.THREE.Vector3();
  
      document.addEventListener("wheel", (e) => {
        if (e.deltaY < 0) {
          this.range += 0.1;
        } else {
          this.range -= 0.1;
        }
      });
    },
  
    updateDirection: function () {
      this.direction.copy(this.el.sceneEl.getAttribute("raycaster").direction);
      let point = this.direction.multiplyScalar(this.dist);
  
      let x = point["x"] - prev_pos["x"];
      let y = point["y"] - prev_pos["y"];
      let z = point["z"] - prev_pos["z"];
      //console.log("x", x, "y", y, "z", z);
  
      if (x > 0) this.el.object3D.rotateZ((-z * 1) / 7000);
      else this.el.object3D.rotateZ((z * 1) / 7000);
  
      prev_pos["x"] = this.direction.multiplyScalar(this.dist)["x"];
      prev_pos["y"] = this.direction.multiplyScalar(this.dist)["y"];
      prev_pos["z"] = this.direction.multiplyScalar(this.dist)["z"];
    },
  
    updateTarget: function () {
      let camera = this.el.sceneEl.camera.el;
  
      this.target.copy(
        camera.object3D.position
  
          .clone()
  
          .add(this.direction.clone().multiplyScalar(this.dist + this.range))
      );
    },
  
    tick: function () {
      if (this.el.is("dragging")) {
        this.updateDirection();
      }
    },
  });