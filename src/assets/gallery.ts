export type GalleryItem = {
    name: string;
    src: string;
};

const galleryBaseUrl = '/audio-proxy/gallery';

const galleryFileNames = [
    'SSS00951%20(1).jpg',
    'SSS00964.jpg',
    'SSS01039.jpg',
    'SSS01050.jpg',
    'SSS01063.jpg',
    'SSS01065.jpg',
    'SSS01085.jpg',
    'SSS01094.jpg',
    'SSS01125.jpg',
    'SSS01153.jpg',
    'SSS01212.jpg',
    'SSS01345.jpg',
    'SSS01391.jpg',
    'SSS01400.jpg',
    'SSS01432.jpg',
    'SSS01439.jpg',
    'SSS01449.jpg',
    'SSS01461%20(1).jpg',
    'SSS01548.jpg',
    'SSS01559.jpg',
    'SSS01578.jpg',
    'SSS01582.jpg',
    'SSS01612.jpg',
];

export const galleryItems: GalleryItem[] = galleryFileNames.map((fileName) => ({
    name: 'Band Photo Shoot Photo',
    src: `${galleryBaseUrl}/${fileName}`,
}));
