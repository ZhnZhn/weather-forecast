import {
  cos,
  sin,
  pi,
  sqrt,
  tau
} from "./math";

export const symbolCircle = {
  draw(context, size) {
    const r = sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
}

export const symbolCross = {
  draw(context, size) {
    const r = sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
}

const tan30 = sqrt(1 / 3);
const tan30_2 = tan30 * 2;

export const symbolDiamond = {
  draw(context, size) {
    const y = sqrt(size / tan30_2);
    const x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
}

export const symbolSquare = {
  draw(context, size) {
    const w = sqrt(size);
    const x = -w / 2;
    context.rect(x, x, w, w);
  }
}

const ka = 0.89081309152928522810;
const kr = sin(pi / 10) / sin(7 * pi / 10);
const kx = sin(tau / 10) * kr;
const ky = -cos(tau / 10) * kr;

export const symbolStar = {
  draw(context, size) {
    const r = sqrt(size * ka);
    const x = kx * r;
    const y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (let i = 1; i < 5; ++i) {
      const a = tau * i / 5;
      const c = cos(a);
      const s = sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
}

const sqrt3 = sqrt(3);

export const symbolTriangle = {
  draw(context, size) {
    const y = -sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
}


const c = -0.5;
const s = sqrt(3) / 2;
const k = 1 / sqrt(12);
const a = (k / 2 + 1) * 3;

export const symbolWye = {
  draw(context, size) {
    const r = sqrt(size / a);
    const x0 = r / 2, y0 = r * k;
    const x1 = x0, y1 = r * k + r;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
}
