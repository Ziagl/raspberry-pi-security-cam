export interface ImageData {
    name:string;
    filename:string;
    timestamp:string;
}

export interface CameraData {
    images: ImageData[];
}
