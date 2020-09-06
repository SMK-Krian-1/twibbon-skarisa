let base_img = new Image();

function downloadImage() {
  const selected = $("[name='twibbonType']:checked").val();
  const canvas = document.getElementById('generated');
  const imageToDownload = canvas
    .toDataURL('image/png')
    .replace('image/png', 'image/octet-stream');
  const presudoLink = document.createElement('a');
  presudoLink.href = imageToDownload;
  presudoLink.download = `twibbon-${selected}.png`;

  document.body.appendChild(presudoLink);
  presudoLink.click();
  document.body.removeChild(presudoLink);
}

function generate() {
  $('.pilih-twibbon').hide();
  const selected = $("[name='twibbonType']:checked").val();
  base_img.src = `./assets/${selected}.png`;
  base_img.onload = function () {
    $('#generated').css('height', '360px');
    const imageFile = document.getElementById('inputGambar').files[0];
    const canvas = document.getElementById('generated');
    const posX = document.getElementById('posX');
    const posY = document.getElementById('posY');
    const ukuran = document.getElementById('ukuran');
    $('.form-input').hide();
    $('.pilih-foto').hide();
    const uploadedImage = new Image();
    const reader = new FileReader();

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    reader.onload = function (e) {
      uploadedImage.src = reader.result;
      uploadedImage.onload = function () {
        posX.max = uploadedImage.width;
        posY.max = uploadedImage.height;
        posX.min = uploadedImage.width - uploadedImage.width * 2;
        posY.min = uploadedImage.height - uploadedImage.height * 2;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 1080, 1080);
        ctx.drawImage(
          uploadedImage,
          posX.value,
          posY.value,
          ((1080 * uploadedImage.width) / uploadedImage.height) * ukuran.value,
          1080 * ukuran.value
        );
        ctx.drawImage(base_img, 0, 0);
        $('.download-btn').show();
        $('.slider').show();
      };
    };
  };
}
