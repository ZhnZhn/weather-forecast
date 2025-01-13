import {
  isValidElement,
  cloneUiElement,
  createElement,
  PureComponent
} from "../../uiApi";

import { _isFn } from "../util/FnUtils";

import { DefaultLegendContent } from "./DefaultLegendContent";
import { isNumber } from "../util/DataUtils";
import { getUniqPayload } from "./componentFn";

const CL_LEGEND_WRAPPER = "recharts-legend-wrapper" ;

const _defaultUniqBy = (
  entry
) => entry.value;

const _renderContent = (
  ContentElementOrComp,
  props
) => {
  if (isValidElement(ContentElementOrComp)) {
    return cloneUiElement(ContentElementOrComp, props);
  }
  if (_isFn(ContentElementOrComp)) {
    return createElement(ContentElementOrComp, props);
  }
  /*eslint-disable no-unused-vars*/
  const {
    ref,
    ...restProps
  } = props;
  //ref
  /*eslint-enable no-unused-vars*/
  return (
    <DefaultLegendContent {...restProps} />
  );
}

const EPS = 1;
export class Legend extends PureComponent {
  state = {
    boxWidth: -1,
    boxHeight: -1
  }

  static getWithHeight(item, chartWidth) {
    const {
      layout
    } = item.props;
    return layout === "vertical" && isNumber(item.props.height)
      ? { height: item.props.height }
      : layout === "horizontal"
          ? { width: item.props.width || chartWidth }
          : null;
  }

  componentDidMount() {
    this.updateBBox();
  }

  componentDidUpdate() {
    this.updateBBox();
  }

  getBBox() {
    return this.wrapperNode && this.wrapperNode.getBoundingClientRect
      ? this.wrapperNode.getBoundingClientRect()
      : null;
  }

  getBBoxSnapshot() {
    const {
      boxWidth,
      boxHeight
    } = this.state;
    return boxWidth >= 0 && boxHeight >= 0
      ? { width: boxWidth, height: boxHeight }
      : null;
  }

  getDefaultPosition(style) {
    const {
      layout,
      align,
      verticalAlign,
      margin,
      chartWidth,
      chartHeight
    } = this.props;
    let hPos, vPos;
    if (!style
      || ((style.left === undefined || style.left === null) && (style.right === undefined || style.right === null))
    ) {
      if (align === "center" && layout === "vertical") {
        const box = this.getBBoxSnapshot() || { width: 0 };
        hPos = { left: ((chartWidth || 0) - box.width) / 2 };
      } else {
        hPos = align === "right"
          ? { right: (margin && margin.right) || 0 }
          : { left: (margin && margin.left) || 0 };
      }
    }
    if (!style
      || ((style.top === undefined || style.top === null) && (style.bottom === undefined || style.bottom === null))
    ) {
      if (verticalAlign === "middle") {
        const box = this.getBBoxSnapshot() || { height: 0 };
        vPos = {
          top: ((chartHeight || 0) - box.height) / 2
        };
      } else {
         vPos = verticalAlign === "bottom"
           ? { bottom: (margin && margin.bottom) || 0 }
           : { top: (margin && margin.top) || 0 };
      }
    }
    return {
      ...hPos,
      ...vPos
    };
  }

  updateBBox() {
    const {
      boxWidth,
      boxHeight
    } = this.state
    , {
      onBBoxUpdate
    } = this.props;
    if (this.wrapperNode && this.wrapperNode.getBoundingClientRect) {
      const box = this.wrapperNode.getBoundingClientRect();
      if (Math.abs(box.width - boxWidth) > EPS || Math.abs(box.height - boxHeight) > EPS) {
        this.setState({
          boxWidth: box.width,
          boxHeight: box.height
        }, () => {
          if (onBBoxUpdate) {
            onBBoxUpdate(box);
          }
        });
      }
    } else if (boxWidth !== -1 || boxHeight !== -1) {
      this.setState({
        boxWidth: -1,
        boxHeight: -1
      }, () => {
        if (onBBoxUpdate) {
          onBBoxUpdate(null);
        }
      });
    }
  }

  _refWrapperNode = (node) => {
    this.wrapperNode = node;
  }

  render() {
    const {
      content,
      width,
      height,
      wrapperStyle,
      payloadUniqBy,
      payload
    } = this.props
    , outerStyle = {
       position: "absolute",
       width: width || "auto",
       height: height || "auto",
       ...this.getDefaultPosition(wrapperStyle),
       ...wrapperStyle
    };
    return (
      <div
        className={CL_LEGEND_WRAPPER}
        style={outerStyle}
        ref={this._refWrapperNode}
      >
        {_renderContent(
           content, {
           ...this.props,
           payload: getUniqPayload(payloadUniqBy, payload, _defaultUniqBy)
        })}
      </div>
    );
  }
}

Legend.displayName = "Legend";
Legend.defaultProps = {
    iconSize: 14,
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom"
};
