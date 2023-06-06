export default function(series, order) {
  if (!((n = series.length) > 1)) return;
  let i, j
  , s0, s1 = series[order[0]]
  , n, m = s1.length;
  for (i = 1; i < n; ++i) {
    s0 = s1;
    s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
