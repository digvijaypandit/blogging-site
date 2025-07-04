import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex justify-center md:justify-start mb-6 md:mb-0">
                        <Logo width="120px" />
                    </div>
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-500 transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 dark:border-gray-700" />
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    © 2025 <span className="font-semibold">Digvijay</span>. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
