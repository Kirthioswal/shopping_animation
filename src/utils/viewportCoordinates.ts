/**
 * Viewport-Based Coordinate Structure
 * 
 * Establishes a screen/viewport coordinate system:
 * - (0, 0) = top-left of the browser viewport
 * - X increases from LEFT → RIGHT
 * - Y increases from TOP → BOTTOM
 * 
 * Horizontal primary zones:
 * - LEFT zone: ~10–25% of viewport width (nominal center: ~18%)
 * - CENTER zone: ~40–60% of viewport width (nominal center: 50%)
 * - RIGHT zone: ~75–90% of viewport width (nominal center: ~82%)
 * 
 * Vertical storytelling corridor:
 * - CENTER_Y: ~58% of viewport height (clear of top HUD and bottom HUD)
 */

export interface ViewportDimensions {
  width: number;
  height: number;
}

export interface ViewportCoordinates {
  viewportWidth: number;
  viewportHeight: number;
  
  // Primary zone percentage landmarks (0 to 1)
  zoneLeftPct: number;    // 0.18
  zoneCenterPct: number;  // 0.50
  zoneRightPct: number;   // 0.82
  centerYPct: number;     // 0.58

  // Absolute pixel positions for elements centered at each zone
  absoluteLeftX: number;
  absoluteCenterX: number;
  absoluteRightX: number;
  absoluteCenterY: number;

  // Relative X offsets from screen center (0 = viewportWidth * 0.50)
  // Package positions guaranteed not to clip outside viewport:
  LEFT_POSITION: number;    // negative offset (pixels)
  CENTER_POSITION: number;  // 0 (pixels)
  RIGHT_POSITION: number;   // positive offset (pixels)

  // Vertical storytelling position
  CENTER_Y: number;         // pixel position or percentage reference
  centerYStyle: string;     // '58%'

  // Responsive flags
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const PACKAGE_DIMENSIONS = {
  width: 220,
  height: 176,
  maxScale: 1.15,
  safePadding: 24,
};

export const CARD_DIMENSIONS = {
  defaultWidth: 340,
  safePadding: 20,
};

/**
 * Quintic smootherstep for C2-continuous smooth motion without sudden velocity jumps
 */
export function smootherstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c * (c * (c * 6 - 15) + 10);
}

/**
 * Calculates responsive viewport coordinates accounting for object dimensions and edge safety
 */
export function calculateViewportCoordinates(width: number, height: number): ViewportCoordinates {
  const safeWidth = Math.max(320, width);
  const safeHeight = Math.max(480, height);

  const zoneLeftPct = 0.18;
  const zoneCenterPct = 0.50;
  const zoneRightPct = 0.82;
  const centerYPct = 0.58;

  // Maximum scale package dimension
  const maxPackageWidth = PACKAGE_DIMENSIONS.width * PACKAGE_DIMENSIONS.maxScale;
  
  // Max offset from center (half screen) while maintaining safePadding from the viewport edges
  const maxSafePackageOffset = Math.max(
    80,
    Math.min(
      safeWidth * 0.32,
      (safeWidth - maxPackageWidth) / 2 - PACKAGE_DIMENSIONS.safePadding
    )
  );

  const LEFT_POSITION = -maxSafePackageOffset;
  const CENTER_POSITION = 0;
  const RIGHT_POSITION = maxSafePackageOffset;

  const absoluteCenterX = safeWidth * zoneCenterPct;
  const absoluteLeftX = absoluteCenterX + LEFT_POSITION;
  const absoluteRightX = absoluteCenterX + RIGHT_POSITION;
  const absoluteCenterY = Math.round(safeHeight * centerYPct);

  return {
    viewportWidth: safeWidth,
    viewportHeight: safeHeight,
    zoneLeftPct,
    zoneCenterPct,
    zoneRightPct,
    centerYPct,
    absoluteLeftX,
    absoluteCenterX,
    absoluteRightX,
    absoluteCenterY,
    LEFT_POSITION,
    CENTER_POSITION,
    RIGHT_POSITION,
    CENTER_Y: absoluteCenterY,
    centerYStyle: `${Math.round(centerYPct * 100)}%`,
    isMobile: safeWidth < 640,
    isTablet: safeWidth >= 640 && safeWidth < 1024,
    isDesktop: safeWidth >= 1024,
  };
}

/**
 * Interpolates package X position between zones:
 * - 'RIGHT_TO_LEFT': RIGHT (+maxOffset) → CENTER (0) → LEFT (-maxOffset)
 * - 'LEFT_TO_RIGHT': LEFT (-maxOffset) → CENTER (0) → RIGHT (+maxOffset)
 * - 'CENTER_TO_RIGHT': CENTER (0) → RIGHT (+maxOffset)
 * - 'LEFT_TO_CENTER_LEFT': LEFT (-maxOffset) → CENTER (0) → LEFT (-maxOffset)
 */
export function interpolatePackageX(
  progress: number,
  coords: ViewportCoordinates,
  mode: 'RIGHT_TO_LEFT' | 'LEFT_TO_RIGHT' | 'CENTER_TO_RIGHT' | 'LEFT_TO_CENTER_LEFT',
  enterEnd = 0.22,
  exitStart = 0.72,
  exitEnd = 0.90
): number {
  const { LEFT_POSITION, CENTER_POSITION, RIGHT_POSITION } = coords;

  if (mode === 'RIGHT_TO_LEFT') {
    if (progress < enterEnd) {
      const t = progress / enterEnd;
      return RIGHT_POSITION * (1 - smootherstep(t));
    } else if (progress <= exitStart) {
      return CENTER_POSITION;
    } else if (progress < exitEnd) {
      const t = (progress - exitStart) / (exitEnd - exitStart);
      return LEFT_POSITION * smootherstep(t);
    } else {
      return LEFT_POSITION;
    }
  }

  if (mode === 'LEFT_TO_RIGHT') {
    if (progress < enterEnd) {
      const t = progress / enterEnd;
      return LEFT_POSITION * (1 - smootherstep(t));
    } else if (progress <= exitStart) {
      return CENTER_POSITION;
    } else if (progress < exitEnd) {
      const t = (progress - exitStart) / (exitEnd - exitStart);
      return RIGHT_POSITION * smootherstep(t);
    } else {
      return RIGHT_POSITION;
    }
  }

  if (mode === 'LEFT_TO_CENTER_LEFT') {
    if (progress < enterEnd) {
      const t = progress / enterEnd;
      return LEFT_POSITION * (1 - smootherstep(t));
    } else if (progress <= exitStart) {
      return CENTER_POSITION;
    } else if (progress < exitEnd) {
      const t = (progress - exitStart) / (exitEnd - exitStart);
      return LEFT_POSITION * smootherstep(t);
    } else {
      return LEFT_POSITION;
    }
  }

  // CENTER_TO_RIGHT
  if (progress <= exitStart) {
    return CENTER_POSITION;
  } else if (progress < exitEnd) {
    const t = (progress - exitStart) / (exitEnd - exitStart);
    return RIGHT_POSITION * smootherstep(t);
  } else {
    return RIGHT_POSITION;
  }
}
