import Header_class from "./Header_class";
import Category_class from "./Category_class";
import Banner from "./Banner";
import Main_content from "./Main_content";
import Footer from "./Footer";

export default function Home_page() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Main Content */}
      <main className="flex flex-col gap-8">
        
        {/* Banner Section */}
        <section className="w-full">
          <Banner />
        </section>

        {/* Category Section */}
        <section className="w-full mx-auto px-4">
          <Category_class />
        </section>

        {/* Main Content / Featured Products */}
        <section className="w-full mx-auto px-4">
          <Main_content />
        </section>
      </main>

    </div>
  );
}
