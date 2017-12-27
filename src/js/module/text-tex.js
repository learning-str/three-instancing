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

export default class TextTex {
  constructor(size) {
    this.size_ = size;
    this.canvas_ = document.createElement("canvas");
    // document.body.appendChild(this.canvas_);
    this.canvas_.width = size.width;
  	this.canvas_.height = size.height;
    this.texture_;
  }

  setup() {
    var loader = new THREE.TextureLoader();
    loader.load("/data/test_9.png", (texture) => {
        this.texture_ = texture;
        console.log("done");
    });

    // const img = new Image();
    // img.src = './data/test_9.svg';
    // img.onload = () => {
    //   const ctx = this.canvas_.getContext('2d');
    //   ctx.drawImage(img, 0, 0, this.canvas_.width, this.canvas_.height);
    //   this.texture_ = new THREE.Texture(this.canvas_);
    //   this.texture_.needsUpdate = true;
    // }
  }

  get texture() {
    return this.texture_;
  }
}
