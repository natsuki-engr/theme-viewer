import React from "react";
import { SvgColors } from "../../../src/types/svgColors";

interface Props {
  colors: SvgColors["colors"];
  tokenColors: SvgColors["tokenColors"];
}

const VscodeSvg: React.FC<Props> = ({ colors }) => {
  const editorStyle = {
    fill: colors?.["editor.background"],
  };

  const sideBarStyle = {
    fill: colors?.["sideBar.background"],
    stroke: colors?.["sideBar.border"],
  };

  const tabBgStyle = {
    fill: colors?.["editorGroupHeader.tabsBackground"] ?? "#0000",
    stroke: colors?.["editorGroupHeader.tabsBorder"] ?? "#0000",
  };

  const tab1Style = {
    fill: colors?.["tab.inactiveBackground"],
    stroke: colors?.["tab.border"],
  };

  const tab2Style = {
    fill: colors?.["tab.inactiveBackground"],
    stroke: colors?.["tab.border"],
  };

  const tab3Style = {
    fill: colors?.["tab.inactiveBackground"],
    stroke: colors?.["tab.border"],
  };

  const activeTab1Style = {
    fill: colors?.["tab.activeBackground"],
    stroke: colors?.["focusBorder"],
  };

  const activityBarStyle = {
    fill: colors?.["activityBar.background"],
    stroke: colors?.["activityBar.border"],
  };

  const titleBarStyle = {
    fill: colors?.["titleBar.activeBackground"],
    stroke: colors?.["titleBar.border"],
  };

  const statusBarStyle = {
    fill: colors?.["statusBar.background"],
    stroke: colors?.["statusBar.border"],
  };

  const tabTextStyle = {
    // fill: "#000",
    fill: colors?.["tab.activeForeground"],
  };

  const activityIconStyle = {
    fill: colors?.["activityBar.foreground"],
  };

  // const codeFills: { [line: number]: (string | undefined)[] } = {
  //   0: [tokenColors?.["function"]],
  //   1: [tokenColors?.["keyword"], tokenColors?.["keyword"], tokenColors?.["support.constant"], tokenColors?.["constant.numeric"]],
  //   2: [tokenColors?.["keyword"], tokenColors?.["editor.foreground"]],
  //   3: [tokenColors?.["editor.foreground"], tokenColors?.["entity.name.function"], tokenColors?.["string"]],
  //   4: [tokenColors?.["keyword"], tokenColors?.["keyword"], tokenColors?.["constant.numeric"]],
  //   5: [tokenColors?.["editor.foreground"], tokenColors?.["entity.name.function"], tokenColors?.["string"]],
  //   6: [tokenColors?.["keyword"], tokenColors?.["keyword"], tokenColors?.["constant.numeric"]],
  //   7: [tokenColors?.["editor.foreground"], tokenColors?.["entity.name.function"], tokenColors?.["string"]],
  //   8: [tokenColors?.["keyword"]],
  //   9: [tokenColors?.["editor.foreground"], tokenColors?.["entity.name.function"], tokenColors?.["editor.foreground"]],
  //   10: [colors?.["editorBracketHighlight.foreground2"]],
  //   11: [colors?.["editorBracketHighlight.foreground1"]],
  // } as const;

  return (
    <svg id="_レイヤー_2" data-name="レイヤー 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 961 721">
      <g id="_レイヤー_1-2" data-name="レイヤー 1">
        <rect id="editor" x=".5" y=".5" width="960" height="720" rx="22.34" ry="22.34" style={editorStyle} />
        <rect id="side-bar" x="80.5" y="70.5" width="175" height="611.5" style={sideBarStyle} />
        <rect id="tab-bg" x="255.5" y="70.5" width="705" height="55" style={tabBgStyle} />
        <rect id="tab1" x="255.5" y="70.5" width="180" height="55" style={tab1Style} />
        <rect id="tab2" x="435.5" y="70.5" width="180" height="55" style={tab2Style} />
        <rect id="tab3" x="615.5" y="70.5" width="180" height="55" style={tab3Style} />
        <rect id="active-tab" x="261.5" y="76.5" width="167" height="43" style={activeTab1Style} />
        <rect id="activity-bar" x=".5" y="70.5" width="80" height="611.5" style={activityBarStyle} />
        <path id="title-bar" d="M22.84.5h915.32c12.33,0,22.34,10.01,22.34,22.34v47.66H.5V22.84C.5,10.51,10.51.5,22.84.5Z" style={titleBarStyle} />
        <path style={statusBarStyle} id="status-bar" d="M18.28,682.5h924.44c9.81,0,17.78,7.97,17.78,17.78v20.22H.5v-20.22c0-9.81,7.97-17.78,17.78-17.78Z" transform="translate(961 1403) rotate(180)" />
        <g>
          <path style={tabTextStyle} d="M297.81,96.92h-2.51v-2.03h2.51v-1.14c0-1.32.21-2.41.63-3.26.42-.85.98-1.48,1.69-1.88.71-.4,1.48-.6,2.31-.6.75,0,1.48.16,2.19.48.71.32,1.27.83,1.7,1.51l-1.06,1.8-.16.29-.19-.13c-.04-.17-.09-.35-.13-.55-.04-.19-.18-.42-.42-.68-.28-.26-.55-.43-.82-.53-.27-.1-.59-.15-.98-.15-.47,0-.9.13-1.27.38-.38.25-.66.65-.87,1.19-.2.54-.3,1.25-.3,2.12v1.14h3.7v2.03h-3.7v12.67h-2.32v-12.67Z" />
          <path style={tabTextStyle} d="M309.29,109.59v-2.12h2.99v-10.45h-2.86v-2.12h5.21v12.57h2.73v2.12h-8.07ZM313.34,91.81c-.43,0-.8-.16-1.11-.48-.31-.32-.47-.71-.47-1.16s.15-.87.45-1.19c.3-.32.68-.48,1.13-.48s.8.17,1.12.5c.32.33.48.72.48,1.17s-.16.84-.48,1.16c-.32.32-.7.48-1.12.48Z" />
          <path style={tabTextStyle} d="M321.67,109.59v-2.12h3.38v-17.17h-3.25v-2.09h5.63v19.26h3.34v2.12h-9.1Z" />
          <path style={tabTextStyle} d="M339.62,109.85c-.9,0-1.71-.15-2.41-.46-.71-.31-1.32-.77-1.83-1.4-.51-.62-.91-1.41-1.17-2.35-.27-.94-.4-2.05-.4-3.32s.13-2.46.4-3.43c.27-.97.64-1.78,1.13-2.41.48-.64,1.06-1.11,1.74-1.43.67-.32,1.41-.48,2.2-.48.73,0,1.39.13,1.99.4.6.27,1.11.68,1.54,1.24.43.56.77,1.3,1.01,2.2.25.9.37,1.98.37,3.24,0,.19,0,.38-.02.57s-.03.37-.05.54h-8.04c.04.92.16,1.7.35,2.34.19.64.44,1.14.75,1.52.31.38.68.66,1.11.85s.89.28,1.38.28c.43,0,.81-.05,1.16-.16.34-.11.66-.27.95-.5.29-.23.55-.5.79-.82l1.29,1.41c-.34.45-.73.84-1.17,1.17-.44.33-.91.58-1.42.74s-1.06.24-1.66.24ZM336.14,100.75h5.66c0-.68-.05-1.27-.16-1.79-.11-.52-.27-.95-.5-1.3-.23-.35-.5-.61-.84-.78-.33-.17-.71-.25-1.14-.25s-.77.07-1.09.22c-.32.15-.62.39-.88.71-.27.33-.49.75-.66,1.27-.17.52-.3,1.16-.39,1.92Z" />
          <path style={tabTextStyle} d="M351.13,109.59v-16.75l-3.09,1.19-.48-1.7,4.28-2.77h1.67v20.03h-2.38Z" />
          <path style={tabTextStyle} d="M364.54,109.85c-.49,0-.91-.18-1.25-.55s-.51-.79-.51-1.29.17-.92.51-1.27c.34-.35.76-.53,1.25-.53.45,0,.85.18,1.19.53.34.35.51.78.51,1.27s-.17.92-.51,1.29c-.34.36-.74.55-1.19.55Z" />
          <path style={tabTextStyle} d="M374.05,114.67c-.69-.3-1.28-.75-1.77-1.35l1.25-2.03.16-.26.19.13c.06.17.12.34.16.51.04.17.18.4.42.68.21.17.47.31.76.42.29.11.62.16.98.16.49,0,.92-.14,1.27-.41.35-.28.62-.71.8-1.29.18-.58.27-1.33.27-2.25v-11.97h-4.37v-2.12h6.75v13.94c0,1.53-.21,2.76-.63,3.69s-.98,1.59-1.69,1.99c-.71.4-1.51.61-2.41.61-.75,0-1.47-.15-2.15-.45ZM379.68,91.81c-.43,0-.8-.16-1.11-.48s-.47-.71-.47-1.16.15-.87.45-1.19c.3-.32.67-.48,1.12-.48s.8.17,1.13.5c.32.33.48.72.48,1.17s-.16.84-.48,1.16c-.32.32-.7.48-1.13.48Z" />
          <path style={tabTextStyle} d="M388.46,109.62c-.62-.15-1.19-.37-1.7-.66-.51-.29-.98-.64-1.38-1.05l1.13-2.22.13-.29.23.13c.04.15.09.32.14.5s.2.4.43.66c.39.34.82.61,1.3.8s1.07.29,1.75.29c.56,0,1.03-.09,1.43-.28s.7-.45.92-.79c.21-.33.32-.72.32-1.16,0-.3-.05-.56-.14-.78s-.25-.43-.47-.63c-.21-.2-.5-.4-.85-.59-.35-.19-.79-.39-1.3-.6-.88-.34-1.65-.71-2.32-1.13-.67-.41-1.18-.89-1.54-1.45-.37-.55-.55-1.21-.55-1.97s.18-1.4.53-1.97.87-1.03,1.54-1.37c.67-.34,1.51-.51,2.49-.51.56,0,1.07.04,1.53.13.46.09.88.22,1.27.4.39.18.73.41,1.05.69.31.28.61.6.88.96l-1.19,1.77-.19.26-.19-.13c-.04-.17-.09-.35-.13-.53s-.17-.4-.39-.66c-.37-.3-.77-.53-1.21-.68s-.88-.23-1.33-.23c-.71,0-1.28.16-1.72.47-.44.31-.66.73-.66,1.25,0,.36.09.68.27.97.18.29.5.57.95.84s1.08.57,1.9.89c.96.38,1.74.76,2.33,1.13.59.37,1.02.8,1.29,1.3.27.5.4,1.12.4,1.86,0,.91-.19,1.72-.56,2.41-.38.7-.93,1.23-1.67,1.6-.74.37-1.65.56-2.72.56-.71,0-1.37-.08-1.99-.23Z" />
        </g>
        <g>
          <path style={tabTextStyle} d="M477.81,96.92h-2.51v-2.03h2.51v-1.14c0-1.32.21-2.41.63-3.26.42-.85.98-1.48,1.69-1.88.71-.4,1.48-.6,2.31-.6.75,0,1.48.16,2.19.48.71.32,1.27.83,1.7,1.51l-1.06,1.8-.16.29-.19-.13c-.04-.17-.09-.35-.13-.55-.04-.19-.18-.42-.42-.68-.28-.26-.55-.43-.82-.53-.27-.1-.6-.15-.98-.15-.47,0-.9.13-1.27.38-.38.25-.66.65-.87,1.19-.21.54-.3,1.25-.3,2.12v1.14h3.7v2.03h-3.7v12.67h-2.32v-12.67Z" />
          <path style={tabTextStyle} d="M489.29,109.59v-2.12h2.99v-10.45h-2.86v-2.12h5.21v12.57h2.73v2.12h-8.07ZM493.34,91.81c-.43,0-.8-.16-1.11-.48s-.47-.71-.47-1.16.15-.87.45-1.19c.3-.32.68-.48,1.12-.48s.8.17,1.12.5c.32.33.48.72.48,1.17s-.16.84-.48,1.16c-.32.32-.7.48-1.12.48Z" />
          <path style={tabTextStyle} d="M501.67,109.59v-2.12h3.38v-17.17h-3.25v-2.09h5.63v19.26h3.35v2.12h-9.1Z" />
          <path style={tabTextStyle} d="M519.62,109.85c-.9,0-1.71-.15-2.41-.46s-1.32-.77-1.83-1.4c-.52-.62-.91-1.41-1.17-2.35-.27-.94-.4-2.05-.4-3.32s.13-2.46.4-3.43c.27-.97.64-1.78,1.12-2.41.48-.64,1.06-1.11,1.74-1.43s1.41-.48,2.2-.48c.73,0,1.39.13,1.99.4.6.27,1.11.68,1.54,1.24.43.56.77,1.3,1.01,2.2.25.9.37,1.98.37,3.24,0,.19,0,.38-.02.57-.01.19-.03.37-.05.54h-8.04c.04.92.16,1.7.35,2.34.19.64.45,1.14.76,1.52.31.38.68.66,1.11.85.43.19.89.28,1.38.28.43,0,.81-.05,1.16-.16.34-.11.66-.27.95-.5.29-.23.55-.5.79-.82l1.29,1.41c-.34.45-.73.84-1.17,1.17-.44.33-.91.58-1.41.74s-1.06.24-1.66.24ZM516.14,100.75h5.66c0-.68-.05-1.27-.16-1.79-.11-.52-.27-.95-.5-1.3-.22-.35-.5-.61-.84-.78s-.71-.25-1.14-.25-.77.07-1.09.22c-.32.15-.62.39-.88.71-.27.33-.49.75-.66,1.27-.17.52-.3,1.16-.38,1.92Z" />
          <path style={tabTextStyle} d="M527.27,107.63c.92-1.2,1.76-2.28,2.51-3.24.75-.96,1.41-1.86,1.99-2.68.58-.82,1.07-1.59,1.46-2.31.4-.72.7-1.42.9-2.12.21-.7.31-1.42.31-2.17.02-.62-.03-1.15-.14-1.59-.12-.44-.29-.8-.5-1.08-.21-.28-.47-.48-.76-.61-.29-.13-.62-.19-.98-.19s-.71.05-1.04.16c-.33.11-.64.27-.93.5s-.56.53-.82.92c-.17.32-.27.56-.29.71-.02.15-.01.31.03.48l-.13.23-.26-.16-1.77-1.09c.34-.84.77-1.54,1.29-2.12.51-.58,1.1-1.03,1.77-1.35.66-.32,1.39-.48,2.19-.48.94,0,1.77.23,2.48.67.71.45,1.26,1.1,1.66,1.94.4.85.59,1.88.59,3.1,0,.86-.11,1.68-.34,2.47-.22.79-.54,1.57-.95,2.34-.41.77-.88,1.55-1.43,2.33-.55.78-1.15,1.59-1.8,2.44s-1.33,1.74-2.04,2.68h5.21c.36,0,.62-.02.77-.06.15-.04.29-.13.42-.26h.22v2.51h-9.62v-1.96Z" />
          <path style={tabTextStyle} d="M544.54,109.85c-.49,0-.91-.18-1.25-.55-.34-.36-.51-.79-.51-1.29s.17-.92.51-1.27c.34-.35.76-.53,1.25-.53.45,0,.85.18,1.19.53.34.35.51.78.51,1.27s-.17.92-.51,1.29c-.34.36-.74.55-1.19.55Z" />
          <path style={tabTextStyle} d="M554.05,114.67c-.69-.3-1.28-.75-1.77-1.35l1.25-2.03.16-.26.19.13c.06.17.12.34.16.51.04.17.18.4.42.68.21.17.46.31.76.42.29.11.62.16.98.16.49,0,.92-.14,1.27-.41.35-.28.62-.71.8-1.29.18-.58.27-1.33.27-2.25v-11.97h-4.38v-2.12h6.75v13.94c0,1.53-.21,2.76-.63,3.69s-.98,1.59-1.69,1.99c-.71.4-1.51.61-2.41.61-.75,0-1.47-.15-2.15-.45ZM559.68,91.81c-.43,0-.8-.16-1.11-.48s-.47-.71-.47-1.16.15-.87.45-1.19c.3-.32.67-.48,1.12-.48.43,0,.8.17,1.12.5.32.33.48.72.48,1.17s-.16.84-.48,1.16-.7.48-1.12.48Z" />
          <path style={tabTextStyle} d="M568.46,109.62c-.62-.15-1.19-.37-1.7-.66-.52-.29-.98-.64-1.38-1.05l1.12-2.22.13-.29.22.13c.04.15.09.32.14.5.05.18.2.4.44.66.38.34.82.61,1.3.8s1.07.29,1.75.29c.56,0,1.03-.09,1.43-.28s.7-.45.92-.79c.21-.33.32-.72.32-1.16,0-.3-.05-.56-.14-.78-.1-.22-.25-.43-.47-.63-.21-.2-.5-.4-.85-.59-.35-.19-.79-.39-1.3-.6-.88-.34-1.65-.71-2.31-1.13-.67-.41-1.18-.89-1.54-1.45-.37-.55-.55-1.21-.55-1.97s.18-1.4.53-1.97.87-1.03,1.54-1.37c.67-.34,1.51-.51,2.49-.51.56,0,1.06.04,1.53.13.46.09.88.22,1.27.4.39.18.73.41,1.04.69.31.28.61.6.88.96l-1.19,1.77-.19.26-.19-.13c-.04-.17-.09-.35-.13-.53s-.17-.4-.38-.66c-.37-.3-.77-.53-1.21-.68s-.88-.23-1.33-.23c-.71,0-1.28.16-1.72.47s-.66.73-.66,1.25c0,.36.09.68.27.97.18.29.5.57.95.84.45.28,1.08.57,1.9.89.96.38,1.74.76,2.33,1.13.59.37,1.02.8,1.29,1.3.27.5.4,1.12.4,1.86,0,.91-.19,1.72-.56,2.41-.38.7-.93,1.23-1.67,1.6-.74.37-1.64.56-2.72.56-.71,0-1.37-.08-1.99-.23Z" />
        </g>
        <g>
          <path style={tabTextStyle} d="M657.81,96.92h-2.51v-2.03h2.51v-1.14c0-1.32.21-2.41.63-3.26.42-.85.98-1.48,1.69-1.88.71-.4,1.48-.6,2.31-.6.75,0,1.48.16,2.19.48.71.32,1.27.83,1.7,1.51l-1.06,1.8-.16.29-.19-.13c-.04-.17-.09-.35-.13-.55-.04-.19-.18-.42-.42-.68-.28-.26-.55-.43-.82-.53-.27-.1-.6-.15-.98-.15-.47,0-.9.13-1.27.38-.38.25-.66.65-.87,1.19-.21.54-.3,1.25-.3,2.12v1.14h3.7v2.03h-3.7v12.67h-2.32v-12.67Z" />
          <path style={tabTextStyle} d="M669.29,109.59v-2.12h2.99v-10.45h-2.86v-2.12h5.21v12.57h2.73v2.12h-8.07ZM673.34,91.81c-.43,0-.8-.16-1.11-.48s-.47-.71-.47-1.16.15-.87.45-1.19c.3-.32.68-.48,1.12-.48s.8.17,1.12.5c.32.33.48.72.48,1.17s-.16.84-.48,1.16c-.32.32-.7.48-1.12.48Z" />
          <path style={tabTextStyle} d="M681.67,109.59v-2.12h3.38v-17.17h-3.25v-2.09h5.63v19.26h3.35v2.12h-9.1Z" />
          <path style={tabTextStyle} d="M699.62,109.85c-.9,0-1.71-.15-2.41-.46s-1.32-.77-1.83-1.4c-.52-.62-.91-1.41-1.17-2.35-.27-.94-.4-2.05-.4-3.32s.13-2.46.4-3.43c.27-.97.64-1.78,1.12-2.41.48-.64,1.06-1.11,1.74-1.43s1.41-.48,2.2-.48c.73,0,1.39.13,1.99.4.6.27,1.11.68,1.54,1.24.43.56.77,1.3,1.01,2.2.25.9.37,1.98.37,3.24,0,.19,0,.38-.02.57-.01.19-.03.37-.05.54h-8.04c.04.92.16,1.7.35,2.34.19.64.45,1.14.76,1.52.31.38.68.66,1.11.85.43.19.89.28,1.38.28.43,0,.81-.05,1.16-.16.34-.11.66-.27.95-.5.29-.23.55-.5.79-.82l1.29,1.41c-.34.45-.73.84-1.17,1.17-.44.33-.91.58-1.41.74s-1.06.24-1.66.24ZM696.14,100.75h5.66c0-.68-.05-1.27-.16-1.79-.11-.52-.27-.95-.5-1.3-.22-.35-.5-.61-.84-.78s-.71-.25-1.14-.25-.77.07-1.09.22c-.32.15-.62.39-.88.71-.27.33-.49.75-.66,1.27-.17.52-.3,1.16-.38,1.92Z" />
          <path style={tabTextStyle} d="M709,109.3c-.79-.43-1.47-1.03-2.03-1.8l1.51-1.64.22-.23.16.16c.02.17.05.34.1.5.04.16.17.38.38.66.28.26.6.47.95.63s.76.24,1.21.24c.62,0,1.13-.16,1.53-.47.4-.31.7-.76.92-1.33.21-.58.32-1.26.32-2.06,0-.75-.1-1.38-.29-1.9-.19-.51-.48-.92-.85-1.22s-.83-.5-1.35-.61c-.53-.11-1.14-.12-1.85-.03v-2.06c.81.02,1.47-.07,1.98-.27.5-.2.89-.47,1.16-.82.27-.34.45-.74.55-1.2.1-.46.14-.93.14-1.42,0-.45-.05-.85-.14-1.22s-.24-.67-.42-.91c-.18-.25-.41-.43-.68-.56-.27-.13-.55-.19-.85-.19-.34,0-.67.06-.98.18-.31.12-.61.29-.88.51-.28.23-.56.51-.84.85l-1.54-1.29c.6-.81,1.26-1.42,1.99-1.8.73-.39,1.5-.58,2.32-.58.88,0,1.65.2,2.31.59s1.18.97,1.54,1.71c.36.75.54,1.65.54,2.69,0,.71-.1,1.36-.29,1.96-.19.6-.47,1.12-.84,1.55s-.81.77-1.35,1.01c.58.24,1.09.58,1.54,1.05.45.46.8,1.02,1.06,1.69.26.66.39,1.47.39,2.41,0,1.14-.2,2.14-.6,3.02-.4.88-.97,1.57-1.72,2.07-.75.5-1.65.76-2.7.76-.96,0-1.84-.21-2.64-.64Z" />
          <path style={tabTextStyle} d="M724.54,109.85c-.49,0-.91-.18-1.25-.55-.34-.36-.51-.79-.51-1.29s.17-.92.51-1.27c.34-.35.76-.53,1.25-.53.45,0,.85.18,1.19.53.34.35.51.78.51,1.27s-.17.92-.51,1.29c-.34.36-.74.55-1.19.55Z" />
          <path style={tabTextStyle} d="M734.05,114.67c-.69-.3-1.28-.75-1.77-1.35l1.25-2.03.16-.26.19.13c.06.17.12.34.16.51.04.17.18.4.42.68.21.17.46.31.76.42.29.11.62.16.98.16.49,0,.92-.14,1.27-.41.35-.28.62-.71.8-1.29.18-.58.27-1.33.27-2.25v-11.97h-4.38v-2.12h6.75v13.94c0,1.53-.21,2.76-.63,3.69s-.98,1.59-1.69,1.99c-.71.4-1.51.61-2.41.61-.75,0-1.47-.15-2.15-.45ZM739.68,91.81c-.43,0-.8-.16-1.11-.48s-.47-.71-.47-1.16.15-.87.45-1.19c.3-.32.67-.48,1.12-.48.43,0,.8.17,1.12.5.32.33.48.72.48,1.17s-.16.84-.48,1.16-.7.48-1.12.48Z" />
          <path style={tabTextStyle} d="M748.46,109.62c-.62-.15-1.19-.37-1.7-.66-.52-.29-.98-.64-1.38-1.05l1.12-2.22.13-.29.22.13c.04.15.09.32.14.5.05.18.2.4.44.66.38.34.82.61,1.3.8s1.07.29,1.75.29c.56,0,1.03-.09,1.43-.28s.7-.45.92-.79c.21-.33.32-.72.32-1.16,0-.3-.05-.56-.14-.78-.1-.22-.25-.43-.47-.63-.21-.2-.5-.4-.85-.59-.35-.19-.79-.39-1.3-.6-.88-.34-1.65-.71-2.31-1.13-.67-.41-1.18-.89-1.54-1.45-.37-.55-.55-1.21-.55-1.97s.18-1.4.53-1.97.87-1.03,1.54-1.37c.67-.34,1.51-.51,2.49-.51.56,0,1.06.04,1.53.13.46.09.88.22,1.27.4.39.18.73.41,1.04.69.31.28.61.6.88.96l-1.19,1.77-.19.26-.19-.13c-.04-.17-.09-.35-.13-.53s-.17-.4-.38-.66c-.37-.3-.77-.53-1.21-.68s-.88-.23-1.33-.23c-.71,0-1.28.16-1.72.47s-.66.73-.66,1.25c0,.36.09.68.27.97.18.29.5.57.95.84.45.28,1.08.57,1.9.89.96.38,1.74.76,2.33,1.13.59.37,1.02.8,1.29,1.3.27.5.4,1.12.4,1.86,0,.91-.19,1.72-.56,2.41-.38.7-.93,1.23-1.67,1.6-.74.37-1.64.56-2.72.56-.71,0-1.37-.08-1.99-.23Z" />
        </g>

        {/* <g>
					<g>
						<rect style={{fill: codeFills?.[2]?.[0]}} x="341.15" y="252.58" width="38.68" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[2]?.[1]}} x="394.82" y="252.58" width="171.72" height="28" rx="12.5" ry="12.5" />
					</g>
					<rect style={{fill: codeFills?.[8]?.[0]}} x="367.44" y="504.58" width="61.88" height="28" rx="12.5" ry="12.5" />
					<g>
						<rect style={{fill: codeFills?.[4]?.[0]}} x="367.44" y="336.58" width="61.88" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[4]?.[1]}} x="444.32" y="336.58" width="37.13" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[4]?.[2]}} x="496.45" y="336.58" width="165.53" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[6]?.[0]}} x="367.44" y="420.58" width="61.88" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[6]?.[1]}} x="444.32" y="420.58" width="37.13" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[6]?.[2]}} x="496.45" y="420.58" width="165.53" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[3]?.[0]}} x="367.44" y="294.58" width="99.01" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[3]?.[1]}} x="481.45" y="294.58" width="43.32" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[3]?.[2]}} x="539.77" y="294.58" width="136.14" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[5]?.[0]}} x="367.44" y="378.58" width="99.01" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[5]?.[1]}} x="481.45" y="378.58" width="43.32" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[5]?.[2]}} x="539.77" y="378.58" width="136.14" height="28" rx="12.5" ry="12.5" />
					</g>
					<rect style={{fill: codeFills?.[10]?.[0]}} x="330.32" y="588.58" width="99.01" height="28" rx="12.5" ry="12.5" />
					<rect style={{fill: codeFills?.[11]?.[0]}} x="330.32" y="630.58" width="99.01" height="28" rx="12.5" ry="12.5" />
					<g>
						<rect style={{fill: codeFills?.[9]?.[0]}} x="367.44" y="546.58" width="99.01" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[9]?.[1]}} x="481.45" y="546.58" width="43.32" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[9]?.[2]}} x="539.77" y="546.58" width="26.3" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[7]?.[0]}} x="367.44" y="462.58" width="99.01" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[7]?.[1]}} x="481.45" y="462.58" width="43.32" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[7]?.[2]}} x="539.77" y="462.58" width="136.14" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[1]?.[0]}} x="316.39" y="210.58" width="47.96" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[1]?.[1]}} x="379.35" y="210.58" width="47.96" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[1]?.[2]}} x="442.31" y="210.58" width="81.99" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[1]?.[3]}} x="539.3" y="210.58" width="120.67" height="28" rx="12.5" ry="12.5" />
						<rect style={{fill: codeFills?.[1]?.[4]}} x="674.97" y="210.58" width="46.41" height="28" rx="12.5" ry="12.5" />
					</g>
					<g>
						<rect style={{fill: codeFills?.[0]?.[0]}} x="287" y="168.58" width="111.38" height="28" rx="12.5" ry="12.5" />
					</g>
				</g> */}

        <path style={activityIconStyle} d="M51.52,96.23h-18.17l-3.03,3.03v9.09h-9.09l-3.03,3.03v30.43l3.03,2.89h24.37l2.89-2.89v-9.23h9.49l2.63-2.89v-24.37l-9.09-9.09ZM51.52,100.51l4.81,4.81h-4.81v-4.81ZM45.46,141.67h-24.23v-30.29h9.09v18.32l3.03,2.89h12.12v9.09ZM57.58,129.55h-24.23v-30.29h15.15v9.09h9.09v21.2Z" />
        <path style={activityIconStyle} d="M45.45,170.6c-9.2,0-16.66,7.45-16.67,16.65,0,4.07,1.49,8.01,4.19,11.05l-16.3,18.5,2.26,2.02,16.26-18.42c7.25,5.67,17.72,4.39,23.39-2.86,5.67-7.25,4.39-17.72-2.86-23.39-2.93-2.29-6.55-3.54-10.27-3.54v-.02ZM45.45,200.89c-7.53,0-13.63-6.1-13.63-13.63s6.1-13.63,13.63-13.63,13.63,6.1,13.63,13.63-6.1,13.63-13.63,13.63Z" />
        <path style={activityIconStyle} d="M57.59,261.33c.02-4.17-3.34-7.56-7.51-7.58-1.63,0-3.22.51-4.53,1.48-3.35,2.48-4.05,7.21-1.57,10.56.97,1.31,2.34,2.27,3.9,2.74-1.01,2.06-3.1,3.36-5.39,3.37h-6.04c-2.23,0-4.39.85-6.04,2.35v-14.58c4.08-.83,6.72-4.82,5.89-8.9-.83-4.08-4.82-6.72-8.9-5.89-4.08.83-6.72,4.82-5.89,8.9.6,2.96,2.92,5.28,5.89,5.89v18.41c-4.14.79-6.85,4.78-6.06,8.92.79,4.14,4.78,6.85,8.92,6.06,4.14-.79,6.85-4.78,6.06-8.92-.53-2.78-2.55-5.03-5.25-5.86,1.01-2.05,3.1-3.36,5.39-3.37h6.04c3.86-.02,7.28-2.48,8.53-6.14,3.74-.49,6.55-3.67,6.56-7.45h0ZM24.39,252.28c0-2.5,2.02-4.53,4.53-4.53,2.5,0,4.53,2.02,4.53,4.53h0c0,2.5-2.03,4.53-4.53,4.53-2.5,0-4.53-2.03-4.53-4.53ZM33.44,285.48c0,2.5-2.03,4.53-4.53,4.53s-4.53-2.03-4.53-4.53h0c0-2.5,2.03-4.53,4.53-4.53,2.5,0,4.53,2.03,4.53,4.53ZM50.04,265.86c-2.5,0-4.53-2.03-4.53-4.53s2.03-4.53,4.53-4.53,4.53,2.03,4.53,4.53-2.03,4.53-4.53,4.53Z" />
      </g>
    </svg>
  );
};

export default VscodeSvg;
