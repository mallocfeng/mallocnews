const resizePages = () => {
  document.querySelectorAll('.page-shell').forEach((shell) => {
    const pageWidth = Number(shell.style.getPropertyValue('--page-width'));
    const pageHeight = Number(shell.style.getPropertyValue('--page-height'));
    if (!pageWidth || !pageHeight) {
      return;
    }

    const scale = shell.clientWidth / pageWidth;
    shell.style.height = `${pageHeight * scale}px`;
    shell.style.setProperty('--page-scale', scale.toString());
  });
};

window.addEventListener('resize', resizePages, { passive: true });
window.addEventListener('load', resizePages);
resizePages();
