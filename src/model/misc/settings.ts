type slideSettingsType = {
  interval: number;
  keyboard: boolean;
  autoplay: boolean;
  autoplaySpeed: number | boolean;
  video: boolean;
  videoHeight: number | boolean;
  pause: "hover" | boolean;
  ride: boolean;
  wrap: boolean;
  center: boolean;
  mouseDrag: boolean;
  touchDrag: boolean;
  pullDrag: boolean;
  autoWidth: boolean;
  slideTransition: boolean;
  dots: boolean;
  dotsData: boolean;
  lazyLoad: boolean;
};

export const slideSettings: slideSettingsType = {
  interval: 5000,
  keyboard: true,
  autoplay: true,
  autoplaySpeed: 1000,
  pause: "hover",
  video: false,
  videoHeight: 400,
  ride: false,
  wrap: false,
  center: false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  autoWidth: false,
  slideTransition: false,
  dots: true,
  dotsData: false,
  lazyLoad: false,
};
