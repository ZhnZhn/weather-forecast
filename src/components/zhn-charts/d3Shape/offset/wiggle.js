import none from "./none.js";

export default function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  let y, j = 1, s0, m, n;
  for (y=0; j < m; ++j) {
    let i, s1 = 0, s2 = 0;
    for (i=0; i < n; ++i) {
      let si = series[order[i]]
      , sij0 = si[j][1] || 0
      , sij1 = si[j - 1][1] || 0
      , s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        let sk = series[order[k]]
        , skj0 = sk[j][1] || 0
        , skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0;
      s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
}
