import { registerLogger } from '../lib/logger';

registerLogger('CODE');

logD('Sample debug log');
logI('Sample info log');
logW('Sample warning log');
logE('Sample error log');

figma.showUI(__html__);

figma.ui.onmessage = (msg): void => {
  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i += 1) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  figma.closePlugin();
};
