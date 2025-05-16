$(document).ready(function () {
  // Fetch API data
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    success: function (data) {
      $("#fact").text(data.text);
    },
    error: function () {
      $("#fact").text("Could not load fact.");
    },
  });

  // Drag and drop
  const dropzone = $("#dropzone");
  const fileInput = $("#fileInput");

  dropzone.on("click", () => fileInput.click());

  dropzone.on("dragover", (e) => {
    e.preventDefault();
    dropzone.addClass("dragover");
  });

  dropzone.on("dragleave", () => dropzone.removeClass("dragover"));

  dropzone.on("drop", (e) => {
    e.preventDefault();
    dropzone.removeClass("dragover");
    const files = e.originalEvent.dataTransfer.files;
    uploadFiles(files);
  });

  fileInput.on("change", () => {
    const files = fileInput[0].files;
    uploadFiles(files);
  });

  function uploadFiles(files) {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    $.ajax({
      url: "http://localhost:3000/upload",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: (res) => $("#uploadStatus").text("Upload successful!"),
      error: () => $("#uploadStatus").text("Upload failed."),
    });
  }
});
