export interface Paragraph {
    id: number;
    heading: string;
    content: string;
    photoUrl: string;
    url: string;
}

export interface Article {
    id: number;
    type: number;
    description: string;
    thumbnailPhotoUrl: string;
    publisherName: string;
    publishedDate: Date;
    title: string;
    paragraphs: Paragraph[];
}