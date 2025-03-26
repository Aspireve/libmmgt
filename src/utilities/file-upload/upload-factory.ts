import CloudinaryUploader from "./cloudinary-uploader";

interface Uploader {
  uploadFile(file: File): Promise<string>;
}

class UploaderFactory {
  static createUploader(serviceType: "cloudinary"): Uploader {
    switch (serviceType) {
      case "cloudinary":
        return CloudinaryUploader.getInstance();
      default:
        throw new Error("Invalid uploader service type");
    }
  }
}

export default UploaderFactory;
