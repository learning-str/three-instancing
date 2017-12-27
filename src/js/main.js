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

import ParticleTex from './module/particle-tex.js';
import TextTex from './module/text-tex.js';
import Mask from './module/mask.js';

const SIZE = {width: window.innerWidth,
              height: window.innerWidth}

const RENDERER = new THREE.WebGLRenderer();
RENDERER.setSize(SIZE.width, SIZE.height);
RENDERER.setClearColor(0x000000, 1.0);
document.body.appendChild(RENDERER.domElement);

const PARTICLE_TEX = new ParticleTex(SIZE);
const TEXT_TEX = new TextTex(SIZE);
const MASK = new Mask(SIZE, TEXT_TEX, PARTICLE_TEX);

const SCENE = new THREE.Scene();
const CAMERA = new THREE.Camera();
const MATERIAL = new THREE.MeshBasicMaterial();

setup();
setTimeout(function() {draw()} ,300);

function setup() {
  PARTICLE_TEX.setup();
  TEXT_TEX.setup();
  MASK.setup();
  const geometry = new THREE.PlaneGeometry(2, 2);
  // MATERIAL.map = PARTICLE_TEX.texture;
  MATERIAL.map = MASK.texture;
  const mesh = new THREE.Mesh(geometry, MATERIAL);
  SCENE.add(mesh);
}

function draw() {
  // MATERIAL.map = TEXT_TEX.texture;
  PARTICLE_TEX.render(RENDERER);
  MASK.render(RENDERER);
  RENDERER.render(SCENE, CAMERA);
  requestAnimationFrame(draw);
}
