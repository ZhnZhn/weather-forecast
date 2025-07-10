import crCn from './zhn-utils/crCn';

export const CL_BG = 'bg'
export const CL_DIALOG = 'dialog';

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

export const crShowHideStyle = (
  is
) => is ? S_BLOCK : S_NONE
