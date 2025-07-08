import crCn from './zhn-utils/crCn';

export const  S_BLOCK = { display: 'block' }
export const  S_NONE = { display: 'none' }

const CL_SHOW_POPUP = 'show-popup';
export const crShowHide = (
  is,
  className,
  withoutAnimation,
  animationClassName
) => is
  ? [
      crCn(
        className,
        [!withoutAnimation, animationClassName || CL_SHOW_POPUP]
      ),
      S_BLOCK
    ]
  : [
      className,
      S_NONE
    ]
