import UploadRequestBuilder from "./file-upload-builder";

class CloudinaryUploader {
    static instance: CloudinaryUploader;
    private readonly CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dut0muwrt/raw/upload";
    private readonly UPLOAD_PRESET = "ml_default";

    private constructor() {}

    public static getInstance(): CloudinaryUploader {
        if (!CloudinaryUploader.instance) {
            CloudinaryUploader.instance = new CloudinaryUploader();
        }
        return CloudinaryUploader.instance;
    }

    async uploadFile(file: File): Promise<string> {
        const formData = new UploadRequestBuilder()
            .setFile(file)
            .setUploadPreset(this.UPLOAD_PRESET)
            .build();

        try {
            const response = await fetch(this.CLOUDINARY_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log({data})
            return data.secure_url;
        } catch (error) {
            console.error("Cloudinary Upload Error:", error);
            throw error;
        }
    }
}

export default CloudinaryUploader;
