//
//  Takram Confidential
//
//  Copyright (C) 2017-Present Shota Matsuda
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

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/js/main.js',
  sourceMap: true,
  plugins: [
    nodeResolve({ main: true, module: true, browser: true }),
    commonjs(),
    babel(),
  ],
  format: 'iife',
  dest: './build/main.js',
}
