export interface ScreenSizes {
  screenWidth: undefined;
  screenHeight: undefined;
  size: ScreenSizeType;
}

export type ScreenSizeType =
  | 'mobile'
  | 'tablet'
  | 'tablet_landscape'
  | 'desktop'
  | 'large-desktop';
