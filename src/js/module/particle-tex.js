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

import template from 'es6-template-strings'
import vertexShader from '../../shader/vert.glsl';
import fragmentShader from '../../shader/frag.glsl';

export default class ParticleTex {
  constructor(size) {
    this.size_ = size;
    this.bufCamera_ = new THREE.Camera();
    this.bufScene_ = new THREE.Scene();
    this.renderTarget_ = new THREE.WebGLRenderTarget(size.width, size.height,
      {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter
      });
  }

  setup() {
    const geometry = new THREE.BufferGeometry();
    const verticesBase = [];
    const colorsBase = [];
    var numVert = 10;
    for (let i = 0; i < numVert; i++) {
      const x = -1 + i * 0.2;
      const y = 0.3;
      const z = 0;
      verticesBase.push(x, y, z);
      const r = 0.5;
      const g = 0.5;
      const b = 0.5;
      const a = 1;
      colorsBase.push(r, g, b, a);
    }
    for (let i = 0; i < numVert; i++) {
      const x = -1 + i * 0.2;
      const y = -0.2;
      const z = 0;
      verticesBase.push(x, y, z);
      const r = 1;
      const g = 1;
      const b = 1;
      const a = 1;
      colorsBase.push(r, g, b, a);
    }
    const vertices = new Float32Array(verticesBase);
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const colors = new Float32Array(colorsBase);
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 4));
    const material = new THREE.ShaderMaterial({
      transparent:true,
      blending:THREE.NormalBlending,
      vertexShader: template(vertexShader),
      fragmentShader: template(fragmentShader)
    });

    const points = new THREE.Points(geometry, material);
    points.matrixAutoUpdate  = true;
    this.bufScene_.add(points);
  }

  render(renderer) {
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_);
  }

  get texture() {
    return this.renderTarget_.texture;
  }
}
