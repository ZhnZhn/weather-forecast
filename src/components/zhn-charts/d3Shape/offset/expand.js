import none from "./none";

export default function(series, order) {
  let i, n, j, m, y;
  if (!((n = series.length) > 0)) return;
  m = series[0].length
  for (j = 0; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
}
