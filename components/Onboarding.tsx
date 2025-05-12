import DropZone from './DropZone';

const Onboarding = () => {
  return (
    <section className="mx-auto max-w-xl space-y-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Interactive MD Viewer</h1>
      <p className="text-gray-500">Upload a local Markdown file to see it rendered instantly.</p>
      <DropZone />
    </section>
  );
};

export default Onboarding;