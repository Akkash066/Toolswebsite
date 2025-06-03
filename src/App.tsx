import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ImageTools from './pages/tools/ImageTools';
import TextTools from './pages/tools/TextTools';
import PDFTools from './pages/tools/PDFTools';
import MergePDF from './pages/tools/pdf/MergePDF';
import SplitPDF from './pages/tools/pdf/SplitPDF';
import CompressPDF from './pages/tools/pdf/CompressPDF';
import ConvertPDF from './pages/tools/pdf/ConvertPDF';
import PDFToWord from './pages/tools/pdf/PDFToWord';
import PDFToImage from './pages/tools/pdf/PDFToImage';
import AddPageNumbers from './pages/tools/pdf/AddPageNumbers';
import RotatePDF from './pages/tools/pdf/RotatePDF';
import DeletePDFPages from './pages/tools/pdf/DeletePDFPages';
import ExtractPDFPages from './pages/tools/pdf/ExtractPDFPages';
import DeveloperTools from './pages/tools/DeveloperTools';
import FinanceTools from './pages/tools/FinanceTools';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/tools/image" element={<ImageTools />} />
            <Route path="/tools/text" element={<TextTools />} />
            <Route path="/tools/pdf" element={<PDFTools />} />
            <Route path="/tools/pdf/merge" element={<MergePDF />} />
            <Route path="/tools/pdf/split" element={<SplitPDF />} />
            <Route path="/tools/pdf/compress" element={<CompressPDF />} />
            <Route path="/tools/pdf/convert" element={<ConvertPDF />} />
            <Route path="/tools/pdf/to-word" element={<PDFToWord />} />
            <Route path="/tools/pdf/to-image" element={<PDFToImage />} />
            <Route path="/tools/pdf/add-page-numbers" element={<AddPageNumbers />} />
            <Route path="/tools/pdf/rotate" element={<RotatePDF />} />
            <Route path="/tools/pdf/delete-pages" element={<DeletePDFPages />} />
            <Route path="/tools/pdf/extract-pages" element={<ExtractPDFPages />} />
            <Route path="/tools/developer" element={<DeveloperTools />} />
            <Route path="/tools/finance" element={<FinanceTools />} />
          </Routes>
        </main>
        <Footer />
        <Toast />
      </div>
    </Router>
  );
}

export default App;