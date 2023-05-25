import type { V2_MetaFunction } from '@remix-run/node';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export default function Index() {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-semibold">runde.tips</h1>
    </div>
  );
}
