type BackgroundOverlayProps = {
  maxViewportHeights?: number;
};

const BackgroundOverlay = ({ maxViewportHeights }: BackgroundOverlayProps) => {
  const overlayHeight =
    typeof maxViewportHeights === 'number' && maxViewportHeights > 0
      ? `${maxViewportHeights * 100}vh`
      : '100%';

  return (
    <div 
      className="absolute top-0 left-0 right-0 z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.78) 25%, rgba(0, 0, 0, 0.61) 50%, rgba(0, 0, 0, 0.43) 75%, rgba(0, 0, 0, 0) 100%)',
        height: overlayHeight,
        minHeight: overlayHeight,
      }}
    />
  );
};

export default BackgroundOverlay;

