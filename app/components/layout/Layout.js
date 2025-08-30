// components/layout/Layout.js
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="bg-gray-900 text-gray-100 font-sans">
      <div id="vanta-bg"></div>
      <div className="content-wrapper min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}