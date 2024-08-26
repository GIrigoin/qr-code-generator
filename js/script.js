// import { QRCode } from "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.js";

const generateQr = () => {
  const input = document.getElementById("qr-url");
  const url = input.value;
  const qrCodeDiv = document.getElementById("qrcode");

  var qrcode = new QRCode(qrCodeDiv, {
    text: url,
    width: 184,
    height: 184,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  const qrGenerator = document.getElementsByClassName("qr-generator")[0];
  qrGenerator.style.display = "none";

  const qrDisplay = document.getElementsByClassName("qr-display")[0];
  qrDisplay.style.display = "flex";
};

const downloadQr = () => {
  let canvas = document.getElementsByTagName("canvas")[0];

  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "QRCode.png");
  // let canvas = document.getElementById('myCanvas');
  let dataURL = canvas.toDataURL("image/png");
  let url = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
};

async function getBlobFromCanvas(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Canvas toBlob failed"));
      }
    });
  });
}

const shareQr = async () => {
  let canvas = document.getElementsByTagName("canvas")[0];

  if (ClipboardItem.supports("image/png")) {
    // Copy canvas to blob
    try {
      const blob = await getBlobFromCanvas(canvas);
      // Create ClipboardItem with blob and it's type, and add to an array
      const data = [new ClipboardItem({ [blob.type]: blob })];
      // Write the data to the clipboard
      await navigator.clipboard.write(data);

      const info = document.getElementsByClassName("info")[0];
      info.innerText = "QR code copied to the clipboard!";
      info.style.display = "block";
      setTimeout(() => (info.style.display = "none"), 1500);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("image/png is not supported");
  }
};

const genButton = document.getElementById("button-generate");
genButton.addEventListener("click", generateQr);

const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", downloadQr);

const shareButton = document.getElementById("share");
shareButton.addEventListener("click", shareQr);
