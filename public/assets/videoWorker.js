self.onmessage = async (e) => {
  const { file, format } = e.data;
  // Simulate video conversion
  const converted = await convertVideo(file, format);
  postMessage(converted);
};

async function convertVideo(file, format) {
  // Actual conversion logic here
}