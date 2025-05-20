import AppLayout from "../../layouts/AppLayout";

function Home() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
        <p className="mt-4 text-lg">This is a simple home page using React and Tailwind CSS.</p>
      </div>
    </AppLayout>
  );
}

export default Home;
