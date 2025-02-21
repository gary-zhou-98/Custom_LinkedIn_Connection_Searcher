import Header from "../components/Header/Header";
import FileUploader from "../components/FileUploader/FileUploader";
import SearchQueryInput from "../components/SearchQueryInput/SearchQueryInput";

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <SearchQueryInput />
        <FileUploader />
      </main>
    </div>
  );
}
