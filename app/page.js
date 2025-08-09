import QrGenerator from '@/components/QrGenerator';

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center my-8">مولد QR Code</h1>
      <QrGenerator />
    </main>
  );
}
