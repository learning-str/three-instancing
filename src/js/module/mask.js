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

export default class Mask {
  constructor(size, imgClass, maskClass) {
    this.imgClass_ = imgClass;
    this.maskClass_ = maskClass;
    this.size_ = size;
    this.bufCamera_ = new THREE.Camera();
    this.bufScene_ = new THREE.Scene();
    this.shaderMaterial_;
    this.renderTarget_ = new THREE.WebGLRenderTarget(size.width, size.height,
      {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter
      });
  }

  setup() {
    const pixels = new Uint8Array(this.size_.width * this.size_.height * 4);
    for (let i = 0; i < this.size_.width * this.size_.height * 4; i++) {
      pixels[i] = 1.0;
    }
    const texture = new THREE.DataTexture(pixels,
                                          this.size_.width, this.size_.height,
                                          THREE.RGBAFormat,
                                          THREE.UnsignedByteType);
    texture.needsUpdate = true;

    const uniforms = {
      imgTexture: {type: "t", value: texture},
      maskTexture: {type: "t", value: texture},
      textureSize: {type: "f", value: this.size_.width}
    };
    this.shaderMaterial_ = new THREE.ShaderMaterial({
      transparent:true,
      blending:THREE.NormalBlending,
      uniforms: uniforms,
      vertexShader: document.getElementById('mask-vs').textContent,
      fragmentShader: document.getElementById('mask-fs').textContent
    });
    const geometry = new THREE.PlaneGeometry(this.size_.width, this.size_.height);
    const mesh = new THREE.Mesh(geometry, this.shaderMaterial_);
    this.bufScene_.add(mesh);
    console.log("done");
  }

  render(renderer) {
    this.imgTexture = this.imgClass_.texture;
    this.maskTexture = this.maskClass_.texture;
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_);
  }

  set imgTexture(value) {
    this.shaderMaterial_.uniforms.imgTexture.value = value;
  }

  set maskTexture(value) {
    this.shaderMaterial_.uniforms.maskTexture.value = value;
  }

  get texture() {
    return this.renderTarget_.texture;
  }
}
