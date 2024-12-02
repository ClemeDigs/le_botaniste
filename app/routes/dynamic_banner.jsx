import DynamicBanner from '~/components/DynamicBanner';
import banners from '~/data/banners.json';

export default function dynamicBanner() {
  return (
    <div className="max-w-[1600px] m-auto">
      <DynamicBanner contents={banners} />
    </div>
  );
}
