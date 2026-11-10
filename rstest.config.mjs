import { 
  defineConfig,
  defineInlineProject  
} from '@rstest/core';
import { pluginReact } from '@rsbuild/plugin-react';

const _crIncludeDir = (
 token
) => `<rootDir>/src/${token}/__tests__/*.test.js`
, _crInclude = (...tokens) => tokens.map(_crIncludeDir);

const sharedProjectConfig = {
  globals: true,
  resolve: {
    alias: {
      '@testHelpers': './src/__tests__/setupHelpers.test.js'
    }
  }    
};

export default defineConfig({
  projects: [
    defineInlineProject({
       name: 'dom',
       ...sharedProjectConfig,
       plugins: [pluginReact()],      
       testEnvironment: 'jsdom',
       include: _crInclude(
         'components/zhn-animation',
         'components/zhn-charts/cartesian',
         'components/zhn-charts/scale', 
         'components/zhn-charts/shape', 
         'components/zhn-charts/util'
       )
    }),
    defineInlineProject({
      name: 'node',
      ...sharedProjectConfig,
      include: _crInclude(    
       'math/decimal-light',
       'utils',
   
       'components/zhn-charts/d3Color',
       'components/zhn-charts/d3Format',
       'components/zhn-charts/d3Scale',
       'components/zhn-charts/d3Shape',
   
       'components/zhn-charts/scale/util'
      ) 
    })
  ]  
});