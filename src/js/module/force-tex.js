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

import Noise from './noise.js';

export default class ForceTex {
  constructor(size) {
    this.size_ = size;
    this.texture_;
  }

  setup() {
    this.zeroForce()
  }

  zeroForce() {
    const pixels = new Float32Array(this.size_ * this.size_ * 4);
    const texture = new THREE.DataTexture(pixels, this.size_, this.size_,
                                          THREE.RGBAFormat,
                                          THREE.FloatType);
    texture.needsUpdate = true;
    this.texture_ = texture;
  }

  randomForce() {
    const pixels = new Float32Array(this.size_ * this.size_ * 4);
    const range = 0.02;
    for (let i = 0; i < this.size_ * this.size_; i++) {
        const index = i * 4;
        pixels[index] = this.remap(Math.random(), 0.0, 1.0, -range, range);
        pixels[index + 1] = this.remap(Math.random(), 0.0, 1.0, -range, range);
    }
    const texture = new THREE.DataTexture(pixels, this.size_, this.size_,
                                          THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;
    this.texture_ = texture;
  }

  get texture() {
    return this.texture_;
  }

  remap(value, fromLow, fromHigh, toLow, toHigh) {
    const slope = (toHigh - toLow) / (fromHigh - fromLow);
    return toLow + slope * (value - fromLow);
  }
}
