const BackgroundOverlay = () => {
  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.96) 0%, rgba(0, 0, 0, 0.78) 25%, rgba(0, 0, 0, 0.61) 50%, rgba(0, 0, 0, 0.43) 75%, rgba(0, 0, 0, 0.25) 100%)',
        minHeight: '100%'
      }}
    />
  );
};

export default BackgroundOverlay;

