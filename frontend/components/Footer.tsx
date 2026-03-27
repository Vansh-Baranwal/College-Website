import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-gold/20 pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-10 h-10">
                <img 
                  src="/logo.png" 
                  alt="IIT Delhi Logo" 
                  className="w-full h-full object-contain filter brightness-0 invert" 
                />
              </div>
              <span className="font-serif text-2xl font-semibold text-white">
                IIT <span className="text-gold">Delhi</span>
              </span>
            </Link>
          </div>
          
          {/* Column 2 */}
          <div>
            <h4 className="font-medium text-white mb-6">Academics</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="#" className="hover:text-gold transition">Programs</Link></li>
              <li><Link href="#" className="hover:text-gold transition">Departments</Link></li>
              <li><Link href="#" className="hover:text-gold transition">Research</Link></li>
              <li><Link href="#" className="hover:text-gold transition">Library</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-medium text-white mb-6">Campus Life</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="https://360-degree-nine.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">Virtual Tour</Link></li>
              <li><Link href="/events" className="hover:text-gold transition">Events</Link></li>
              <li><Link href="/mental-health" className="hover:text-gold transition">Mental Health</Link></li>
              <li><Link href="/lost-found" className="hover:text-gold transition">Lost & Found</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-medium text-white mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li><Link href="/alumni" className="hover:text-gold transition">Alumni</Link></li>
              <li><Link href="/placement" className="hover:text-gold transition">Placements</Link></li>
              <li><Link href="#" className="hover:text-gold transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gold transition">Careers</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted">
          <p>© {new Date().getFullYear()} IIT Delhi Campus OS. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-gold transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-gold transition">Terms of Use</Link>
            <Link href="/contacts" className="hover:text-gold transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
