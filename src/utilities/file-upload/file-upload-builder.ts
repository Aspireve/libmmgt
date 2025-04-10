class UploadRequestBuilder {
  private formData: FormData;
  constructor() {
    this.formData = new FormData();
  }
  
  setUploadPreset(preset: string): this {
    this.formData.append("upload_preset", preset);
    return this;
  }
  setFile(file: File): this {
    this.formData.append("file", file);
    return this;
  }


  build() {
    return this.formData;
  }
}

export default UploadRequestBuilder;
