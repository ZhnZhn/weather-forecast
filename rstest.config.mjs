import { defineConfig } from '@rstest/core';
import { pluginReact } from '@rsbuild/plugin-react';

const _crIncludeDir = (
 token
) => `<rootDir>/src/${token}/__tests__/*.test.js`
, _crInclude = (...tokens) => tokens.map(_crIncludeDir);

export default defineConfig({
  plugins: [pluginReact()],  
  testEnvironment: 'jsdom',
  globals: true,

  include: _crInclude(    
    'math/decimal-light',
    'utils',
    'components/zhn-animation',
    'components/zhn-charts/cartesian',
    'components/zhn-charts/d3Color',
    'components/zhn-charts/d3Format',
    'components/zhn-charts/d3Scale',
    'components/zhn-charts/d3Shape',
    'components/zhn-charts/scale', 
    'components/zhn-charts/scale/util',
    'components/zhn-charts/shape',
    'components/zhn-charts/util'
  ),
  resolve: {
    alias: {
      '@testHelpers': './src/__tests__/setupHelpers.test.js'
    },
  }  
});