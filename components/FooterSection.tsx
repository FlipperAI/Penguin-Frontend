import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Footer,
  FooterColumn,
  FooterBottom,
  FooterContent,
} from "@/components/ui/footer";
import LaunchUI from "@/components/logos/launch-ui";

export default function FooterSection() {
  return (
    <footer className="w-full bg-gray-900 px-4"> {/* Dark background */}
      <div className="mx-auto max-w-container">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <LaunchUI />
                <h3 className="text-xl font-bold text-white">Launch UI</h3> {/* White text */}
              </div>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold text-white">Product</h3> {/* White text */}
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Changelog
              </a>
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Documentation
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold text-white">Company</h3> {/* White text */}
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                About
              </a>
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Careers
              </a>
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Blog
              </a>
            </FooterColumn>
            <FooterColumn>
              <h3 className="text-md pt-1 font-semibold text-white">Contact</h3> {/* White text */}
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Discord
              </a>
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Twitter
              </a>
              <a
                href="/"
                className="text-sm text-gray-300 hover:text-gray-100" {/* Light gray text with hover effect */}
              >
                Github
              </a>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div className="text-gray-300">© 2024 Mikołaj Dobrucki. All rights reserved</div> {/* Light gray text */}
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-300 hover:text-gray-100">Privacy Policy</a> {/* Light gray text with hover effect */}
              <a href="/" className="text-gray-300 hover:text-gray-100">Terms of Service</a> {/* Light gray text with hover effect */}
              <ModeToggle /> {/* Theme toggle button */}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}