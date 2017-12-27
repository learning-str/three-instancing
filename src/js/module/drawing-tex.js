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

export default class DrawingTex {
  constructor(camera, renderer, particleTextureSize, canvasWidth, canvasHeight) {
    this.camera_ = camera;
    this.renderer_ = renderer;
    this.particleTextureSize_ = particleTextureSize;
    this.particleTexture_;
    this.scene_ = new THREE.Scene();
    this.shaderMaterial_;
    this.texture_ = new THREE.WebGLRenderTarget(canvasWidth, canvasHeight,
      {
        // type: THREE.FloatType, // FloatTypeだとiPhoneで表示不可
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter
      });
    this.particleNum_ = 1;
  }

  setup(particleTexture) {
    this.particleTexture_ = particleTexture;
    const loader = new THREE.TextureLoader();
    const uniforms = {
      particleTexture: { type: "t", value: this.particleTexture_ },
      particleTextureSize: { type: "f", value: this.particleTextureSize_ },
      imageTexture: { type: "t", value: loader.load("./data/particle2.png")}
    };
    this.shaderMaterial_ = new THREE.ShaderMaterial({
      transparent:true,
      blending:THREE.NormalBlending,
      uniforms: uniforms,
      vertexShader: document.getElementById( 'drawing-tex-vs' ).textContent,
      fragmentShader: document.getElementById( 'drawing-tex-fs' ).textContent
    });
    this.updateParticles();
  }

  updateParticles() {
    this.scene_ = new THREE.Scene();
    const geometry = new THREE.BufferGeometry();
    const verticesBase = [];
    const colorsBase = [];
    for (let i = 0; i < this.particleNum_; i++) {
      const x = i;
      const y = 0;
      const z = 0;
      verticesBase.push(x, y, z);
      const r = 0;
      const g = 0;
      const b = 0;
      const a = 0.7;
      colorsBase.push(r, g, b, a);
    }
    const vertices = new Float32Array(verticesBase);
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const colors = new Float32Array(colorsBase);
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 4));
    const points = new THREE.Points(geometry, this.shaderMaterial_);
    points.matrixAutoUpdate  = true;
    this.scene_.add(points);
  }

  set particleTexture(value) {
    this.shaderMaterial_.uniforms.particleTexture.value = value;
  }

  get texture() {
    return this.texture_.texture;
  }

  set particleNum(value) {
    this.particleNum_ = value;
  }

  get particleNum() {
    return this.particleNum_;
  }

  render() {
    this.renderer_.render(this.scene_, this.camera_, this.texture_);
  }
}
