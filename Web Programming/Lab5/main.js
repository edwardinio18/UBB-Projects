$(document).ready(function () {
  $(".dialog-container").css({
    display: "none",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    "background-color": "rgba(0,0,0,0.5)",
    "z-index": "999",
  });

  $(".dialog-box").css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "background-color": "#fff",
    padding: "20px",
    "border-radius": "5px",
    width: "400px",
    "max-width": "100%",
    "z-index": "1000",
  });

  $(".dialog-title").css({
    "font-size": "24px",
    "margin-bottom": "20px",
  });

  $(".dialog-content").css({
    "font-size": "16px",
    "margin-bottom": "20px",
  });

  $(".dialog-close").css({
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
    "font-size": "20px",
  });

  $(".resize-handle").css({
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "20px",
    height: "20px",
    cursor: "nwse-resize",
    "z-index": 1001,
    "background-color": "#007bff",
  });

  $("#openDialogBtn").click(function () {
    $(".dialog-container").fadeIn();
  });

  $(document).on("click", ".dialog-close", function () {
    $(".dialog-container").fadeOut();
  });

  $("#openDialogBtn").click(function () {
    $(".dialog-container").fadeIn();
  });

  $(".dialog-close").click(function () {
    $(".dialog-container").fadeOut();
  });

  $(".resize-handle").mousedown(function (e) {
    e.preventDefault();

    var startX = e.clientX;
    var startY = e.clientY;
    var startWidth = $(".dialog-box").outerWidth();
    var startHeight = $(".dialog-box").outerHeight();

    $(document).mousemove(function (e) {
      var diffX = e.clientX - startX;
      var diffY = e.clientY - startY;

      $(".dialog-box").css({
        width: startWidth + diffX,
        height: startHeight + diffY,
      });
    });

    $(document).mouseup(function () {
      $(document).off("mousemove mouseup");
    });
  });
});
