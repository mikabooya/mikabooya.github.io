/* ============================================================
   about.js — draggable desktop windows for about.html
   Loaded after main.js. Requires the markup in about.html:
   .window[data-window-id] with .window-dot[data-action], plus
   #archivedDock, #dockSeparator, #dockTrash, #trashIcon,
   #trashPanel and #trashPanelItems.

   - drag any window to move it (position + stacking saved)
   - red dot: close → trash; yellow: minimize → dock; green: maximize
   - click a dock tab or trash item to restore the window
   - trash panel opens from the trash icon and closes on outside click
   State persists in localStorage under "windowStates_v2".
   ============================================================ */

(() => {
  const windows         = document.querySelectorAll(".window");
  const archivedDock    = document.getElementById("archivedDock");
  const trashIcon       = document.getElementById("trashIcon");
  const trashPanel      = document.getElementById("trashPanel");
  const trashPanelItems = document.getElementById("trashPanelItems");
  const dockTrash       = document.getElementById("dockTrash");
  const dockSeparator   = document.getElementById("dockSeparator");
  let highestZIndex     = 10;

  const windowStates    = {};
  const archivedWindows = {};
  const trashedWindows  = {};

  function getWindowId(win) {
    return win.dataset.windowId ||
           win.querySelector(".window-title")?.textContent.trim().replace(/\s+/g, "-").toLowerCase() ||
           "window-" + Math.random().toString(36).substr(2, 9);
  }

  function saveAllStates() {
    localStorage.setItem("windowStates_v2", JSON.stringify({ windowStates, archivedWindows, trashedWindows }));
  }

  function loadAllStates() {
    const saved = localStorage.getItem("windowStates_v2");
    if (saved) {
      const data = JSON.parse(saved);
      Object.assign(windowStates,    data.windowStates    || {});
      Object.assign(archivedWindows, data.archivedWindows || {});
      Object.assign(trashedWindows,  data.trashedWindows  || {});
    }
  }

  function updateDock() {
    archivedDock.querySelectorAll(".dock-tab").forEach(t => t.remove());
    const archivedKeys = Object.keys(archivedWindows);
    const trashedKeys  = Object.keys(trashedWindows);

    if (archivedKeys.length > 0) {
      archivedDock.classList.add("visible");
      trashIcon.classList.add("hidden");
      archivedKeys.forEach(id => archivedDock.insertBefore(createDockTab(id, archivedWindows[id]), dockSeparator));
      dockSeparator.style.display = "block";
    } else {
      archivedDock.classList.remove("visible");
      trashIcon.classList.remove("hidden");
      dockSeparator.style.display = "none";
    }

    trashIcon.classList.toggle("has-items", trashedKeys.length > 0);
    dockTrash.classList.toggle("has-items", trashedKeys.length > 0);
    updateTrashPanel();
  }

  function updateTrashPanel() {
    const keys = Object.keys(trashedWindows);
    if (keys.length === 0) {
      trashPanelItems.innerHTML = '<div class="trash-panel-empty">No deleted windows</div>';
    } else {
      trashPanelItems.innerHTML = "";
      keys.forEach(id => trashPanelItems.appendChild(createTrashItem(id, trashedWindows[id])));
    }
  }

  const miniWindow = `
    <div class="mini-window">
      <div class="mini-window-bar"><span></span><span></span><span></span></div>
      <div class="mini-window-body"></div>
    </div>`;

  function createDockTab(windowId, state) {
    const tab = document.createElement("div");
    tab.className = "dock-tab";
    tab.dataset.windowId = windowId;
    tab.innerHTML = `${miniWindow}<span class="dock-tab-label">${state.title || windowId}</span>`;
    tab.addEventListener("click", (e) => { e.stopPropagation(); restoreFromArchive(windowId); });
    return tab;
  }

  function createTrashItem(windowId, state) {
    const item = document.createElement("div");
    item.className = "trash-item";
    item.dataset.windowId = windowId;
    item.innerHTML = `${miniWindow}<span class="trash-item-label">${state.title || windowId}</span>`;
    item.addEventListener("click", (e) => { e.stopPropagation(); restoreFromTrash(windowId); trashPanel.classList.remove("visible"); });
    return item;
  }

  function getOffsets(win) {
    const m = win.style.transform.match(/translate3d\(([^,]+),\s*([^,]+)/);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : { x: 0, y: 0 };
  }

  function snapshot(win, id) {
    const { x, y } = getOffsets(win);
    return {
      title: win.querySelector(".window-title")?.textContent || id,
      xOffset: x,
      yOffset: y,
      zIndex: parseInt(win.style.zIndex) || highestZIndex,
      wasMaximized: win.classList.contains("maximized"),
    };
  }

  function archiveWindow(win) {
    const id = getWindowId(win);
    archivedWindows[id] = snapshot(win, id);
    win.classList.remove("maximized");
    win.classList.add("minimized");
    saveAllStates(); updateDock();
  }

  function trashWindow(win) {
    const id = getWindowId(win);
    trashedWindows[id] = snapshot(win, id);
    win.classList.remove("maximized");
    win.classList.add("hidden");
    saveAllStates(); updateDock();
  }

  function restoreWindow(id, store, cls) {
    const win = document.querySelector(`[data-window-id="${id}"]`);
    if (!win) return;
    const state = store[id];
    delete store[id];
    win.classList.remove(cls);
    if (state) {
      win.style.transform = `translate3d(${state.xOffset || 0}px, ${state.yOffset || 0}px, 0)`;
      win.style.zIndex = ++highestZIndex;
      if (state.wasMaximized) win.classList.add("maximized");
    }
    saveAllStates(); updateDock();
  }

  function restoreFromArchive(id) { restoreWindow(id, archivedWindows, "minimized"); }
  function restoreFromTrash(id)   { restoreWindow(id, trashedWindows,  "hidden"); }

  function toggleMaximize(win) {
    const id = getWindowId(win);
    if (win.classList.contains("maximized")) {
      win.classList.remove("maximized");
      const state = windowStates[id];
      if (state?.preMaximizeTransform) win.style.transform = state.preMaximizeTransform;
    } else {
      windowStates[id] = windowStates[id] || {};
      windowStates[id].preMaximizeTransform = win.style.transform;
      win.classList.add("maximized");
      win.style.zIndex = ++highestZIndex;
      saveAllStates();
    }
  }

  // Trash panel: toggle from either trash button, close on outside click
  function toggleTrashPanel() { trashPanel.classList.toggle("visible"); }
  trashIcon.addEventListener("click", toggleTrashPanel);
  dockTrash.addEventListener("click", toggleTrashPanel);
  document.addEventListener("click", (e) => {
    if (!trashPanel.contains(e.target) && !trashIcon.contains(e.target) && !dockTrash.contains(e.target))
      trashPanel.classList.remove("visible");
  });

  // Restore saved positions / states, then wire up each window
  loadAllStates();

  windows.forEach((win, index) => {
    let isDragging = false, currentX, currentY, initialX, initialY, xOffset = 0, yOffset = 0;
    const windowId = getWindowId(win);

    const applySaved = (s, x, y, z) => {
      xOffset = x || 0; yOffset = y || 0;
      win.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`;
      win.style.zIndex = z || (10 + index);
      if (z > highestZIndex) highestZIndex = z;
    };

    if (archivedWindows[windowId]) {
      win.classList.add("minimized");
      const s = archivedWindows[windowId];
      applySaved(s, s.xOffset, s.yOffset, s.zIndex);
    } else if (trashedWindows[windowId]) {
      win.classList.add("hidden");
      const s = trashedWindows[windowId];
      applySaved(s, s.xOffset, s.yOffset, s.zIndex);
    } else {
      const state  = windowStates[windowId];
      const legacy = localStorage.getItem(windowId); // pre-v2 saved position
      if (state) {
        applySaved(state, state.xOffset, state.yOffset, state.zIndex);
      } else if (legacy) {
        try {
          const { x, y, z } = JSON.parse(legacy);
          applySaved(null, x, y, z);
        } catch (e) {}
      }
    }

    // Traffic-light buttons
    win.querySelectorAll(".window-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation(); e.preventDefault();
        if (dot.dataset.action === "close")    trashWindow(win);
        if (dot.dataset.action === "minimize") archiveWindow(win);
        if (dot.dataset.action === "maximize") toggleMaximize(win);
      });
    });

    // Drag (bring to front on press; links and buttons stay clickable)
    win.addEventListener("mousedown", (e) => {
      if (e.target.classList.contains("window-dot")) return;
      if (e.target.tagName === "A" || e.target.closest("a")) return;
      if (e.target.tagName === "BUTTON" || e.target.closest("button")) return;
      highestZIndex++;
      win.style.zIndex = highestZIndex;
      windowStates[windowId] = windowStates[windowId] || {};
      windowStates[windowId].zIndex = highestZIndex;
      saveAllStates();
      if (win.classList.contains("maximized")) return;
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
      xOffset = currentX; yOffset = currentY;
      requestAnimationFrame(() => { win.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`; });
    });

    document.addEventListener("mouseup", () => {
      if (!isDragging) return;
      isDragging = false;
      windowStates[windowId] = windowStates[windowId] || {};
      windowStates[windowId].xOffset = xOffset;
      windowStates[windowId].yOffset = yOffset;
      windowStates[windowId].zIndex  = parseInt(win.style.zIndex) || highestZIndex;
      saveAllStates();
    });
  });

  updateDock();
})();
