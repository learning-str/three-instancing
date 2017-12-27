//
//  Takram Confidential
//
//  Copyright (C) 2017-Present Satoru Osawa
//
//  All information contained herein is, and remains the property of Takram.
//  The intellectual and technical concepts contained herein are proprietary to
//  Takram and may be covered by Japan and Foreign Patents, patents in process,
//  and are protected by trade secret or copyright law. Dissemination of this
//  information or reproduction of this material is strictly forbidden unless
//  prior written permission is obtained from Takram. Access to the source code
//  contained herein is hereby forbidden to anyone except current Takram
//  employees, managers or contractors who have executed Confidentiality and
//  Non-disclosure agreements explicitly covering such access.
//
//  The copyright notice above does not evidence any actual or intended
//  publication or disclosure of this source code, which includes information
//  that is confidential and/or proprietary, and is a trade secret, of Takram.
//  Any reproduction, modification, distribution, public performance, or public
//  display of or through use of this source code without the express written
//  consent of Takram is strictly prohibited, and in violation of applicable
//  laws and international treaties. The receipt or possession of this source
//  code and/or related information does not convey or imply any rights to
//  reproduce, disclose or distribute its contents, or to manufacture, use, or
//  sell anything that it may describe, in whole or in part.
//

// import DrawingTex from './module/drawing-tex.js';
// import ForceTex from './module/force-tex.js';
import ParticleTex from './module/particle-tex.js';
import TextTex from './module/text-tex.js';

const SIZE = {width: window.innerWidth,
              height: window.innerWidth}

const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(SIZE.width, SIZE.height);
RENDERER.setClearColor(0xe5e5e5, 1.0);
document.body.appendChild(RENDERER.domElement);

const PARTICLE_TEX = new ParticleTex(SIZE);
const TEXT_TEX = new TextTex(SIZE);

const SCENE = new THREE.Scene();
const CAMERA = new THREE.Camera();
const MATERIAL = new THREE.MeshBasicMaterial();

setup();
setTimeout(function() {draw()} ,300);

function setup() {
  PARTICLE_TEX.setup();
  // TEXT_TEX.setup();
  const geometry = new THREE.PlaneGeometry(SIZE.width, SIZE.height);
  const material = new THREE.MeshBasicMaterial();
  MATERIAL.map = PARTICLE_TEX.texture;

  const mesh = new THREE.Mesh(geometry, MATERIAL);
  SCENE.add(mesh);
}

function draw() {
  // MATERIAL.map = TEXT_TEX.texture;
  PARTICLE_TEX.render(RENDERER);
  RENDERER.render(SCENE, CAMERA);
  requestAnimationFrame(draw);
}

// const PARTICLE_TEX_SIZE = 512;
// const CANVAS_WIDTH = 750;
// const CANVAS_HEIGHT = 750;
// let START_MILLIS;
//
// // scene
// const SCENE = new THREE.Scene();
//
// // camera
// const FOV = 60;
// const ASPECT = CANVAS_WIDTH / CANVAS_HEIGHT;
// const NEAR = 1;
// const FAR = 1000;
// const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
// CAMERA.position.set(0, 0, 50);
//
// // renderer
// const RENDERER = new THREE.WebGLRenderer();
// RENDERER.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
// RENDERER.setClearColor(0xffffff, 1);
// document.body.appendChild(RENDERER.domElement);
//
// let BOX_MESH;
//
// // fbo
// const FORCE_TEX = new ForceTex(PARTICLE_TEX_SIZE);
// const PARTICLE_TEX = new ParticleTex(CAMERA, RENDERER, PARTICLE_TEX_SIZE);
// const DRAWING_TEX = new DrawingTex(CAMERA, RENDERER, PARTICLE_TEX_SIZE,
//                                    CANVAS_WIDTH, CANVAS_HEIGHT);
//
// setup();
// setTimeout(function() {draw()} ,300);
//
// function setup() {
//   FORCE_TEX.setup();
//   PARTICLE_TEX.setup(FORCE_TEX.texture, PARTICLE_TEX_SIZE);
//   DRAWING_TEX.setup(PARTICLE_TEX.texture);
//
//   const geometry = new THREE.CubeGeometry(30, 30, 30);
//   const material = new THREE.MeshBasicMaterial({map: DRAWING_TEX.texture});
//   BOX_MESH = new THREE.Mesh(geometry, material);
//   SCENE.add(BOX_MESH);
//   START_MILLIS = new Date().getTime();
// }
//
// let NEXT_MILLIS = 2000;
// function draw() {
//   BOX_MESH.rotation.x += 0.001;
//   BOX_MESH.rotation.y += 0.001;
//
//   const ellapsedMillis = new Date().getTime() - START_MILLIS;
//   let changedFlag = false;
//   if (ellapsedMillis > NEXT_MILLIS && DRAWING_TEX.particleNum < 100000) {
//     DRAWING_TEX.particleNum = DRAWING_TEX.particleNum * 2;
//     DRAWING_TEX.updateParticles();
//     FORCE_TEX.randomForce();
//     PARTICLE_TEX.forceTexture = FORCE_TEX.texture;
//     PARTICLE_TEX.particleNum = DRAWING_TEX.particleNum;
//     PARTICLE_TEX.particleDivitionFlag = 1;
//     const interval = 1000;
//     NEXT_MILLIS += interval;
//     changedFlag = true;
//   }
//
//   PARTICLE_TEX.render();
//   DRAWING_TEX.particleTexture = PARTICLE_TEX.texture;
//   DRAWING_TEX.render();
//   PARTICLE_TEX.update();
//
//   if (changedFlag) {
//     FORCE_TEX.zeroForce();
//     PARTICLE_TEX.forceTexture = FORCE_TEX.texture;
//     PARTICLE_TEX.particleDivitionFlag = 0;
//   }
//   RENDERER.render(SCENE, CAMERA);
//   requestAnimationFrame(draw);
// }
