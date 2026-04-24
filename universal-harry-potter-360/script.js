const START_VIEW = {
  pitch: -2,
  yaw: 8,
  hfov: 96,
};

const viewer = pannellum.viewer("panorama", {
  type: "equirectangular",
  panorama: "./assets/harry-potter-universal-equirectangular.png",
  autoLoad: true,
  compass: false,
  showControls: false,
  mouseZoom: true,
  draggable: true,
  keyboardZoom: true,
  pitch: START_VIEW.pitch,
  yaw: START_VIEW.yaw,
  hfov: START_VIEW.hfov,
  minHfov: 52,
  maxHfov: 112,
  vaov: 180,
  haov: 360,
  horizonPitch: 0,
  horizonRoll: 0,
});

const step = {
  yaw: 18,
  pitch: 10,
  hfov: 12,
};

function animateTo(next) {
  viewer.lookAt(
    next.pitch ?? viewer.getPitch(),
    next.yaw ?? viewer.getYaw(),
    next.hfov ?? viewer.getHfov(),
    650,
  );
}

document.querySelector(".control-dock").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-control]");
  if (!button) return;

  const action = button.dataset.control;
  const currentPitch = viewer.getPitch();
  const currentYaw = viewer.getYaw();
  const currentHfov = viewer.getHfov();

  if (action === "left") animateTo({ yaw: currentYaw - step.yaw });
  if (action === "right") animateTo({ yaw: currentYaw + step.yaw });
  if (action === "up") animateTo({ pitch: Math.min(currentPitch + step.pitch, 82) });
  if (action === "down") animateTo({ pitch: Math.max(currentPitch - step.pitch, -82) });
  if (action === "zoom-in") animateTo({ hfov: Math.max(currentHfov - step.hfov, 52) });
  if (action === "zoom-out") animateTo({ hfov: Math.min(currentHfov + step.hfov, 112) });
  if (action === "reset") animateTo(START_VIEW);
});

document.getElementById("fullscreen").addEventListener("click", async () => {
  const shell = document.querySelector(".viewer-shell");
  if (!document.fullscreenElement) {
    await shell.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});
