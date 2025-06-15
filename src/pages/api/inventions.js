// api 
// api for inventions list
import inventionsImageGallery from "../../../public/lib/inventionsImageGallery";

const handler = (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }

  try {
    if (!inventionsImageGallery || inventionsImageGallery.length === 0) {
      return res.status(204).json({ success: false, message: "No Content" });
    }

    res.status(200).json({ success: true, data: inventionsImageGallery });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default handler;
