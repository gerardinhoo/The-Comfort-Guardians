import Gallery from '@/components/Gallery';
import { galleryItems } from '@/data/galleryItems';

export default function GalleryPage() {
  return (
    <main className='pt-24'>
      <Gallery items={galleryItems} />
    </main>
  );
}
