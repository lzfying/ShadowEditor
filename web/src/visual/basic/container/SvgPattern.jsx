/*
 * Copyright 2017-2020 The ShadowEditor Authors. All rights reserved.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file.
 * 
 * For more information, please visit: https://github.com/tengge1/ShadowEditor
 * You can also visit: https://gitee.com/tengge1/ShadowEditor
 */
import { SvgControl, SVG } from '../third_party';

/**
 * 模式
 * @author tengge / https://github.com/tengge1
 * @param {*} options 
 */
function Pattern(options = {}) {
    SvgControl.call(this, options);
}

Pattern.prototype = Object.create(SvgControl.prototype);
Pattern.prototype.constructor = Pattern;

Pattern.prototype.render = function () {
    this.renderDom(this.createElement('pattern'));
};

SVG.addXType('pattern', Pattern);

export default Pattern;