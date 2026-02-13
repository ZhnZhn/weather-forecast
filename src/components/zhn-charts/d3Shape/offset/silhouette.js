import none from "./none";

export default function(series, order) {
  let n, j, s0, m;
  if (!((n = series.length) > 0)) return;

  s0 = series[order[0]]
  m = s0.length
  for (j=0; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
}
