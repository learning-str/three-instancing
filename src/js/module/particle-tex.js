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

export default class ParticleTex {
  constructor(size) {
    this.size_ = size;
    // this.bufCamera_ = new THREE.OrthographicCamera(size.width / 2,
    //     size.width / -2, size.height / 2, size.height / -2, 1, 2000);
    const FOV = 60;
    const ASPECT = size.width / size.height;
    const NEAR = 1;
    const FAR = 1000;
    this.bufCamera_ = new THREE.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
    this.bufCamera_.position.set(0, 0, 50);
    // this.bufCamera_.position.set(0, 0, 1000);
    // CAMERA.lookAt(SCENE.position);

    this.bufScene_ = new THREE.Scene();
    this.renderTarget_ = new THREE.WebGLRenderTarget(size.width, size.height,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter
      });
  }

  setup() {
    const geometry = new THREE.BufferGeometry();
    const verticesBase = [];
    var numVert = 1;
    for (let i = 0; i < numVert; i++) {
      const x = i * -1.5;
      const y = 0;
      const z = 0;
      verticesBase.push(x, y, z);
    }
    const vertices = new Float32Array(verticesBase);
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // const material = new THREE.PointsMaterial({
    //     size: 1,
    //     blending: THREE.AdditiveBlending,
    //     transparent: true,
    //     depthTest: false
    //   });

    const material = new THREE.ShaderMaterial({
      transparent:true,
      blending:THREE.NormalBlending,
      vertexShader: document.getElementById( 'drawing-tex-vs' ).textContent,
      fragmentShader: document.getElementById( 'drawing-tex-fs' ).textContent
    });

    // const material = new THREE.MeshBasicMaterial({color: 'rgb(110, 0, 255)'});

    const points = new THREE.Points(geometry, material);
    points.matrixAutoUpdate  = true;
    // this.bufScene_ = new THREE.Scene();
    this.bufScene_.add(points);
  }

  render(renderer) {
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_);
  }

  get texture() {
    return this.renderTarget_.texture;
  }
}

// export default class ParticleTex {
//   constructor(camera, renderer, size) {
//     this.camera_ = camera;
//     this.renderer_ = renderer;
//     this.size_ = size;
//     this.scene_ = new THREE.Scene();
//     this.shaderMaterial_;
//     if (!this.renderer_.context.getExtension("OES_texture_float")) {
//       throw "Requires OES_texture_float extension";
//     }
//     this.texture1_ = new THREE.WebGLRenderTarget(this.size_, this.size_,
//       {
//         // type: THREE.FloatType, // FloatTypeだとiPhoneで表示不可
//         type: THREE.HalfFloatType,
//         minFilter: THREE.LinearFilter,
//         magFilter: THREE.NearestFilter
//       });
//     this.texture2_ = new THREE.WebGLRenderTarget(this.size_, this.size_,
//       {
//         // type: THREE.FloatType, // FloatTypeだとiPhoneで表示不可
//         type: THREE.HalfFloatType,
//         minFilter: THREE.LinearFilter,
//         magFilter: THREE.NearestFilter
//       });
//     this.flagRenderTarget1_ = true;
//   }
//
//   setup(forceTexture, forceTextureSize) {
//     const particlePixels = new Float32Array(this.size_ * this.size_ * 4);
//     // const particleSize = 512*512;
//     for (let i = 0; i < this.size_ * this.size_; i++) {
//       const index = i * 4;
//       const x = i % this.size_;
//       const y = Math.floor(i / this.size_);
//       particlePixels[index] = -2.0;
//       particlePixels[index + 1] = 0.5;
//     }
//     particlePixels[0] = 0.0;
//     particlePixels[1] = 0.0;
//
//     const particleTexture = new THREE.DataTexture(particlePixels,
//                                                   this.size_, this.size_,
//                                                   THREE.RGBAFormat,
//                                                   THREE.FloatType);
//     particleTexture.needsUpdate = true;
//     const uniforms = {
//       forceTexture: {
//         type: "t",
//         value: forceTexture
//       },
//       forceTextureSize: {
//         type: "f",
//         value: forceTextureSize
//       },
//       particleTexture: {
//         type: "t",
//         value: particleTexture
//       },
//       particleTextureSize: {
//         type: "f",
//         value: this.size_
//       },
//       particleNum: {
//         type: "f",
//         value: 1.0
//       },
//       particleDivitionFlag: {
//         type: "i",
//         value: 0
//       }
//     };
//     this.shaderMaterial_ = new THREE.ShaderMaterial({
//       uniforms: uniforms,
//       vertexShader: document.getElementById('particle-tex-vs').textContent,
//       fragmentShader: document.getElementById('particle-tex-fs').textContent
//     });
//
//     const rect = new THREE.Shape();
//     rect.moveTo(-1.0, -1.0);
//     rect.lineTo(1.0, -1.0);
//     rect.lineTo(1.0, 1.0);
//     rect.lineTo(-1.0, 1.0);
//     const geometry = new THREE.ShapeGeometry(rect);
//     const mesh = new THREE.Mesh(geometry, this.shaderMaterial_);
//     this.scene_.add(mesh);
//   }
//
//   set forceTexture(value) {
//     this.shaderMaterial_.uniforms.forceTexture.value = value;
//   }
//
//   set particleTexture(value) {
//     this.shaderMaterial_.uniforms.particleTexture.value = value;
//   }
//
//   set particleNum(value) {
//     this.shaderMaterial_.uniforms.particleNum.value = value;
//   }
//
//   set particleDivitionFlag(value) {
//     this.shaderMaterial_.uniforms.particleDivitionFlag.value = value;
//   }
//
//   get texture() {
//     if(this.flagRenderTarget1_) {
//       return this.texture1_.texture;
//     } else {
//       return this.texture2_.texture;
//     }
//   }
//
//   render() {
//     if(this.flagRenderTarget1_) {
//       this.renderer_.render(this.scene_, this.camera_, this.texture1_);
//     } else {
//       this.renderer_.render(this.scene_, this.camera_, this.texture2_);
//     }
//   }
//
//   update() {
//     if(this.flagRenderTarget1_) {
//       this.shaderMaterial_.uniforms.particleTexture.value = this.texture1_.texture;
//     } else {
//       this.shaderMaterial_.uniforms.particleTexture.value = this.texture2_.texture;
//     }
//     this.flagRenderTarget1_ = !this.flagRenderTarget1_;
//   }
//
//   remap(value, fromLow, fromHigh, toLow, toHigh) {
//     const slope = (toHigh - toLow) / (fromHigh - fromLow);
//     return toLow + slope * (value - fromLow);
//   }
// }
