import Header from "../components/Header/Header";
import FileUploader from "../components/FileUploader/FileUploader";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <FileUploader />
      </main>
    </div>
  );
}
